const axios = require("axios");
const { URL } = require("url");

const normalizeUrl = (inputUrl) => {
  try {
    const parsed = new URL(inputUrl);
    return parsed.origin + parsed.pathname;
  } catch {
    return inputUrl.trim();
  }
};

const checkOpenPhish = async (url) => {
  try {
    const response = await axios.get("https://openphish.com/feed.txt");
    const maliciousUrls = response.data.split("\n").map(normalizeUrl);
    const normalizedUrl = normalizeUrl(url);
    const isPhish = maliciousUrls.includes(normalizedUrl);
    return {
      isPhish,
      source: "OpenPhish",
    };
  } catch (error) {
    return { error: "Failed to fetch OpenPhish data" };
  }
};

const checkURLScan = async (url) => {
  try {
    const scanRes = await axios.post(
      "https://urlscan.io/api/v1/scan/",
      { url },
      {
        headers: {
          "API-Key": process.env.URLSCAN_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const resultAPI = scanRes.data.api; // This gives us the result API URL

    // Wait for scan to complete (e.g., 10 seconds)
    await new Promise((r) => setTimeout(r, 10000));

    const resultRes = await axios.get(resultAPI);
    const isPhish =
      resultRes.data.verdicts?.overall?.malicious ||
      resultRes.data.verdicts?.overall?.score > 0;

    return {
      isPhish,
      details: resultRes.data.verdicts.overall,
    };
  } catch (error) {
    return {
      error: "URLScan.io failed",
      details: error.response?.data || error.message,
    };
  }
};

module.exports = { checkOpenPhish, checkURLScan };
