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
  ChevronLeft,
  ImageIcon,
  ZoomIn,
  Download,
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
  const [imageCarousels, setImageCarousels] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedProgramImages, setSelectedProgramImages] = useState([]);

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
        // Initialize carousel state for each program
        const carouselState = {};
        data.data.forEach((program) => {
          carouselState[program._id] = 0;
        });
        setImageCarousels(carouselState);
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

  const openImageModal = (images, initialIndex = 0) => {
    setSelectedProgramImages(images);
    setSelectedImageIndex(initialIndex);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedProgramImages([]);
    setSelectedImageIndex(0);
  };

  const nextCarouselImage = (programId, e) => {
    e.stopPropagation();
    const program = programs.find((p) => p._id === programId);
    if (program && program.images && program.images.length > 1) {
      setImageCarousels((prev) => ({
        ...prev,
        [programId]: (prev[programId] + 1) % program.images.length,
      }));
    }
  };

  const prevCarouselImage = (programId, e) => {
    e.stopPropagation();
    const program = programs.find((p) => p._id === programId);
    if (program && program.images && program.images.length > 1) {
      setImageCarousels((prev) => ({
        ...prev,
        [programId]:
          prev[programId] === 0
            ? program.images.length - 1
            : prev[programId] - 1,
      }));
    }
  };

  const nextModalImage = () => {
    if (selectedProgramImages.length > 1) {
      setSelectedImageIndex((prev) =>
        prev === selectedProgramImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevModalImage = () => {
    if (selectedProgramImages.length > 1) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? selectedProgramImages.length - 1 : prev - 1
      );
    }
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
          
          @keyframes slideIn {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes slideOut {
            0% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(-100%); opacity: 0; }
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
          
          .image-carousel {
            position: relative;
            overflow: hidden;
          }
          
          .carousel-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          
          .carousel-button:hover {
            background: rgba(0, 0, 0, 0.9);
            transform: translateY(-50%) scale(1.1);
          }
          
          .carousel-button.prev {
            left: 8px;
          }
          
          .carousel-button.next {
            right: 8px;
          }
          
          .image-carousel:hover .carousel-button {
            opacity: 1;
          }
          
          .carousel-indicators {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 6px;
            z-index: 10;
          }
          
          .carousel-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .carousel-indicator.active {
            background: white;
            transform: scale(1.2);
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
                const currentImageIndex = imageCarousels[program._id] || 0;
                const hasImages = program.images && program.images.length > 0;
                const hasMultipleImages =
                  hasImages && program.images.length > 1;

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
                        {/* Program Header with Image/Icon */}
                        <div
                          className={`relative h-48 bg-gradient-to-br ${colorScheme.primary} flex items-center justify-center overflow-hidden image-carousel`}
                        >
                          {hasImages ? (
                            <>
                              {/* Image Display */}
                              <img
                                src={program.images[currentImageIndex].url}
                                alt={program.title}
                                className="w-full h-full object-cover transition-all duration-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openImageModal(
                                    program.images,
                                    currentImageIndex
                                  );
                                }}
                              />

                              {/* Image Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                              {/* Carousel Controls for Multiple Images */}
                              {hasMultipleImages && (
                                <>
                                  <button
                                    className="carousel-button prev"
                                    onClick={(e) =>
                                      prevCarouselImage(program._id, e)
                                    }
                                  >
                                    <ChevronLeft size={16} />
                                  </button>
                                  <button
                                    className="carousel-button next"
                                    onClick={(e) =>
                                      nextCarouselImage(program._id, e)
                                    }
                                  >
                                    <ChevronRight size={16} />
                                  </button>

                                  {/* Carousel Indicators */}
                                  <div className="carousel-indicators">
                                    {program.images.map((_, idx) => (
                                      <div
                                        key={idx}
                                        className={`carousel-indicator ${
                                          idx === currentImageIndex
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setImageCarousels((prev) => ({
                                            ...prev,
                                            [program._id]: idx,
                                          }));
                                        }}
                                      />
                                    ))}
                                  </div>
                                </>
                              )}

                              {/* Image Count Badge */}
                              {hasMultipleImages && (
                                <div className="absolute top-4 left-4">
                                  <span className="px-2 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20">
                                    <ImageIcon className="w-3 h-3 inline mr-1" />
                                    {currentImageIndex + 1}/
                                    {program.images.length}
                                  </span>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {/* Default Icon Display */}
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
                                  className={`w-16 h-16 ${colorScheme.accent} float-gentle`}
                                />
                              </div>
                            </>
                          )}

                          {/* View Icon for Images */}
                          {hasImages && (
                            <div className="absolute top-4 right-4">
                              <div className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                <Eye className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Program Content */}
                        <div className="p-6">
                          {/* Program Type Badge */}
                          <div className="flex items-center justify-between mb-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${colorScheme.border} ${colorScheme.accent}`}
                              style={{
                                background: `linear-gradient(135deg, ${colorScheme.particle}20, ${colorScheme.particle}10)`,
                              }}
                            >
                              {program.programType.charAt(0).toUpperCase() +
                                program.programType.slice(1)}
                            </span>
                            {program.status && (
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  program.status === "active"
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                                    : program.status === "completed"
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                                    : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                                }`}
                              >
                                {program.status}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-rose-400 group-hover:bg-clip-text transition-all duration-300">
                            {program.title}
                          </h3>

                          {/* Description */}
                          <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                            {program.description}
                          </p>

                          {/* Program Details */}
                          <div className="space-y-2 mb-6">
                            {program.location && (
                              <div className="flex items-center text-slate-400 text-xs">
                                <Mountain className="w-3 h-3 mr-2 text-slate-500" />
                                <span>{program.location}</span>
                              </div>
                            )}
                            {program.startDate && (
                              <div className="flex items-center text-slate-400 text-xs">
                                <Calendar className="w-3 h-3 mr-2 text-slate-500" />
                                <span>
                                  Started{" "}
                                  {new Date(
                                    program.startDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            {program.beneficiaries && (
                              <div className="flex items-center text-slate-400 text-xs">
                                <Users className="w-3 h-3 mr-2 text-slate-500" />
                                <span>
                                  {program.beneficiaries} beneficiaries
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Tags */}
                          {program.tags && program.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {program.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md border border-slate-600/30"
                                >
                                  <Tag className="w-2 h-2 inline mr-1" />
                                  {tag}
                                </span>
                              ))}
                              {program.tags.length > 3 && (
                                <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-md border border-slate-600/30">
                                  +{program.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Progress Bar (if applicable) */}
                          {program.progress !== undefined && (
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-slate-400">
                                  Progress
                                </span>
                                <span className="text-xs font-medium text-slate-300">
                                  {program.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-700/50 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full bg-gradient-to-r ${colorScheme.secondary} transition-all duration-1000`}
                                  style={{ width: `${program.progress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Action Button */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-slate-400">
                              <span className="text-xs font-medium">
                                Learn More
                              </span>
                            </div>
                            <ArrowRight
                              className={`w-5 h-5 ${colorScheme.accent} transform group-hover:translate-x-1 transition-transform duration-300`}
                            />
                          </div>
                        </div>

                        {/* Hover Overlay Effect */}
                        <div
                          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl ${colorScheme.glow}`}
                          style={{
                            background: `linear-gradient(135deg, ${colorScheme.particle}10, transparent)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* No Programs Found */}
          {!loading && filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <Search className="w-16 h-16 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-4">
                No Programs Found
              </h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                We couldn't find any programs matching your search criteria. Try
                adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("");
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Program Detail Modal */}
      {showModal && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
          <div className="glass-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 glass-card border-b border-white/10 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedProgram.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${
                        getColorSchemeForType(selectedProgram.programType)
                          .border
                      } ${
                        getColorSchemeForType(selectedProgram.programType)
                          .accent
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${
                          getColorSchemeForType(selectedProgram.programType)
                            .particle
                        }20, ${
                          getColorSchemeForType(selectedProgram.programType)
                            .particle
                        }10)`,
                      }}
                    >
                      {selectedProgram.programType.charAt(0).toUpperCase() +
                        selectedProgram.programType.slice(1)}
                    </span>
                    {selectedProgram.status && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedProgram.status === "active"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                            : selectedProgram.status === "completed"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                        }`}
                      >
                        {selectedProgram.status}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-600/50 transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Program Images */}
              {selectedProgram.images && selectedProgram.images.length > 0 && (
                <div className="px-8 pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {selectedProgram.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer rounded-xl overflow-hidden aspect-video"
                        onClick={() =>
                          openImageModal(selectedProgram.images, index)
                        }
                      >
                        <img
                          src={image.url}
                          alt={image.caption || selectedProgram.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="px-8 pb-8">
                {/* Program Details Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {selectedProgram.location && (
                    <div className="glass-card rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center mb-2">
                        <Mountain className="w-5 h-5 text-slate-400 mr-2" />
                        <span className="text-sm font-medium text-slate-300">
                          Location
                        </span>
                      </div>
                      <p className="text-white font-medium">
                        {selectedProgram.location}
                      </p>
                    </div>
                  )}

                  {selectedProgram.startDate && (
                    <div className="glass-card rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-slate-400 mr-2" />
                        <span className="text-sm font-medium text-slate-300">
                          Start Date
                        </span>
                      </div>
                      <p className="text-white font-medium">
                        {new Date(selectedProgram.startDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  )}

                  {selectedProgram.beneficiaries && (
                    <div className="glass-card rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center mb-2">
                        <Users className="w-5 h-5 text-slate-400 mr-2" />
                        <span className="text-sm font-medium text-slate-300">
                          Beneficiaries
                        </span>
                      </div>
                      <p className="text-white font-medium">
                        {selectedProgram.beneficiaries.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Book className="w-5 h-5 mr-2 text-purple-400" />
                    About This Program
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-base">
                    {selectedProgram.description}
                  </p>
                </div>

                {/* Extended Description */}
                {selectedProgram.extendedDescription && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-rose-400" />
                      Program Details
                    </h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-slate-300 leading-relaxed text-base">
                        {selectedProgram.extendedDescription}
                      </p>
                    </div>
                  </div>
                )}

                {/* Progress */}
                {selectedProgram.progress !== undefined && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
                      Progress
                    </h3>
                    <div className="glass-card rounded-2xl p-6 border border-white/10">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-300">
                          Completion Status
                        </span>
                        <span className="text-2xl font-bold text-white">
                          {selectedProgram.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full bg-gradient-to-r ${
                            getColorSchemeForType(selectedProgram.programType)
                              .secondary
                          } transition-all duration-1000`}
                          style={{ width: `${selectedProgram.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedProgram.tags && selectedProgram.tags.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Tag className="w-5 h-5 mr-2 text-amber-400" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProgram.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-slate-700/50 text-slate-300 text-sm rounded-lg border border-slate-600/30 hover:bg-slate-600/50 transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Objectives */}
                {selectedProgram.objectives &&
                  selectedProgram.objectives.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-400" />
                        Objectives
                      </h3>
                      <div className="space-y-3">
                        {selectedProgram.objectives.map((objective, index) => (
                          <div
                            key={index}
                            className="flex items-start glass-card rounded-xl p-4 border border-white/10"
                          >
                            <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300 leading-relaxed">
                              {objective}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Impact Metrics */}
                {selectedProgram.impactMetrics &&
                  selectedProgram.impactMetrics.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                        Impact Metrics
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedProgram.impactMetrics.map((metric, index) => (
                          <div
                            key={index}
                            className="glass-card rounded-xl p-4 border border-white/10 text-center"
                          >
                            <div className="text-2xl font-bold text-white mb-1">
                              {metric.value}
                            </div>
                            <div className="text-sm text-slate-300">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && selectedProgramImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
            >
              <X size={24} />
            </button>

            {/* Image Counter */}
            {selectedProgramImages.length > 1 && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-4 py-2 bg-black/50 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/20">
                  {selectedImageIndex + 1} / {selectedProgramImages.length}
                </span>
              </div>
            )}

            {/* Main Image */}
            <div className="relative h-full flex items-center justify-center">
              <img
                src={selectedProgramImages[selectedImageIndex]?.url}
                alt={
                  selectedProgramImages[selectedImageIndex]?.caption ||
                  "Program image"
                }
                className="max-w-full max-h-full object-contain rounded-2xl"
              />

              {/* Navigation Buttons */}
              {selectedProgramImages.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Image Caption */}
            {selectedProgramImages[selectedImageIndex]?.caption && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
                  <p className="text-white text-center">
                    {selectedProgramImages[selectedImageIndex].caption}
                  </p>
                </div>
              </div>
            )}

            {/* Thumbnail Strip */}
            {selectedProgramImages.length > 1 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
                {selectedProgramImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === selectedImageIndex
                        ? "border-white scale-110"
                        : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.caption || `Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
