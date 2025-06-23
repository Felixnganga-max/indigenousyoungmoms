import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Sparkles,
  Heart,
  TreePine,
  Users,
  Globe,
} from "lucide-react";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.index]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll("[data-index]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProject.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedProject.images.length) %
          selectedProject.images.length
      );
    }
  };

  const openModal = (program, index) => {
    setSelectedProject({ ...program, index });
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "unset";
  };

  // Enhanced sample images with better variety
  const sampleImages = [
    "https://res.cloudinary.com/demo/image/upload/v1639562351/sample.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1639562351/sample-2.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1639562351/sample-3.jpg",
  ];

  const programs = [
    {
      title: "Language Revival through Tree Planting and Tagging",
      goal: "Strengthen cultural identity and environmental stewardship",
      icon: <TreePine className="w-6 h-6" />,
      description: [
        "Community members are encouraged to plant indigenous trees in sacred ceremonies that honor both the earth and our ancestors.",
        "Each tree is tagged with both English and Yaakunte names, creating a living bilingual forest that serves as a natural library of knowledge.",
        "Learners must memorize and pronounce a Yaakunte word before planting a tree, creating a powerful ritual of growth and learning.",
        "As the tree grows, so does the language—deeply rooted and thriving in the hearts of our people.",
        "This reconnects the community with its hunter-gatherer heritage, making the forest a living classroom where every leaf tells a story.",
      ],
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      images: sampleImages,
    },
    {
      title: "Language Revival through Weekly Yaakunte Classes",
      goal: "Build a new generation of fluent Yaakunte speakers",
      icon: <Users className="w-6 h-6" />,
      description: [
        "Weekly classes target children and youth, helping them reconnect with their roots through immersive learning experiences.",
        "Over 300 learners are involved in shifts due to limited space, creating a vibrant community of language warriors.",
        "The curriculum includes speaking, reading, writing, and cultural expression through song, dance, and storytelling.",
      ],
      gradient: "from-blue-400 via-indigo-500 to-purple-600",
      images: sampleImages,
    },
    {
      title: "Language Revitalization through Storytelling",
      goal: "Preserve ancestral knowledge and pass it on",
      icon: <Sparkles className="w-6 h-6" />,
      description: [
        "Elders lead storytelling sessions under the stars, sharing folk tales, riddles, and proverbs in Yaakunte that have been passed down for generations.",
        "Youth document and perform these stories through theatre, music, and community events that bring the entire village together.",
        "These sessions reinforce language fluency and build pride in identity, creating bridges between past and future.",
      ],
      gradient: "from-purple-400 via-pink-500 to-rose-600",
      images: sampleImages,
    },
    {
      title: "Economic Empowerment through Beekeeping",
      goal: "Provide sustainable income and cultural connection",
      icon: <Heart className="w-6 h-6" />,
      description: [
        "Women and youth are trained in traditional and modern beekeeping techniques passed down through generations.",
        "Beehives are distributed to create local businesses around honey and beeswax, supporting families and communities.",
        "The program combines ecological knowledge with economic opportunity, creating sweet success for all involved.",
      ],
      gradient: "from-yellow-400 via-orange-500 to-red-600",
      images: sampleImages,
    },
    {
      title: 'Climate Action: "Climate Justice is Women\'s Justice"',
      goal: "Promote environmental sustainability through Indigenous women's leadership",
      icon: <Globe className="w-6 h-6" />,
      description: [
        "Indigenous women lead reforestation efforts, seed collection, and tree tagging in Yaakunte, embodying the spirit of Mother Earth.",
        "Women use traditional ecological knowledge to restore and protect sacred forests, becoming guardians of ancient wisdom.",
        "This activity raises awareness that women are climate defenders and caretakers of life, leading the charge for our planet's future.",
        "Youth join as climate ambassadors, helping in tree nurseries, forest monitoring, and awareness campaigns that inspire global change.",
      ],
      gradient: "from-teal-400 via-cyan-500 to-blue-600",
      images: sampleImages,
    },
    {
      title: "Intergenerational Mentorship Programs",
      goal: "Connect elders, women, and youth in knowledge exchange",
      icon: <Users className="w-6 h-6" />,
      description: [
        "Create mentorship circles where elder women teach girls and young women traditional skills in sacred spaces:",
        "- Herbal medicine and natural healing practices",
        "- Food preservation techniques passed down through generations",
        "- Storytelling and language immersion experiences",
        "Youth also share digital skills, documenting oral knowledge using phones and recorders to preserve wisdom for future generations.",
      ],
      gradient: "from-indigo-400 via-purple-500 to-pink-600",
      images: sampleImages,
    },
    {
      title: "Theatre and Performance for Cultural Revival",
      goal: "Use art as a tool for language revival and expression",
      icon: <Sparkles className="w-6 h-6" />,
      description: [
        "Youth and women form community theatre groups to perform in Yaakunte at local events, bringing stories to life with passion and power.",
        "Themes focus on climate change, women's rights, and cultural resilience, addressing the most pressing issues of our time.",
        "Performances are recorded and shared to inspire learning and visibility, spreading our message far and wide.",
      ],
      gradient: "from-pink-400 via-rose-500 to-red-600",
      images: sampleImages,
    },
    {
      title: "Indigenous Girls' Leadership Circles",
      goal: "Empower girls with voice, confidence, and skills",
      icon: <Heart className="w-6 h-6" />,
      description: [
        "Safe spaces where girls learn public speaking, cultural leadership, storytelling, and environmental education in supportive environments.",
        "Girls are trained to become language ambassadors and peer educators, leading their communities with wisdom and strength.",
        "They participate in forums on FGM, land rights, and climate justice, becoming voices for change and hope.",
      ],
      gradient: "from-rose-400 via-pink-500 to-purple-600",
      images: sampleImages,
    },
    {
      title: "Digital Language and Story Archives",
      goal: "Preserve and share Yaakunte language and oral history",
      icon: <Globe className="w-6 h-6" />,
      description: [
        "Youth and women record stories, songs, and wisdom in Yaakunte using mobile tools, creating digital treasures for future generations.",
        "Content is uploaded to a community-based digital archive and shared in schools and cultural centers worldwide.",
        "This encourages tech use for heritage protection, bridging ancient wisdom with modern innovation.",
      ],
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      images: sampleImages,
    },
    {
      title: "Cultural Crafts and Livelihood Skills Training",
      goal: "Revive Indigenous arts while generating income",
      icon: <TreePine className="w-6 h-6" />,
      description: [
        "Women and youth learn traditional beadwork, basket weaving, and leatherwork tied to Yaaku identity, creating beautiful works of art.",
        "Products are sold locally and online, supporting families and promoting culture while sharing our heritage with the world.",
      ],
      gradient: "from-orange-400 via-red-500 to-pink-600",
      images: sampleImages,
    },
  ];

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white/90 font-medium">
                Community Impact
              </span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              Transformative Projects
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Comprehensive initiatives designed to strengthen cultural
              identity, preserve Indigenous heritage, and empower communities
              through sustainable development and innovation.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                data-index={index}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-700 transform hover:scale-105 cursor-pointer ${
                  isVisible[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => openModal(program, index)}
              >
                {/* Card Background with Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-90`}
                ></div>

                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Preview Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.images[0]}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                    <div className="text-white">{program.icon}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {program.title}
                  </h3>
                  <p className="text-white/90 text-sm font-medium mb-3">
                    {program.goal}
                  </p>

                  {/* Read More Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </div>
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <span className="text-white font-bold text-sm">
                    {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "10",
                label: "Active Projects",
                gradient: "from-blue-400 to-purple-600",
              },
              {
                number: "300+",
                label: "Community Learners",
                gradient: "from-green-400 to-teal-600",
              },
              {
                number: "100%",
                label: "Community Focused",
                gradient: "from-pink-400 to-rose-600",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-300">
                  <div
                    className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div
            className="relative w-full max-w-6xl max-h-screen overflow-hidden rounded-3xl bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 shadow-2xl transform transition-all duration-300 scale-95 opacity-0"
            style={{ transform: "scale(1)", opacity: "1" }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-20 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Slider */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - Image ${
                  currentImageIndex + 1
                }`}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {selectedProject.images.map((_, imgIndex) => (
                  <button
                    key={imgIndex}
                    onClick={() => setCurrentImageIndex(imgIndex)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentImageIndex === imgIndex
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              {/* Project Number Badge */}
              <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white font-bold">
                  Project {selectedProject.index + 1}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 max-h-96 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-black mb-3">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-yellow-800">{selectedProject.icon}</div>
                  <p className="text-xl font-medium text-cyan-700">
                    {selectedProject.goal}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gray-900" />
                  Activity Description
                </h3>
                <div className="space-y-4">
                  {selectedProject.description.map((item, itemIndex) => (
                    <p
                      key={itemIndex}
                      className="text-black/90 leading-relaxed text-lg"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
