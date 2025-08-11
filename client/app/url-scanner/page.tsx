"use client";
import { useState } from "react";
import ScannerForm from "@/components/ScannerForm";
import ResultCard from "@/components/ResultCard";
import MetadataPanel from "@/components/MetadataPanel";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

interface ScanResult {
  url: string;
  googleSafeBrowsing: {
    isThreat: boolean;
    details: string;
  };
  openPhish: {
    isPhish: boolean;
    source: string;
  };
  virusTotal: {
    maliciousScore: number;
    harmless: number;
    suspicious: number;
    undetected: number;
    timeout: number;
  };
  timestamp: string;
}

export default function URLScanner() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (url: string) => {
    setIsScanning(true);
    setError(null);
    setScanResult(null);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const response = await fetch("http://localhost:3001/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized error (token expired/invalid)
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ScanResult = await response.json();
      setScanResult(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while scanning"
      );
    } finally {
      setIsScanning(false);
    }
  };

  // Calculate overall threat status based on scan results
  const calculateThreatStatus = (
    result: ScanResult
  ): "Safe" | "Warning" | "Danger" => {
    if (result.googleSafeBrowsing.isThreat || result.openPhish.isPhish) {
      return "Danger";
    }

    const { maliciousScore, suspicious } = result.virusTotal;
    if (maliciousScore > 0 || suspicious > 5) {
      return "Danger";
    } else if (
      suspicious > 0 ||
      (maliciousScore === 0 && result.virusTotal.harmless < 10)
    ) {
      return "Warning";
    }

    return "Safe";
  };

  // Calculate confidence score
  const calculateConfidence = (result: ScanResult): number => {
    const { harmless, maliciousScore, suspicious, undetected } =
      result.virusTotal;
    const total = harmless + maliciousScore + suspicious + undetected;

    if (total === 0) return 50; // Default if no data

    if (
      result.googleSafeBrowsing.isThreat ||
      result.openPhish.isPhish ||
      maliciousScore > 0
    ) {
      return Math.min(95, 80 + maliciousScore * 3);
    }

    if (suspicious > 0) {
      return Math.max(30, 70 - suspicious * 5);
    }

    // Safe calculation
    const safetyScore = (harmless / total) * 100;
    return Math.min(95, Math.max(60, safetyScore));
  };

  // Generate red flags based on scan results
  const generateRedFlags = (result: ScanResult): string[] => {
    const flags: string[] = [];

    if (result.googleSafeBrowsing.isThreat) {
      flags.push(`Google Safe Browsing: ${result.googleSafeBrowsing.details}`);
    }

    if (result.openPhish.isPhish) {
      flags.push(`OpenPhish detected this as a phishing site`);
    }

    const { maliciousScore, suspicious } = result.virusTotal;
    if (maliciousScore > 0) {
      flags.push(
        `VirusTotal: ${maliciousScore} security vendor(s) flagged as malicious`
      );
    }

    if (suspicious > 0) {
      flags.push(
        `VirusTotal: ${suspicious} security vendor(s) marked as suspicious`
      );
    }

    if (result.virusTotal.timeout > 0) {
      flags.push(
        `VirusTotal: ${result.virusTotal.timeout} vendor(s) timed out during analysis`
      );
    }

    return flags;
  };

  // Extract domain from URL for metadata
  const extractDomain = (url: string): string => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  // Get status colors and icons
  const getStatusInfo = (status: "Safe" | "Warning" | "Danger") => {
    switch (status) {
      case "Safe":
        return {
          icon: "🛡️",
          color: "text-emerald-400",
          bgColor: "bg-emerald-500/10",
          borderColor: "border-emerald-500/30",
          shadowColor: "shadow-emerald-500/20",
        };
      case "Warning":
        return {
          icon: "⚠️",
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/30",
          shadowColor: "shadow-yellow-500/20",
        };
      case "Danger":
        return {
          icon: "🚨",
          color: "text-red-400",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          shadowColor: "shadow-red-500/20",
        };
    }
  };

  const formatConfidence = (confidence: number): string => {
    return confidence.toFixed(1) + "%";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold mb-4 text-white">
              URL Security Scanner
            </h1>
            <p className="text-gray-400 text-lg">
              Comprehensive threat analysis powered by multiple security engines
            </p>
          </div>

          {/* Scanner Form Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
            <ScannerForm
              placeholder="Enter URL to scan for security threats (e.g., https://example.com)"
              onScan={handleScan}
              isLoading={isScanning}
            />
          </div>

          {/* Loading State */}
          {isScanning && (
            <div className="mb-8 flex flex-col items-center">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                <div className="animate-spin h-12 w-12 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Analyzing URL Security...
                </h3>
                <p className="text-gray-400">
                  Checking against multiple threat databases
                </p>
                <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-500">
                  <span>• Google Safe Browsing</span>
                  <span>• VirusTotal</span>
                  <span>• OpenPhish</span>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center">
                <span className="text-red-400 mr-3 text-xl">⚠️</span>
                <div>
                  <h4 className="text-red-400 font-semibold mb-1">
                    Error Occurred
                  </h4>
                  <p className="text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {scanResult && !isScanning && (
            <div className="space-y-6">
              {/* URL Info Bar */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-3">🔗</span>
                  Scanned URL
                </h2>
                <div className="bg-slate-700/50 p-4 rounded-xl">
                  <p className="text-cyan-400 font-mono text-lg break-all">
                    {scanResult.url}
                  </p>
                  <p className="text-gray-400 mt-2">
                    Domain:{" "}
                    <span className="text-white">
                      {extractDomain(scanResult.url)}
                    </span>
                  </p>
                  <p className="text-gray-400">
                    Scanned:{" "}
                    <span className="text-white">
                      {new Date(scanResult.timestamp).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              {/* Main Security Status */}
              <div
                className={`p-6 rounded-2xl border-2 shadow-lg ${
                  getStatusInfo(calculateThreatStatus(scanResult)).bgColor
                } ${
                  getStatusInfo(calculateThreatStatus(scanResult)).borderColor
                } ${
                  getStatusInfo(calculateThreatStatus(scanResult)).shadowColor
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-4xl mr-4">
                      {getStatusInfo(calculateThreatStatus(scanResult)).icon}
                    </span>
                    <div>
                      <h3
                        className={`text-3xl font-bold ${
                          getStatusInfo(calculateThreatStatus(scanResult)).color
                        }`}
                      >
                        {calculateThreatStatus(scanResult) === "Safe" &&
                          "URL is Safe"}
                        {calculateThreatStatus(scanResult) === "Warning" &&
                          "Potential Threat"}
                        {calculateThreatStatus(scanResult) === "Danger" &&
                          "Threat Detected"}
                      </h3>
                      <p className="text-gray-300 text-lg">
                        Security analysis complete
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-4xl font-mono ${
                        getStatusInfo(calculateThreatStatus(scanResult)).color
                      }`}
                    >
                      {formatConfidence(calculateConfidence(scanResult))}
                    </div>
                    <p className="text-gray-400">Confidence</p>
                  </div>
                </div>

                {/* Red Flags */}
                {generateRedFlags(scanResult).length > 0 && (
                  <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                    <h4 className="text-red-400 font-semibold mb-2 flex items-center">
                      <span className="mr-2">🚩</span>
                      Security Concerns
                    </h4>
                    <ul className="space-y-1">
                      {generateRedFlags(scanResult).map((flag, index) => (
                        <li key={index} className="text-red-300 text-sm">
                          • {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Detailed Results Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResultCard
                  title="Security Analysis"
                  status={calculateThreatStatus(scanResult)}
                  confidence={calculateConfidence(scanResult)}
                  redFlags={generateRedFlags(scanResult)}
                />

                <MetadataPanel
                  domain={extractDomain(scanResult.url)}
                  scanTimestamp={scanResult.timestamp}
                  googleSafeBrowsing={scanResult.googleSafeBrowsing}
                  openPhish={scanResult.openPhish}
                  virusTotal={scanResult.virusTotal}
                />
              </div>

              {/* Security Engines Status */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-3">⚙️</span>
                  Security Engine Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Google Safe Browsing */}
                  <div className="bg-slate-700/30 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <span className="mr-2">🟢</span>
                      <h4 className="font-semibold text-white">
                        Google Safe Browsing
                      </h4>
                    </div>
                    <p
                      className={`text-sm ${
                        scanResult.googleSafeBrowsing.isThreat
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {scanResult.googleSafeBrowsing.isThreat
                        ? "Threat Detected"
                        : "No Threats"}
                    </p>
                    {scanResult.googleSafeBrowsing.details && (
                      <p className="text-xs text-gray-400 mt-1">
                        {scanResult.googleSafeBrowsing.details}
                      </p>
                    )}
                  </div>

                  {/* OpenPhish */}
                  <div className="bg-slate-700/30 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <span className="mr-2">🎣</span>
                      <h4 className="font-semibold text-white">OpenPhish</h4>
                    </div>
                    <p
                      className={`text-sm ${
                        scanResult.openPhish.isPhish
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {scanResult.openPhish.isPhish
                        ? "Phishing Detected"
                        : "No Phishing"}
                    </p>
                    {scanResult.openPhish.source && (
                      <p className="text-xs text-gray-400 mt-1">
                        Source: {scanResult.openPhish.source}
                      </p>
                    )}
                  </div>

                  {/* VirusTotal */}
                  <div className="bg-slate-700/30 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <span className="mr-2">🦠</span>
                      <h4 className="font-semibold text-white">VirusTotal</h4>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Malicious:</span>
                        <span
                          className={
                            scanResult.virusTotal.maliciousScore > 0
                              ? "text-red-400"
                              : "text-green-400"
                          }
                        >
                          {scanResult.virusTotal.maliciousScore}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Suspicious:</span>
                        <span
                          className={
                            scanResult.virusTotal.suspicious > 0
                              ? "text-yellow-400"
                              : "text-green-400"
                          }
                        >
                          {scanResult.virusTotal.suspicious}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Harmless:</span>
                        <span className="text-green-400">
                          {scanResult.virusTotal.harmless}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {calculateThreatStatus(scanResult) !== "Safe" && (
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6">
                  <h4 className="text-orange-400 font-semibold mb-4 flex items-center text-lg">
                    <span className="mr-3">💡</span>
                    Security Recommendations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        Do not enter personal information on this site
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        Avoid downloading files from this URL
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        Do not proceed if your browser shows warnings
                      </li>
                    </ul>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        Report this URL to your IT security team
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        Consider using additional security tools
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        Verify the URL source before visiting
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
