import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  X,
  Upload,
  Save,
  AlertCircle,
  CheckCircle,
  Image,
  ZoomIn,
  Download,
  Calendar,
  Tag,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [notification, setNotification] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    programType: "",
    features: [],
    status: "active",
  });
  const [newFeature, setNewFeature] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const API_BASE = "https://indigenousyoungmoms-bvv4.vercel.app/api/programs";

  useEffect(() => {
    fetchPrograms();
  }, [filterType]);

  // Create preview URLs for selected files
  useEffect(() => {
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Cleanup URLs on unmount
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  // Helper function to extract image URLs from the API response
  const getImageUrl = (imageData) => {
    if (typeof imageData === "string") return imageData;
    if (imageData && imageData.url) return imageData.url;
    return null;
  };

  // Helper function to get all image URLs from a program
  const getProgramImages = (program) => {
    if (!program.images) return [];
    return program.images.map(getImageUrl).filter(Boolean);
  };

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
      }
    } catch (error) {
      showNotification("Error fetching programs", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const openModal = (mode, program = null) => {
    setModalMode(mode);
    setSelectedProgram(program);
    setCurrentImageIndex(0); // Reset image index when opening modal

    if (program && mode !== "view") {
      setFormData({
        title: program.title,
        description: program.description,
        programType: program.programType,
        features: program.features || [],
        status: program.status,
      });
      setExistingImages(getProgramImages(program));
    } else if (mode === "create") {
      setFormData({
        title: "",
        description: "",
        programType: "",
        features: [],
        status: "active",
      });
      setExistingImages([]);
    }
    setSelectedFiles([]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProgram(null);
    setNewFeature("");
    setSelectedFiles([]);
    setExistingImages([]);
    setPreviewUrls([]);
    setImagePreview(null);
    setCurrentImageIndex(0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const removeSelectedFile = (indexToRemove) => {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const removeExistingImage = (indexToRemove) => {
    setExistingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const openImagePreview = (imageUrl) => {
    setImagePreview(imageUrl);
  };

  // Image Carousel Component
  const ImageCarousel = ({ images, program }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
      return (
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden rounded-t-2xl flex items-center justify-center">
          <Image size={48} className="text-gray-400" />
        </div>
      );
    }

    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden rounded-t-2xl group">
        <img
          src={images[currentIndex]}
          alt={`${program.title} ${currentIndex + 1}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />

        {/* Fallback for broken images */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 hidden">
          <Image size={48} />
        </div>

        {/* Navigation buttons (only show if more than 1 image) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Status and type badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              program.status === "active"
                ? "bg-green-500/80 text-white"
                : "bg-gray-500/80 text-white"
            }`}
          >
            {program.status}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-blue-500/80 text-white rounded-full text-xs font-semibold backdrop-blur-sm">
            {program.programType}
          </span>
        </div>

        {/* Image count indicator */}
        {images.length > 1 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <span className="px-2 py-1 bg-black/50 text-white rounded-full text-xs font-semibold backdrop-blur-sm">
              {currentIndex + 1}/{images.length}
            </span>
          </div>
        )}
      </div>
    );
  };

  // Modal Image Carousel Component
  const ModalImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          Images
          {images.length > 1 && (
            <span className="text-sm text-gray-500 font-normal">
              ({currentIndex + 1} of {images.length})
            </span>
          )}
        </h4>

        <div className="relative">
          <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openImagePreview(images[currentIndex])}
            />

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Zoom indicator */}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white p-1 rounded-full">
              <ZoomIn size={16} />
            </div>
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                    index === currentIndex
                      ? "ring-2 ring-blue-500 opacity-100"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    // Basic validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.programType.trim()
    ) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    setLoading(true);

    try {
      let requestBody;
      let headers = {};

      // If there are files, use FormData
      if (selectedFiles.length > 0) {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("programType", formData.programType);
        formDataToSend.append("status", formData.status);

        // Add features
        formData.features.forEach((feature) => {
          formDataToSend.append("features", feature);
        });

        // Add existing images (if any)
        existingImages.forEach((image) => {
          formDataToSend.append("existingImages", image);
        });

        // Add files
        selectedFiles.forEach((file) => {
          formDataToSend.append("images", file);
        });

        requestBody = formDataToSend;
      } else {
        // If no files, send JSON
        requestBody = JSON.stringify({
          title: formData.title,
          description: formData.description,
          programType: formData.programType,
          features: formData.features,
          status: formData.status,
          existingImages: existingImages,
        });
        headers = {
          "Content-Type": "application/json",
        };
      }

      const url =
        modalMode === "create"
          ? `${API_BASE}/create`
          : `${API_BASE}/${selectedProgram._id}`;
      const method = modalMode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers,
        body: requestBody,
      });

      const data = await response.json();

      if (data.success) {
        showNotification(data.message);
        fetchPrograms();
        closeModal();
      } else {
        showNotification(data.message || "Operation failed", "error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      showNotification("Operation failed: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?"))
      return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        showNotification(data.message);
        fetchPrograms();
      } else {
        showNotification(data.message, "error");
      }
    } catch (error) {
      showNotification("Delete failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredPrograms = programs.filter(
    (program) =>
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const programTypes = [...new Set(programs.map((p) => p.programType))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border animate-in slide-in-from-right duration-300 ${
            notification.type === "success"
              ? "bg-green-500/90 text-white border-green-400"
              : "bg-red-500/90 text-white border-red-400"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={22} />
          ) : (
            <AlertCircle size={22} />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Programs Management
              </h1>
              <p className="text-gray-600 text-lg">
                Create and manage your educational programs with ease
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users size={16} />
                  {programs.length} Programs
                </span>
                <span className="flex items-center gap-1">
                  <Star size={16} />
                  {programs.filter((p) => p.status === "active").length} Active
                </span>
              </div>
            </div>
            <button
              onClick={() => openModal("create")}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={20} />
              Add Program
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mt-8">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div className="relative">
              <Filter
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm min-w-[200px]"
              >
                <option value="">All Types</option>
                {programTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0 left-0"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <div
                key={program._id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 overflow-hidden group hover:scale-105"
              >
                {/* Program Image Carousel */}
                <ImageCarousel
                  images={getProgramImages(program)}
                  program={program}
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {program.description}
                  </p>

                  {program.features && program.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <Tag size={14} />
                        Features:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {program.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-xs font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                        {program.features.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            +{program.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex gap-1">
                      <button
                        onClick={() => openModal("view", program)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openModal("edit", program)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Program"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(program._id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Program"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      {new Date(program.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPrograms.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="mb-4">
              <Image size={64} className="mx-auto text-gray-300" />
            </div>
            <p className="text-gray-500 text-xl">No programs found</p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalMode === "create" && "Create New Program"}
                {modalMode === "edit" && "Edit Program"}
                {modalMode === "view" && "Program Details"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {modalMode === "view" ? (
                <div className="space-y-6">
                  {/* Modal Images Carousel */}
                  <ModalImageCarousel
                    images={getProgramImages(selectedProgram)}
                  />

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title
                    </label>
                    <p className="text-lg text-gray-900 font-medium">
                      {selectedProgram?.title}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <p className="text-gray-900 leading-relaxed">
                      {selectedProgram?.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Program Type
                      </label>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {selectedProgram?.programType}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status
                      </label>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedProgram?.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedProgram?.status}
                      </span>
                    </div>
                  </div>
                  {selectedProgram?.features &&
                    selectedProgram.features.length > 0 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Features
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedProgram.features.map((feature, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter program title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Program Type *
                      </label>
                      <input
                        type="text"
                        name="programType"
                        value={formData.programType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Workshop, Course, Seminar"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter program description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Features
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addFeature()}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Add a feature"
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    {formData.features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.features.map((feature, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {feature}
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Images
                    </label>

                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Current Images:
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {existingImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Existing ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeExistingImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* File Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload size={32} className="text-gray-400" />
                        <span className="text-gray-600 font-medium">
                          Click to upload images
                        </span>
                        <span className="text-sm text-gray-500">
                          PNG, JPG, GIF up to 10MB each
                        </span>
                      </label>
                    </div>

                    {/* Preview Selected Files */}
                    {selectedFiles.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          New Images:
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={previewUrls[index]}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeSelectedFile(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={14} />
                              </button>
                              <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                                {file.name.length > 15
                                  ? file.name.substring(0, 15) + "..."
                                  : file.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          {modalMode === "create"
                            ? "Create Program"
                            : "Update Program"}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {imagePreview && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-60">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setImagePreview(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = imagePreview;
                  link.download = "program-image";
                  link.click();
                }}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                title="Download Image"
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Programs;
