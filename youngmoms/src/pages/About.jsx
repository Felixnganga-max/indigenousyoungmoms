import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  TreePine,
  Users,
  Globe,
  Target,
  Eye,
  Mountain,
  Leaf,
  Shield,
  BookOpen,
  Crown,
  Sunrise,
  Camera,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ChevronLeft,
} from "lucide-react";

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const elementsRef = useRef(new Map());

  // ==================== API FETCH ====================
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3000/api/about/about-data"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          setAboutData(result.data[0]);
        } else {
          throw new Error("No data received from API");
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // ==================== ICON MAPPING ====================
  const iconMap = {
    Heart,
    TreePine,
    Users,
    Globe,
    Target,
    Eye,
    Mountain,
    Leaf,
    Shield,
    BookOpen,
    Crown,
    Sunrise,
    Camera,
  };

  const getIconComponent = (iconName) => {
    return iconMap[iconName] || Heart;
  };

  // ==================== SCROLL EFFECTS ====================
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-slide images
  useEffect(() => {
    if (aboutData?.images?.objectives?.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prev) => (prev + 1) % aboutData.images.objectives.length
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [aboutData?.images?.objectives?.length]);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-reveal-id");
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    const elements = document.querySelectorAll("[data-reveal-id]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [showFullHistory, aboutData]);

  // ==================== UTILITY FUNCTIONS ====================
  const parallaxBgStyle = {
    transform: `translateY(${scrollY * 0.05}px)`,
  };

  const getRevealClass = (id, delay = 0) => {
    const isVisible = visibleElements.has(id);
    return `transition-all duration-1000 ease-out ${
      delay > 0 ? `delay-${delay}` : ""
    } ${
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-12 scale-95"
    }`;
  };

  const getColorClasses = (color) => {
    const colorMap = {
      amber: {
        text: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20 hover:border-amber-400/40",
        shadow: "hover:shadow-amber-500/5",
      },
      emerald: {
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20 hover:border-emerald-400/40",
        shadow: "hover:shadow-emerald-500/5",
      },
      red: {
        text: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20 hover:border-red-400/40",
        shadow: "hover:shadow-red-500/5",
      },
      purple: {
        text: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20 hover:border-purple-400/40",
        shadow: "hover:shadow-purple-500/5",
      },
      blue: {
        text: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20 hover:border-blue-400/40",
        shadow: "hover:shadow-blue-500/5",
      },
      orange: {
        text: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20 hover:border-orange-400/40",
        shadow: "hover:shadow-orange-500/5",
      },
    };
    return colorMap[color] || colorMap.amber;
  };

  const nextImage = () => {
    if (aboutData?.images?.objectives?.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % aboutData.images.objectives.length
      );
    }
  };

  const prevImage = () => {
    if (aboutData?.images?.objectives?.length > 0) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + aboutData.images.objectives.length) %
          aboutData.images.objectives.length
      );
    }
  };

  // Helper function to safely render statistics
  const renderStatistics = (statistics) => {
    if (!statistics || !Array.isArray(statistics)) return null;

    return statistics
      .map((stat, index) => {
        let displayText = "";
        let colorClass = "amber";

        if (typeof stat === "string") {
          displayText = stat;
        } else if (typeof stat === "object" && stat !== null) {
          if (stat.value && stat.label) {
            displayText = `${stat.value} ${stat.label}`;
          } else if (stat.text) {
            displayText =
              typeof stat.text === "string" ? stat.text : String(stat.text);
          } else if (stat.title) {
            displayText =
              typeof stat.title === "string" ? stat.title : String(stat.title);
          } else {
            displayText = JSON.stringify(stat);
          }
          colorClass = stat.color || "amber";
        } else {
          displayText = String(stat);
        }

        if (typeof displayText !== "string") {
          displayText = String(displayText);
        }

        if (!displayText || displayText.trim() === "") {
          return null;
        }

        return (
          <span
            key={index}
            className={`bg-${colorClass}-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-${colorClass}-400/40 hover:border-${colorClass}-400/70 transition-all duration-300 hover:scale-105`}
          >
            {displayText}
          </span>
        );
      })
      .filter(Boolean);
  };

  // ==================== RENDER LOADING STATE ====================
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-slate-300">Loading Yaaku Heritage...</p>
        </div>
      </div>
    );
  }

  // ==================== RENDER ERROR STATE ====================
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">
            Connection Error
          </h2>
          <p className="text-slate-300 mb-4">
            Unable to load content from the server.
          </p>
          <p className="text-sm text-slate-400">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return null;
  }

  // Get data from API
  const heroContent = aboutData.heroContent || {};
  const images = aboutData.images || {};
  const visionMission = aboutData.visionMission || {};
  const objectives = aboutData.objectives || {};
  const historyContent = aboutData.historyContent || {};
  const callToAction = aboutData.callToAction || {};
  const timelineData = aboutData.timelineData || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 opacity-95" style={parallaxBgStyle}>
          <img
            src={
              images.hero ||
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
            }
            alt="Mukogodo Forest"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-yellow-800/5 to-amber-900/20"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-yellow-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>

        <div
          className="relative z-10 text-center px-4 max-w-4xl"
          data-reveal-id="hero"
        >
          <div className={`mb-8 ${getRevealClass("hero")}`}>
            <div className="relative mb-6">
              <Crown className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
              <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-ping" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4 animate-gradient">
              {heroContent.title || "Yaaku Indigenous Tribe"}
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 mb-8 opacity-90 drop-shadow-lg">
              {heroContent.subtitle ||
                "Guardians of Mukogodo Forest • Keepers of Ancient Wisdom"}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              {renderStatistics(heroContent.statistics)}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <div className="w-6 h-10 border-2 border-slate-200/60 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full mt-2 animate-pulse"></div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-200 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      {visionMission.title && (
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 opacity-10" style={parallaxBgStyle}>
            <img
              src={
                images.hero ||
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
              }
              alt="Forest Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-800/95"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div
              className={`text-center mb-16 ${getRevealClass("vision-title")}`}
              data-reveal-id="vision-title"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                <Eye className="w-8 h-8 text-amber-400" />
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-300 mb-4">
                {visionMission.title}
              </h2>
              {visionMission.subtitle && (
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  {visionMission.subtitle}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Vision Card */}
              {visionMission.vision && (
                <div
                  className={`relative ${getRevealClass("vision-card")}`}
                  data-reveal-id="vision-card"
                >
                  <div
                    className={`group relative bg-slate-800/20 backdrop-blur-sm p-8 rounded-2xl border ${
                      getColorClasses(visionMission.vision.color || "amber")
                        .border
                    } transition-all duration-500 hover:shadow-2xl ${
                      getColorClasses(visionMission.vision.color || "amber")
                        .shadow
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent rounded-2xl"></div>
                    <Eye
                      className={`w-12 h-12 ${
                        getColorClasses(visionMission.vision.color || "amber")
                          .text
                      } mb-6 group-hover:scale-110 transition-transform duration-300`}
                    />
                    <h3
                      className={`text-2xl font-bold ${
                        getColorClasses(visionMission.vision.color || "amber")
                          .text
                      } mb-4`}
                    >
                      {visionMission.vision.title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {visionMission.vision.description}
                    </p>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight
                        className={`w-5 h-5 ${
                          getColorClasses(visionMission.vision.color || "amber")
                            .text
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mission Card */}
              {visionMission.mission && (
                <div
                  className={`relative ${getRevealClass("mission-card", 200)}`}
                  data-reveal-id="mission-card"
                >
                  <div
                    className={`group relative bg-slate-800/20 backdrop-blur-sm p-8 rounded-2xl border ${
                      getColorClasses(visionMission.mission.color || "emerald")
                        .border
                    } transition-all duration-500 hover:shadow-2xl ${
                      getColorClasses(visionMission.mission.color || "emerald")
                        .shadow
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent rounded-2xl"></div>
                    <Target
                      className={`w-12 h-12 ${
                        getColorClasses(
                          visionMission.mission.color || "emerald"
                        ).text
                      } mb-6 group-hover:scale-110 transition-transform duration-300`}
                    />
                    <h3
                      className={`text-2xl font-bold ${
                        getColorClasses(
                          visionMission.mission.color || "emerald"
                        ).text
                      } mb-4`}
                    >
                      {visionMission.mission.title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {visionMission.mission.description}
                    </p>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight
                        className={`w-5 h-5 ${
                          getColorClasses(
                            visionMission.mission.color || "emerald"
                          ).text
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Objectives Section - Only show if items exist */}
      {objectives.items && objectives.items.length > 0 && (
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-8" style={parallaxBgStyle}>
            <img
              src={
                images.hero ||
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
              }
              alt="Forest Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800/95 to-slate-700/95"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div
              className={`text-center mb-16 ${getRevealClass(
                "objectives-title"
              )}`}
              data-reveal-id="objectives-title"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                <Sunrise className="w-8 h-8 text-yellow-400" />
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
                {objectives.title || "Our Objectives"}
              </h2>
              {objectives.subtitle && (
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  {objectives.subtitle}
                </p>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Slider */}
              {images.objectives && images.objectives.length > 0 && (
                <div
                  className={`relative ${getRevealClass("objectives-slider")}`}
                  data-reveal-id="objectives-slider"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>

                    {images.objectives.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                          index === currentImageIndex
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-105"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Yaaku Heritage ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}

                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300 group-hover:opacity-100 opacity-70"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300 group-hover:opacity-100 opacity-70"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                      {images.objectives.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-amber-400 w-8"
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="absolute top-4 right-4 z-20 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                      {currentImageIndex + 1} / {images.objectives.length}
                    </div>
                  </div>
                </div>
              )}

              {/* Objectives Content */}
              <div className="space-y-8">
                {objectives.items.map((objective, index) => {
                  const IconComponent = getIconComponent(objective.icon);
                  return (
                    <div
                      key={objective.id || index}
                      className={`${getRevealClass(
                        `obj-${index + 1}`,
                        index * 200
                      )}`}
                      data-reveal-id={`obj-${index + 1}`}
                    >
                      <div
                        className={`group bg-slate-800/20 backdrop-blur-sm p-6 rounded-2xl border ${
                          getColorClasses(objective.color).border
                        } transition-all duration-500 hover:shadow-xl ${
                          getColorClasses(objective.color).shadow
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div
                              className={`w-12 h-12 ${
                                getColorClasses(objective.color).bg
                              } rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                              <IconComponent
                                className={`w-6 h-6 ${
                                  getColorClasses(objective.color).text
                                }`}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`text-xl font-bold ${
                                getColorClasses(objective.color).text
                              } mb-2`}
                            >
                              {objective.title}
                            </h3>
                            <p className="text-slate-300 leading-relaxed">
                              {objective.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* History Section - Only show if sections exist */}
      {historyContent.sections && historyContent.sections.length > 0 && (
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 opacity-5" style={parallaxBgStyle}>
            <img
              src={
                images.hero ||
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
              }
              alt="Forest Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-700/95 to-slate-900/95"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div
              className={`text-center mb-16 ${getRevealClass("history-title")}`}
              data-reveal-id="history-title"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                <BookOpen className="w-8 h-8 text-amber-400" />
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
                {historyContent.title || "Our Heritage"}
              </h2>
              {historyContent.subtitle && (
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  {historyContent.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-8">
              {historyContent.sections.map((section, index) => {
                const IconComponent = getIconComponent(section.icon);
                const isVisible = showFullHistory || section.alwaysVisible;

                if (!isVisible && index >= 1) return null;

                return (
                  <div
                    key={section.id || index}
                    className={`${getRevealClass(
                      `history-${index + 1}`,
                      index * 200
                    )}`}
                    data-reveal-id={`history-${index + 1}`}
                  >
                    <div
                      className={`group bg-slate-800/20 backdrop-blur-sm p-8 rounded-2xl border ${
                        getColorClasses(section.color || "amber").border
                      } transition-all duration-500 hover:shadow-xl ${
                        getColorClasses(section.color || "amber").shadow
                      }`}
                    >
                      <div className="flex items-start gap-6">
                        {section.icon && (
                          <div className="flex-shrink-0">
                            <div
                              className={`w-14 h-14 ${
                                getColorClasses(section.color || "amber").bg
                              } rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                              <IconComponent
                                className={`w-7 h-7 ${
                                  getColorClasses(section.color || "amber").text
                                }`}
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3
                            className={`text-2xl font-bold ${
                              getColorClasses(section.color || "amber").text
                            } mb-4`}
                          >
                            {section.title}
                          </h3>
                          <p className="text-slate-300 text-lg leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Show More/Less Button */}
            {historyContent.sections.length > 1 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowFullHistory(!showFullHistory)}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-amber-600/20 backdrop-blur-sm rounded-full border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <BookOpen className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-amber-400 font-medium">
                    {showFullHistory ? "Show Less" : "Discover More"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 transition-transform duration-300 ${
                      showFullHistory ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Timeline Section - Only show if timeline data exists */}
      {timelineData && timelineData.length > 0 && (
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 opacity-5" style={parallaxBgStyle}>
            <img
              src={
                images.hero ||
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
              }
              alt="Forest Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-800/95"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div
              className={`text-center mb-16 ${getRevealClass(
                "timeline-title"
              )}`}
              data-reveal-id="timeline-title"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
                <Mountain className="w-8 h-8 text-emerald-400" />
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Journey Through Time
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Milestones in our preservation efforts
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-400 via-blue-400 to-purple-400 rounded-full"></div>

              {timelineData.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  } mb-12 ${getRevealClass(
                    `timeline-${index + 1}`,
                    index * 200
                  )}`}
                  data-reveal-id={`timeline-${index + 1}`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"} ${
                      index % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`group bg-slate-800/20 backdrop-blur-sm p-6 rounded-2xl border ${
                        getColorClasses(item.color || "emerald").border
                      } transition-all duration-500 hover:shadow-xl ${
                        getColorClasses(item.color || "emerald").shadow
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {item.icon && (
                          <div className="flex-shrink-0">
                            <div
                              className={`w-12 h-12 ${
                                getColorClasses(item.color || "emerald").bg
                              } rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                              {React.createElement(
                                getIconComponent(item.icon),
                                {
                                  className: `w-6 h-6 ${
                                    getColorClasses(item.color || "emerald")
                                      .text
                                  }`,
                                }
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex-1">
                          <div
                            className={`text-sm font-medium ${
                              getColorClasses(item.color || "emerald").text
                            } mb-2`}
                          >
                            {item.year}
                          </div>
                          <h3 className="text-xl font-bold text-slate-200 mb-3">
                            {item.title}
                          </h3>
                          <p className="text-slate-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full border-4 border-slate-800 z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      {callToAction.title && (
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={parallaxBgStyle}>
            <img
              src={
                images.hero ||
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
              }
              alt="Forest Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/50 to-orange-900/50"></div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className={`${getRevealClass("cta")}`} data-reveal-id="cta">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                <Heart className="w-8 h-8 text-amber-400 animate-pulse" />
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-6">
                {callToAction.title}
              </h2>

              {callToAction.subtitle && (
                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {callToAction.subtitle}
                </p>
              )}

              {callToAction.buttons && callToAction.buttons.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4">
                  {callToAction.buttons.map((button, index) => (
                    <button
                      key={index}
                      className={`group px-8 py-4 ${
                        button.primary
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                          : "bg-slate-800/20 backdrop-blur-sm border border-amber-400/30 text-amber-400 hover:border-amber-400/60"
                      } rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        button.primary
                          ? "hover:shadow-amber-500/25"
                          : "hover:shadow-amber-500/10"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {button.icon &&
                          React.createElement(getIconComponent(button.icon), {
                            className: `w-5 h-5 ${
                              button.primary ? "" : "text-amber-400"
                            } group-hover:rotate-12 transition-transform duration-300`,
                          })}
                        {button.text}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-amber-400" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Yaaku Heritage
            </h3>
          </div>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Preserving our ancestral wisdom for future generations. Together, we
            protect the sacred bond between the Yaaku people and Mukogodo
            Forest.
          </p>
          <div className="flex justify-center gap-6 text-slate-500">
            <div className="flex items-center gap-2">
              <TreePine className="w-4 h-4" />
              <span className="text-sm">Forest Guardians</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">Community United</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Heritage Protected</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
