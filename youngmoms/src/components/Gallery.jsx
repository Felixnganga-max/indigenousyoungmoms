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
  FolderPlus,
  ArrowLeft,
} from "lucide-react";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [stats, setStats] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");

  // Modal states
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Refs for modal
  const modalRef = useRef(null);
  const addFormRef = useRef(null);
  const createFolderRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    event: "",
    location: "",
    photographer: "Elphas Khamala",
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

  // Fetch gallery items with optional folder filter
  const fetchGalleryItems = async (
    page = 1,
    append = false,
    folderName = null
  ) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);

      const url = folderName
        ? `${API_BASE}/view?page=${page}&limit=20&category=${encodeURIComponent(
            folderName
          )}`
        : `${API_BASE}/view?page=${page}&limit=20`;

      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const newItems = response.data.data || [];

      if (append) {
        setGalleryItems((prev) => [...prev, ...newItems]);
      } else {
        setGalleryItems(newItems);
      }

      setTotalPages(response.data.pages || 1);
      setCurrentPage(page);
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

  // Fetch unique folders/categories
  const fetchFolders = async () => {
    try {
      const response = await axios.get(`${API_BASE}/view?page=1&limit=1000`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const items = response.data.data || [];
      const uniqueFolders = [
        ...new Set(items.map((item) => item.category).filter(Boolean)),
      ];
      setFolders(uniqueFolders);
    } catch (err) {
      console.error("Failed to fetch folders:", err);
    }
  };

  // Load more items
  const loadMoreItems = async () => {
    if (currentPage < totalPages && !loadingMore) {
      await fetchGalleryItems(currentPage + 1, true, selectedFolder);
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

  // Create new folder
  const createFolder = () => {
    if (!newFolderName.trim()) {
      showErrorToast("Please enter a folder name", "📁");
      return;
    }

    if (folders.includes(newFolderName.trim())) {
      showErrorToast("Folder already exists", "📁");
      return;
    }

    setFolders((prev) => [...prev, newFolderName.trim()]);
    setNewFolderName("");
    setShowCreateFolder(false);
    showSuccessToast("Folder created successfully!", "📁");
  };

  // Select folder
  const selectFolder = (folderName) => {
    setSelectedFolder(folderName);
    setCurrentPage(1);
    fetchGalleryItems(1, false, folderName);
  };

  // Go back to folder view
  const goBackToFolders = () => {
    setSelectedFolder(null);
    setCurrentPage(1);
    fetchGalleryItems(1, false, null);
  };

  // Count items in folder
  const getFolderItemCount = (folderName) => {
    return galleryItems.filter((item) => item.category === folderName).length;
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
      if (
        createFolderRef.current &&
        !createFolderRef.current.contains(event.target) &&
        showCreateFolder
      ) {
        setShowCreateFolder(false);
        setNewFolderName("");
      }
    };

    if (showImageModal || showAddForm || showCreateFolder) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showImageModal, showAddForm, showCreateFolder]);

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
      const newItem = result.data || result;

      // Add to gallery items if we're viewing the same folder or all items
      if (!selectedFolder || selectedFolder === newItem.category) {
        setGalleryItems((prev) => [newItem, ...prev]);
      }

      // Update folders list if new category
      if (newItem.category && !folders.includes(newItem.category)) {
        setFolders((prev) => [...prev, newItem.category]);
      }

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
      fetchFolders(); // Refresh folders in case category changed

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
      fetchFolders(); // Refresh folders in case folder is now empty

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

    if (!formData.title || !formData.category) {
      const errorMsg = "Title and Folder are required";
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
      category: selectedFolder || "",
      event: "",
      location: "",
      photographer: "Elphas Khamala",
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
      category: item.category || "",
      event: item.event || "",
      location: item.location || "",
      photographer: item.photographer || "Elphas Khamala",
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
    fetchFolders();
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
            <div className="flex items-center gap-4">
              {selectedFolder && (
                <button
                  onClick={goBackToFolders}
                  className="p-2 hover:bg-white/50 rounded-xl transition-colors"
                  title="Back to folders"
                >
                  <ArrowLeft size={24} className="text-gray-600" />
                </button>
              )}
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3">
                  {selectedFolder
                    ? `${selectedFolder} Gallery`
                    : "Gallery Management"}
                </h1>
                <p className="text-gray-600 text-lg">
                  {selectedFolder
                    ? `Images in ${selectedFolder} folder`
                    : "Organize your images in custom folders"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!selectedFolder && (
                <button
                  onClick={() => setShowCreateFolder(true)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FolderPlus size={20} />
                  <span className="font-medium">New Folder</span>
                </button>
              )}
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                <span className="font-medium">Add Images</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                {
                  icon: Folder,
                  label: "Total Folders",
                  value: folders.length,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: ImageIcon,
                  label: "Total Images",
                  value: stats.totalItems || galleryItems.length,
                  color: "from-green-500 to-emerald-500",
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

        {/* Create Folder Modal */}
        {showCreateFolder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
              ref={createFolderRef}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Create New Folder
                </h2>
                <button
                  onClick={() => {
                    setShowCreateFolder(false);
                    setNewFolderName("");
                  }}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Folder Name
                  </label>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    placeholder="Enter folder name"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        createFolder();
                      }
                    }}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setShowCreateFolder(false);
                      setNewFolderName("");
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createFolder}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2"
                  >
                    <FolderPlus size={20} />
                    Create Folder
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Folders/Gallery Content */}
        {!selectedFolder ? (
          // Folder View
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <FolderOpen size={24} className="text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-800">Your Folders</h2>
            </div>

            {folders.length === 0 ? (
              <div className="text-center py-16">
                <Folder size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No folders yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first folder to organize your images
                </p>
                <button
                  onClick={() => setShowCreateFolder(true)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg mx-auto"
                >
                  <FolderPlus size={20} />
                  Create First Folder
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {folders.map((folder) => (
                  <div
                    key={folder}
                    onClick={() => selectFolder(folder)}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20 hover:border-blue-200 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                        <Folder size={24} className="text-white" />
                      </div>
                      <span className="text-2xl font-bold text-gray-800">
                        {getFolderItemCount(folder)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {folder}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {getFolderItemCount(folder)}{" "}
                      {getFolderItemCount(folder) === 1 ? "image" : "images"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Gallery Items View
          <div className="space-y-6">
            {galleryItems.length === 0 ? (
              <div className="text-center py-16">
                <ImageIcon size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No images in this folder
                </h3>
                <p className="text-gray-500 mb-6">
                  Add some images to get started
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg mx-auto"
                >
                  <Plus size={20} />
                  Add First Image
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {galleryItems.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 group"
                    >
                      <div className="relative">
                        <img
                          src={getImageUrl(item)}
                          alt={item.title}
                          className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                          onClick={() => openImageModal(item)}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                        {/* Image count badge */}
                        {getImageCount(item) > 1 && (
                          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                            <Camera size={12} />
                            {getImageCount(item)}
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEdit(item);
                            }}
                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteGalleryItem(item._id);
                            }}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          {item.event && (
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span className="truncate">{item.event}</span>
                            </div>
                          )}
                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span className="truncate">{item.location}</span>
                            </div>
                          )}
                        </div>

                        {item.photographer && (
                          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                            <User size={14} />
                            <span className="truncate">
                              {item.photographer}
                            </span>
                          </div>
                        )}

                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                                +{item.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              likeGalleryItem(item._id);
                            }}
                            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <Heart size={16} />
                            <span className="text-sm">{item.likes || 0}</span>
                          </button>
                          <div className="flex items-center gap-2 text-gray-500">
                            <Eye size={16} />
                            <span className="text-sm">{item.views || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {currentPage < totalPages && (
                  <div className="text-center pt-8">
                    <button
                      onClick={loadMoreItems}
                      disabled={loadingMore}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl flex items-center gap-2 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loadingMore ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Plus size={20} />
                      )}
                      <span className="font-medium">
                        {loadingMore ? "Loading..." : "Load More"}
                      </span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Add/Edit Form Modal - Compact Version */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div
              ref={addFormRef}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-6 w-full max-w-2xl shadow-2xl border border-white/20 my-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  {editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      placeholder="Enter title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Folder *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                    >
                      <option value="">Select folder</option>
                      {folders.map((folder) => (
                        <option key={folder} value={folder}>
                          {folder}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                    placeholder="Enter description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Event
                    </label>
                    <input
                      type="text"
                      name="event"
                      value={formData.event}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      placeholder="Enter event name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      placeholder="Enter location"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Photographer
                    </label>
                    <input
                      type="text"
                      name="photographer"
                      value={formData.photographer}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      placeholder="Enter photographer name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                </div>

                {/* Image Upload - Compact Version */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Images {!editingItem && "*"}
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 ${
                      dragActive
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-red-400"
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
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload size={32} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB each
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Image Preview - Compact */}
                  {imagePreview.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 md:grid-cols-6 gap-2">
                      {imagePreview.map((preview, index) => (
                        <div
                          key={index}
                          className="relative bg-gray-100 rounded-lg overflow-hidden"
                        >
                          <img
                            src={preview.url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-16 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <CheckCircle size={16} className="text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Actions - Compact */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    <span>
                      {isSubmitting
                        ? "Saving..."
                        : editingItem
                        ? "Update Item"
                        : "Create Item"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showImageModal && modalItem && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
              ref={modalRef}
              className="relative bg-white/95 backdrop-blur-md rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
            >
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={
                      modalItem.images && modalItem.images[modalImageIndex]
                        ? modalItem.images[modalImageIndex].url
                        : getImageUrl(modalItem)
                    }
                    alt={modalItem.title}
                    className="w-full h-auto rounded-2xl shadow-lg max-h-[500px] object-contain"
                  />

                  {/* Image Navigation */}
                  {modalItem.images && modalItem.images.length > 1 && (
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-4">
                      <button
                        onClick={prevImage}
                        disabled={modalImageIndex === 0}
                        className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        disabled={
                          modalImageIndex === modalItem.images.length - 1
                        }
                        className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  )}

                  {/* Image Counter */}
                  {modalItem.images && modalItem.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {modalImageIndex + 1} / {modalItem.images.length}
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {modalItem.title}
                    </h2>
                    {modalItem.description && (
                      <p className="text-gray-600 leading-relaxed">
                        {modalItem.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {modalItem.category && (
                      <div className="flex items-center gap-2">
                        <Tag size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {modalItem.category}
                        </span>
                      </div>
                    )}
                    {modalItem.event && (
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {modalItem.event}
                        </span>
                      </div>
                    )}
                    {modalItem.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {modalItem.location}
                        </span>
                      </div>
                    )}
                    {modalItem.photographer && (
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {modalItem.photographer}
                        </span>
                      </div>
                    )}
                  </div>

                  {modalItem.tags && modalItem.tags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {modalItem.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={() => likeGalleryItem(modalItem._id)}
                      className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors px-4 py-2 rounded-xl hover:bg-red-50"
                    >
                      <Heart size={20} />
                      <span>{modalItem.likes || 0} likes</span>
                    </button>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Eye size={20} />
                      <span>{modalItem.views || 0} views</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        closeImageModal();
                        startEdit(modalItem);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-medium"
                    >
                      <Edit size={18} />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        closeImageModal();
                        deleteGalleryItem(modalItem._id);
                      }}
                      className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-medium"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
