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
  Sparkles,
  Leaf,
  Mountain,
  Sun,
  Moon,
  Wind,
  BookOpen,
  Zap,
  Camera,
  Music,
  Compass,
  MapPin,
} from "lucide-react";
import heroImage from "../assets/hero.jpg";
import heroImage1 from "../assets/hero1.jpg";
import heroImage2 from "../assets/hero2.jpg";
import { assets } from "../assets/assets";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [currentDesign, setCurrentDesign] = useState(0);

  // Determine design based on hour with randomization
  useEffect(() => {
    const hour = new Date().getHours();
    const designs = [0, 1, 2];
    const randomOffset = Math.floor(Math.random() * 3);
    const selectedDesign = designs[(hour + randomOffset) % 3];
    setCurrentDesign(selectedDesign);
  }, []);

  // All hero images for all designs
  const allHeroImages = {
    design1: [heroImage, heroImage2, heroImage1],
    design2: [
      heroImage,
      heroImage1,
      heroImage2,
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format",
    ],
    design3: [
      heroImage1,
      heroImage2,
      heroImage,
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?w=1920&h=1080&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&h=1080&fit=crop&auto=format",
    ],
  };

  const currentImages = allHeroImages[`design${currentDesign + 1}`];

  // Optimized image preloading with priority and lazy loading
  useEffect(() => {
    const preloadImages = async () => {
      // Preload first image immediately
      const firstImage = new Image();
      firstImage.onload = () => {
        setLoadedImages((prev) => ({ ...prev, 0: true }));
        setImagesLoaded(true); // Show content as soon as first image loads
      };
      firstImage.src = currentImages[0];

      // Preload remaining images with slight delay to prioritize first image
      setTimeout(() => {
        currentImages.slice(1).forEach((src, index) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages((prev) => ({ ...prev, [index + 1]: true }));
          };
          img.src = src;
        });
      }, 100);
    };

    preloadImages();
  }, [currentDesign]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentImages.length, imagesLoaded]);

  const scrollProgress = Math.min(scrollY / (window.innerHeight * 0.6), 1);
  const parallaxOffset = scrollY * 0.15;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + currentImages.length) % currentImages.length
    );
  };

  // Design 1: Original Professional Design
  const Design1 = () => (
    <section className="relative min-h-screen overflow-hidden">
      {/* Loading State */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          </div>
        </div>
      )}

      {/* Hero Background Images */}
      <div className="absolute inset-0 z-0">
        {currentImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex && imagesLoaded
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              backgroundImage: loadedImages[index] ? `url(${image})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              transform: `translateY(${parallaxOffset}px) scale(1.05)`,
            }}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      {imagesLoaded && (
        <>
          <div className="hidden lg:flex absolute top-1/2 left-8 transform -translate-y-1/2 z-20">
            <button
              onClick={prevImage}
              className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 group-hover:text-blue-300 transition-colors" />
            </button>
          </div>
          <div className="hidden lg:flex absolute top-1/2 right-8 transform -translate-y-1/2 z-20">
            <button
              onClick={nextImage}
              className="group bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 group-hover:text-blue-300 transition-colors" />
            </button>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-24">
          <div className="max-w-5xl mx-auto lg:mx-0 lg:ml-0 text-center lg:text-left rounded-3xl p-8 border border-white/10 lg:mr-auto lg:max-w-3xl">
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

      {/* Image Indicators */}
      {imagesLoaded && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
          {currentImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-blue-400 scale-125 shadow-md"
                  : "bg-white/30 hover:bg-white/50 hover:scale-110"
              }`}
            />
          ))}
        </div>
      )}

      <div className="hidden sm:block absolute bottom-8 right-12 z-10">
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center items-start pt-2 backdrop-blur-sm bg-white/5">
          <div className="w-1 h-3 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );

  // Design 2: Vibrant Artistic Design
  const Design2 = () => (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20 z-5"></div>

      {/* Loading State */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          </div>
        </div>
      )}

      {/* Hero Background Images */}
      <div className="absolute inset-0 z-0">
        {currentImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
              index === currentImageIndex && imagesLoaded
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
            style={{
              backgroundImage: loadedImages[index] ? `url(${image})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              transform: `translateY(${parallaxOffset}px) scale(1.08)`,
              filter: "brightness(0.8) contrast(1.1) saturate(1.2)",
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Artistic Navigation */}
      {imagesLoaded && (
        <>
          <div className="hidden lg:flex absolute top-1/2 left-8 transform -translate-y-1/2 z-20">
            <button
              onClick={prevImage}
              className="group bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 backdrop-blur-md border border-pink-300/30 hover:border-pink-300/50 text-white p-4 rounded-2xl transition-all duration-300 hover:scale-110 shadow-xl"
            >
              <ChevronLeft className="w-6 h-6 group-hover:text-pink-300 transition-colors" />
            </button>
          </div>
          <div className="hidden lg:flex absolute top-1/2 right-8 transform -translate-y-1/2 z-20">
            <button
              onClick={nextImage}
              className="group bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 backdrop-blur-md border border-pink-300/30 hover:border-pink-300/50 text-white p-4 rounded-2xl transition-all duration-300 hover:scale-110 shadow-xl"
            >
              <ChevronRight className="w-6 h-6 group-hover:text-pink-300 transition-colors" />
            </button>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-pink-300/30 rounded-full px-10 py-5 mb-16 shadow-2xl">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
                <span className="font-bold text-white text-base">
                  Cultural Renaissance
                </span>
              </div>
              <div className="w-px h-6 bg-pink-300/30"></div>
              <div className="flex items-center space-x-3">
                <Mountain className="w-6 h-6 text-purple-400 animate-pulse" />
                <span className="font-bold text-pink-100 text-base">
                  Ancient Wisdom
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-12 leading-tight tracking-tight">
              <span className="block mb-3">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  Awakening Ancient
                </span>
              </span>
              <span className="block mb-3">
                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Voices of Wisdom
                </span>
              </span>
              <span className="block">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Through Innovation
                </span>
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-pink-100 mb-16 max-w-5xl mx-auto leading-relaxed font-light">
              Where ancient{" "}
              <span className="text-orange-300 font-bold">
                Yaakunte traditions
              </span>{" "}
              meet cutting-edge technology, creating a bridge between worlds to
              preserve the soul of{" "}
              <span className="text-cyan-300 font-bold">Mukogodo heritage</span>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-8 mb-24 justify-center">
              <a
                href="/missions"
                className="group relative bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-4"
              >
                <Sparkles className="w-6 h-6 relative group-hover:rotate-12 transition-transform" />
                <span className="relative">Join the Renaissance</span>
                <ArrowRight className="w-6 h-6 relative group-hover:translate-x-2 transition-transform" />
              </a>
              <a
                href="/contact"
                className="group relative bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-4"
              >
                <Music className="w-6 h-6 relative group-hover:scale-110 transition-transform" />
                <span className="relative">Experience Yaakunte</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {[
                {
                  number: "8,000+",
                  label: "Cultural Guardians",
                  icon: Users,
                  gradient: "from-pink-400 to-purple-400",
                  bg: "from-pink-500/10 to-purple-500/10",
                  border: "border-pink-400/30",
                },
                {
                  number: "1",
                  label: "Living Legend",
                  icon: Heart,
                  gradient: "from-orange-400 to-pink-400",
                  bg: "from-orange-500/10 to-pink-500/10",
                  border: "border-orange-400/30",
                },
                {
                  number: "74K",
                  label: "Sacred Acres",
                  icon: Trees,
                  gradient: "from-cyan-400 to-blue-400",
                  bg: "from-cyan-500/10 to-blue-500/10",
                  border: "border-cyan-400/30",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${stat.bg} backdrop-blur-md border-2 ${stat.border} rounded-2xl p-10 text-center transform hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-3xl`}
                >
                  <div className="flex justify-center mb-6">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div
                    className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-pink-100 font-bold text-base leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Artistic Indicators */}
      {imagesLoaded && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex space-x-6">
          {currentImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                index === currentImageIndex
                  ? "bg-gradient-to-r from-pink-400 to-purple-400 scale-150 shadow-xl"
                  : "bg-white/40 hover:bg-pink-300/60 hover:scale-125"
              }`}
            />
          ))}
        </div>
      )}

      <div className="hidden sm:block absolute bottom-12 right-16 z-10">
        <div className="w-8 h-12 border-2 border-pink-300/40 rounded-full flex justify-center items-start pt-3 backdrop-blur-sm bg-gradient-to-b from-pink-500/10 to-purple-500/10">
          <div className="w-2 h-4 bg-gradient-to-b from-pink-400 to-purple-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );

  // Design 3: Minimalist Nature Design
  const Design3 = () => (
    <section className="relative min-h-screen overflow-hidden">
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-teal-900/10 to-green-900/10 z-5"></div>

      {/* Loading State */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          </div>
        </div>
      )}

      {/* Hero Background Images */}
      <div className="absolute inset-0 z-0">
        {currentImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              index === currentImageIndex && imagesLoaded
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              backgroundImage: loadedImages[index] ? `url(${image})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              transform: `translateY(${parallaxOffset}px) scale(1.02)`,
              filter: "brightness(0.9) contrast(1.05)",
            }}
          />
        ))}
      </div>

      {/* Organic Floating Elements */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        <div className="absolute top-32 left-16 w-2 h-2 bg-emerald-400/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-64 right-24 w-3 h-3 bg-teal-400/60 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-green-400/60 rounded-full animate-ping delay-2000"></div>
      </div>

      {/* Minimalist Navigation */}
      {imagesLoaded && (
        <>
          <div className="hidden lg:flex absolute top-1/2 left-12 transform -translate-y-1/2 z-20">
            <button
              onClick={prevImage}
              className="group bg-white/5 hover:bg-emerald-500/10 backdrop-blur-sm border border-emerald-300/20 hover:border-emerald-300/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 group-hover:text-emerald-300 transition-colors" />
            </button>
          </div>
          <div className="hidden lg:flex absolute top-1/2 right-12 transform -translate-y-1/2 z-20">
            <button
              onClick={nextImage}
              className="group bg-white/5 hover:bg-emerald-500/10 backdrop-blur-sm border border-emerald-300/20 hover:border-emerald-300/40 text-white p-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 group-hover:text-emerald-300 transition-colors" />
            </button>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-24">
          <div className="max-w-4xl mx-auto text-center lg:text-left">
            <div className="inline-flex items-center space-x-4 bg-white/5 backdrop-blur-sm border border-emerald-300/20 rounded-full px-6 py-3 mb-12">
              <div className="flex items-center space-x-2">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-white text-sm">
                  Living Heritage
                </span>
              </div>
              <div className="w-px h-4 bg-emerald-300/20"></div>
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-teal-400" />
                <span className="font-medium text-emerald-100 text-sm">
                  Natural Harmony
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mb-10 leading-tight tracking-wide text-white">
              <span className="block mb-2">
                <span className="text-emerald-200">Rooted in Tradition,</span>
              </span>
              <span className="block mb-2">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-medium">
                  Growing with Purpose
                </span>
              </span>
              <span className="block">
                <span className="text-green-200">Flourishing Together</span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-emerald-100 mb-12 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-light">
              Nurturing the ancient{" "}
              <span className="text-teal-300 font-normal">
                Yaakunte language
              </span>{" "}
              with gentle innovation while honoring the natural wisdom of{" "}
              <span className="text-green-300 font-normal">
                Mukogodo Forest
              </span>{" "}
              communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-20 justify-center lg:justify-start">
              <a
                href="/missions"
                className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 text-base"
              >
                <Leaf className="w-4 h-4 relative group-hover:rotate-12 transition-transform" />
                <span className="relative">Cultivate Change</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="group relative bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 text-base"
              >
                <BookOpen className="w-4 h-4 relative" />
                <span className="relative">Learn Naturally</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto lg:mx-0">
              {[
                {
                  number: "8,000+",
                  label: "Community Members",
                  icon: Users,
                  color: "text-emerald-400",
                  bg: "from-emerald-500/5 to-emerald-600/5",
                  border: "border-emerald-400/20",
                },
                {
                  number: "1",
                  label: "Elder Voice",
                  icon: Heart,
                  color: "text-teal-400",
                  bg: "from-teal-500/5 to-teal-600/5",
                  border: "border-teal-400/20",
                },
                {
                  number: "74K",
                  label: "Protected Acres",
                  icon: Trees,
                  color: "text-green-400",
                  bg: "from-green-500/5 to-green-600/5",
                  border: "border-green-400/20",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${stat.bg} backdrop-blur-sm border ${stat.border} rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-md`}
                >
                  <div className="flex justify-center mb-3">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div
                    className={`text-xl sm:text-2xl font-semibold ${stat.color} mb-1`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-emerald-200 font-normal text-sm leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Indicators */}
      {imagesLoaded && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {currentImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-emerald-400 scale-125"
                  : "bg-white/30 hover:bg-emerald-300/50 hover:scale-110"
              }`}
            />
          ))}
        </div>
      )}

      <div className="hidden sm:block absolute bottom-8 right-12 z-10">
        <div className="w-6 h-10 border border-emerald-300/20 rounded-full flex justify-center items-start pt-2 backdrop-blur-sm bg-emerald-500/5">
          <div className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );

  // Render the selected design
  const designs = [Design1, Design2, Design3];
  const SelectedDesign = designs[currentDesign];

  return <SelectedDesign />;
};

export default Hero;
