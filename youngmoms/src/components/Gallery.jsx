import React, { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronUp,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);

  // Modal states
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Refs for modal
  const modalRef = useRef(null);
  const addFormRef = useRef(null);

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

  // Configure axios defaults
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

  // Fetch gallery items with pagination
  const fetchGalleryItems = async (page = 1, append = false) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);

      const response = await axios.get(
        `${API_BASE}/view?page=${page}&limit=20`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const newItems = response.data.data || [];

      if (append) {
        setGalleryItems((prev) => [...prev, ...newItems]);
      } else {
        setGalleryItems(newItems);
      }

      setTotalPages(response.data.pages || 1);
      setCurrentPage(page);

      // Initialize expanded categories for new items
      if (!append) {
        const categories = [...new Set(newItems.map((item) => item.category))];
        const initialExpanded = {};
        categories.forEach((cat) => {
          initialExpanded[cat] = true;
        });
        setExpandedCategories(initialExpanded);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch gallery items";
      setError(errorMessage);
      showErrorToast("Failed to load gallery items", "🚫");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load more items
  const loadMoreItems = async () => {
    if (currentPage < totalPages && !loadingMore) {
      await fetchGalleryItems(currentPage + 1, true);
    }
  };

  // Fetch gallery stats
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE}/stats`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setStats(response.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Set active category for filtering
  const setCategoryFilter = (category) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  // Group items by category
  const groupItemsByCategory = () => {
    const grouped = {};
    galleryItems.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };

  // Filter items based on active category
  const getFilteredItems = () => {
    if (!activeCategory) return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  };

  // Modal functions
  const openImageModal = (item, imageIndex = 0) => {
    setModalItem(item);
    setModalImageIndex(imageIndex);
    setShowImageModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setModalItem(null);
    setModalImageIndex(0);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (
      modalItem &&
      modalItem.images &&
      modalImageIndex < modalItem.images.length - 1
    ) {
      setModalImageIndex(modalImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (modalImageIndex > 0) {
      setModalImageIndex(modalImageIndex - 1);
    }
  };

  // Click outside to close modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeImageModal();
      }
      if (
        addFormRef.current &&
        !addFormRef.current.contains(event.target) &&
        showAddForm
      ) {
        resetForm();
      }
    };

    if (showImageModal || showAddForm) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showImageModal, showAddForm]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (showImageModal) {
        if (event.key === "Escape") {
          closeImageModal();
        } else if (event.key === "ArrowLeft") {
          prevImage();
        } else if (event.key === "ArrowRight") {
          nextImage();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showImageModal, modalImageIndex, modalItem]);

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
            Array.from(value).forEach((file) => {
              formDataObj.append("images", file);
            });
          } else {
            formDataObj.append("images", value);
          }
        } else if (value !== null && value !== undefined && value !== "") {
          formDataObj.append(key, value);
        }
      });

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

  const updateGalleryItem = async (id, itemData) => {
    const loadingToastId = showLoadingToast("Updating gallery item...", "🔄");
    setIsSubmitting(true);

    try {
      let response;

      if (
        itemData.images instanceof File ||
        itemData.images instanceof FileList
      ) {
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
        const updateData = { ...itemData };
        if (updateData.tags && typeof updateData.tags === "string") {
          updateData.tags = updateData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag);
        }
        delete updateData.images;

        response = await axios.put(`${API_BASE}/${id}`, updateData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      }

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

  const deleteGalleryItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const loadingToastId = showLoadingToast("Deleting gallery item...", "🗑️");

    try {
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
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete gallery item";
      setError(errorMessage);
      showErrorToast(errorMessage, "❌");
    }
  };

  const likeGalleryItem = async (id) => {
    try {
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

      // Update both gallery items and modal item
      setGalleryItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, likes: (item.likes || 0) + 1 } : item
        )
      );

      // Update modal item if it's the same item
      if (modalItem && modalItem._id === id) {
        setModalItem((prev) => ({
          ...prev,
          likes: (prev.likes || 0) + 1,
        }));
      }

      showInfoToast("Item liked!", "❤️");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to like gallery item";
      showErrorToast(errorMessage, "💔");
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      handleFileChange(files);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

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

  const getImageUrl = (item) => {
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      return item.images[0].url;
    }
    if (item.imageUrl) {
      return item.imageUrl;
    }
    return "https://via.placeholder.com/400x300/cccccc/666666?text=No+Image";
  };

  const getImageCount = (item) => {
    if (item.images && Array.isArray(item.images)) {
      return item.images.length;
    }
    return item.imageUrl ? 1 : 0;
  };

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

  const groupedItems = groupItemsByCategory();
  const categories = Object.keys(groupedItems).sort();

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

        {/* Category Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setCategoryFilter(null)}
              className={`px-6 py-3 rounded-xl flex items-center gap-3 transition-all ${
                !activeCategory
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/80 hover:bg-white"
              }`}
            >
              <span className="font-medium">All Categories</span>
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-6 py-3 rounded-xl flex items-center gap-3 transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                    : "bg-white/80 hover:bg-white"
                }`}
              >
                <span className="font-medium capitalize">{category}</span>
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                  {groupedItems[category].length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {showImageModal && modalItem && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
              ref={modalRef}
              className="relative max-w-6xl max-h-[90vh] w-full"
            >
              {/* Close button */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors text-white"
              >
                <X size={24} />
              </button>

              {/* Image container */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden">
                {modalItem.images && modalItem.images.length > 0 && (
                  <div className="relative">
                    <img
                      src={
                        modalItem.images[modalImageIndex]?.url ||
                        getImageUrl(modalItem)
                      }
                      alt={modalItem.title}
                      className="w-full max-h-[70vh] object-contain"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/800x600/cccccc/666666?text=Image+Not+Found";
                      }}
                    />

                    {/* Navigation arrows */}
                    {modalItem.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          disabled={modalImageIndex === 0}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          disabled={
                            modalImageIndex === modalItem.images.length - 1
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}

                    {/* Image counter */}
                    {modalItem.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                        {modalImageIndex + 1} / {modalItem.images.length}
                      </div>
                    )}
                  </div>
                )}

                {/* Modal content */}
                <div className="p-6 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        {modalItem.title}
                      </h3>
                      {modalItem.description && (
                        <p className="text-gray-200 mb-4">
                          {modalItem.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm">
                      {modalItem.event && (
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{modalItem.event}</span>
                        </div>
                      )}
                      {modalItem.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{modalItem.location}</span>
                        </div>
                      )}
                      {modalItem.photographer && (
                        <div className="flex items-center gap-2">
                          <Camera size={16} />
                          <span>{modalItem.photographer}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => likeGalleryItem(modalItem._id)}
                        className="flex items-center gap-2 hover:text-red-300 transition-colors"
                      >
                        <Heart size={20} />
                        <span>{modalItem.likes || 0}</span>
                      </button>
                      <div className="flex items-center gap-2">
                        <Eye size={20} />
                        <span>{modalItem.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
              ref={addFormRef}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
            >
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
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="Enter a descriptive title"
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
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      >
                        <option value="family">Family</option>
                        <option value="events">Events</option>
                        <option value="community">Community</option>
                        <option value="celebrations">Celebrations</option>
                        <option value="workshops">Workshops</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

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
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="Event name"
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
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="Event location"
                      />
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
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="Photographer name"
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
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                        placeholder="Comma-separated tags"
                      />
                    </div>
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
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                      placeholder="Describe the event or memory"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Images {!editingItem && "*"}
                    </label>
                    <div
                      className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                        dragActive
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-red-400 bg-gray-50/50"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        name="images"
                        onChange={handleInputChange}
                        multiple
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">
                          Drop images here or click to upload
                        </p>
                        <p className="text-sm text-gray-500">
                          Support for multiple images (JPG, PNG, GIF)
                        </p>
                      </div>
                    </div>

                    {/* Image Previews */}
                    {imagePreview.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {imagePreview.map((preview, index) => (
                          <div
                            key={index}
                            className="relative group rounded-xl overflow-hidden shadow-lg"
                          >
                            <img
                              src={preview.url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <CheckCircle className="text-white" size={20} />
                            </div>
                            <div className="absolute bottom-1 left-1 right-1">
                              <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1 text-xs text-white truncate">
                                {preview.name}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="text-red-500 mr-3" size={20} />
                        <p className="text-red-700 font-medium">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-6 border-t">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2"
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
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {activeCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {getFilteredItems().map((item) => (
              <div
                key={item._id}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:scale-105"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(item)}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                    onClick={() => openImageModal(item, 0)}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300/cccccc/666666?text=No+Image";
                    }}
                  />

                  {/* Image count badge */}
                  {getImageCount(item) > 1 && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      +{getImageCount(item) - 1} more
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => openImageModal(item, 0)}
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Eye className="text-white" size={24} />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.description || "No description available"}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span className="font-medium">{item.event}</span>
                    </div>
                    {item.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                    )}
                    {item.photographer && (
                      <div className="flex items-center gap-2">
                        <Camera size={14} />
                        <span>{item.photographer}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gradient-to-r from-red-100 to-pink-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="text-gray-500 text-xs font-medium">
                          +{item.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <button
                        onClick={() => likeGalleryItem(item._id)}
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                      >
                        <Heart size={16} />
                        <span>{item.likes || 0}</span>
                      </button>
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{item.views || 0}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit item"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteGalleryItem(item._id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-white/20"
              >
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-6 hover:bg-white/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {expandedCategories[category] ? (
                      <FolderOpen className="text-red-500" size={24} />
                    ) : (
                      <Folder className="text-red-500" size={24} />
                    )}
                    <h3 className="text-xl font-bold text-gray-900 capitalize">
                      {category}
                    </h3>
                    <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      {groupedItems[category].length} items
                    </span>
                  </div>
                  {expandedCategories[category] ? (
                    <ChevronUp size={24} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={24} className="text-gray-500" />
                  )}
                </button>

                {expandedCategories[category] && (
                  <div className="p-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {groupedItems[category].map((item) => (
                        <div
                          key={item._id}
                          className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:scale-[1.02]"
                        >
                          {/* Image Container */}
                          <div className="relative overflow-hidden">
                            <img
                              src={getImageUrl(item)}
                              alt={item.title}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                              onClick={() => openImageModal(item, 0)}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/400x300/cccccc/666666?text=No+Image";
                              }}
                            />

                            {/* Image count badge */}
                            {getImageCount(item) > 1 && (
                              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                                +{getImageCount(item) - 1}
                              </div>
                            )}
                          </div>

                          {/* Card Content */}
                          <div className="p-4">
                            <div className="mb-3">
                              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 text-xs line-clamp-2">
                                {item.description || "No description"}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <div className="flex items-center gap-3 text-xs text-gray-600">
                                <button
                                  onClick={() => likeGalleryItem(item._id)}
                                  className="flex items-center gap-1 hover:text-red-500 transition-colors"
                                >
                                  <Heart size={14} />
                                  <span>{item.likes || 0}</span>
                                </button>
                                <div className="flex items-center gap-1">
                                  <Eye size={14} />
                                  <span>{item.views || 0}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => startEdit(item)}
                                  className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit item"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => openImageModal(item, 0)}
                                  className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="View item"
                                >
                                  <Eye size={14} />
                                </button>
                                <button
                                  onClick={() => deleteGalleryItem(item._id)}
                                  className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete item"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {currentPage < totalPages && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreItems}
              disabled={loadingMore}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl transition-all duration-300 font-medium flex items-center gap-3 mx-auto"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Loading...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Load More Images
                </>
              )}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && galleryItems.length === 0 && (
          <div className="text-center py-16">
            <div className="relative mb-6">
              <ImageIcon className="mx-auto h-24 w-24 text-gray-300" />
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Gallery Items Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start building your beautiful gallery by adding your first image
              collection.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl transition-all font-medium flex items-center gap-3 mx-auto"
            >
              <Plus size={20} />
              Add Your First Item
            </button>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <AlertCircle className="mx-auto h-24 w-24 text-red-400 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => fetchGalleryItems()}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl transition-all font-medium"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
