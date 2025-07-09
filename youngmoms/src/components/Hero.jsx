import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Heart,
  BookOpen,
  Users,
  MessageCircle,
  Shield,
} from "lucide-react";
import heroImage from "../assets/hero.jpg";
import heroImage1 from "../assets/hero1.jpg";
import heroImage2 from "../assets/hero2.jpg";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const images = [heroImage, heroImage1, heroImage2];

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setImagesLoaded(true); // Still show component even if some images fail
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Loading state */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-50">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            {/* <p className="text-lg">Loading heritage images...</p> */}
          </div>
        </div>
      )}

      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Heritage ${index + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
          <Shield className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">UNESCO Heritage Project</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block">Conservation</span>
          <span className="block text-yellow-400">Initiative</span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Preserving Heritage, Empowering Communities, Protecting Future
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
          Reviving the endangered{" "}
          <span className="font-bold text-yellow-400">Yaakunte language</span>{" "}
          through innovative technology while preserving Yaaku cultural heritage
          and empowering indigenous communities in{" "}
          <span className="font-bold text-yellow-400">Mukogodo Forest</span>.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-300 shadow-lg flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            <a href="/contact">Support Our Mission</a>
          </button>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 transition-all duration-300 flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5" />
            <a href="/contact"> Learn Yaakunte</a>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-8 h-8 text-yellow-400 mr-2" />
              <div className="text-4xl md:text-5xl font-bold text-yellow-400">
                8,000+
              </div>
            </div>
            <div className="text-sm md:text-base opacity-90">
              Yaaku People Served
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <MessageCircle className="w-8 h-8 text-red-400 mr-2" />
              <div className="text-4xl md:text-5xl font-bold text-red-400">
                1
              </div>
            </div>
            <div className="text-sm md:text-base opacity-90">
              Fluent Speaker Remaining
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-8 h-8 text-green-400 mr-2" />
              <div className="text-4xl md:text-5xl font-bold text-green-400">
                74K
              </div>
            </div>
            <div className="text-sm md:text-base opacity-90">
              Acres Under Protection
            </div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-yellow-400 scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  );
};

export default Hero;
