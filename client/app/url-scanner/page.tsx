"use client";
import { useState } from "react";
import ScannerForm from "@/components/ScannerForm";
import ResultCard from "@/components/ResultCard";
import MetadataPanel from "@/components/MetadataPanel";

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
      const response = await fetch(
        "https://cyber-security-mjwz.onrender.com/api/scan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      if (!response.ok) {
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

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-6 text-white">
        URL Security Scanner
      </h1>

      <ScannerForm
        placeholder="Enter URL to scan for security threats"
        onScan={handleScan}
        isLoading={isScanning}
      />

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
          <div className="flex items-center text-red-400">
            <span className="font-medium">Error: {error}</span>
          </div>
        </div>
      )}

      {/* Results Display */}
      {scanResult && !isScanning && (
        <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      )}
    </div>
  );
}
