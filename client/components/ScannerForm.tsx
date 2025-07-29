"use client";
import { useState } from "react";
import { FaSearch, FaSpinner, FaShieldAlt } from "react-icons/fa";

export default function ScannerForm({
  placeholder,
  onScan,
  isLoading = false,
}: {
  placeholder: string;
  onScan: (input: string) => Promise<unknown>;
  isLoading?: boolean;
}) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await onScan(input);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative group">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div
          className={`relative bg-white/10 backdrop-blur-xl border rounded-2xl transition-all duration-300 shadow-2xl ${
            isFocused
              ? "border-emerald-500/50 shadow-emerald-500/25"
              : "border-white/20"
          }`}
        >
          <div className="flex items-center p-2">
            {/* Input container */}
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                <FaSearch
                  className={`transition-colors duration-300 ${
                    isFocused ? "text-emerald-400" : "text-slate-400"
                  }`}
                />
              </div>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && input.trim() && !isLoading) {
                    handleSubmit(e);
                  }
                }}
                placeholder={placeholder}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-slate-400 text-lg font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />

              {/* Animated underline */}
              <div
                className={`absolute bottom-2 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 transform origin-left transition-transform duration-300 ${
                  isFocused ? "scale-x-100" : "scale-x-0"
                }`}
              ></div>
            </div>

            {/* Scan button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className={`relative overflow-hidden px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group/button ${
                !isLoading && input.trim()
                  ? "hover:from-emerald-400 hover:to-cyan-400 hover:scale-105 hover:shadow-emerald-500/25"
                  : ""
              }`}
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>

              <div className="relative flex items-center space-x-2">
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <FaShieldAlt />
                    <span>Scan</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Security indicator */}
        <div className="flex items-center justify-center mt-4 text-sm text-slate-400">
          <FaShieldAlt className="mr-2 text-emerald-400" />
          <span>Powered by Google Safe Browsing, OpenPhish & VirusTotal</span>
        </div>
      </div>

      {/* Enhanced visual feedback */}
      {isLoading && (
        <div className="mt-8 flex flex-col items-center">
          <div className="relative">
            {/* Animated scanning rings */}
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 relative">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 animate-spin"></div>
              <div
                className="absolute inset-2 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-white font-medium text-lg mb-1">
              Security Analysis in Progress
            </p>
            <p className="text-slate-400 text-sm">
              Checking multiple threat databases...
            </p>
          </div>

          {/* Progress indicators */}
          <div className="mt-6 w-full max-w-md">
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Google Safe Browsing</span>
              <span>OpenPhish</span>
              <span>VirusTotal</span>
            </div>
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: "2s",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
