'use client'
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
  FaStar,
  FaPlay,
  FaUsers,
  FaChartLine,
  FaBolt,
  FaGlobe,
} from "react-icons/fa";

export default function Home() {
  const features = [
    {
      icon: (
        <FaLink className="text-4xl mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300" />
      ),
      title: "URL Scanner",
      description:
        "Advanced real-time analysis of suspicious links using multiple threat intelligence sources",
      path: "/url-scanner",
      gradient: "from-blue-600 to-cyan-600",
      stats: "100+ URLs scanned",
      badge: "Real-time",
    },
    {
      icon: (
        <FaEnvelope className="text-4xl mb-4 text-white group-hover:text-purple-300 transition-colors duration-300" />
      ),
      title: "Email Analyzer",
      description:
        "AI-powered detection of sophisticated phishing attempts and malicious attachments",
      path: "/email-scanner",
      gradient: "from-purple-600 to-pink-600",
      stats: "1K+ emails analyzed",
      badge: "AI-Powered",
    },
    {
      icon: (
        <FaGraduationCap className="text-4xl mb-4 text-white group-hover:text-orange-300 transition-colors duration-300" />
      ),
      title: "Interactive Training",
      description:
        "Immersive scenarios based on real-world attacks to build security awareness",
      path: "/training",
      gradient: "from-orange-600 to-red-600",
      stats: "8+ scenarios",
      badge: "Interactive",
    },
    {
      icon: (
        <FaShieldAlt className="text-4xl mb-4 text-white group-hover:text-emerald-300 transition-colors duration-300" />
      ),
      title: "Security Dashboard",
      description:
        "Comprehensive threat intelligence and analytics with detailed reporting",
      path: "/dashboard",
      gradient: "from-green-600 to-teal-600",
      stats: "24/7 monitoring",
      badge: "Enterprise",
    },
  ];

  const stats = [
    {
      number: "1K+",
      label: "Threats Blocked",
      icon: <FaShieldAlt className="text-2xl text-emerald-400" />,
      trend: "+15% this month",
    },
    {
      number: "100+",
      label: "Users Protected",
      icon: <FaUsers className="text-2xl text-blue-400" />,
      trend: "+8% this month",
    },
    {
      number: "99.9%",
      label: "Detection Rate",
      icon: <FaChartLine className="text-2xl text-purple-400" />,
      trend: "Industry leading",
    },
    {
      number: "24/7",
      label: "Protection",
      icon: <FaGlobe className="text-2xl text-cyan-400" />,
      trend: "Always on",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CISO, TechCorp",
      content:
        "This platform has revolutionized our security awareness training. Our phishing click rates dropped by 80%.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Security Analyst",
      content:
        "The AI-powered email scanner caught threats our previous solution missed. Highly recommended.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "IT Director",
      content:
        "Easy to use, comprehensive reporting, and excellent threat detection. Perfect for our organization.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delay"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-float-slow"></div>

        {/* Gradient mesh */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-purple-900/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center pt-20 pb-16">
          {/* Announcement Banner */}
          <div className="mb-8 inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-semibold backdrop-blur-lg shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer group">
            <FaBolt className="mr-2 group-hover:text-yellow-400 transition-colors" />
            <span>New: Advanced AI Detection Engine</span>
            <div className="ml-2 px-2 py-1 bg-emerald-500/20 rounded-full text-xs text-emerald-200">
              BETA
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-200">
              Stay Safe from
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 animate-gradient-x">
              Cyber Threats
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Enterprise-grade protection against sophisticated phishing
            attacks, malicious URLs, and social engineering.{" "}
            <span className="text-emerald-400 font-semibold">
              Trusted by 100+ users worldwide.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/url-scanner"
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg rounded-xl overflow-hidden shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                Start Free Scan
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
            <Link
              href="/training"
              className="group px-8 py-4 border-2 border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/5 hover:border-white/40 transition-all duration-300 backdrop-blur-lg flex items-center"
            >
              Try Training Demo
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-white font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-emerald-400 font-medium">
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Comprehensive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Security Suite
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Advanced tools designed to protect you from the most sophisticated
              cyber threats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.path}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-gradient-to-br hover:from-white/10 hover:to-white/15 hover:border-white/20 transition-all duration-500 overflow-hidden hover:transform hover:scale-[1.02] hover:-translate-y-1"
              >
                {/* Background gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                ></div>

                {/* Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-300">
                  {feature.badge}
                </div>

                <div className="relative z-10">
                  <div className="mb-6 flex items-center">
                    <div className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 group-hover:border-white/30 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-400 font-medium">
                      {feature.stats}
                    </span>
                    <div className="flex items-center text-emerald-400 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm font-medium mr-2">Try now</span>
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Enhanced How It Works Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              How It{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Works
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Three simple steps to maximum protection against evolving cyber
              threats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <FaEye className="text-4xl text-emerald-400" />,
                title: "Scan & Submit",
                description:
                  "Upload suspicious URLs, emails, or files for comprehensive analysis using advanced threat detection algorithms and machine learning models.",
                features: [
                  "Real-time scanning",
                  "Multiple threat engines",
                  "Instant results",
                ],
              },
              {
                step: "02",
                icon: <FaBrain className="text-4xl text-cyan-400" />,
                title: "AI Analysis",
                description:
                  "Our machine learning models analyze thousands of threat indicators, behavioral patterns, and reputation data in milliseconds with 99.9% accuracy.",
                features: [
                  "ML-powered detection",
                  "Behavioral analysis",
                  "Pattern recognition",
                ],
              },
              {
                step: "03",
                icon: <FaCheck className="text-4xl text-purple-400" />,
                title: "Learn & Protect",
                description:
                  "Receive detailed threat reports, personalized recommendations, and actionable insights to strengthen your security posture.",
                features: [
                  "Detailed reports",
                  "Security insights",
                  "Training recommendations",
                ],
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 h-full">
                  <div className="flex items-center mb-6">
                    <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-600 mr-6">
                      {item.step}
                    </div>
                    <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 mb-6">
                    {item.description}
                  </p>

                  <ul className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-emerald-300"
                      >
                        <FaCheck className="mr-2 text-xs" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Enhanced connection line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-500/50 to-cyan-500/50 transform -translate-y-1/2 z-20">
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-y-1/2 animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Trusted by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Security Professionals
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              See what industry leaders say about our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:border-white/20 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center pb-20">
          <div className="relative bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 backdrop-blur-lg border border-emerald-500/20 rounded-3xl p-12 max-w-5xl mx-auto overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-3xl"></div>
            <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Ready to Secure Your Digital Life?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of users who trust our platform to protect them
                from evolving cyber threats.
                <span className="text-emerald-400 font-semibold">
                  {" "}
                  Start your free security assessment today.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link
                  href="/url-scanner"
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg rounded-xl hover:from-emerald-400 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/30"
                >
                  <FaShieldAlt className="mr-2" />
                  Get Protected Now
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/training"
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-lg"
                >
                  <FaPlay className="mr-2" />
                  Watch Demo
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
                <div className="flex items-center">
                  <FaCheck className="mr-1 text-emerald-400" />
                  Free trial available
                </div>
                <div className="flex items-center">
                  <FaCheck className="mr-1 text-emerald-400" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <FaCheck className="mr-1 text-emerald-400" />
                  24/7 support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-180deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(90deg);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
