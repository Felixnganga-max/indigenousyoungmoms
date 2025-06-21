import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Leaf,
  Book,
  Users,
  Globe,
  TreePine,
  Sprout,
  Heart,
  Languages,
  GraduationCap,
  Building2,
  DollarSign,
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";

const Programs = () => {
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

  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const featuredPrograms = [
    {
      id: "language",
      title: "Language Revival",
      subtitle: "AI-Powered Yaakunte Preservation",
      description:
        "Revolutionary chatbot technology preserving the almost extinct Yaaku dialect for future generations.",
      icon: Languages,
      gradient: "from-slate-900 via-purple-900 to-slate-900",
      accent: "purple",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      stats: "98% Language Recovery",
    },
    {
      id: "agroecology",
      title: "Climate Action",
      subtitle: "Agroecological Innovation",
      description:
        "Cutting-edge sustainable agriculture fighting climate change through biodiversity preservation.",
      icon: TreePine,
      gradient: "from-slate-900 via-emerald-900 to-slate-900",
      accent: "emerald",
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      stats: "50+ Green Projects",
    },
    {
      id: "economic",
      title: "Economic Growth",
      subtitle: "Financial Empowerment",
      description:
        "Innovative table banking solutions creating sustainable livelihoods and community prosperity.",
      icon: DollarSign,
      gradient: "from-slate-900 via-amber-900 to-slate-900",
      accent: "amber",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
      stats: "85% Success Rate",
    },
  ];

  const programs = [
    {
      id: "language",
      title: "Language Learning & Documentation",
      subtitle: "Preserving Yaakunte for Future Generations",
      description:
        "Through our Yaakunte Learning Centre and AI-powered chatbot app, we document and teach the almost extinct Yaaku dialect, ensuring cultural knowledge passes from generation to generation.",
      icon: Languages,
      color: "from-purple-600 to-purple-800",
      accent: "text-purple-600",
      bgColor: "bg-purple-50",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80",
      features: [
        "AI-powered Chatbot App Development",
        "Yaaku Cultural Resource Centre",
        "Generation-to-generation teaching",
        "Language documentation programs",
      ],
    },
    {
      id: "agroecology",
      title: "Agroecological Programs",
      subtitle: "Fighting Climate Change Through Sustainable Agriculture",
      description:
        "Our agroforestry initiatives contribute to climate resilience, biodiversity preservation, and reversing land degradation trends while supporting SDG achievement.",
      icon: TreePine,
      color: "from-emerald-600 to-emerald-800",
      accent: "text-emerald-600",
      bgColor: "bg-emerald-50",
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80",
      features: [
        "Kitchen Gardening Projects",
        "Carbon Bed Projects",
        "Agroforestry Implementation",
        "Biodiversity Conservation",
      ],
    },
    {
      id: "economic",
      title: "Economic Empowerment",
      subtitle: "Building Financial Independence Through Table Banking",
      description:
        "Empowering community members through innovative financial solutions that strengthen local economies and create sustainable livelihoods.",
      icon: DollarSign,
      color: "from-amber-600 to-amber-800",
      accent: "text-amber-600",
      bgColor: "bg-amber-50",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop&crop=entropy&auto=format&q=80",
      features: [
        "Community Table Banking",
        "Financial Literacy Training",
        "Micro-credit Services",
        "Entrepreneurship Support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
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
            backdrop-filter: blur(20px);
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(255, 215, 0, 0.2);
          }
          
          .card-hover {
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .card-hover:hover {
            transform: translateY(-20px) scale(1.02);
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
          
          .dark-overlay {
            background: linear-gradient(135deg, 
              rgba(15, 23, 42, 0.95) 0%, 
              rgba(30, 58, 138, 0.9) 50%, 
              rgba(15, 23, 42, 0.95) 100%);
          }
        `,
        }}
      />

      {/* Hero Section with Parallax */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        {/* Dark Overlay with Gold Accents */}
        <div className="absolute inset-0 dark-overlay" />

        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-30"
              style={{
                background: "linear-gradient(45deg, #FFD700, #FFA500)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                transform: `translateY(${
                  scrollY * 0.1 * (Math.random() - 0.5)
                }px)`,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 text-center px-6 max-w-7xl">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full gold-accent flex items-center justify-center animate-float shadow-2xl">
              <Sparkles className="w-10 h-10 text-slate-900" />
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent tracking-tight animate-gold-shimmer">
            YAAKU
          </h1>

          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-light text-gray-200 mb-8 tracking-wide">
              TRANSFORMATIVE PROGRAMS
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 gold-accent"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mt-12 font-light max-w-4xl mx-auto leading-relaxed">
            Where innovation meets tradition, creating sustainable futures
            through
            <span className="font-medium text-yellow-400">
              {" "}
              culture preservation
            </span>
            ,
            <span className="font-medium text-yellow-400">
              {" "}
              environmental action
            </span>
            , and
            <span className="font-medium text-yellow-400">
              {" "}
              economic empowerment
            </span>
          </p>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 border-2 border-yellow-400 rounded-full flex justify-center glass-effect">
            <div className="w-1 h-3 gold-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Featured Programs Cards */}
      <div className="relative py-32">
        <div
          className="absolute inset-0 parallax-bg opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/80" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Featured Programs
            </h2>
            <div className="w-24 h-1 gold-accent mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our flagship initiatives driving change across
              communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredPrograms.map((program, index) => (
              <div
                key={program.id}
                className="group relative card-hover cursor-pointer"
                onMouseEnter={() => setHoveredCard(program.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => smoothScrollTo(program.id)}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden rounded-3xl glass-effect shadow-2xl animate-glow">
                  {/* Real Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                    {/* Hover overlay */}
                    <div
                      className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${
                        hoveredCard === program.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 glass-effect rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-yellow-400 ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Stats badge */}
                    <div className="absolute top-6 right-6">
                      <div className="px-4 py-2 glass-effect rounded-full text-yellow-400 text-sm font-medium border border-yellow-400/30">
                        {program.stats}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">
                        {program.title}
                      </h3>
                      <ArrowRight
                        className={`w-6 h-6 text-gray-400 transition-all duration-300 ${
                          hoveredCard === program.id
                            ? "transform translate-x-2 text-yellow-400"
                            : ""
                        }`}
                      />
                    </div>

                    <h4 className="text-lg font-semibold text-gray-300 mb-3">
                      {program.subtitle}
                    </h4>

                    <p className="text-gray-400 leading-relaxed mb-6">
                      {program.description}
                    </p>

                    <button
                      className={`group inline-flex items-center px-6 py-3 glass-effect hover:gold-accent text-yellow-400 hover:text-slate-900 rounded-full transition-all duration-300 font-medium border border-yellow-400/30 hover:border-yellow-400`}
                    >
                      Explore More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Floating elements */}
                <div
                  className={`absolute -top-2 -right-2 w-4 h-4 gold-accent rounded-full animate-pulse ${
                    hoveredCard === program.id ? "scale-150" : ""
                  } transition-transform duration-300`}
                />
                <div
                  className={`absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400/30 rounded-full animate-float ${
                    hoveredCard === program.id ? "gold-accent" : ""
                  } transition-colors duration-300`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Programs Sections */}
      <div className="relative">
        {programs.map((program, index) => (
          <div
            key={program.id}
            id={program.id}
            data-animate
            className="relative min-h-screen flex items-center py-32"
          >
            {/* Parallax Background Image */}
            <div
              className="absolute inset-0 parallax-bg"
              style={{
                backgroundImage: `url(${program.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translateY(${scrollY * 0.2}px)`,
              }}
            />
            <div
              className={`absolute inset-0 ${
                index % 2 === 0 ? "bg-slate-900/90" : "bg-blue-900/90"
              }`}
            />

            <div className="container mx-auto px-6 relative z-10">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                }`}
              >
                {/* Content */}
                <div
                  className={`space-y-10 ${
                    isVisible[program.id] ? "animate-fade-in-up" : "opacity-0"
                  } ${index % 2 === 0 ? "" : "lg:col-start-2"}`}
                >
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="inline-flex items-center space-x-4 px-8 py-4 glass-effect rounded-full shadow-lg border border-yellow-400/30">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${program.color} flex items-center justify-center`}
                        >
                          <program.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-white text-lg">
                          {program.title}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
                      {program.subtitle}
                    </h2>

                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                      {program.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {program.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center space-x-4 p-6 glass-effect rounded-2xl shadow-lg hover:shadow-2xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-500"
                        style={{
                          animationDelay: `${idx * 0.1}s`,
                          transform: isVisible[program.id]
                            ? "translateX(0)"
                            : "translateX(-50px)",
                          opacity: isVisible[program.id] ? 1 : 0,
                          transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${program.color} group-hover:scale-125 transition-transform duration-300`}
                        />
                        <span className="text-gray-200 font-medium text-lg group-hover:text-white transition-colors">
                          {feature}
                        </span>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Visual with Real Image */}
                <div
                  className={`relative ${
                    index % 2 === 0 ? "" : "lg:col-start-1"
                  }`}
                >
                  <div
                    className={`relative overflow-hidden rounded-3xl shadow-2xl ${
                      isVisible[program.id]
                        ? "animate-fade-in-scale"
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <div className="h-96 lg:h-[600px] relative overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />

                      {/* Floating Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div
                            className={`w-32 h-32 rounded-full bg-gradient-to-r ${program.color} flex items-center justify-center mb-8 mx-auto animate-glow shadow-2xl border-4 border-yellow-400/30`}
                          >
                            <program.icon className="w-16 h-16 text-white" />
                          </div>
                          <div className="space-y-2">
                            <div className="w-24 h-2 gold-accent rounded-full mx-auto animate-pulse" />
                            <div
                              className="w-16 h-2 bg-yellow-400/60 rounded-full mx-auto animate-pulse"
                              style={{ animationDelay: "0.5s" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Floating Elements */}
                  <div className="absolute -top-8 -right-8 w-16 h-16 gold-accent rounded-full animate-float opacity-80 shadow-xl" />
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-yellow-400/60 rounded-full animate-bounce opacity-90 shadow-lg" />
                  <div className="absolute top-1/2 -right-4 w-8 h-8 bg-yellow-400/40 rounded-full animate-pulse opacity-70" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Footer CTA */}
      <div className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/95" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-gold-shimmer">
            Ready to Make Impact?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join us in our mission to preserve culture, protect the environment,
            and empower communities
          </p>
          <button className="group inline-flex items-center px-12 py-6 gold-accent text-slate-900 rounded-full text-lg font-bold hover:shadow-2xl transition-all duration-300 shadow-xl hover:scale-105">
            Get Involved Today
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Programs;
