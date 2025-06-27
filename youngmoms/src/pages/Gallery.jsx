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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [galleryData, setGalleryData] = useState([]);

  // Fetch gallery data from API
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://indigenousyoungmoms-bvv4.vercel.app/api/gallery/view");
        if (!response.ok) {
          throw new Error("Failed to fetch gallery data");
        }
        const result = await response.json();

        // Transform the API data to match the component's expected structure
        const transformedData = result.data.map((item) => ({
          id: item._id,
          title: item.title || "Untitled",
          description: item.description || "",
          category: item.category || "general",
          event: item.event || "",
          location: item.location || "Unknown Location",
          photographer: item.photographer || "Unknown",
          // Use the first image from the images array
          imageUrl:
            item.images && item.images.length > 0
              ? item.images[0].url
              : "/placeholder-image.jpg",
          tags: item.tags || [],
          likes: item.likes || 0,
          views: item.views || 0,
          date: item.createdAt || new Date().toISOString(),
        }));

        setGalleryData(transformedData);

        // Generate categories from the transformed data
        const uniqueCategories = [
          ...new Set(transformedData.map((item) => item.category)),
        ];

        const categoryCounts = uniqueCategories.map((cat) => ({
          id: cat.toLowerCase().replace(/\s+/g, "-"),
          label: cat.charAt(0).toUpperCase() + cat.slice(1),
          count: transformedData.filter((item) => item.category === cat).length,
        }));

        // Create categories with icons based on category type
        const getCategoryIcon = (category) => {
          switch (category.toLowerCase()) {
            case "family":
              return Baby;
            case "workshops":
              return GraduationCap;
            case "cultural":
              return Star;
            case "education":
              return GraduationCap;
            case "achievements":
              return Award;
            case "community":
              return Users;
            case "support":
              return Heart;
            default:
              return ImageIcon;
          }
        };

        // Add "All" category and others
        setCategories([
          {
            id: "all",
            label: "All Photos",
            icon: ImageIcon,
            count: transformedData.length,
            color: "from-purple-500 to-pink-500",
            position: { top: "5%", left: "10%" },
            size: "large",
          },
          ...categoryCounts.map((cat, index) => ({
            ...cat,
            icon: getCategoryIcon(cat.id),
            color: getRandomGradient(),
            position: getRandomPosition(),
            size: getRandomSize(),
          })),
        ]);
      } catch (err) {
        console.error("Error fetching gallery data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Like functionality
  const handleLike = async (photoId, e) => {
    e.stopPropagation(); // Prevent opening the modal when clicking like
    try {
      // Optimistically update the UI
      setGalleryData((prevData) =>
        prevData.map((photo) =>
          photo.id === photoId ? { ...photo, likes: photo.likes + 1 } : photo
        )
      );

      // Update filtered photos if needed
      setFilteredPhotos((prevFiltered) =>
        prevFiltered.map((photo) =>
          photo.id === photoId ? { ...photo, likes: photo.likes + 1 } : photo
        )
      );

      // Make API call to update likes on server
      const response = await fetch(
        `https://indigenousyoungmoms-bvv4.vercel.app/api/gallery/${photoId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        // If API call fails, revert the optimistic update
        setGalleryData((prevData) =>
          prevData.map((photo) =>
            photo.id === photoId ? { ...photo, likes: photo.likes - 1 } : photo
          )
        );
        setFilteredPhotos((prevFiltered) =>
          prevFiltered.map((photo) =>
            photo.id === photoId ? { ...photo, likes: photo.likes - 1 } : photo
          )
        );
      }
    } catch (error) {
      console.error("Error liking photo:", error);
      // Revert optimistic update on error
      setGalleryData((prevData) =>
        prevData.map((photo) =>
          photo.id === photoId ? { ...photo, likes: photo.likes - 1 } : photo
        )
      );
      setFilteredPhotos((prevFiltered) =>
        prevFiltered.map((photo) =>
          photo.id === photoId ? { ...photo, likes: photo.likes - 1 } : photo
        )
      );
    }
  };

  // Helper functions for categories
  const getRandomGradient = () => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-amber-500 to-orange-500",
      "from-pink-500 to-rose-500",
      "from-emerald-500 to-teal-500",
      "from-yellow-500 to-amber-500",
      "from-green-500 to-emerald-500",
      "from-red-500 to-pink-500",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const getRandomPosition = () => {
    return {
      top: `${Math.floor(Math.random() * 70) + 5}%`,
      left: `${Math.floor(Math.random() * 30) + 5}%`,
    };
  };

  const getRandomSize = () => {
    const sizes = ["small", "medium", "large"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  // Filter photos based on category and search
  useEffect(() => {
    if (!galleryData.length) return;

    let filtered = galleryData;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (photo) => photo.category.toLowerCase() === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (photo) =>
          (photo.title &&
            photo.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (photo.description &&
            photo.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (photo.tags &&
            photo.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )) ||
          (photo.event &&
            photo.event.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPhotos(filtered);

    // Generate related photos
    if (selectedCategory !== "all") {
      const currentCategoryPhotos = galleryData.filter(
        (p) => p.category.toLowerCase() === selectedCategory
      );
      const otherPhotos = galleryData.filter(
        (p) => p.category.toLowerCase() !== selectedCategory
      );
      const related = otherPhotos
        .filter((photo) =>
          currentCategoryPhotos.some(
            (cp) =>
              cp.tags &&
              photo.tags &&
              cp.tags.some((tag) => photo.tags.includes(tag))
          )
        )
        .slice(0, 4);
      setRelatedPhotos(related);
    } else {
      setRelatedPhotos([]);
    }
  }, [selectedCategory, searchTerm, galleryData]);

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
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
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
                  {image.description || "No description available."}
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

              {image.tags && image.tags.length > 0 && (
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
              )}

              {image.event && (
                <div className="pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                    <p className="text-sm font-bold text-emerald-700 mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Event Details
                    </p>
                    <p className="text-emerald-600 font-medium">
                      {image.event}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">
            Loading community memories...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Unable to Load Gallery
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 bg-gradient-to-r ${
                        categories.find(
                          (c) =>
                            c.id ===
                            photo.category.toLowerCase().replace(/\s+/g, "-")
                        )?.color || "from-gray-500 to-gray-600"
                      } text-white text-xs font-bold rounded-full backdrop-blur-sm shadow-lg`}
                    >
                      {categories.find(
                        (c) =>
                          c.id ===
                          photo.category.toLowerCase().replace(/\s+/g, "-")
                      )?.label || photo.category}
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
                      <button
                        onClick={(e) => handleLike(photo.id, e)}
                        className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-200"
                      >
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="font-semibold">{photo.likes}</span>
                      </button>
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
                <div className="text-sm text-gray-600">Total Likes</div>
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
        <div className="flex-1 bg-white/40 backdrop-blur-sm p-8 overflow-y-auto">
          {/* Content Header */}
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

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === "masonry"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Photo Grid */}
          {filteredPhotos.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === "masonry"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 lg:grid-cols-2"
              } ${
                isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
              } transition-all duration-300`}
            >
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-rotate-1 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                  onClick={() => setSelectedImage(photo)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "w-1/3 flex-shrink-0" : ""
                    }`}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        viewMode === "list" ? "h-48" : "h-64"
                      }`}
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={(e) => handleLike(photo.id, e)}
                              className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 hover:bg-white/30 transition-all duration-200"
                            >
                              <Heart className="w-4 h-4 text-red-400" />
                              <span className="text-sm font-semibold">
                                {photo.likes}
                              </span>
                            </button>
                            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                              <Eye className="w-4 h-4 text-blue-400" />
                              <span className="text-sm font-semibold">
                                {photo.views}
                              </span>
                            </div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                            <Eye className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-3 py-1 bg-gradient-to-r ${
                          categories.find(
                            (c) =>
                              c.id ===
                              photo.category.toLowerCase().replace(/\s+/g, "-")
                          )?.color || "from-gray-500 to-gray-600"
                        } text-white text-xs font-bold rounded-full backdrop-blur-sm shadow-lg`}
                      >
                        {categories.find(
                          (c) =>
                            c.id ===
                            photo.category.toLowerCase().replace(/\s+/g, "-")
                        )?.label || photo.category}
                      </span>
                    </div>
                  </div>

                  {/* Photo Details */}
                  <div
                    className={`p-6 ${
                      viewMode === "list"
                        ? "flex-1 flex flex-col justify-between"
                        : ""
                    }`}
                  >
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                        {photo.title}
                      </h3>
                      {photo.description && (
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {photo.description}
                        </p>
                      )}
                      {photo.event && (
                        <p className="text-sm font-medium text-emerald-600 mb-3 bg-emerald-50 rounded-lg px-3 py-2">
                          📅 {photo.event}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{photo.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(photo.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Camera className="w-4 h-4" />
                        <span>{photo.photographer}</span>
                      </div>

                      {photo.tags && photo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {photo.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                          {photo.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                              +{photo.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
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
                  ? `No photos match your search for "${searchTerm}". Try adjusting your search terms.`
                  : "No photos available in this category. Check back later for new memories!"}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <Shuffle className="w-5 h-5" />
                  <span>View All Photos</span>
                </div>
              </button>
            </div>
          )}

          {/* Related Photos Section */}
          {relatedPhotos.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-pink-500" />
                Related Memories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                    onClick={() => setSelectedImage(photo)}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: "slideInLeft 0.6s ease-out forwards",
                    }}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 mb-1 truncate">
                        {photo.title}
                      </h4>
                      <p className="text-sm text-gray-600 truncate">
                        {photo.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* CSS Animations */}
      <style jsx>{`
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        .zoom-in {
          animation: zoomIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.8);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
