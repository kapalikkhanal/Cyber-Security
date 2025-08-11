"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

interface HistoryItem {
  id: string;
  url: string;
  timestamp: string;
  results: {
    threatDetected: boolean;
  };
  type: string;
  content: string;
}

export default function ScanHistoryPage() {
  const { authToken } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/history", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchHistory();
    }
  }, [authToken]);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <ProtectedRoute>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl min-h-screen mx-auto pt-16">
          <h1 className="text-3xl font-bold mb-6 text-white">Scan History</h1>

          {loading && (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
              <div className="flex items-center text-red-400">
                <span className="font-medium">Error: {error}</span>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              {history.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  No scan history found
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <span
                              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                item.results.threatDetected
                                  ? "bg-red-500"
                                  : "bg-emerald-500"
                              }`}
                            ></span>
                            <span className="text-xs font-mono text-slate-400">
                              {item.type.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-white truncate">{item.content}</p>
                          <p className="text-slate-400 text-sm mt-1">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="ml-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              item.results.threatDetected
                                ? "bg-red-500/20 text-red-400"
                                : "bg-emerald-500/20 text-emerald-400"
                            }`}
                          >
                            {item.results.threatDetected
                              ? "Threat Detected"
                              : "Safe"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
