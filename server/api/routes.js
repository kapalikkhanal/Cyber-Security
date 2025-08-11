const express = require("express");
const router = express.Router();
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");
const ScanHistory = require("./models/ScanHistory");
const { scanURL } = require("./scanners/googleSafeBrowsing");
const { checkOpenPhish } = require("./scanners/openPhish");
const { checkVirusTotal } = require("./scanners/virusTotal");

const HF_TOKEN = process.env.HUGGING_FACE;
const HF_MODEL = "ealvaradob/bert-finetuned-phishing";

// Protected scan endpoint
router.post("/scan", authMiddleware, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // Run all checks in parallel
    const [googleResult, openPhishResult, virusTotalResult] = await Promise.all(
      [scanURL(url), checkOpenPhish(url), checkVirusTotal(url)]
    );

    // Create scan record
    const scanRecord = {
      userId: req.user.id,
      scanType: "url",
      content: url,
      results: {
        googleSafeBrowsing: googleResult || null,
        openPhish: openPhishResult || null,
        virusTotal: virusTotalResult || null,
      },
    };

    // Save to history
    await ScanHistory.addScanRecord(scanRecord);

    res.json({
      url,
      googleSafeBrowsing: googleResult,
      openPhish: openPhishResult,
      virusTotal: virusTotalResult,
      timestamp: new Date().toISOString(),
      scannedBy: req.user.email,
    });
  } catch (error) {
    console.error("Scan error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/email-scan", authMiddleware, async (req, res) => {
  try {
    const { emailContent } = req.body;

    if (!emailContent) {
      return res.status(400).json({ error: "Email content is required" });
    }

    // Make request to Hugging Face API
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      { inputs: emailContent },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    // Process Hugging Face response
    const results = response.data;
    let isSpam = false;
    let confidence = 0;
    let label = "safe";
    let details = "No spam detected";

    if (Array.isArray(results) && results.length > 0) {
      const classification = results[0];

      const topLabel = classification.reduce((prev, curr) =>
        curr.score > prev.score ? curr : prev
      );

      label = topLabel.label.toLowerCase();
      isSpam = ["spam", "phishing"].includes(label);
      confidence = topLabel.score;

      details = isSpam
        ? `${label} detected with ${(confidence * 100).toFixed(1)}% confidence`
        : `Safe email (${label}) with ${(confidence * 100).toFixed(
            1
          )}% confidence`;
    }

    const scanRecord = {
      userId: req.user.id,
      scanType: "email",
      content: emailContent,
      results: {
        spamDetection: {
          isSpam: isSpam || false,
          label: label || "unknown",
          confidence: confidence || 0,
          details: details || "No details available",
        },
      },
    };

    await ScanHistory.addScanRecord(scanRecord);

    res.json({
      isSpam,
      label,
      confidence,
      details,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Email scan error:", error);

    let errorMessage = "Failed to scan email";
    let statusCode = 500;

    if (error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data.error || errorMessage;
    } else if (error.request) {
      errorMessage = "No response from spam detection service";
    }

    res.status(statusCode).json({ error: errorMessage });
  }
});

router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("User ID:::", userId);
    
    const history = await ScanHistory.getHistoryByUser(userId);

    console.log("History", history);

    // Format history for response
    const formattedHistory = history.map((record) => {
      if (record.scanType === "url") {
        const googleThreat =
          record.results.googleSafeBrowsing?.isThreat || false;
        const openPhishThreat = record.results.openPhish?.isPhish || false;
        const virusTotalThreat =
          record.results.virusTotal?.maliciousScore > 0 || false;

        return {
          id: record.id,
          type: "url",
          content: record.content,
          timestamp: record.timestamp,
          results: {
            threatDetected: googleThreat || openPhishThreat || virusTotalThreat,
            googleSafeBrowsing: record.results.googleSafeBrowsing,
            openPhish: record.results.openPhish,
            virusTotal: record.results.virusTotal,
          },
        };
      } else {
        return {
          id: record.id,
          type: "email",
          content: record.content,
          timestamp: record.timestamp,
          results: {
            threatDetected: record.results.spamDetection?.isSpam || false,
            spamDetection: record.results.spamDetection,
          },
        };
      }
    });

    res.json(formattedHistory);
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch scan history",
      details: error.message,
    });
  }
});

module.exports = router;
