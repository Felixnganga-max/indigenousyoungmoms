import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Star,
  ChevronLeft,
  ChevronRight,
  Trees,
  Users,
  Globe,
} from "lucide-react";
import { assets } from "../assets/assets";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Placeholder hero images - replace with your actual image1
  const heroImages = [assets.heroImage, assets.heroImage2, assets.heroImage1];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Improved parallax calculations
  const scrollProgress = Math.min(scrollY / (window.innerHeight * 0.8), 1);
  const parallaxOffset = scrollY * 0.2;
  const contentOpacity = Math.max(0, 1 - scrollProgress * 1.5);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-800 via-purple-900 to-slate-700">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:50px_50px] animate-pulse"></div>
        </div>

        {/* Hero Background Images Slider */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-20" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                transform: `translateY(${parallaxOffset}px) scale(1.1)`,
              }}
            />
          ))}
        </div>

        {/* Reduced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/2 via-purple-500/1 to-black/1 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/1 via-transparent to-black/1 z-[1]" />

        {/* Image Navigation - Improved positioning */}
        <div className="hidden lg:flex absolute top-1/2 left-6 transform -translate-y-1/2 z-20">
          <button
            onClick={prevImage}
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hover:border-white/40"
          >
            <ChevronLeft className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>

        <div className="hidden lg:flex absolute top-1/2 right-6 transform -translate-y-1/2 z-20">
          <button
            onClick={nextImage}
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hover:border-white/40"
          >
            <ChevronRight className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
            <div
              className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left"
              style={{ opacity: contentOpacity }}
            >
              {/* Enhanced Badge */}
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-purple-400/30 rounded-full px-6 py-3 mb-8 shadow-2xl">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                  <span className="font-semibold text-sm text-white">
                    Yaaku Indigenous Tribe
                  </span>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <div className="flex items-center space-x-2">
                  <Trees className="w-4 h-4 text-green-400" />
                  <span className="font-medium text-sm text-gray-200">
                    Mukogodo Forest
                  </span>
                </div>
              </div>

              {/* Main Heading with Animation */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-[0.9] text-white">
                <span className="block animate-fade-in-up">
                  <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                    Preserve
                  </span>
                </span>
                <span
                  className="block animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Revive
                  </span>
                </span>
                <span
                  className="block animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Thrive
                  </span>
                </span>
              </h1>

              {/* Enhanced Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-light">
                Reviving the endangered{" "}
                <span className="text-cyan-400 font-semibold">
                  Yaakunte language
                </span>{" "}
                and preserving Yaaku culture while empowering indigenous young
                mothers in{" "}
                <span className="text-green-400 font-semibold">
                  Mukogodo Forest
                </span>
                .
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center lg:justify-start">
                <button className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3 text-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  <span className="relative">Support Our Mission</span>
                  <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="group relative bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3 text-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  <Play className="w-5 h-5 relative" />
                  <span className="relative">Learn Yaakunte</span>
                </button>
              </div>

              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto lg:mx-0">
                {[
                  {
                    number: "8,000",
                    label: "Yaaku People",
                    icon: Users,
                    gradient: "from-cyan-400 to-blue-500",
                    bg: "from-cyan-500/10 to-blue-500/10",
                  },
                  {
                    number: "1",
                    label: "Fluent Speaker Left",
                    icon: Globe,
                    gradient: "from-red-400 to-orange-500",
                    bg: "from-red-500/10 to-orange-500/10",
                  },
                  {
                    number: "74K",
                    label: "Acres Protected",
                    icon: Trees,
                    gradient: "from-green-400 to-emerald-500",
                    bg: "from-green-500/10 to-emerald-500/10",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${stat.bg} backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-2xl`}
                  >
                    <div className="flex justify-center mb-3">
                      <stat.icon
                        className={`w-8 h-8 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                      />
                    </div>
                    <div
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-gray-300 font-medium text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image Indicators - Better positioning */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-gradient-to-r from-cyan-400 to-purple-400 scale-125 shadow-lg"
                  : "bg-white/40 hover:bg-white/60 hover:scale-110"
              }`}
            />
          ))}
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="hidden sm:block absolute bottom-6 right-8 animate-bounce z-10">
          <div className="w-8 h-12 border-2 border-gradient-to-b from-cyan-400 to-purple-400 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <div className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Improved Second Section */}
      <section className="bg-gradient-to-b from-slate-900 via-gray-900 to-black min-h-screen relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Saving an Ancient Culture
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              From the last fluent speaker to AI-powered language
              revival—preserving{" "}
              <span className="text-cyan-400 font-semibold">Yaakunte</span> for
              future generations
            </p>

            {/* Enhanced Progress Indicator */}
            <div className="mb-16 max-w-md mx-auto">
              <div className="text-gray-400 mb-4 font-medium">
                Cultural Revival Progress
              </div>
              <div className="relative">
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-1000 rounded-full shadow-lg"
                    style={{ width: `${Math.min(65, 100)}%` }}
                  />
                </div>
                <div className="text-cyan-400 font-bold mt-3">
                  65% Language Documentation Complete
                </div>
              </div>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  title: "Language Revival",
                  gradient: "from-purple-500 to-pink-500",
                  icon: "🗣️",
                  description:
                    "AI-powered Yaakunte learning app with Mr. Leriman Leitiko, the last fluent speaker",
                  accent: "border-purple-400/30",
                },
                {
                  title: "Forest Protection",
                  gradient: "from-green-500 to-emerald-500",
                  icon: "🌳",
                  description:
                    "Safeguarding 74,000 acres of Mukogodo Forest—Eastern Africa's largest indigenous forest",
                  accent: "border-green-400/30",
                },
                {
                  title: "Sustainable Livelihoods",
                  gradient: "from-cyan-500 to-blue-500",
                  icon: "🍯",
                  description:
                    "Yaaku Sica honey project and traditional knowledge-based income for young mothers",
                  accent: "border-cyan-400/30",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border ${item.accent} hover:border-opacity-60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-2xl`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} mx-auto mb-6 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default Hero;
