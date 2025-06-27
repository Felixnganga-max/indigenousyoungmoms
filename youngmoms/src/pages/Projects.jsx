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
  Search,
  Filter,
  Eye,
  CheckCircle,
  AlertCircle,
  X,
  Calendar,
  Tag,
  Star,
  Mountain,
  Sun,
  Waves,
  Sunrise,
  Flower,
  Palette,
  Camera,
} from "lucide-react";

const Projects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const API_BASE = "https://indigenousyoungmoms-bvv4.vercel.app/api/programs";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
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

  useEffect(() => {
    fetchPrograms();
  }, [filterType]);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const url = filterType
        ? `${API_BASE}?programType=${filterType}`
        : API_BASE;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setPrograms(data.data);
      } else {
        showNotification("Failed to fetch programs", "error");
      }
    } catch (error) {
      showNotification("Error fetching programs", "error");
      console.error("Error fetching programs:", error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const openModal = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProgram(null);
  };

  const filteredPrograms = programs.filter(
    (program) =>
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const programTypes = [...new Set(programs.map((p) => p.programType))];

  // Get icon based on program type
  const getIconForProgramType = (type) => {
    const iconMap = {
      agroecology: TreePine,
      language: Languages,
      economic: DollarSign,
      education: GraduationCap,
      community: Users,
      environment: Globe,
      technology: Building2,
    };
    return iconMap[type.toLowerCase()] || Book;
  };

  // Get vibrant color scheme based on program type
  const getColorSchemeForType = (type) => {
    const colorMap = {
      agroecology: {
        primary: "from-green-400 via-emerald-500 to-teal-500",
        secondary: "from-green-500 to-emerald-600",
        accent: "text-emerald-300",
        glow: "shadow-emerald-500/30",
        border: "border-emerald-400/50",
        particle: "#10b981",
      },
      language: {
        primary: "from-purple-400 via-violet-500 to-indigo-500",
        secondary: "from-purple-500 to-indigo-600",
        accent: "text-purple-300",
        glow: "shadow-purple-500/30",
        border: "border-purple-400/50",
        particle: "#a855f7",
      },
      economic: {
        primary: "from-amber-400 via-yellow-500 to-orange-500",
        secondary: "from-amber-500 to-orange-600",
        accent: "text-amber-300",
        glow: "shadow-amber-500/30",
        border: "border-amber-400/50",
        particle: "#f59e0b",
      },
      education: {
        primary: "from-blue-400 via-sky-500 to-cyan-500",
        secondary: "from-blue-500 to-cyan-600",
        accent: "text-blue-300",
        glow: "shadow-blue-500/30",
        border: "border-blue-400/50",
        particle: "#3b82f6",
      },
      community: {
        primary: "from-pink-400 via-rose-500 to-red-500",
        secondary: "from-pink-500 to-rose-600",
        accent: "text-pink-300",
        glow: "shadow-pink-500/30",
        border: "border-pink-400/50",
        particle: "#ec4899",
      },
    };
    return (
      colorMap[type.toLowerCase()] || {
        primary: "from-slate-400 via-gray-500 to-zinc-500",
        secondary: "from-slate-500 to-zinc-600",
        accent: "text-slate-300",
        glow: "shadow-slate-500/30",
        border: "border-slate-400/50",
        particle: "#6b7280",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-lg border transform transition-all duration-500 ${
            notification.type === "success"
              ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-200"
              : "bg-red-500/20 border-red-400/30 text-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={20} className="animate-pulse" />
          ) : (
            <AlertCircle size={20} className="animate-pulse" />
          )}
          <span className="font-medium text-sm">{notification.message}</span>
        </div>
      )}

      {/* Beautiful Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes floatGentle {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          
          @keyframes gentleGlow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
            }
            50% { 
              box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
            }
          }
          
          @keyframes textShine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          
          .float-gentle { animation: floatGentle 6s ease-in-out infinite; }
          .breathe { animation: breathe 4s ease-in-out infinite; }
          .gentle-glow { animation: gentleGlow 3s ease-in-out infinite; }
          
          .text-shine {
            background: linear-gradient(90deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%);
            background-size: 200% 100%;
            animation: textShine 3s ease-in-out infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .gradient-border {
            position: relative;
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            border-radius: 24px;
            padding: 2px;
          }
          
          .gradient-border::before {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6, #06b6d4);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask-composite: xor;
          }
          
          .shimmer::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: shimmer 2s infinite;
          }
        `,
        }}
      />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full opacity-30"
              style={{
                background: `linear-gradient(45deg, ${
                  ["#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4", "#10b981"][
                    Math.floor(Math.random() * 5)
                  ]
                }, transparent)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Elegant Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="float-gentle mb-12">
            <div className="flex items-center justify-center gap-6 mb-8">
              <Sunrise className="w-12 h-12 text-amber-400 breathe" />
              <Heart className="w-16 h-16 text-rose-400 gentle-glow" />
              <Flower className="w-12 h-12 text-pink-400 breathe" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block text-shine mb-4">Our Programs Are</span>
              <span className="block bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Crafted With Love
              </span>
              <span className="block text-2xl md:text-4xl text-slate-300 font-light">
                To Make Kenya The Most
              </span>
              <span className="block text-shine text-6xl md:text-8xl font-black mt-2">
                BEAUTIFUL PLACE
              </span>
              <span className="block text-2xl md:text-4xl text-slate-300 font-light mt-4">
                On Earth 🌍
              </span>
            </h1>

            <div className="w-24 h-1 mx-auto mb-12 bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 rounded-full" />

            <p className="text-xl md:text-2xl text-slate-300 mb-16 leading-relaxed max-w-4xl mx-auto font-light">
              Every program we create is a love letter to Kenya's magnificent
              landscapes, vibrant communities, and boundless potential.
              Together, we're painting a masterpiece of sustainability,
              prosperity, and breathtaking beauty.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <div className="glass-card rounded-full px-6 py-3 border border-white/20">
                <div className="flex items-center text-slate-200">
                  <TreePine className="w-5 h-5 text-emerald-400 mr-3 breathe" />
                  <span className="text-sm font-medium">
                    Sustainable Tomorrow
                  </span>
                </div>
              </div>
              <div className="glass-card rounded-full px-6 py-3 border border-white/20">
                <div className="flex items-center text-slate-200">
                  <Users className="w-5 h-5 text-blue-400 mr-3 breathe" />
                  <span className="text-sm font-medium">
                    Thriving Communities
                  </span>
                </div>
              </div>
              <div className="glass-card rounded-full px-6 py-3 border border-white/20">
                <div className="flex items-center text-slate-200">
                  <Sparkles className="w-5 h-5 text-purple-400 mr-3 breathe" />
                  <span className="text-sm font-medium">Endless Beauty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center animate-bounce">
            <p className="text-slate-400 mb-3 text-sm font-light">
              Discover the magic below
            </p>
            <div className="w-6 h-10 glass-card rounded-full flex justify-center border border-white/20">
              <div className="w-1 h-3 bg-gradient-to-b from-amber-400 to-rose-400 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Programs Section */}
      <div className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                Programs That Transform
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 rounded-full mx-auto mb-8" />
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Each initiative is carefully designed to nurture Kenya's natural
              splendor while empowering communities to flourish in harmony with
              the environment
            </p>
          </div>

          {/* Refined Search and Filter */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search for inspiring programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 glass-card text-white placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 border border-white/10 text-sm transition-all duration-300"
                />
              </div>
              <div className="relative">
                <Filter
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 z-10"
                  size={20}
                />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 glass-card text-white rounded-2xl focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 border border-white/10 text-sm bg-slate-900/50 transition-all duration-300"
                >
                  <option value="" className="bg-slate-800 text-white">
                    All Types
                  </option>
                  {programTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="bg-slate-800 text-white"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Programs Count */}
          <div className="text-center mb-16">
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full mr-3" />
                <span className="text-slate-300">
                  Loading beautiful programs...
                </span>
              </div>
            ) : (
              <p className="text-slate-300">
                Discover{" "}
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                  {filteredPrograms.length}
                </span>{" "}
                program{filteredPrograms.length !== 1 ? "s" : ""} designed to
                make Kenya more beautiful
              </p>
            )}
          </div>

          {/* Programs Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
                <div
                  className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-rose-400 rounded-full animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1.5s",
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPrograms.map((program, index) => {
                const IconComponent = getIconForProgramType(
                  program.programType
                );
                const colorScheme = getColorSchemeForType(program.programType);

                return (
                  <div
                    key={program._id}
                    className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                    onClick={() => openModal(program)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onMouseEnter={() => setHoveredCard(program._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="gradient-border">
                      <div className="glass-card rounded-3xl overflow-hidden h-full">
                        {/* Program Header */}
                        <div
                          className={`relative h-48 bg-gradient-to-br ${colorScheme.primary} flex items-center justify-center overflow-hidden`}
                        >
                          {/* Subtle Pattern */}
                          <div className="absolute inset-0 opacity-20">
                            {[...Array(12)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full animate-pulse"
                                style={{
                                  backgroundColor: colorScheme.particle,
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                  animationDelay: `${Math.random() * 3}s`,
                                }}
                              />
                            ))}
                          </div>

                          <div className="relative z-10">
                            <IconComponent
                              className={`w-16 h-16 text-white drop-shadow-lg transition-all duration-300 ${
                                hoveredCard === program._id ? "scale-110" : ""
                              }`}
                            />
                          </div>

                          {/* Status Badge */}
                          <div className="absolute top-4 right-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                                program.status === "active"
                                  ? "bg-green-500/30 text-green-200 border border-green-400/50"
                                  : "bg-slate-500/30 text-slate-200 border border-slate-400/50"
                              }`}
                            >
                              {program.status?.toUpperCase()}
                            </span>
                          </div>

                          <Camera className="absolute bottom-4 right-4 w-5 h-5 text-white/50" />
                        </div>

                        {/* Content */}
                        <div className="p-6 bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 leading-tight">
                              {program.title}
                            </h3>
                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                          </div>

                          <p className="text-slate-300 mb-6 leading-relaxed text-sm line-clamp-3">
                            {program.description}
                          </p>

                          {/* Program Details */}
                          <div className="space-y-3 mb-6">
                            {program.startDate && (
                              <div className="flex items-center text-slate-400 text-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(
                                  program.startDate
                                ).toLocaleDateString()}
                              </div>
                            )}
                            {program.location && (
                              <div className="flex items-center text-slate-400 text-sm">
                                <Globe className="w-4 h-4 mr-2" />
                                {program.location}
                              </div>
                            )}
                          </div>

                          {/* Tags */}
                          {program.tags && program.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {program.tags.slice(0, 2).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-300 border border-white/20"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Action Button */}
                          <button className="w-full py-3 bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white font-medium rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center justify-center group-hover:shadow-lg">
                            <Eye className="w-4 h-4 mr-2" />
                            Explore Program
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* No Results State */}
          {!loading && filteredPrograms.length === 0 && (
            <div className="text-center py-20">
              <Palette className="w-16 h-16 text-slate-400 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                No Programs Found
              </h3>
              <p className="text-lg text-slate-400 mb-8 max-w-lg mx-auto">
                We couldn't find programs matching your search, but Kenya's
                beauty knows no bounds. Let's explore all possibilities!
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("");
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Show All Programs
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto glass-card rounded-3xl border border-white/20 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center transition-all duration-300 border border-red-400/30"
            >
              <X className="w-5 h-5 text-red-300" />
            </button>

            {/* Modal Header */}
            <div className="relative h-64 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-pulse"
                    style={{
                      backgroundColor: "#FFFFFF",
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center">
                {(() => {
                  const IconComponent = getIconForProgramType(
                    selectedProgram.programType
                  );
                  return (
                    <IconComponent className="w-20 h-20 text-white drop-shadow-lg mb-4 animate-pulse" />
                  );
                })()}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {selectedProgram.title}
                </h2>
                <p className="text-lg text-white/90">
                  {selectedProgram.programType?.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 bg-gradient-to-b from-slate-800/90 to-slate-900/90">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
                    <Book className="w-5 h-5 mr-2" />
                    About This Program
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    {selectedProgram.description}
                  </p>
                  {selectedProgram.objectives &&
                    selectedProgram.objectives.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium text-white mb-3">
                          Key Objectives
                        </h4>
                        <ul className="space-y-2">
                          {selectedProgram.objectives.map((objective, idx) => (
                            <li
                              key={idx}
                              className="flex items-start text-sm text-slate-300"
                            >
                              <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Program Details
                  </h3>

                  <div className="space-y-4">
                    {selectedProgram.startDate && (
                      <div className="flex items-center text-slate-300">
                        <div className="w-24 text-sm text-slate-400">
                          Start Date:
                        </div>
                        <div className="text-sm font-medium">
                          {new Date(
                            selectedProgram.startDate
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    )}

                    {selectedProgram.endDate && (
                      <div className="flex items-center text-slate-300">
                        <div className="w-24 text-sm text-slate-400">
                          End Date:
                        </div>
                        <div className="text-sm font-medium">
                          {new Date(selectedProgram.endDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    )}

                    {selectedProgram.location && (
                      <div className="flex items-center text-slate-300">
                        <div className="w-24 text-sm text-slate-400">
                          Location:
                        </div>
                        <div className="text-sm font-medium flex items-center">
                          <Globe className="w-4 h-4 mr-1 text-blue-400" />
                          {selectedProgram.location}
                        </div>
                      </div>
                    )}

                    {selectedProgram.budget && (
                      <div className="flex items-center text-slate-300">
                        <div className="w-24 text-sm text-slate-400">
                          Budget:
                        </div>
                        <div className="text-sm font-medium flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-green-400" />
                          {selectedProgram.budget.toLocaleString()}
                        </div>
                      </div>
                    )}

                    {selectedProgram.participants && (
                      <div className="flex items-center text-slate-300">
                        <div className="w-24 text-sm text-slate-400">
                          Participants:
                        </div>
                        <div className="text-sm font-medium flex items-center">
                          <Users className="w-4 h-4 mr-1 text-purple-400" />
                          {selectedProgram.participants}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center text-slate-300">
                      <div className="w-24 text-sm text-slate-400">Status:</div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedProgram.status === "active"
                            ? "bg-green-500/30 text-green-200 border border-green-400/50"
                            : selectedProgram.status === "completed"
                            ? "bg-blue-500/30 text-blue-200 border border-blue-400/50"
                            : "bg-slate-500/30 text-slate-200 border border-slate-400/50"
                        }`}
                      >
                        {selectedProgram.status?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags Section */}
              {selectedProgram.tags && selectedProgram.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    Program Tags
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProgram.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm text-slate-200 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700/50">
                <button className="flex-1 py-4 bg-gradient-to-r from-emerald-500/80 to-teal-500/80 text-white font-medium rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 flex items-center justify-center hover:shadow-lg">
                  <Heart className="w-5 h-5 mr-2" />
                  Join This Beautiful Initiative
                </button>
                <button className="flex-1 py-4 bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white font-medium rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center justify-center hover:shadow-lg">
                  <Star className="w-5 h-5 mr-2" />
                  Learn More Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inspirational Footer Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-purple-900/30 to-transparent" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-6 mb-8">
              <Mountain className="w-12 h-12 text-blue-400 breathe" />
              <Sun className="w-16 h-16 text-amber-400 gentle-glow" />
              <Waves className="w-12 h-12 text-cyan-400 breathe" />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="block text-shine mb-2">
                Together We're Creating
              </span>
              <span className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                A Kenya That Shines
              </span>
            </h2>

            <div className="w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-full" />

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light">
              Every program is a brushstroke on the canvas of Kenya's future.
              Join us in this magnificent journey of transformation, beauty, and
              hope.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 transition-all duration-500 group">
                <TreePine className="w-12 h-12 text-emerald-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Sustainable Future
                </h3>
                <p className="text-slate-400 text-sm">
                  Growing with nature, not against it
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-500 group">
                <Users className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Strong Communities
                </h3>
                <p className="text-slate-400 text-sm">
                  Building bonds that last generations
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-500 group">
                <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Endless Beauty
                </h3>
                <p className="text-slate-400 text-sm">
                  Creating wonders beyond imagination
                </p>
              </div>
            </div>

            <button className="px-12 py-4 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 text-lg">
              <span className="flex items-center justify-center">
                <Heart className="w-6 h-6 mr-3 animate-pulse" />
                Start Your Beautiful Journey
                <ArrowRight className="w-6 h-6 ml-3" />
              </span>
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Leaf className="w-8 h-8 text-green-400 float-gentle" />
        </div>
        <div className="absolute top-20 right-20 opacity-20">
          <Flower
            className="w-6 h-6 text-pink-400 float-gentle"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Sunrise
            className="w-10 h-10 text-amber-400 float-gentle"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
