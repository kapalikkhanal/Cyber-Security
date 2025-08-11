"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "URL Scanner", path: "/url-scanner" },
    { name: "Email Scanner", path: "/email-scanner" },
    { name: "Training", path: "/training" },
  ];

  const authItems = isLoggedIn
    ? [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: <FaUserCog className="mr-2" />,
        },
        {
          name: "Logout",
          path: "#",
          onClick: () => {
            localStorage.removeItem("authToken");
            setIsLoggedIn(false);
            window.location.href = "/login";
          },
          icon: <FaSignOutAlt className="mr-2" />,
        },
      ]
    : [
        {
          name: "Login",
          path: "/login",
          icon: <FaSignInAlt className="mr-2" />,
        },
        { name: "Sign Up", path: "/signup", icon: <FaUser className="mr-2" /> },
      ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 rounded-lg">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
              </div>
              <div className="font-black text-2xl">
                <span className="text-white">Phish</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Guard
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="relative px-4 py-2 text-slate-300 hover:text-white font-medium transition-all duration-300 group rounded-lg hover:bg-white/5"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-3/4 transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {authItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={item.onClick}
                  className={`flex items-center px-4 py-2 font-medium rounded-lg transition-all duration-300 ${
                    item.name === "Sign Up"
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <Link
                href="/url-scanner"
                className="ml-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-lg hover:from-emerald-400 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              >
                Scan Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-white hover:text-emerald-400 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-slate-800/95 backdrop-blur-xl border-t border-white/10 px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 font-medium border border-transparent hover:border-white/10"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Links */}
            <div className="pt-2 space-y-2 border-t border-white/10">
              {authItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    if (item.onClick) item.onClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
                    item.name === "Sign Up"
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/url-scanner"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-lg hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 text-center"
              >
                Scan Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
