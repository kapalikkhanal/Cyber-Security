import {
  FaGlobe,
  FaClock,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";

interface MetadataPanelProps {
  domain: string;
  scanTimestamp: string;
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
}

export default function MetadataPanel({
  domain,
  scanTimestamp,
  googleSafeBrowsing,
  openPhish,
  virusTotal,
}: MetadataPanelProps) {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTotalScanned = () => {
    return (
      virusTotal.harmless +
      virusTotal.maliciousScore +
      virusTotal.suspicious +
      virusTotal.undetected +
      virusTotal.timeout
    );
  };

  return (
    <div className="relative group">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

      <div className="relative bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:shadow-cyan-500/25 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6 group-hover:text-slate-100 transition-colors duration-300">
          🔍 Scan Details
        </h2>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-slate-400">
                <FaGlobe className="mr-2 text-cyan-400" />
                Domain
              </div>
              <span className="font-medium text-slate-200 break-all">
                {domain}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-slate-400">
                <FaClock className="mr-2 text-cyan-400" />
                Scan Time
              </div>
              <span className="font-medium text-slate-200 text-xs">
                {formatTimestamp(scanTimestamp)}
              </span>
            </div>
          </div>

          {/* Security Vendors */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Security Vendors
            </h3>

            {/* Google Safe Browsing */}
            <div className="mb-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaShieldAlt className="mr-2 text-cyan-400" />
                  <span className="font-medium text-slate-200">
                    Google Safe Browsing
                  </span>
                </div>
                <div className="flex items-center">
                  {googleSafeBrowsing.isThreat ? (
                    <FaTimesCircle className="text-red-400 mr-1" />
                  ) : (
                    <FaCheckCircle className="text-emerald-400 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      googleSafeBrowsing.isThreat
                        ? "text-red-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {googleSafeBrowsing.isThreat ? "Threat" : "Clean"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                {googleSafeBrowsing.details}
              </p>
            </div>

            {/* OpenPhish */}
            <div className="mb-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaSearch className="mr-2 text-cyan-400" />
                  <span className="font-medium text-slate-200">OpenPhish</span>
                </div>
                <div className="flex items-center">
                  {openPhish.isPhish ? (
                    <FaTimesCircle className="text-red-400 mr-1" />
                  ) : (
                    <FaCheckCircle className="text-emerald-400 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      openPhish.isPhish ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {openPhish.isPhish ? "Phishing" : "Clean"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Source: {openPhish.source}
              </p>
            </div>

            {/* VirusTotal */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FaShieldAlt className="mr-2 text-cyan-400" />
                  <span className="font-medium text-slate-200">VirusTotal</span>
                </div>
                <span className="text-xs text-slate-400">
                  {getTotalScanned()} vendors scanned
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Clean:</span>
                  <span className="text-emerald-400 font-medium">
                    {virusTotal.harmless}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Malicious:</span>
                  <span
                    className={`font-medium ${
                      virusTotal.maliciousScore > 0
                        ? "text-red-400"
                        : "text-slate-400"
                    }`}
                  >
                    {virusTotal.maliciousScore}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Suspicious:</span>
                  <span
                    className={`font-medium ${
                      virusTotal.suspicious > 0
                        ? "text-yellow-400"
                        : "text-slate-400"
                    }`}
                  >
                    {virusTotal.suspicious}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Undetected:</span>
                  <span className="text-slate-400 font-medium">
                    {virusTotal.undetected}
                  </span>
                </div>
                {virusTotal.timeout > 0 && (
                  <div className="flex justify-between col-span-2">
                    <span className="text-slate-400">Timeout:</span>
                    <span className="text-yellow-400 font-medium">
                      {virusTotal.timeout}
                    </span>
                  </div>
                )}
              </div>

              {/* VirusTotal Visual Bar */}
              <div className="mt-4">
                <div className="flex h-2 rounded-full overflow-hidden bg-white/10">
                  {virusTotal.harmless > 0 && (
                    <div
                      className="bg-emerald-500"
                      style={{
                        width: `${
                          (virusTotal.harmless / getTotalScanned()) * 100
                        }%`,
                      }}
                    />
                  )}
                  {virusTotal.maliciousScore > 0 && (
                    <div
                      className="bg-red-500"
                      style={{
                        width: `${
                          (virusTotal.maliciousScore / getTotalScanned()) * 100
                        }%`,
                      }}
                    />
                  )}
                  {virusTotal.suspicious > 0 && (
                    <div
                      className="bg-yellow-500"
                      style={{
                        width: `${
                          (virusTotal.suspicious / getTotalScanned()) * 100
                        }%`,
                      }}
                    />
                  )}
                  {virusTotal.undetected > 0 && (
                    <div
                      className="bg-slate-500"
                      style={{
                        width: `${
                          (virusTotal.undetected / getTotalScanned()) * 100
                        }%`,
                      }}
                    />
                  )}
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>Clean</span>
                  <span>Threats</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
