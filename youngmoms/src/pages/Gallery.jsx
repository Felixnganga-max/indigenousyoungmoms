import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Grid,
  Calendar,
  Users,
  Heart,
  Download,
  Eye,
  MapPin,
  Tag,
  Image as ImageIcon,
  Star,
  Camera,
  Award,
  Baby,
  GraduationCap,
  Home,
  Sparkles,
  ChevronDown,
  X,
  TrendingUp,
  Clock,
  Shuffle,
} from "lucide-react";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState("masonry");
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [relatedPhotos, setRelatedPhotos] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample gallery data with categories - replace with database data later
  const galleryData = [
    {
      id: 1,
      title: "Community Wellness Workshop",
      category: "workshops",
      event: "Mental Health Awareness Week",
      date: "2024-03-15",
      location: "Community Center",
      photographer: "Sarah Johnson",
      description: "Indigenous mothers participating in wellness activities",
      imageUrl:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
      likes: 24,
      views: 156,
      tags: ["wellness", "community", "mental-health", "mothers"],
    },
    {
      id: 2,
      title: "Traditional Cooking Class",
      category: "cultural",
      event: "Cultural Heritage Month",
      date: "2024-02-28",
      location: "Cultural Center",
      photographer: "Maria Santos",
      description:
        "Learning traditional recipes passed down through generations",
      imageUrl:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      likes: 45,
      views: 289,
      tags: ["cooking", "tradition", "culture", "heritage"],
    },
    {
      id: 3,
      title: "Children's Play Day",
      category: "family",
      event: "Family Fun Weekend",
      date: "2024-04-10",
      location: "City Park",
      photographer: "Jennifer Wilson",
      description: "Young mothers and children enjoying outdoor activities",
      imageUrl:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
      likes: 67,
      views: 342,
      tags: ["children", "play", "outdoor", "family"],
    },
    {
      id: 4,
      title: "Educational Workshop",
      category: "education",
      event: "Learning Together Series",
      date: "2024-01-20",
      location: "Library",
      photographer: "Amanda Lee",
      description: "Young mothers attending parenting and education workshop",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      likes: 33,
      views: 198,
      tags: ["education", "learning", "parenting", "workshop"],
    },
    {
      id: 5,
      title: "Graduation Ceremony",
      category: "achievements",
      event: "Program Completion",
      date: "2024-05-15",
      location: "Conference Hall",
      photographer: "Robert Kim",
      description: "Celebrating mothers who completed educational programs",
      imageUrl:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&q=80",
      likes: 89,
      views: 456,
      tags: ["graduation", "achievement", "celebration", "education"],
    },
    {
      id: 6,
      title: "Art Therapy Session",
      category: "workshops",
      event: "Creative Healing Program",
      date: "2024-03-08",
      location: "Art Studio",
      photographer: "Lisa Chen",
      description: "Mothers expressing themselves through art and creativity",
      imageUrl:
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
      likes: 52,
      views: 267,
      tags: ["art", "therapy", "creativity", "healing"],
    },
    {
      id: 7,
      title: "Community Garden Project",
      category: "community",
      event: "Green Initiative",
      date: "2024-04-22",
      location: "Community Garden",
      photographer: "David Martinez",
      description: "Families working together to maintain community garden",
      imageUrl:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      likes: 41,
      views: 234,
      tags: ["garden", "environment", "community", "sustainability"],
    },
    {
      id: 8,
      title: "Baby & Me Yoga",
      category: "family",
      event: "Wellness for Moms",
      date: "2024-02-14",
      location: "Wellness Center",
      photographer: "Rachel Green",
      description: "New mothers practicing yoga with their babies",
      imageUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      likes: 78,
      views: 401,
      tags: ["yoga", "baby", "wellness", "bonding"],
    },
    {
      id: 9,
      title: "Storytelling Circle",
      category: "cultural",
      event: "Traditional Stories Night",
      date: "2024-03-30",
      location: "Elder's Hall",
      photographer: "Michael Brown",
      description: "Elders sharing traditional stories with young mothers",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      likes: 36,
      views: 187,
      tags: ["storytelling", "tradition", "elders", "culture"],
    },
    {
      id: 10,
      title: "Leadership Workshop",
      category: "education",
      event: "Empowerment Series",
      date: "2024-01-25",
      location: "Conference Room",
      photographer: "Patricia Davis",
      description: "Young mothers developing leadership skills",
      imageUrl:
        "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&q=80",
      likes: 94,
      views: 512,
      tags: ["leadership", "empowerment", "skills", "development"],
    },
    {
      id: 11,
      title: "Cultural Dance Performance",
      category: "cultural",
      event: "Heritage Festival",
      date: "2024-06-01",
      location: "Festival Grounds",
      photographer: "Carlos Rodriguez",
      description: "Traditional dance performance by community members",
      imageUrl:
        "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80",
      likes: 156,
      views: 723,
      tags: ["dance", "performance", "culture", "festival"],
    },
    {
      id: 12,
      title: "Support Group Meeting",
      category: "support",
      event: "Weekly Support Circle",
      date: "2024-04-03",
      location: "Community Room",
      photographer: "Helen White",
      description: "Mothers sharing experiences and supporting each other",
      imageUrl:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
      likes: 29,
      views: 145,
      tags: ["support", "community", "sharing", "circle"],
    },
  ];

  // Categories for filtering with creative positioning
  const categories = [
    {
      id: "all",
      label: "All Photos",
      icon: ImageIcon,
      count: galleryData.length,
      color: "from-purple-500 to-pink-500",
      position: { top: "5%", left: "10%" },
      size: "large",
    },
    {
      id: "workshops",
      label: "Workshops",
      icon: GraduationCap,
      count: galleryData.filter((p) => p.category === "workshops").length,
      color: "from-blue-500 to-cyan-500",
      position: { top: "25%", left: "5%" },
      size: "medium",
    },
    {
      id: "cultural",
      label: "Cultural Events",
      icon: Star,
      count: galleryData.filter((p) => p.category === "cultural").length,
      color: "from-amber-500 to-orange-500",
      position: { top: "15%", left: "25%" },
      size: "small",
    },
    {
      id: "family",
      label: "Family & Kids",
      icon: Baby,
      count: galleryData.filter((p) => p.category === "family").length,
      color: "from-pink-500 to-rose-500",
      position: { top: "45%", left: "8%" },
      size: "medium",
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      count: galleryData.filter((p) => p.category === "education").length,
      color: "from-emerald-500 to-teal-500",
      position: { top: "35%", left: "22%" },
      size: "large",
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Award,
      count: galleryData.filter((p) => p.category === "achievements").length,
      color: "from-yellow-500 to-amber-500",
      position: { top: "65%", left: "12%" },
      size: "small",
    },
    {
      id: "community",
      label: "Community",
      icon: Users,
      count: galleryData.filter((p) => p.category === "community").length,
      color: "from-green-500 to-emerald-500",
      position: { top: "55%", left: "25%" },
      size: "medium",
    },
    {
      id: "support",
      label: "Support Groups",
      icon: Heart,
      count: galleryData.filter((p) => p.category === "support").length,
      color: "from-red-500 to-pink-500",
      position: { top: "75%", left: "8%" },
      size: "small",
    },
  ];

  // Filter photos based on category and search
  useEffect(() => {
    let filtered = galleryData;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (photo) => photo.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (photo) =>
          photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          photo.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          photo.event.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPhotos(filtered);

    // Generate related photos
    if (selectedCategory !== "all") {
      const currentCategoryPhotos = galleryData.filter(
        (p) => p.category === selectedCategory
      );
      const otherPhotos = galleryData.filter(
        (p) => p.category !== selectedCategory
      );
      const related = otherPhotos
        .filter((photo) =>
          currentCategoryPhotos.some((cp) =>
            cp.tags.some((tag) => photo.tags.includes(tag))
          )
        )
        .slice(0, 4);
      setRelatedPhotos(related);
    } else {
      setRelatedPhotos([]);
    }
  }, [selectedCategory, searchTerm]);

  const handleCategoryClick = (categoryId) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCategory(categoryId);
      setIsAnimating(false);
    }, 300);
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case "large":
        return "w-32 h-32 text-lg";
      case "medium":
        return "w-24 h-24 text-base";
      case "small":
        return "w-20 h-20 text-sm";
      default:
        return "w-24 h-24 text-base";
    }
  };

  // Modal component for image details
  const ImageModal = ({ image, onClose }) => {
    if (!image) return null;

    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="max-w-7xl max-h-[95vh] bg-white rounded-3xl overflow-hidden shadow-2xl transform animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col lg:flex-row h-full">
            {/* Image */}
            <div className="lg:w-2/3 bg-gray-100 relative">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-64 lg:h-[600px] object-cover"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={onClose}
                  className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="lg:w-1/3 p-8 space-y-6 overflow-y-auto">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {image.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">
                    {new Date(image.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">{image.location}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <Camera className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">{image.photographer}</span>
                </div>

                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="font-semibold">{image.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">{image.views}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {image.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-sm font-medium rounded-full border border-emerald-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                  <p className="text-sm font-bold text-emerald-700 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Event Details
                  </p>
                  <p className="text-emerald-600 font-medium">{image.event}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <ImageIcon className="w-12 h-12 animate-pulse" />
              <Sparkles className="w-8 h-8 text-pink-300 animate-bounce" />
              <Camera className="w-10 h-10 animate-pulse delay-300" />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
              Community Gallery
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Capturing moments of growth, celebration, and community connection
              through the lens of love
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Search Bar */}
        <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search memories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-base font-medium bg-white/90 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Mobile Categories - Horizontal Scroll */}
        <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex-shrink-0 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {category.label}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-white/20" : "bg-gray-100"
                      }`}
                    >
                      {category.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Gallery - Single Column */}
        <div className="p-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {selectedCategory === "all"
                ? "All Memories"
                : categories.find((c) => c.id === selectedCategory)?.label}
            </h2>
            <p className="text-gray-600 text-sm">
              Showing{" "}
              <span className="font-semibold text-indigo-600">
                {filteredPhotos.length}
              </span>{" "}
              photos
              {searchTerm && (
                <span>
                  {" "}
                  matching "
                  <span className="font-semibold text-pink-600">
                    {searchTerm}
                  </span>
                  "
                </span>
              )}
            </p>
          </div>

          {/* Single Column Photo Layout */}
          <div className="space-y-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(photo)}
              >
                <div className="relative">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-64 object-cover"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 bg-gradient-to-r ${
                        categories.find((c) => c.id === photo.category)?.color
                      } text-white text-xs font-bold rounded-full backdrop-blur-sm shadow-lg`}
                    >
                      {categories.find((c) => c.id === photo.category)?.label}
                    </span>
                  </div>

                  {/* View Icon */}
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Photo Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{photo.event}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="font-semibold">{photo.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">{photo.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(photo.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Empty State */}
          {filteredPhotos.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                No Photos Found
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {searchTerm
                  ? `No photos match your search for "${searchTerm}"`
                  : "No photos available in this category"}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg text-sm"
              >
                View All Photos
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Sidebar with Categories */}
        <div className="w-full w-[15%] lg:w-[30%]  bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm p-8 relative min-h-screen">
          {/* Search Bar */}
          <div className="mb-8 sticky top-8 z-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search memories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg font-medium bg-white/90 backdrop-blur-sm shadow-lg"
              />
            </div>
          </div>

          {/* Scattered Categories */}
          <div className="relative h-[600px] overflow-hidden">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`absolute transform transition-all duration-500 hover:scale-110 hover:rotate-3 ${getSizeClasses(
                    category.size
                  )} ${isSelected ? "scale-125 rotate-6 z-20" : "hover:z-10"}`}
                  style={category.position}
                >
                  <div
                    className={`w-full h-full rounded-3xl bg-gradient-to-br ${
                      category.color
                    } p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-white border-4 ${
                      isSelected ? "border-white shadow-2xl" : "border-white/30"
                    }`}
                  >
                    <Icon
                      className={`mb-2 ${
                        category.size === "large"
                          ? "w-8 h-8"
                          : category.size === "medium"
                          ? "w-6 h-6"
                          : "w-5 h-5"
                      }`}
                    />
                    <div
                      className={`font-bold text-center leading-tight ${
                        category.size === "large" ? "text-sm" : "text-xs"
                      }`}
                    >
                      {category.label}
                    </div>
                    <div
                      className={`bg-white/30 rounded-full px-2 py-1 mt-1 ${
                        category.size === "large" ? "text-xs" : "text-[10px]"
                      } font-bold`}
                    >
                      {category.count}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stats */}
          <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
              Gallery Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {galleryData.length}
                </div>
                <div className="text-sm text-gray-600">Total Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">
                  {galleryData.reduce((sum, p) => sum + p.likes, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Likes/</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {categories.length - 1}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {galleryData.reduce((sum, p) => sum + p.views, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Header with Results Count */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedCategory === "all"
                    ? "All Community Memories"
                    : categories.find((c) => c.id === selectedCategory)?.label}
                </h2>
                <p className="text-gray-600">
                  Showing{" "}
                  <span className="font-bold text-indigo-600">
                    {filteredPhotos.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-gray-800">
                    {galleryData.length}
                  </span>{" "}
                  photos
                  {searchTerm && (
                    <span>
                      {" "}
                      matching "
                      <span className="font-bold text-pink-600">
                        {searchTerm}
                      </span>
                      "
                    </span>
                  )}
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-white rounded-xl shadow-lg p-1">
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    viewMode === "masonry"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span className="font-medium">Masonry</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="font-medium">Grid</span>
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== "all" || searchTerm) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm font-medium text-gray-600">
                  Active filters:
                </span>
                {selectedCategory !== "all" && (
                  <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-medium rounded-full border border-indigo-200 flex items-center space-x-2">
                    <Tag className="w-3 h-3" />
                    <span>
                      {categories.find((c) => c.id === selectedCategory)?.label}
                    </span>
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="ml-1 hover:bg-indigo-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchTerm && (
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 text-sm font-medium rounded-full border border-pink-200 flex items-center space-x-2">
                    <Search className="w-3 h-3" />
                    <span>"{searchTerm}"</span>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-1 hover:bg-pink-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchTerm("");
                  }}
                  className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Photo Gallery */}
          {filteredPhotos.length > 0 ? (
            <div
              className={`${
                viewMode === "masonry"
                  ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              } ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              } transition-all duration-300`}
            >
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`${
                    viewMode === "masonry" ? "break-inside-avoid mb-6" : ""
                  } group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-rotate-1`}
                  onClick={() => setSelectedImage(photo)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:shadow-indigo-200/50">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-48 md:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4 text-red-400" />
                              <span className="font-semibold">
                                {photo.likes}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4 text-blue-400" />
                              <span className="font-semibold">
                                {photo.views}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="absolute top-4 right-4">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                            <Eye className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 bg-gradient-to-r ${
                            categories.find((c) => c.id === photo.category)
                              ?.color
                          } text-white text-xs font-bold rounded-full backdrop-blur-sm shadow-lg`}
                        >
                          {
                            categories.find((c) => c.id === photo.category)
                              ?.label
                          }
                        </span>
                      </div>
                    </div>

                    {/* Photo Info */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                        {photo.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {photo.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(photo.date).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate max-w-20">
                            {photo.location}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {photo.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-200"
                          >
                            #{tag}
                          </span>
                        ))}
                        {photo.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                            +{photo.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Photos Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm
                  ? `We couldn't find any photos matching "${searchTerm}". Try adjusting your search or browse different categories.`
                  : "No photos available in this category yet. Check back soon for new memories!"}
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg"
                >
                  View All Photos
                </button>
                <button
                  onClick={() => {
                    const randomCategory =
                      categories[
                        Math.floor(Math.random() * (categories.length - 1)) + 1
                      ];
                    setSelectedCategory(randomCategory.id);
                  }}
                  className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 font-semibold flex items-center space-x-2"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Random Category</span>
                </button>
              </div>
            </div>
          )}

          {/* Related Photos Section */}
          {relatedPhotos.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-indigo-600" />
                You might also like
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => setSelectedImage(photo)}
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="relative">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-2 left-2 text-white">
                            <div className="flex items-center space-x-2 text-xs">
                              <Heart className="w-3 h-3 text-red-400" />
                              <span>{photo.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm text-gray-900 truncate group-hover:text-indigo-600 transition-colors duration-200">
                          {photo.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(photo.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Gallery;
