const express = require("express");
const router = express.Router();
const { scanURL } = require("./scanners/googleSafeBrowsing");
const { checkOpenPhish } = require("./scanners/phishTank");
const { checkVirusTotal } = require("./scanners/virusTotal");

// Combined scan endpoint
router.post("/scan", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Run all checks in parallel
    const [googleResult, openPhishResult, virusTotalResult] = await Promise.all(
      [scanURL(url), checkOpenPhish(url), checkVirusTotal(url)]
      // [checkOpenPhish(url)]
    );

    res.json({
      url,
      googleSafeBrowsing: googleResult,
      openPhish: openPhishResult,
      virusTotal: virusTotalResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
