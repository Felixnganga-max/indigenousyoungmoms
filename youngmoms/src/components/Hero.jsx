import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Star,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { assets } from "../assets/assets"; // Your hero image import

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Add your hero images here - you can replace these with your actual images
  const heroImages = [
    assets.heroImage, // Your existing hero image
    assets.heroImage2 || assets.heroImage, // Add your second image
    assets.heroImage3 || assets.heroImage, // Add your third image
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Calculate how much of the image to reveal based on scroll
  const baseVisibility = 92;
  const scrollProgress = Math.min(scrollY / (window.innerHeight * 1.5), 1);
  const revealPercentage = baseVisibility + scrollProgress * 8; // Reduced from 50 to 8 to prevent overflow

  // Calculate parallax offset - moves slower than scroll
  const parallaxOffset = scrollY * 0.3; // Reduced from 0.5 to 0.3

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  return (
    <section className="relative h-[200vh] overflow-hidden bg-black">
      {/* Hero Background Images Slider */}
      <div className="fixed inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              clipPath: `inset(${Math.max(0, 100 - revealPercentage)}% 0 0 0)`,
              transform: `translateY(${parallaxOffset}px)`,
              backgroundPosition: "center center",
            }}
          />
        ))}
      </div>

      {/* Image Navigation Buttons */}
      <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-20">
        <button
          onClick={prevImage}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-20">
        <button
          onClick={nextImage}
          className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Image Indicators - Only visible in hero section */}
      <div
        className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 transition-opacity duration-300"
        style={{
          opacity: scrollY < window.innerHeight ? 1 : 0,
          pointerEvents: scrollY < window.innerHeight ? "auto" : "none",
        }}
      >
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Left Side Overlay for Text Visibility - Reduced opacity by half */}
      <div className="fixed inset-0 bg-gradient-to-r from-black/40 via-black/25 to-transparent z-[1]" />

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-start min-h-screen">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            {/* Badge - UPDATED for Yaaku */}
            <div className="inline-flex items-center space-x-2 bg-black/70 backdrop-blur-md border border-purple-500/40 rounded-full px-5 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="font-medium text-sm text-white">
                Yaaku Indigenous Tribe • Mukogodo Forest
              </span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>

            {/* Main Heading - UPDATED for Cultural Preservation */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white">
              <span className="block">Preserve</span>
              <span className="block">Revive</span>
              <span className="block">Thrive</span>
            </h1>

            {/* Subtitle - UPDATED for Yaaku Mission */}
            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl leading-relaxed font-medium">
              Reviving the endangered Yaakunte language and preserving Yaaku
              culture while empowering indigenous young mothers in Mukogodo
              Forest. Protecting 74,000 acres of ancestral forest and building
              sustainable livelihoods through traditional knowledge.
            </p>

            {/* CTA Buttons - UPDATED for Yaaku Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <span>Support Our Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Learn Yaakunte</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - UPDATED for Yaaku Statistics */}
      <div className="absolute bottom-20 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-900/80 via-blue-900/60 to-cyan-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-8 max-w-4xl">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  8,000
                </div>
                <div className="text-gray-200 font-medium text-sm">
                  Yaaku People
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                  1
                </div>
                <div className="text-gray-200 font-medium text-sm">
                  Fluent Speaker Left
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-magenta-400 bg-clip-text text-transparent">
                  74K
                </div>
                <div className="text-gray-200 font-medium text-sm">
                  Acres Protected
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-transparent rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Next Section - UPDATED for Yaaku Focus with solid black background */}
      <div className="absolute top-[100vh] left-0 right-0 z-20 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Saving an Ancient Culture
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              From the last fluent speaker to AI-powered language revival -
              preserving Yaakunte for future generations while empowering Yaaku
              mothers through sustainable forest-based livelihoods
            </p>

            {/* Visual Progress Indicator */}
            <div className="mb-12">
              <div className="text-sm text-gray-400 mb-2">
                Cultural Revival Progress
              </div>
              <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-100"
                  style={{ width: `${Math.min(revealPercentage, 100)}%` }}
                />
              </div>
              <div className="text-sm text-gray-400 mt-2">
                {Math.round(Math.min(revealPercentage, 100))}% Language
                Documentation Complete
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  title: "Language Revival",
                  color: "from-purple-500 to-magenta-500",
                  icon: "🗣️",
                  description:
                    "AI-powered Yaakunte learning app and documentation with the last fluent speaker, Mr. Leriman Leitiko",
                },
                {
                  title: "Forest Protection",
                  color: "from-green-500 to-yellow-500",
                  icon: "🌳",
                  description:
                    "Safeguarding 74,000 acres of Mukogodo Forest - one of Eastern Africa's largest indigenous forests",
                },
                {
                  title: "Sustainable Livelihoods",
                  color: "from-cyan-500 to-blue-500",
                  icon: "🍯",
                  description:
                    "Yaaku Sica honey project, agroecology, and traditional knowledge-based income for young mothers",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} mx-auto mb-4 flex items-center justify-center text-2xl`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
