import {
  FaGlobe,
  FaCalendarAlt,
  FaLock,
  FaMapMarkerAlt,
  FaSitemap,
} from "react-icons/fa";

export default function MetadataPanel({
  domain,
  age,
  sslValid,
  ipLocation,
  subdomains,
}: {
  domain: string;
  age: string;
  sslValid: boolean;
  ipLocation: string;
  subdomains: number;
}) {
  return (
    <div className="relative group">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

      <div className="relative bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:shadow-cyan-500/25 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6 group-hover:text-slate-100 transition-colors duration-300">
          🌐 Link Metadata
        </h2>

        <div className="space-y-4 text-sm">
          {/* Domain */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-slate-400">
              <FaGlobe className="mr-2 text-cyan-400" />
              Domain
            </div>
            <span className="font-medium text-slate-200">{domain}</span>
          </div>

          {/* Age */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-slate-400">
              <FaCalendarAlt className="mr-2 text-cyan-400" />
              Domain Age
            </div>
            <span className="font-medium text-slate-200">{age}</span>
          </div>

          {/* SSL */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-slate-400">
              <FaLock className="mr-2 text-cyan-400" />
              SSL Valid
            </div>
            <span className={sslValid ? 'text-emerald-400 font-medium' : 'text-red-400 font-medium'}>
              {sslValid ? 'Yes' : 'No'}
            </span>
          </div>

          {/* IP Location */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-slate-400">
              <FaMapMarkerAlt className="mr-2 text-cyan-400" />
              IP Location
            </div>
            <span className="font-medium text-slate-200">{ipLocation}</span>
          </div>

          {/* Subdomains */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-slate-400">
              <FaSitemap className="mr-2 text-cyan-400" />
              Subdomains
            </div>
            <span className={subdomains > 3 ? 'text-red-400 font-medium' : 'text-emerald-400 font-medium'}>
              {subdomains} {subdomains > 3 ? '(Suspicious)' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
