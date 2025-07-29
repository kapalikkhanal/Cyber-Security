const axios = require('axios');

const scanURL = async (url) => {
  try {
    console.log(process.env.GOOGLE_SAFE_BROWSING_API_KEY)
    const response = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_API_KEY}`,
      {
        client: { clientId: "phishguard", clientVersion: "1.0" },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url }]
        }
      }
    );
    
    return {
      isThreat: response.data.matches?.length > 0 || false,
      details: response.data.matches || "No threats found"
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { scanURL };