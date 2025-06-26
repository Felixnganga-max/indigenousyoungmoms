import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ImageIcon,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  Heart,
  Calendar,
  User,
  Camera,
  Tag,
  Loader2,
  MapPin,
  Upload,
  CheckCircle,
  AlertCircle,
  Info,
  Sparkles,
} from "lucide-react";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [stats, setStats] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "family",
    event: "",
    location: "",
    photographer: "",
    tags: "",
    images: null,
  });

  const API_BASE = "https://indigenousyoungmoms-bvv4.vercel.app/api/gallery";

  // Toast configurations
  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  // Configure axios defaults to handle CORS and headers properly
  useEffect(() => {
    axios.defaults.withCredentials = false;
    axios.defaults.timeout = 10000;
  }, []);

  // Custom toast notifications
  const showSuccessToast = (message, icon = "🎉") => {
    toast.success(
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{message}</span>
      </div>,
      toastConfig
    );
  };

  const showErrorToast = (message, icon = "❌") => {
    toast.error(
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{message}</span>
      </div>,
      toastConfig
    );
  };

  const showInfoToast = (message, icon = "ℹ️") => {
    toast.info(
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{message}</span>
      </div>,
      toastConfig
    );
  };

  const showLoadingToast = (message, icon = "⏳") => {
    return toast.loading(
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{message}</span>
      </div>,
      { ...toastConfig, autoClose: false }
    );
  };

  // Fetch gallery items
  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      console.log("Fetching gallery items from:", `${API_BASE}/view`);

      const response = await axios.get(`${API_BASE}/view`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Gallery response:", response.data);
      setGalleryItems(response.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch gallery items";
      setError(errorMessage);
      showErrorToast("Failed to load gallery items", "🚫");
    } finally {
      setLoading(false);
    }
  };

  // Fetch gallery stats
  const fetchStats = async () => {
    try {
      console.log("Fetching stats from:", `${API_BASE}/stats`);
      const response = await axios.get(`${API_BASE}/stats`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log("Stats response:", response.data);
      setStats(response.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const createGalleryItem = async (itemData) => {
    const loadingToastId = showLoadingToast("Creating gallery item...", "🚀");
    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();

      Object.keys(itemData).forEach((key) => {
        const value = itemData[key];

        if (key === "tags" && value) {
          const tagsArray = value
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag);
          formDataObj.append(key, JSON.stringify(tagsArray));
        } else if (key === "images" && value) {
          if (value instanceof FileList) {
            // Handle multiple files
            Array.from(value).forEach((file) => {
              formDataObj.append("images", file);
            });
          } else {
            // Handle single file
            formDataObj.append("images", value);
          }
        } else if (value !== null && value !== undefined && value !== "") {
          formDataObj.append(key, value);
        }
      });

      // Log what we're sending for debugging
      console.log("FormData contents:");
      for (let [key, value] of formDataObj.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(`${API_BASE}/create`, formDataObj, {
        headers: {
          Accept: "application/json",
        },
        timeout: 30000,
      });

      const result = response.data;
      setGalleryItems((prev) => [result.data || result, ...prev]);
      resetForm();
      fetchStats();

      toast.dismiss(loadingToastId);
      showSuccessToast("Gallery item created successfully!", "✨");

      return result;
    } catch (err) {
      toast.dismiss(loadingToastId);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create gallery item";
      setError(errorMessage);
      showErrorToast(errorMessage, "💥");
      throw new Error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update gallery item
  const updateGalleryItem = async (id, itemData) => {
    const loadingToastId = showLoadingToast("Updating gallery item...", "🔄");
    setIsSubmitting(true);

    try {
      console.log("Updating gallery item:", id, itemData);
      let response;

      if (
        itemData.images instanceof File ||
        itemData.images instanceof FileList
      ) {
        // If image is being updated, use FormData
        const formDataObj = new FormData();
        Object.keys(itemData).forEach((key) => {
          if (key === "tags" && itemData[key]) {
            const tagsArray =
              typeof itemData[key] === "string"
                ? itemData[key]
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag)
                : itemData[key];
            formDataObj.append(key, JSON.stringify(tagsArray));
          } else if (key === "images" && itemData[key]) {
            if (itemData[key] instanceof FileList) {
              Array.from(itemData[key]).forEach((file) => {
                formDataObj.append("images", file);
              });
            } else {
              formDataObj.append("images", itemData[key]);
            }
          } else if (
            itemData[key] !== null &&
            itemData[key] !== undefined &&
            itemData[key] !== ""
          ) {
            formDataObj.append(key, itemData[key]);
          }
        });

        response = await axios.put(`${API_BASE}/${id}`, formDataObj, {
          headers: {
            Accept: "application/json",
          },
          timeout: 30000,
        });
      } else {
        // No image update, send JSON
        const updateData = { ...itemData };
        if (updateData.tags && typeof updateData.tags === "string") {
          updateData.tags = updateData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag);
        }
        delete updateData.images; // Remove images field if no new image

        response = await axios.put(`${API_BASE}/${id}`, updateData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      }

      console.log("Update response:", response.data);
      const result = response.data;
      const updatedItem = result.data || result;
      setGalleryItems((prev) =>
        prev.map((item) => (item._id === id ? updatedItem : item))
      );
      setEditingItem(null);
      resetForm();

      toast.dismiss(loadingToastId);
      showSuccessToast("Gallery item updated successfully!", "🎯");

      return result;
    } catch (err) {
      toast.dismiss(loadingToastId);
      console.error("Update error:", err);
      console.error("Error response:", err.response?.data);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update gallery item";
      setError(errorMessage);
      showErrorToast(errorMessage, "⚠️");
      throw new Error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete gallery item
  const deleteGalleryItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const loadingToastId = showLoadingToast("Deleting gallery item...", "🗑️");

    try {
      console.log("Deleting gallery item:", id);
      await axios.delete(`${API_BASE}/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      setGalleryItems((prev) => prev.filter((item) => item._id !== id));
      fetchStats();

      toast.dismiss(loadingToastId);
      showSuccessToast("Gallery item deleted successfully!", "🧹");
    } catch (err) {
      toast.dismiss(loadingToastId);
      console.error("Delete error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete gallery item";
      setError(errorMessage);
      showErrorToast(errorMessage, "❌");
    }
  };

  // Like gallery item
  const likeGalleryItem = async (id) => {
    try {
      console.log("Liking gallery item:", id);
      await axios.post(
        `${API_BASE}/${id}/like`,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setGalleryItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, likes: (item.likes || 0) + 1 } : item
        )
      );
      showInfoToast("Item liked!", "❤️");
    } catch (err) {
      console.error("Like error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to like gallery item";
      setError(errorMessage);
      showErrorToast(errorMessage, "💔");
    }
  };

  // Handle file input change with preview
  const handleFileChange = (files) => {
    if (!files || files.length === 0) {
      setImagePreview([]);
      return;
    }

    const fileArray = Array.from(files);
    const previews = fileArray.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setImagePreview(previews);
    setFormData((prev) => ({
      ...prev,
      images: files.length === 1 ? files[0] : files,
    }));

    showInfoToast(
      `${files.length} image${files.length > 1 ? "s" : ""} selected`,
      "📸"
    );
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log("Input change:", name, type === "file" ? files[0] : value);

    if (type === "file") {
      handleFileChange(files);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log("Form submission with data:", formData);

    // Validation
    if (!formData.title || !formData.category || !formData.event) {
      const errorMsg = "Title, Category, and Event are required";
      setError(errorMsg);
      showErrorToast(errorMsg, "⚠️");
      return;
    }

    if (!editingItem && !formData.images) {
      const errorMsg = "Image is required for new items";
      setError(errorMsg);
      showErrorToast(errorMsg, "📷");
      return;
    }

    const itemData = {
      ...formData,
      tags: formData.tags,
    };

    try {
      if (editingItem) {
        await updateGalleryItem(editingItem._id, itemData);
      } else {
        await createGalleryItem(itemData);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      // Error is already handled in the respective functions
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "family",
      event: "",
      location: "",
      photographer: "",
      tags: "",
      images: null,
    });
    setImagePreview([]);
    setShowAddForm(false);
    setEditingItem(null);
    setError(null);
  };

  const startEdit = (item) => {
    console.log("Starting edit for item:", item);
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "family",
      event: item.event || "",
      location: item.location || "",
      photographer: item.photographer || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
      images: null,
    });
    setImagePreview([]);
    setShowAddForm(true);
    showInfoToast("Edit mode activated", "✏️");
  };

  // Helper function to get image URL from the item
  const getImageUrl = (item) => {
    // First check if images array exists and has items
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      return item.images[0].url;
    }

    // Fallback to imageUrl if it exists (for backwards compatibility)
    if (item.imageUrl) {
      return item.imageUrl;
    }

    // Default placeholder
    return "https://via.placeholder.com/400x300/cccccc/666666?text=No+Image";
  };

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      imagePreview.forEach((preview) => {
        if (preview.url) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [imagePreview]);

  useEffect(() => {
    console.log("Component mounted, fetching data...");
    fetchGalleryItems();
    fetchStats();
  }, []);

  if (loading && galleryItems.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-pink-50">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="animate-spin h-16 w-16 text-red-500 mx-auto mb-4" />
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-gray-600 font-medium">
            Loading your beautiful gallery...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-gradient-to-br from-red-50 via-white to-pink-50">
      <ToastContainer />

      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Gallery Management
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your gallery images and create memorable collections
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Plus size={24} />
              <span className="font-semibold">Add New Item</span>
            </button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                {
                  icon: ImageIcon,
                  label: "Total Items",
                  value: stats.totalItems || galleryItems.length,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Heart,
                  label: "Total Likes",
                  value: stats.totalLikes || 0,
                  color: "from-red-500 to-pink-500",
                },
                {
                  icon: Eye,
                  label: "Total Views",
                  value: stats.totalViews || 0,
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Tag,
                  label: "Categories",
                  value: stats.categoriesCount || 0,
                  color: "from-purple-500 to-violet-500",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}
                    >
                      <stat.icon size={24} className="text-white" />
                    </div>
                    <span className="font-semibold text-gray-700">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  {editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
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
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/50"
                        placeholder="Enter a captivating title..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      >
                        <option value="workshops">Workshops</option>
                        <option value="cultural">Cultural</option>
                        <option value="family">Family</option>
                        <option value="education">Education</option>
                        <option value="achievements">Achievements</option>
                        <option value="community">Community</option>
                        <option value="support">Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Event *
                      </label>
                      <input
                        type="text"
                        name="event"
                        value={formData.event}
                        onChange={handleInputChange}
                        required
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/50"
                        placeholder="What's the event?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/50"
                        placeholder="Where did this happen?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Photographer
                    </label>
                    <input
                      type="text"
                      name="photographer"
                      value={formData.photographer}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      placeholder="Who captured this moment?"
                    />
                  </div>

                  {/* Enhanced Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image Upload {!editingItem && "*"}
                    </label>
                    <div
                      className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                        dragActive
                          ? "border-red-500 bg-red-50/50"
                          : "border-gray-300 bg-gray-50/50"
                      } hover:border-red-400 hover:bg-red-50/30`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleInputChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-center">
                        <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <p className="text-lg font-semibold text-gray-700 mb-2">
                          Drop images here or click to browse
                        </p>
                        <p className="text-sm text-gray-500">
                          Support for multiple images • PNG, JPG, GIF up to 10MB
                          each
                        </p>
                      </div>
                    </div>

                    {/* Image Previews */}
                    {imagePreview.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                          Selected Images ({imagePreview.length})
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {imagePreview.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={preview.url}
                                alt={preview.name}
                                className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newPreviews = imagePreview.filter(
                                      (_, i) => i !== index
                                    );
                                    setImagePreview(newPreviews);
                                    if (newPreviews.length === 0) {
                                      setFormData((prev) => ({
                                        ...prev,
                                        images: null,
                                      }));
                                    }
                                  }}
                                  className="text-white hover:text-red-300 transition-colors"
                                >
                                  <X size={20} />
                                </button>
                              </div>
                              <div className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-xs p-1 rounded truncate">
                                {preview.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {editingItem && formData.images && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                          <CheckCircle size={16} />
                          New images selected (will replace existing)
                        </p>
                      </div>
                    )}
                    {editingItem && !formData.images && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-700 font-medium flex items-center gap-2">
                          <Info size={16} />
                          Current images will be kept
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/50 resize-none"
                      placeholder="Tell the story behind this image..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      placeholder="Enter tags separated by commas (e.g. fun, family, celebration)"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                      <AlertCircle className="text-red-500" size={20} />
                      <p className="text-red-700 font-medium">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          {editingItem ? "Updating..." : "Creating..."}
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          {editingItem ? "Update Item" : "Create Item"}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl transition-all duration-300 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !showAddForm && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {galleryItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={getImageUrl(item)}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300/cccccc/666666?text=Image+Not+Found";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => startEdit(item)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                    title="Edit"
                  >
                    <Edit size={16} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => deleteGalleryItem(item._id)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                )}

                <div className="space-y-3">
                  {item.event && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-red-500" />
                      <span>{item.event}</span>
                    </div>
                  )}

                  {item.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-red-500" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  {item.photographer && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Camera size={16} className="text-red-500" />
                      <span>{item.photographer}</span>
                    </div>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{item.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Interaction Bar */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => likeGalleryItem(item._id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart size={16} />
                    <span className="text-sm font-medium">
                      {item.likes || 0}
                    </span>
                  </button>

                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Eye size={16} />
                    <span>{item.views || 0}</span>
                  </div>

                  {item.createdAt && (
                    <div className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {galleryItems.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <ImageIcon className="mx-auto h-24 w-24 text-gray-300" />
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              No Gallery Items Yet
            </h3>
            <p className="text-gray-500 text-lg mb-8">
              Start building your gallery by adding your first memorable moment!
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl flex items-center gap-3 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
            >
              <Plus size={20} />
              Add Your First Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
