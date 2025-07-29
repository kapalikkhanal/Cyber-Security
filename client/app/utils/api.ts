// Types
export type ScanResult = {
  status: "Safe" | "Warning" | "Danger";
  confidence: number;
  redFlags: string[];
  domain: string;
  age: string;
  sslValid: boolean;
  ipLocation: string;
  subdomains: number;
  whois: string;
};

// Phishing detection rules
const PHISHING_INDICATORS = [
  // Domain patterns
  {
    pattern: /(paypa1|paypai|pypal)\./i,
    weight: 0.8,
    flag: "Spoofed brand name",
  },
  {
    pattern: /-\w{4,12}-login\./i,
    weight: 0.6,
    flag: "Suspicious subdomain structure",
  },
  { pattern: /\.(tk|ml|ga|cf|gq)$/i, weight: 0.5, flag: "High-risk TLD" },

  // URL structures
  { pattern: /@(?!mail\.|support\.)/, weight: 0.7, flag: "Hidden redirect" },
  {
    pattern: /:\/\/(\d{1,3}\.){3}\d{1,3}/,
    weight: 0.6,
    flag: "Raw IP address",
  },
  { pattern: /%[0-9a-f]{2}/i, weight: 0.4, flag: "URL encoding detected" },

  // Common phishing keywords
  {
    pattern: /(verify|security|update|account|suspended)/i,
    weight: 0.3,
    flag: "Urgency keywords",
  },
];

// Mock database of known phishing domains
const KNOWN_PHISHING_DOMAINS = [
  "paypa1-login.com",
  "facebook-secure.net",
  "amaz0n-verify.org",
  "appleid-reset.xyz",
];

// Helper functions
const extractDomain = (url: string): string => {
  try {
    const domain = new URL(url.startsWith("http") ? url : `https://${url}`)
      .hostname;
    return domain.replace("www.", "");
  } catch {
    return url.split("/")[0];
  }
};

const calculateDomainAge = (domain: string): string => {
  // In a real app, you would use WHOIS API here
  const isNew = Math.random() > 0.7 || KNOWN_PHISHING_DOMAINS.includes(domain);
  return isNew ? "Less than 3 months" : "Over 1 year";
};

// Main scanning function
export const scanURL = async (url: string): Promise<ScanResult> => {
  const domain = extractDomain(url);
  const redFlags: string[] = [];
  let confidence = 0;

  console.log(domain);

  // Check against known phishing domains
  if (KNOWN_PHISHING_DOMAINS.includes(domain)) {
    redFlags.push("Known phishing domain");
    confidence = 95;
  }

  // Apply detection rules
  PHISHING_INDICATORS.forEach((indicator) => {
    if (indicator.pattern.test(url)) {
      redFlags.push(indicator.flag);
      confidence += indicator.weight * 100;
    }
  });

  // Cap confidence at 100%
  confidence = Math.min(100, Math.max(0, confidence));

  // Determine status
  let status: "Safe" | "Warning" | "Danger" = "Safe";
  if (confidence > 70) status = "Danger";
  else if (confidence > 30) status = "Warning";

  // Generate mock WHOIS data
  const whoisData = `
    Domain: ${domain}
    Registrar: ${confidence > 50 ? "Unknown" : "GoDaddy"}
    Created: ${
      new Date(Date.now() - (confidence > 50 ? 86400000 * 30 : 86400000 * 365))
        .toISOString()
        .split("T")[0]
    }
    Country: ${confidence > 50 ? "Panama" : "United States"}
  `;

  return {
    status,
    confidence: Math.round(confidence),
    redFlags,
    domain,
    age: calculateDomainAge(domain),
    sslValid: confidence < 60,
    ipLocation: confidence > 50 ? "Offshore" : "Domestic",
    subdomains: domain.split(".").length - 1,
    whois: whoisData,
  };
};

export const analyzeEmail = async (content: string) => {
  const phishingKeywords = [
    { term: "urgent", weight: 0.3 },
    { term: "verify", weight: 0.4 },
    { term: "suspended", weight: 0.5 },
    { term: "click here", weight: 0.6 },
    { term: "account", weight: 0.2 },
    { regex: /(http|https):\/\/[^\s]+/g, weight: 0.7 },
  ];

  let confidence = 0;
  const redFlags: string[] = [];
  let highlightedContent = content;

  // Check for keywords
  phishingKeywords.forEach(({ term, weight, regex }) => {
    const pattern = regex || new RegExp(term, "gi");
    const matches = content.match(pattern);

    if (matches) {
      confidence += matches.length * weight * 100;
      redFlags.push(
        `Suspicious term: ${typeof term === "string" ? term : "link"}`
      );

      // Highlight matches in content
      highlightedContent = highlightedContent.replace(
        pattern,
        (match) => `<span class="bg-yellow-200 font-semibold">${match}</span>`
      );
    }
  });

  // Check for generic greetings
  if (/dear (customer|user|valued)/i.test(content)) {
    confidence += 20;
    redFlags.push("Generic greeting");
  }

  confidence = Math.min(100, confidence);

  return {
    status: confidence > 60 ? "Danger" : confidence > 30 ? "Warning" : "Safe",
    confidence: Math.round(confidence),
    redFlags,
    highlightedContent,
  };
};
