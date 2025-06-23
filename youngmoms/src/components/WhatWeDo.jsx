import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Languages,
  TreePine,
  Users,
  Heart,
  Phone,
  BookOpen,
} from "lucide-react";

const WhatWeDo = () => {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

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
    <div className="relative min-h-screen bg-white">
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
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .animate-fade-in-scale {
            animation: fadeInScale 0.8s ease-out forwards;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .card-hover {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          .subtle-shadow {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }
          
          .hover-shadow {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }
          
          @media (max-width: 768px) {
            .mobile-spacing {
              padding: 1rem;
            }
          }
        `,
        }}
      />

      {/* Main Section */}
      <div className="relative py-12 md:py-24" id="whatwedo" data-animate>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 md:mb-20">
            <div className="mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center animate-float subtle-shadow">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
            </div>

            <h2
              className={`text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 md:mb-6 leading-tight ${
                isVisible.whatwedo ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              What We Do
            </h2>

            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 md:mb-8 rounded-full"></div>

            <p
              className={`text-lg md:text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed px-4 ${
                isVisible.whatwedo ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              The Indigenous Young Moms is dedicated to reviving Yaaku culture,
              protecting our environment, and empowering women while building a
              poverty-free community where every person's dignity is protected.
            </p>
          </div>

          {/* Core Areas Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
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
                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-white subtle-shadow group-hover:hover-shadow border border-gray-100">
                  {/* Image */}
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                    {/* Stats badge */}
                    <div className="absolute top-3 md:top-4 right-3 md:right-4">
                      <div className="px-2 md:px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-blue-600 text-xs md:text-sm font-medium border border-blue-200">
                        {area.stats}
                      </div>
                    </div>

                    {/* Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${area.gradient} flex items-center justify-center shadow-2xl border-2 border-white/30 animate-float`}
                      >
                        <area.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6 bg-white">
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
                      {area.title}
                    </h3>

                    <h4 className="text-base md:text-lg font-semibold text-blue-600 mb-3">
                      {area.subtitle}
                    </h4>

                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>

                {/* Floating accent */}
                <div
                  className={`absolute -top-1 md:-top-2 -right-1 md:-right-2 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse ${
                    hoveredCard === area.id ? "scale-150" : ""
                  } transition-transform duration-300`}
                />
              </div>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div
            className={`text-center space-y-6 px-4 ${
              isVisible.whatwedo ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              {/* Learn More Button */}
              <a
                href="/about"
                className="group inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-blue-500 hover:bg-blue-500 text-blue-600 hover:text-white rounded-full text-base md:text-lg font-bold transition-all duration-300 subtle-shadow hover:hover-shadow hover:scale-105 w-full sm:w-auto"
              >
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                Learn More About Us
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 group-hover:translate-x-2 transition-transform" />
              </a>

              {/* Contact Button */}
              <a href="/contact" className="group inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full text-base md:text-lg font-bold transition-all duration-300 subtle-shadow hover:hover-shadow hover:scale-105 w-full sm:w-auto">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                Get In Touch
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Join us in preserving culture, protecting the environment, and
              empowering communities. Together, we can create lasting change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
