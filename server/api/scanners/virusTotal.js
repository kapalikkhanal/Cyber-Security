const axios = require('axios');

// Encode URL in base64 as required by VirusTotal v3
const encodeURL = (url) => {
  return Buffer.from(url).toString('base64').replace(/=/g, '');
};

const checkVirusTotal = async (url) => {
  const encodedUrl = encodeURL(url);
  const headers = {
    'x-apikey': process.env.VIRUSTOTAL_API_KEY,
  };

  try {
    // Submit URL for analysis
    const submitResponse = await axios.post(
      'https://www.virustotal.com/api/v3/urls',
      new URLSearchParams({ url }),
      { headers }
    );

    const analysisId = submitResponse.data.data.id;

    // Poll the analysis result
    for (let i = 0; i < 5; i++) {
      const resultResponse = await axios.get(
        `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
        { headers }
      );

      const status = resultResponse.data.data.attributes.status;

      if (status === 'completed') {
        const stats = resultResponse.data.data.attributes.stats;
        return {
          maliciousScore: stats.malicious,
          harmless: stats.harmless,
          suspicious: stats.suspicious,
          undetected: stats.undetected,
          timeout: stats.timeout,
        };
      }

      // Wait 3 seconds before retrying
      await new Promise((res) => setTimeout(res, 3000));
    }

    return { error: 'Analysis not completed in time.' };
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

module.exports = { checkVirusTotal };
