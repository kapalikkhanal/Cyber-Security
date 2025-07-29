import Link from "next/link";
import {
  FaShieldAlt,
  FaLink,
  FaEnvelope,
  FaGraduationCap,
  FaArrowRight,
  FaCheck,
  FaEye,
  FaBrain,
} from "react-icons/fa";

export default function Home() {
  const features = [
    {
      icon: (
        <FaLink className="text-4xl mb-4 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
      ),
      title: "URL Scanner",
      description:
        "Advanced real-time analysis of suspicious links and domains",
      path: "/url-scanner",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      icon: (
        <FaEnvelope className="text-4xl mb-4 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
      ),
      title: "Email Analyzer",
      description: "AI-powered detection of sophisticated phishing attempts",
      path: "/email-scanner",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: (
        <FaGraduationCap className="text-4xl mb-4 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
      ),
      title: "Interactive Training",
      description: "Immersive scenarios based on real-world attacks",
      path: "/training",
      gradient: "from-orange-600 to-red-600",
    },
    {
      icon: (
        <FaShieldAlt className="text-4xl mb-4 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
      ),
      title: "Security Dashboard",
      description: "Comprehensive threat intelligence and analytics",
      path: "/dashboard",
      gradient: "from-green-600 to-teal-600",
    },
  ];

  const stats = [
    { number: "1M+", label: "Threats Blocked" },
    { number: "50K+", label: "Users Protected" },
    { number: "99.8%", label: "Detection Rate" },
    { number: "24/7", label: "Protection" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center pt-20 pb-16">
          <div className="mb-8 inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium backdrop-blur-sm">
            <FaShieldAlt className="mr-2" />
            Advanced Threat Protection
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200 leading-tight">
            Stay Safe from{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse">
              Phishing
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Advanced AI-powered protection against sophisticated phishing
            attacks. Scan, analyze, and learn with enterprise-grade security
            tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/url-scanner"
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg rounded-xl hover:from-emerald-400 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 flex items-center"
            >
              Start Scanning
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/training"
              className="px-8 py-4 border-2 border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/5 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.path}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 text-center overflow-hidden hover:transform hover:scale-105 hover:-translate-y-2"
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
              ></div>

              <div className="relative z-10">
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <FaArrowRight className="text-emerald-400" />
              </div>
            </Link>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              How It{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Works
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Three simple steps to maximum protection against phishing threats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <FaEye className="text-3xl text-emerald-400" />,
                title: "Scan & Submit",
                description:
                  "Upload suspicious URLs, emails, or files for comprehensive analysis using advanced threat detection algorithms.",
              },
              {
                step: "02",
                icon: <FaBrain className="text-3xl text-cyan-400" />,
                title: "AI Analysis",
                description:
                  "Our machine learning models analyze thousands of threat indicators, behavioral patterns, and reputation data in milliseconds.",
              },
              {
                step: "03",
                icon: <FaCheck className="text-3xl text-purple-400" />,
                title: "Learn & Protect",
                description:
                  "Receive detailed threat reports, personalized recommendations, and actionable insights to strengthen your security posture.",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-700 mr-4">
                      {item.step}
                    </div>
                    <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/30">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Connection line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-500/50 to-cyan-500/50 transform -translate-y-1/2 z-20"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center pb-20">
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Secure Your Digital Life?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust our platform to protect them
              from evolving cyber threats.
            </p>
            <Link
              href="/url-scanner"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg rounded-xl hover:from-emerald-400 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25"
            >
              Get Protected Now
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
