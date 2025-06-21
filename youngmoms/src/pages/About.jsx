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
  const elementsRef = useRef(new Map());

  // Sample images - you can replace these with your actual images
  const objectiveImages = [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2125&q=80",
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ];

  const heroImage =
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % objectiveImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [objectiveImages.length]);

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

    // Observe all elements with data-reveal-id
    const elements = document.querySelectorAll("[data-reveal-id]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [showFullHistory]);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % objectiveImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + objectiveImages.length) % objectiveImages.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Image - Subtle parallax */}
        <div className="absolute inset-0 opacity-95" style={parallaxBgStyle}>
          <img
            src={heroImage}
            alt="Mukogodo Forest"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-yellow-800/5 to-amber-900/20"></div>
        </div>

        {/* Floating glass elements */}
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
              Yaaku Indigenous Tribe
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 mb-8 opacity-90 drop-shadow-lg">
              Guardians of Mukogodo Forest • Keepers of Ancient Wisdom
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="bg-amber-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-400/40 hover:border-amber-400/70 transition-all duration-300 hover:scale-105">
                8,000 Indigenous People
              </span>
              <span className="bg-red-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-red-400/40 hover:border-red-400/70 transition-all duration-300 hover:scale-105">
                1 Fluent Speaker Remaining
              </span>
              <span className="bg-orange-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-400/40 hover:border-orange-400/70 transition-all duration-300 hover:scale-105">
                74,000 Acres Protected
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <div className="w-6 h-10 border-2 border-slate-200/60 rounded-full flex justify-center backdrop-blur-sm">
              <div className="w-1 h-3 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full mt-2 animate-pulse"></div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <section className="py-20 px-4 relative">
        {/* Subtle background */}
        <div className="absolute inset-0 opacity-10" style={parallaxBgStyle}>
          <img
            src={heroImage}
            alt="Forest Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-800/95"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Title */}
          <div
            className={`text-center mb-16 ${getRevealClass("vision-title")}`}
            data-reveal-id="vision-title"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <Eye className="w-8 h-8 text-amber-400" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-300">
              Our Foundation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div
              className={`relative ${getRevealClass("vision-card")}`}
              data-reveal-id="vision-card"
            >
              <div className="group relative bg-slate-800/20 backdrop-blur-sm p-8 rounded-2xl border border-slate-600/30 hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent rounded-2xl"></div>
                <Eye className="w-12 h-12 text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-amber-400 mb-4">
                  VISION
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  We envision creating a poverty free Yaaku community. Where
                  every persons dignity is protected especially those affected
                  by human and natural crisis.
                </p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </div>

            {/* Mission */}
            <div
              className={`relative ${getRevealClass("mission-card", 200)}`}
              data-reveal-id="mission-card"
            >
              <div className="group relative bg-slate-800/20 backdrop-blur-sm p-8 rounded-2xl border border-slate-600/30 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent rounded-2xl"></div>
                <Target className="w-12 h-12 text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-emerald-400 mb-4">
                  MISSION
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  To provide people affected by human & natural crisis in Yaaku
                  community with educational programs, sustainable social
                  economic programs and promote peace building & effective
                  governance.
                </p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => (window.location.href = "/missions")}
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section with Image Slider */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-8" style={parallaxBgStyle}>
          <img
            src={heroImage}
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
              Our Objectives
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Dedicated to preserving heritage, empowering communities, and
              protecting our sacred lands
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Slider */}
            <div
              className={`relative ${getRevealClass("objectives-slider")}`}
              data-reveal-id="objectives-slider"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>

                {/* Images */}
                {objectiveImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentImageIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                    style={{
                      transform: `translateX(${
                        (index - currentImageIndex) * 100
                      }%) translateY(${scrollY * 0.02}px)`,
                    }}
                  >
                    <img
                      src={image}
                      alt={`Yaaku Heritage ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Navigation Buttons */}
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

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {objectiveImages.map((_, index) => (
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

                {/* Image Counter */}
                <div className="absolute top-4 right-4 z-20 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                  {currentImageIndex + 1} / {objectiveImages.length}
                </div>
              </div>
            </div>

            {/* Objectives Content */}
            <div className="space-y-8">
              {/* Cultural Revival */}
              <div
                className={`${getRevealClass("obj-1")}`}
                data-reveal-id="obj-1"
              >
                <div className="group bg-slate-800/20 backdrop-blur-sm p-6 rounded-2xl border border-red-500/20 hover:border-red-400/40 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center group-hover:bg-red-500/20 transition-colors duration-300">
                        <BookOpen className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-red-400 mb-3">
                        Cultural Revival & Language Preservation
                      </h3>
                      <p className="text-slate-300 text-base leading-relaxed">
                        Revival of Yaaku culture and our dying Yaakunte
                        language, working with our last fluent speaker to
                        preserve ancient wisdom for future generations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Climate Action */}
              <div
                className={`${getRevealClass("obj-2", 200)}`}
                data-reveal-id="obj-2"
              >
                <div className="group bg-slate-800/20 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-300">
                        <Leaf className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-emerald-400 mb-3">
                        Climate Action & Forest Protection
                      </h3>
                      <p className="text-slate-300 text-base leading-relaxed">
                        Protecting Mukogodo Forest through sustainable practices
                        and community-led conservation efforts to combat climate
                        change.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Women Empowerment */}
              <div
                className={`${getRevealClass("obj-3", 400)}`}
                data-reveal-id="obj-3"
              >
                <div className="group bg-slate-800/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-300">
                        <Heart className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-purple-400 mb-3">
                        Gender Equality & Women Empowerment
                      </h3>
                      <p className="text-slate-300 text-base leading-relaxed">
                        Empowering Yaaku women through the Eco village
                        initiative and eliminating harmful practices while
                        promoting economic independence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background History Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 opacity-8" style={parallaxBgStyle}>
          <img
            src={heroImage}
            alt="Mukogodo Forest Heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className={`text-center mb-16 ${getRevealClass("history-title")}`}
            data-reveal-id="history-title"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <Globe className="w-8 h-8 text-blue-400" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Background History
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              From the Western slopes of Mount Kenya, the Yaaku people have been
              guardians of Mukogodo Forest for generations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <div className="space-y-8">
              {/* First section - always visible */}
              <div
                className={`${getRevealClass("history-1")}`}
                data-reveal-id="history-1"
              >
                <div className="group bg-slate-800/20 backdrop-blur-sm p-8 rounded-2xl border border-slate-600/30 hover:border-blue-400/40 transition-all duration-500">
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    In the expansive Rift valley (Laikipia north district)
                    western slopes of Mount Kenya lives one of the smallest
                    indigenous tribes in the world. The Yaaku, with a population
                    of approximately 8000 and only 1 Elder who can speak fluent
                    native yaakunte language Mr. Leriman Leitiko who is the
                    motivation behind formation of our organisation. Making it
                    one of the worlds endangered languages as per UNESCO's Red
                    Book under "language endangerment and facing extinction".
                  </p>

                  {!showFullHistory && (
                    <button
                      onClick={() => setShowFullHistory(true)}
                      className="group inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
                    >
                      <span>Discover our complete story</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </button>
                  )}
                </div>
              </div>

              {/* Additional sections - show on demand with smooth animations */}
              <div
                className={`space-y-8 transition-all duration-1000 ease-out ${
                  showFullHistory
                    ? "opacity-100 translate-y-0 max-h-screen"
                    : "opacity-0 translate-y-8 max-h-0 overflow-hidden"
                }`}
              >
                <div
                  className={`${getRevealClass("history-2")}`}
                  data-reveal-id="history-2"
                >
                  <div className="bg-slate-800/20 backdrop-blur-sm p-8 rounded-2xl border border-slate-600/30 hover:border-emerald-400/40 transition-all duration-500">
                    <h4 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                      <TreePine className="w-5 h-5" />
                      Sacred Forest Homeland
                    </h4>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      The Yaaku tribe lived in rock caves and stick thatched
                      houses in Mukogodo forest which is a forest which is one
                      of the largest Indigenous forests in Eastern Africa and is
                      protected by the community with minimum government
                      involvement. It covers approximately 74,000 Acres and
                      habitat of indigenous species of trees and animals. The
                      forest was and still is somehow the main source of their
                      livelihoods and being hunters and gatherers they depended
                      on it for bush meat, nuts, fruits, bee keeping for honey &
                      natural dyes.
                    </p>
                  </div>
                </div>

                <div
                  className={`${getRevealClass("history-3", 200)}`}
                  data-reveal-id="history-3"
                >
                  <div className="bg-slate-800/20 backdrop-blur-sm p-8 rounded-2xl border border-slate-600/30 hover:border-purple-400/40 transition-all duration-500">
                    <h4 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Indigenous Young Moms CBO
                    </h4>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      The indigenous Young Moms CBO is a Yaaku Community Welfare
                      organisation founded in the year 2019. Since its
                      inception, IYM ultimate priority is the survival & revival
                      of Yaakunte dialect and the Yaaku culture in general,
                      Protection of Mukogodo Forest, Indigenous Knowledge and
                      livelihood support for the Yaaku people.
                    </p>
                  </div>
                </div>

                <div
                  className={`${getRevealClass("history-4", 400)}`}
                  data-reveal-id="history-4"
                >
                  <div className="bg-slate-800/20 backdrop-blur-sm p-8 rounded-2xl border border-slate-600/30 hover:border-amber-400/40 transition-all duration-500">
                    <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      Cultural Renaissance
                    </h4>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      Today, the Yaaku community stands at a crossroads between
                      ancient traditions and modern challenges. Through the
                      dedicated work of Indigenous Young Moms and the wisdom of
                      elders like Mr. Leriman Leitiko, we are witnessing a
                      cultural renaissance that honors our past while building a
                      sustainable future for generations to come.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Timeline */}
            <div className="space-y-6">
              <div
                className={`${getRevealClass("timeline")}`}
                data-reveal-id="timeline"
              >
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 via-purple-400 to-amber-400"></div>

                  {/* Timeline Items */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-400/50">
                        <Mountain className="w-8 h-8 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-blue-400">
                          Ancient Heritage
                        </h4>
                        <p className="text-slate-400">
                          Mount Kenya slopes, rock caves, traditional lifestyle
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-400/50">
                        <TreePine className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-emerald-400">
                          Forest Guardians
                        </h4>
                        <p className="text-slate-400">
                          74,000 acres of Mukogodo Forest protection
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-400/50">
                        <BookOpen className="w-8 h-8 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-red-400">
                          Language Crisis
                        </h4>
                        <p className="text-slate-400">
                          UNESCO endangered language, 1 fluent speaker
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center border-2 border-purple-400/50">
                        <Users className="w-8 h-8 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-purple-400">
                          2019 - IYM Founded
                        </h4>
                        <p className="text-slate-400">
                          Indigenous Young Moms CBO established
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center border-2 border-amber-400/50">
                        <Sunrise className="w-8 h-8 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-amber-400">
                          Cultural Revival
                        </h4>
                        <p className="text-slate-400">
                          Present day renaissance and preservation efforts
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-68 px-4 relative">
        <div className="absolute inset-0 opacity-10" style={parallaxBgStyle}>
          <img
            src={heroImage}
            alt="Join Our Mission"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/90 to-slate-900"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className={`${getRevealClass("cta")}`} data-reveal-id="cta">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-amber-400" />
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                <Shield className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-6">
                Join Our Mission
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Help us preserve the Yaaku heritage, protect Mukogodo Forest,
                and ensure our ancient wisdom survives for future generations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Support Our Cause
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>

                <button className="group px-8 py-4 border-2 border-slate-400/50 rounded-xl font-semibold text-slate-300 hover:border-amber-400/70 hover:text-amber-400 transition-all duration-300 hover:scale-105">
                  <span className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Learn More
                  </span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="group">
                <div className="text-3xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  8,000
                </div>
                <div className="text-slate-400">Indigenous People</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="text-slate-400">Fluent Speaker</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  74,000
                </div>
                <div className="text-slate-400">Acres Protected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          <div className="w-6 h-6 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-1 group-hover:animate-bounce"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default About;
