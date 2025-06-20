import React, { useState, useEffect } from "react";
import { ArrowRight, Play, Star, Zap } from "lucide-react";
import { assets } from "../assets/assets"; // Your hero image import

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate how much of the image to reveal based on scroll
  // Start at 50% visible, reveal more as we scroll down
  const baseVisibility = 92; // Start with 50% of image visible
  const scrollProgress = Math.min(scrollY / (window.innerHeight * 1.5), 1);
  const revealPercentage = baseVisibility + scrollProgress * 50; // Goes from 50% to 100%

  // Calculate parallax offset - moves slower than scroll
  const parallaxOffset = scrollY * 0.5;

  return (
    <section className="relative h-[200vh] overflow-hidden">
      {/* Your Hero Background Image with Scroll Reveal Effect */}
      <div
        className="fixed inset-0 bg-no-repeat bg-cover bg-center transition-all duration-100 ease-out"
        style={{
          backgroundImage: `url(${assets.heroImage})`,
          clipPath: `inset(${100 - revealPercentage}% 0 0 0)`,
          transform: `translateY(${parallaxOffset}px)`,
          backgroundPosition: "center 20px", // Move image down 20px
        }}
      />

      {/* Left Side Overlay for Text Visibility */}
      <div className="fixed inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-[1]" />

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-start min-h-screen">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-purple-500/40 rounded-full px-5 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="font-medium text-sm text-white">
                Empowering Young Mothers in Kenya
              </span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>

            {/* Main Heading - Simple Black Text */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white">
              <span className="block">Nurture</span>
              <span className="block">Grow</span>
              <span className="block">Thrive</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl leading-relaxed font-medium">
              Supporting young mothers across Kenya through sustainable
              nutrition, community networks, and family empowerment programs.
              Building stronger communities, one mother at a time.
            </p>

            {/* CTA Buttons - Orange and Blue, Minimalistic */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <span>Join Our Program</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Watch Stories</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Color Gradient Background */}
      <div className="absolute bottom-20 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-900/80 via-blue-900/60 to-cyan-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-8 max-w-4xl">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  2,500+
                </div>
                <div className="text-gray-200 font-medium text-sm">
                  Young Mothers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                  47
                </div>
                <div className="text-gray-200 font-medium text-sm">
                  Counties
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-magenta-400 bg-clip-text text-transparent">
                  12K+
                </div>
                <div className="text-gray-200 font-medium text-sm">
                  Children Impacted
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

      {/* Next Section to Show Scroll Effect */}
      <div className="absolute top-[100vh] left-0 right-0 z-20 bg-gradient-to-b from-gray-900/95 via-black/90 to-black min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Transforming Lives in Kenya
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Supporting young mothers through nutrition education, sustainable
              farming, and community-driven solutions that strengthen families
            </p>

            {/* Visual Progress Indicator */}
            <div className="mb-12">
              <div className="text-sm text-gray-400 mb-2">
                Program Impact Progress
              </div>
              <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-100"
                  style={{ width: `${revealPercentage}%` }}
                />
              </div>
              <div className="text-sm text-gray-400 mt-2">
                {Math.round(revealPercentage)}% Visible
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  title: "Nutrition Education",
                  color: "from-purple-500 to-magenta-500",
                  icon: "🌱",
                },
                {
                  title: "Community Support",
                  color: "from-cyan-500 to-blue-500",
                  icon: "🤝",
                },
                {
                  title: "Child Welfare",
                  color: "from-green-500 to-yellow-500",
                  icon: "👶",
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
                  <p className="text-gray-400">
                    Empowering young mothers in Kenya with the tools and
                    knowledge to build healthier, more prosperous families.
                  </p>
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
