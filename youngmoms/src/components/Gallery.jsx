import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  Heart,
  Calendar,
  MapPin,
  Camera,
  Tag,
  Loader2,
} from "lucide-react";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [stats, setStats] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    event: "",
    date: "",
    location: "",
    photographer: "",
    description: "",
    tags: "",
    image: null,
  });

  const API_BASE = "http://localhost:3000/api/gallery";

  // Configure axios-like HTTP requests
  const apiRequest = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        timeout: 10000,
        ...options,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = {
            message: errorText || `HTTP error! status: ${response.status}`,
          };
        }
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  // Fetch gallery items
  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await apiRequest(`${API_BASE}/`);
      setGalleryItems(response.data || response || []);
    } catch (err) {
      setError(err.message || "Failed to fetch gallery items");
    } finally {
      setLoading(false);
    }
  };

  // Fetch gallery stats
  const fetchStats = async () => {
    try {
      const response = await apiRequest(`${API_BASE}/stats`);
      setStats(response);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  // Create new gallery item
  const createGalleryItem = async (itemData) => {
    setIsSubmitting(true);
    try {
      const formDataObj = new FormData();

      // Append all form fields
      Object.keys(itemData).forEach((key) => {
        if (key === "tags" && itemData[key]) {
          const tagsArray = itemData[key]
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag);
          formDataObj.append(key, JSON.stringify(tagsArray));
        } else if (key === "image" && itemData[key]) {
          formDataObj.append("image", itemData[key]);
        } else if (
          itemData[key] !== null &&
          itemData[key] !== undefined &&
          itemData[key] !== ""
        ) {
          formDataObj.append(key, itemData[key]);
        }
      });

      const response = await axios.post(`${API_BASE}/`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;
      setGalleryItems((prev) => [result.data || result, ...prev]);
      resetForm();
      fetchStats();
      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to create gallery item";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update gallery item
  const updateGalleryItem = async (id, itemData) => {
    setIsSubmitting(true);
    try {
      let response;

      if (itemData.image instanceof File) {
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
          } else if (key === "image" && itemData[key]) {
            formDataObj.append("image", itemData[key]);
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
            "Content-Type": "multipart/form-data",
          },
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
        delete updateData.image; // Remove image field if no new image

        response = await axios.put(`${API_BASE}/${id}`, updateData, {
          headers: {
            "Content-Type": "application/json",
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
      return result;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update gallery item";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete gallery item
  const deleteGalleryItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);
      setGalleryItems((prev) => prev.filter((item) => item._id !== id));
      fetchStats();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete gallery item";
      setError(errorMessage);
    }
  };

  // Like gallery item
  const likeGalleryItem = async (id) => {
    try {
      await axios.post(`${API_BASE}/${id}/like`);
      setGalleryItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, likes: (item.likes || 0) + 1 } : item
        )
      );
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to like gallery item";
      setError(errorMessage);
    }
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.category) {
      setError("Title and Category are required");
      return;
    }

    if (!editingItem && !formData.image) {
      setError("Image is required for new items");
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
      // Error is already handled in the respective functions
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      event: "",
      date: "",
      location: "",
      photographer: "",
      description: "",
      tags: "",
      image: null,
    });
    setShowAddForm(false);
    setEditingItem(null);
    setError(null);
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      category: item.category || "",
      event: item.event || "",
      date: item.date || "",
      location: item.location || "",
      photographer: item.photographer || "",
      description: item.description || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
      image: null,
    });
    setShowAddForm(true);
  };

  useEffect(() => {
    fetchGalleryItems();
    fetchStats();
  }, []);

  if (loading && galleryItems.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-16 w-16 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gallery Management
            </h1>
            <p className="text-gray-600">
              Manage your gallery images and media content
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add New Item
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon size={20} className="text-red-600" />
                <span className="font-semibold text-gray-700">Total Items</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalItems || galleryItems.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-2 mb-2">
                <Heart size={20} className="text-red-600" />
                <span className="font-semibold text-gray-700">Total Likes</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalLikes || 0}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-2 mb-2">
                <Eye size={20} className="text-red-600" />
                <span className="font-semibold text-gray-700">Total Views</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalViews || 0}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={20} className="text-red-600" />
                <span className="font-semibold text-gray-700">Categories</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.categoriesCount || 0}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      <option value="workshops">Workshops</option>
                      <option value="cultural">Cultural</option>
                      <option value="community">Community</option>
                      <option value="education">Education</option>
                      <option value="events">Events</option>
                      <option value="family">Family</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event
                    </label>
                    <input
                      type="text"
                      name="event"
                      value={formData.event}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Photographer
                    </label>
                    <input
                      type="text"
                      name="photographer"
                      value={formData.photographer}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Upload {!editingItem && "*"}
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  {editingItem && formData.image && (
                    <p className="text-sm text-green-600 mt-1">
                      New image selected (will replace existing)
                    </p>
                  )}
                  {editingItem && !formData.image && (
                    <p className="text-sm text-gray-500 mt-1">
                      Current image will be kept
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="wellness, community, mental-health"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      <>
                        <Save size={18} />
                        {editingItem ? "Update Item" : "Create Item"}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSubmitting}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryItems.map((item) => {
          const imageUrl =
            item.imageUrl ||
            (item.images && item.images[0]?.url) ||
            "https://via.placeholder.com/400x300/cccccc/666666?text=No+Image";

          return (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300/cccccc/666666?text=Image+Not+Found";
                  }}
                />
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  {item.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="space-y-1 mb-3 text-xs text-gray-500">
                  {item.event && (
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{item.event}</span>
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{item.location}</span>
                    </div>
                  )}
                  {item.photographer && (
                    <div className="flex items-center gap-1">
                      <Camera size={12} />
                      <span>{item.photographer}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => likeGalleryItem(item._id)}
                      className="flex items-center gap-1 hover:text-red-600 transition-colors"
                    >
                      <Heart size={14} />
                      {item.likes || 0}
                    </button>
                    <span className="flex items-center gap-1">
                      <Eye size={14} />
                      {item.views || 0}
                    </span>
                  </div>
                  <span>
                    {new Date(item.createdAt || item.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm flex items-center justify-center gap-1 transition-colors"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteGalleryItem(item._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm flex items-center justify-center gap-1 transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {!loading && galleryItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Gallery Items
          </h3>
          <p className="text-gray-500 mb-4">
            Start by adding your first gallery item
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Add First Item
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
