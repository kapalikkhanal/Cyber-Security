"use client";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

interface ScanResult {
  isSpam: boolean;
  confidence: number;
  details: string;
  timestamp: string;
}

interface ApiError {
  error: string;
}

export default function EmailScanner() {
  const [emailContent, setEmailContent] = useState<string>("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (): Promise<void> => {
    if (!emailContent.trim()) {
      setError("Please enter email content");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch("http://localhost:3001/api/email-scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ emailContent }),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || "Failed to scan email");
      }

      const data: ScanResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatConfidence = (confidence: number): string => {
    return (confidence * 100).toFixed(1) + "%";
  };

  const getRiskLevel = (
    confidence: number
  ): { level: string; color: string } => {
    if (confidence >= 0.9) return { level: "Very High", color: "text-red-400" };
    if (confidence >= 0.7) return { level: "High", color: "text-orange-400" };
    if (confidence >= 0.5) return { level: "Medium", color: "text-yellow-400" };
    return { level: "Low", color: "text-green-400" };
  };

  const getSpamType = (details: string): string => {
    const detailsLower = details.toLowerCase();
    if (detailsLower.includes("phishing")) return "Phishing";
    if (detailsLower.includes("malware")) return "Malware";
    if (detailsLower.includes("scam")) return "Scam";
    if (detailsLower.includes("promotional")) return "Promotional";
    return "Generic Spam";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold my-4 text-white">
              Email Security Scanner
            </h1>
            <p className="text-gray-400 text-lg">
              Advanced AI-powered spam and phishing detection
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
            <label className="block text-gray-300 mb-3 font-semibold">
              Email Content:
            </label>
            <textarea
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Paste your email content here to scan for spam, phishing, and other threats..."
              className="w-full h-64 p-4 bg-slate-700/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all duration-300"
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">
                {emailContent.length} characters
              </span>
              <button
                onClick={() => setEmailContent("")}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
              <div className="flex items-center">
                <span className="text-red-400 mr-2">⚠️</span>
                <p className="text-red-400 font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="flex justify-center mb-8">
            <button
              onClick={handleScan}
              disabled={loading || !emailContent.trim()}
              className={`px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center ${
                loading || !emailContent.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-cyan-400 hover:to-blue-400 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  Scan for Threats
                </>
              )}
            </button>
          </div>

          {result && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                Scan Results
              </h2>

              {/* Main Status Card */}
              <div
                className={`p-6 rounded-xl mb-6 border-2 ${
                  result.isSpam
                    ? "bg-red-500/10 border-red-500/30 shadow-red-500/20"
                    : "bg-emerald-500/10 border-emerald-500/30 shadow-emerald-500/20"
                } shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">
                      {result.isSpam ? "🚨" : "✅"}
                    </span>
                    <div>
                      <h3
                        className={`text-2xl font-bold ${
                          result.isSpam ? "text-red-400" : "text-emerald-400"
                        }`}
                      >
                        {result.isSpam ? "Threat Detected" : "Email is Safe"}
                      </h3>
                      {result.isSpam && (
                        <p className="text-gray-300 text-lg">
                          Type: {getSpamType(result.details)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-3xl font-mono ${
                        result.isSpam ? "text-red-400" : "text-emerald-400"
                      }`}
                    >
                      {formatConfidence(result.confidence)}
                    </div>
                    <p className="text-gray-400 text-sm">Confidence</p>
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {result.details}
                </p>
              </div>

              {/* Detailed Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-700/30 p-4 rounded-xl">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    Risk Level
                  </h4>
                  <p
                    className={`text-lg font-bold ${
                      getRiskLevel(result.confidence).color
                    }`}
                  >
                    {getRiskLevel(result.confidence).level}
                  </p>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-xl">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    Scan Time
                  </h4>
                  <p className="text-gray-300">
                    {new Date(result.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              {result.isSpam && (
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                  <h4 className="text-orange-400 font-semibold mb-2 flex items-center">
                    Recommendations
                  </h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Do not click any links in this email</li>
                    <li>• Do not download any attachments</li>
                    <li>• Do not reply or provide personal information</li>
                    <li>• Mark this email as spam and delete it</li>
                    <li>
                      • Report to your IT security team if in a corporate
                      environment
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
