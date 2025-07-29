"use client";
import { useState } from "react";
import ScannerForm from "@/components/ScannerForm";
import ResultCard from "@/components/ResultCard";
import { analyzeEmail } from "@/app/utils/api";

export default function EmailScanner() {
  const [scanResult, setScanResult] = useState<{
    status: "Safe" | "Warning" | "Danger";
    confidence: number;
    redFlags: string[];
    highlightedContent: string;
  } | null>(null);

  const handleScan = async (emailContent: string) => {
    const result = await analyzeEmail(emailContent);
    setScanResult(result);
    return result;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-3">
          📧 Email Threat Analyzer
        </h1>
        <p className="text-slate-400">
          Paste suspicious email content below to check for phishing or scam
          attempts.
        </p>
      </div>

      {/* Scanner Form */}
      <div className="mb-10">
        <ScannerForm
          placeholder="Paste email content here..."
          onScan={handleScan}
          isTextArea={true}
        />
      </div>

      {/* Results Section */}
      {scanResult && (
        <div className="space-y-10">
          <ResultCard
            title="Email Analysis Result"
            status={scanResult.status}
            confidence={scanResult.confidence}
            redFlags={scanResult.redFlags}
          />

          {/* Highlighted Email Content */}
          <div className="relative group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-8 shadow-2xl transition hover:bg-white/10 hover:shadow-indigo-500/25">
              <h3 className="text-xl font-bold text-white mb-4">
                🔍 Suspicious Content Found
              </h3>
              <div className="bg-white/10 p-6 rounded-xl border border-white/10 text-slate-200 whitespace-pre-line">
                {scanResult.highlightedContent ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: scanResult.highlightedContent,
                    }}
                  />
                ) : (
                  <p className="text-slate-400">
                    No suspicious content detected
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
