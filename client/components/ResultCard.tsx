import ThreatIndicator from "./ThreatIndicator";
import {
  FaShieldAlt,
  FaExclamationTriangle,
  FaSkull,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
} from "react-icons/fa";

export default function ResultCard({
  title,
  status,
  confidence,
  redFlags,
}: {
  title: string;
  status: "Safe" | "Warning" | "Danger";
  confidence: number;
  redFlags: string[];
}) {
  const statusConfig = {
    Safe: {
      colors: "from-emerald-500/20 to-green-500/20",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      icon: <FaShieldAlt className="text-xl" />,
      glow: "shadow-emerald-500/25",
    },
    Warning: {
      colors: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      textColor: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      icon: <FaExclamationTriangle className="text-xl" />,
      glow: "shadow-yellow-500/25",
    },
    Danger: {
      colors: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      textColor: "text-red-400",
      bgColor: "bg-red-500/10",
      icon: <FaSkull className="text-xl" />,
      glow: "shadow-red-500/25",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="group relative">
      {/* Background glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.colors} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      <div
        className={`relative bg-white/5 backdrop-blur-xl border ${config.borderColor} rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:${config.glow} shadow-2xl`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-slate-100 transition-colors duration-300">
              {title}
            </h2>
            <p className="text-slate-400 text-sm">Security Analysis Result</p>
          </div>

          {/* Status Badge */}
          <div
            className={`flex items-center space-x-3 px-4 py-3 ${config.bgColor} backdrop-blur-sm border ${config.borderColor} rounded-xl`}
          >
            <div className={`${config.textColor}`}>{config.icon}</div>
            <span className={`font-bold text-lg ${config.textColor}`}>
              {status}
            </span>
          </div>
        </div>

        {/* Threat Indicator */}
        <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
          <ThreatIndicator confidence={confidence} />
        </div>

        {/* Red Flags Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <FaInfoCircle className="text-cyan-400 mr-3" />
            <h3 className="text-lg font-bold text-white">Security Analysis</h3>
          </div>

          <div className="space-y-3">
            {redFlags.length > 0 ? (
              redFlags.map((flag, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm group/flag hover:bg-red-500/15 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 p-2 bg-red-500/20 rounded-full mr-4 group-hover/flag:bg-red-500/30 transition-colors duration-300">
                    <FaTimesCircle className="text-red-400 text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-200 font-medium leading-relaxed group-hover/flag:text-white transition-colors duration-300">
                      {flag}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-start p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl backdrop-blur-sm hover:bg-emerald-500/15 transition-all duration-300">
                <div className="flex-shrink-0 p-2 bg-emerald-500/20 rounded-full mr-4">
                  <FaCheckCircle className="text-emerald-400 text-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-200 font-medium leading-relaxed">
                    No suspicious indicators detected
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    This content appears to be legitimate
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Danger Warning */}
        {status === "Danger" && (
          <div className="relative overflow-hidden p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent animate-pulse"></div>

            <div className="relative flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-red-500/20 rounded-full animate-pulse">
                <FaExclamationTriangle className="text-red-400 text-xl" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-red-400 text-lg mb-2">
                  ⚠️ Critical Security Alert
                </h4>
                <p className="text-slate-200 font-medium leading-relaxed mb-2">
                  High probability of phishing attempt detected
                </p>
                <p className="text-slate-400 text-sm">
                  Do not interact with this content. Report as suspicious and
                  delete immediately.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message for Safe Status */}
        {status === "Safe" && (
          <div className="p-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-emerald-500/20 rounded-full">
                <FaShieldAlt className="text-emerald-400 text-xl" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-emerald-400 text-lg mb-2">
                  ✅ Content Verified Safe
                </h4>
                <p className="text-slate-200 font-medium leading-relaxed mb-2">
                  No threats detected in security analysis
                </p>
                <p className="text-slate-400 text-sm">
                  This content passed all security checks and appears
                  legitimate.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Warning Message for Warning Status */}
        {status === "Warning" && (
          <div className="p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 bg-yellow-500/20 rounded-full animate-pulse">
                <FaExclamationTriangle className="text-yellow-400 text-xl" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-yellow-400 text-lg mb-2">
                  ⚡ Proceed with Caution
                </h4>
                <p className="text-slate-200 font-medium leading-relaxed mb-2">
                  Some suspicious indicators detected
                </p>
                <p className="text-slate-400 text-sm">
                  Exercise caution when interacting with this content. Verify
                  authenticity before proceeding.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
