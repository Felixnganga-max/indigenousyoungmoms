import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Play,
  Star,
  Zap,
  Sparkles,
  Shield,
  Heart,
  CheckCircle,
} from "lucide-react";

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "events", label: "Events", href: "#events" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Minimal floating particles */}
      <div className="fixed top-0 left-0 w-full h-16 z-40 pointer-events-none overflow-hidden">
        <div
          className="absolute top-2 left-1/4 w-1 h-1 bg-emerald-300/20 rounded-full animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-3 right-1/3 w-0.5 h-0.5 bg-green-400/30 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-4 left-2/3 w-1 h-1 bg-teal-300/20 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gradient-to-r from-emerald-600/95 via-green-500/95 to-teal-600/95 backdrop-blur-xl border-b border-emerald-300/20 shadow-lg"
            : "bg-gradient-to-r from-emerald-500/90 via-green-400/90 to-teal-500/90 backdrop-blur-lg"
        }`}
        style={{
          backdropFilter: "blur(12px)",
          background: scrolled
            ? "linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(34, 197, 94, 0.95) 50%, rgba(20, 184, 166, 0.95) 100%)"
            : "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(34, 197, 94, 0.9) 50%, rgba(20, 184, 166, 0.9) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Compact Logo */}
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center transform transition-all duration-200 group-hover:scale-105 shadow-md">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full flex items-center justify-center border border-white">
                  <CheckCircle className="w-1.5 h-1.5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                  Indigenous Young Moms
                </span>
                <span className="text-xs text-gray-200/70 font-medium -mt-1">
                  Empowering communities
                </span>
              </div>
            </div>

            {/* Desktop Menu - Compact */}
            <div className="hidden md:flex items-center space-x-1 bg-black/5 backdrop-blur-sm rounded-full px-3 py-1.5 border border-emerald-200/20">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveItem(item.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeItem === item.id
                      ? "bg-emerald-400/80 text-white shadow-lg"
                      : "text-emerald-50 hover:text-white hover:bg-emerald-500/40"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Section - Compact */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Trust badge - smaller */}
              <div className="flex items-center space-x-1.5 bg-emerald-900/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-emerald-400/20">
                <Heart className="w-3 h-3 text-emerald-300 animate-pulse" />
                <span className="text-xs text-emerald-200 font-medium">
                  99.9%
                </span>
              </div>

              {/* Blue CTA Button */}
              {/* <button className="group relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:from-blue-400 hover:to-blue-500">
                <div className="flex items-center space-x-1.5">
                  <span>Start Journey</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </button> */}
              <button className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:from-blue-400 hover:to-blue-500">
                <div className="flex items-center space-x-1.5">
                  <span>My Account</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-emerald-200 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu - Compact */}
          <div
            className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${
              isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-4">
              <div className="mt-2 p-4 bg-gradient-to-br from-emerald-800/95 to-green-900/95 backdrop-blur-xl rounded-xl border border-emerald-400/20 shadow-lg">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeItem === item.id
                          ? "bg-emerald-500/90 text-white"
                          : "text-emerald-100 hover:text-white hover:bg-emerald-600/50"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}

                  <div className="pt-3 border-t border-emerald-600/30 mt-3">
                    <button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:from-blue-400 hover:to-blue-500 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>Start Journey</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </button>

                    {/* Trust indicators - compact */}
                    <div className="mt-3 flex items-center justify-center space-x-3 text-emerald-100 text-xs">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3 text-emerald-200" />
                        <span>Verified</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-emerald-200 animate-pulse" />
                        <span>99.9%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
