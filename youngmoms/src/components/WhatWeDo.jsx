import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Languages,
  TreePine,
  Users,
  Globe,
  Heart,
  Sparkles,
  Phone,
  BookOpen,
  Shield,
  Leaf,
} from "lucide-react";

const WhatWeDo = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const coreAreas = [
    {
      id: "culture",
      title: "Cultural Revival",
      subtitle: "Preserving Yaaku Heritage",
      description:
        "Reviving the dying Yaaku language and culture through AI technology and community education, ensuring our unique identity is preserved for future generations.",
      icon: Languages,
      gradient: "from-purple-600 to-purple-800",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      stats: "98% Revival Success",
    },
    {
      id: "climate",
      title: "Climate Action",
      subtitle: "Environmental Protection",
      description:
        "Fighting climate change through sustainable practices and protecting our ancestral Mukogodo Forest from deforestation and soil degradation.",
      icon: TreePine,
      gradient: "from-emerald-600 to-emerald-800",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      stats: "Net Zero Goals",
    },
    {
      id: "empowerment",
      title: "Women Empowerment",
      subtitle: "Gender Equality & Rights",
      description:
        "Empowering women through the Yaaku Women Eco Village, eliminating FGM, preventing school dropouts, and promoting economic independence.",
      icon: Users,
      gradient: "from-pink-600 to-pink-800",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      stats: "100+ Women Helped",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
      {/* Enhanced Custom Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
            }
            50% {
              box-shadow: 0 0 40px rgba(255, 215, 0, 0.4);
            }
          }
          
          @keyframes goldShimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .animate-fade-in-scale {
            animation: fadeInScale 0.8s ease-out forwards;
          }
          
          .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
          
          .animate-gold-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent);
            background-size: 200% 100%;
            animation: goldShimmer 3s infinite;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
          
          .glass-effect {
            backdrop-filter: blur(25px);
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }
          
          .card-hover {
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .card-hover:hover {
            transform: translateY(-20px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          .parallax-bg {
            will-change: transform;
          }
          
          .gold-accent {
            background: linear-gradient(135deg, #FFD700, #FFA500, #FF8C00);
          }
          
          .blue-overlay {
            background: linear-gradient(135deg, 
              rgba(59, 130, 246, 0.1) 0%, 
              rgba(147, 197, 253, 0.08) 50%, 
              rgba(59, 130, 246, 0.1) 100%);
          }
          
          .content-glass {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          }
        `,
        }}
      />

      {/* Main Section */}
      <div className="relative py-24" id="whatwedo" data-animate>
        {/* Full Background Image */}
        <div
          className="fixed inset-0 parallax-bg"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            transform: `translateY(${scrollY * 0.2}px)`,
            zIndex: -2,
          }}
        />

        {/* Subtle Blue Overlay */}
        <div className="fixed inset-0 blue-overlay" style={{ zIndex: -1 }} />

        {/* Main Content Container with Glass Effect */}
        <div className="relative content-glass rounded-3xl mx-4 md:mx-8 shadow-2xl">
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full opacity-20"
                style={{
                  background: "linear-gradient(45deg, #3B82F6, #60A5FA)",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                  transform: `translateY(${
                    scrollY * 0.05 * (Math.random() - 0.5)
                  }px)`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-8 py-16 relative z-10">
            {/* Header */}
            <div className="text-center mb-20">
              <div className="mb-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center animate-float shadow-xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>

              <h2
                className={`text-5xl md:text-6xl font-bold text-slate-800 mb-6 ${
                  isVisible.whatwedo ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                What We Do
              </h2>

              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>

              <p
                className={`text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed ${
                  isVisible.whatwedo ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                The Indigenous Young Moms is dedicated to reviving Yaaku
                culture, protecting our environment, and empowering women while
                building a poverty-free community where every person's dignity
                is protected.
              </p>
            </div>

            {/* Core Areas Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
              {coreAreas.map((area, index) => (
                <div
                  key={area.id}
                  className={`group relative card-hover cursor-pointer ${
                    isVisible.whatwedo
                      ? "animate-fade-in-scale"
                      : "opacity-0 scale-95"
                  }`}
                  onMouseEnter={() => setHoveredCard(area.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative overflow-hidden rounded-3xl glass-effect shadow-xl">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={area.image}
                        alt={area.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                      {/* Stats badge */}
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 glass-effect rounded-full text-blue-600 text-sm font-medium border border-blue-200">
                          {area.stats}
                        </div>
                      </div>

                      {/* Icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${area.gradient} flex items-center justify-center shadow-2xl border-2 border-white/30 animate-float`}
                        >
                          <area.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-white/80 backdrop-blur-sm">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {area.title}
                      </h3>

                      <h4 className="text-lg font-semibold text-blue-600 mb-3">
                        {area.subtitle}
                      </h4>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div
                    className={`absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse ${
                      hoveredCard === area.id ? "scale-150" : ""
                    } transition-transform duration-300`}
                  />
                </div>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div
              className={`text-center space-y-6 ${
                isVisible.whatwedo ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {/* Learn More Button */}
                <button className="group inline-flex items-center px-8 py-4 glass-effect hover:bg-blue-500 text-blue-600 hover:text-white rounded-full text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-2xl border border-blue-200 hover:border-blue-500 hover:scale-105">
                  <BookOpen className="w-5 h-5 mr-3" />
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </button>

                {/* Contact Button */}
                <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                  <Phone className="w-5 h-5 mr-3" />
                  Get In Touch
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              <p className="text-slate-600 max-w-2xl mx-auto">
                Join us in preserving culture, protecting the environment, and
                empowering communities. Together, we can create lasting change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
