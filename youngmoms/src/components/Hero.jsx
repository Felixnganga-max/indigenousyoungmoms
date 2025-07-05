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
  Award,
  Shield,
  Heart,
} from "lucide-react";
import { assets } from "../assets/assets";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hero images array
  const heroImages = [assets.heroImage, assets.heroImage2, assets.heroImage1];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set loaded state immediately
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Refined parallax calculations
  const scrollProgress = Math.min(scrollY / (window.innerHeight * 0.6), 1);
  const parallaxOffset = scrollY * 0.15;

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
      <section className="relative min-h-screen overflow-hidden">
        {/* Hero Background Images Slider - NO OVERLAY */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              } ${
                index === 0 && !isLoaded
                  ? "opacity-100"
                  : index !== currentImageIndex
                  ? "transition-opacity duration-2000 ease-in-out"
                  : "transition-opacity duration-2000 ease-in-out"
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                transform: `translateY(${parallaxOffset}px) scale(1.05)`,
              }}
            />
          ))}
        </div>

        {/* Professional Navigation Controls */}
        <div className="hidden lg:flex absolute top-1/2 left-8 transform -translate-y-1/2 z-20">
          <button
            onClick={prevImage}
            className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 group-hover:text-blue-300 transition-colors" />
          </button>
        </div>

        <div className="hidden lg:flex absolute top-1/2 right-8 transform -translate-y-1/2 z-20">
          <button
            onClick={nextImage}
            className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 group-hover:text-blue-300 transition-colors" />
          </button>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-24">
            <div className="max-w-5xl mx-auto lg:mx-0 lg:ml-0 text-center lg:text-left  rounded-3xl p-8 border border-white/10 lg:mr-auto lg:max-w-3xl">
              {/* Professional Badge */}
              <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 mb-12 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="font-semibold text-white text-sm">
                    UNESCO Heritage Project
                  </span>
                </div>
                <div className="w-px h-5 bg-white/20"></div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="font-medium text-gray-200 text-sm">
                    Conservation Initiative
                  </span>
                </div>
              </div>

              {/* Refined Main Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight text-white tracking-tight">
                <span className="block mb-2">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                    Preserving Heritage,
                  </span>
                </span>
                <span className="block mb-2">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    Empowering Communities
                  </span>
                </span>
                <span className="block">
                  <span className="bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Protecting Future
                  </span>
                </span>
              </h1>

              {/* Professional Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto lg:mx-0 leading-relaxed font-light">
                Reviving the endangered{" "}
                <span className="text-cyan-300 font-medium">
                  Yaakunte language
                </span>{" "}
                through innovative technology while preserving Yaaku cultural
                heritage and empowering indigenous communities in{" "}
                <span className="text-green-300 font-medium">
                  Mukogodo Forest
                </span>
                .
              </p>

              {/* Professional CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 mb-20 justify-center lg:justify-start">
                <a
                  href="/missions"
                  className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-xl flex items-center justify-center space-x-3 text-base"
                >
                  <span className="relative">Support Our Mission</span>
                  <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/contact"
                  className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-xl flex items-center justify-center space-x-3 text-base"
                >
                  <Play className="w-5 h-5 relative" />
                  <span className="relative">Learn Yaakunte</span>
                </a>
              </div>

              {/* Professional Impact Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto lg:mx-0">
                {[
                  {
                    number: "8,000+",
                    label: "Yaaku People Served",
                    icon: Users,
                    color: "text-blue-400",
                    bg: "from-blue-500/5 to-blue-600/5",
                    border: "border-blue-400/20",
                  },
                  {
                    number: "1",
                    label: "Fluent Speaker Remaining",
                    icon: Heart,
                    color: "text-red-400",
                    bg: "from-red-500/5 to-red-600/5",
                    border: "border-red-400/20",
                  },
                  {
                    number: "74K",
                    label: "Acres Under Protection",
                    icon: Trees,
                    color: "text-green-400",
                    bg: "from-green-500/5 to-green-600/5",
                    border: "border-green-400/20",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${stat.bg} backdrop-blur-md border ${stat.border} rounded-xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg`}
                  >
                    <div className="flex justify-center mb-4">
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div
                      className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-2`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-gray-300 font-medium text-sm leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Refined Image Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-blue-400 scale-125 shadow-md"
                  : "bg-white/30 hover:bg-white/50 hover:scale-110"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Professional Scroll Indicator */}
        <div className="hidden sm:block absolute bottom-8 right-12 z-10">
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center items-start pt-2 backdrop-blur-sm bg-white/5">
            <div className="w-1 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Second Section */}
      <section className="bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 min-h-screen relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <div className="text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Preserving Ancient Wisdom for Tomorrow
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
              From the last fluent speaker to cutting-edge AI
              technology—safeguarding{" "}
              <span className="text-cyan-300 font-medium">Yaakunte</span> and
              ensuring cultural continuity for future generations
            </p>

            {/* Professional Progress Indicator */}
            <div className="mb-20 max-w-lg mx-auto">
              <div className="text-gray-400 mb-6 font-medium text-sm">
                Language Documentation & Revival Progress
              </div>
              <div className="relative">
                <div className="w-full h-2 bg-gray-800 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transition-all duration-1000 rounded-full"
                    style={{ width: "68%" }}
                  />
                </div>
                <div className="text-cyan-300 font-semibold mt-4 text-sm">
                  68% Documentation Complete
                </div>
              </div>
            </div>

            {/* Professional Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
              {[
                {
                  title: "Language Preservation",
                  icon: "🎓",
                  description:
                    "Advanced AI-powered learning platform developed with Mr. Leriman Leitiko, preserving linguistic heritage through technology",
                  accent: "border-blue-400/20 hover:border-blue-400/40",
                  iconBg: "from-blue-500 to-blue-600",
                },
                {
                  title: "Environmental Conservation",
                  icon: "🌲",
                  description:
                    "Protecting 74,000 acres of Mukogodo Forest—Eastern Africa's largest indigenous forest ecosystem",
                  accent: "border-green-400/20 hover:border-green-400/40",
                  iconBg: "from-green-500 to-green-600",
                },
                {
                  title: "Community Empowerment",
                  icon: "🏘️",
                  description:
                    "Sustainable livelihood programs including Yaaku Sica honey project, supporting young mothers and families",
                  accent: "border-amber-400/20 hover:border-amber-400/40",
                  iconBg: "from-amber-500 to-amber-600",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group bg-white/5 backdrop-blur-md rounded-xl p-8 border ${item.accent} transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.iconBg} mx-auto mb-6 flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
