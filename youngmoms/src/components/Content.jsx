import React, { useState, useEffect } from "react";
import {
  Plus,
  Save,
  Eye,
  Edit3,
  Trash2,
  Upload,
  X,
  Tag,
  Calendar,
  User,
  BarChart3,
  Search,
  FileText,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Content = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [allTags, setAllTags] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    topic: "",
    subtopics: [{ title: "", content: "", order: 1 }],
    status: "draft",
    tags: [],
    images: [],
    createdBy: "507f1f77bcf86cd799439012", // Default user ID
  });

  const [newTag, setNewTag] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  // Fetch all content
  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://indigenousyoungmoms-bvv4.vercel.app/api/content/"
      );
      const data = await response.json();
      if (data.success) {
        setContents(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(
        "https://indigenousyoungmoms-bvv4.vercel.app/api/content/stats/dashboard"
      );
      const data = await response.json();
      if (data.success) {
        setDashboardStats(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats");
    }
  };

  // Fetch all tags
  const fetchAllTags = async () => {
    try {
      const response = await fetch(
        "https://indigenousyoungmoms-bvv4.vercel.app/api/content/tags/all"
      );
      const data = await response.json();
      if (data.success) {
        setAllTags(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch tags");
    }
  };

  useEffect(() => {
    fetchContent();
    fetchDashboardStats();
    fetchAllTags();
  }, []);

  // Reset form
  const resetForm = () => {
    setFormData({
      topic: "",
      subtopics: [{ title: "", content: "", order: 1 }],
      status: "draft",
      tags: [],
      images: [],
      createdBy: "507f1f77bcf86cd799439012",
    });
    setNewTag("");
    setImageFiles([]);
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle subtopic changes
  const handleSubtopicChange = (index, field, value) => {
    const updatedSubtopics = [...formData.subtopics];
    updatedSubtopics[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      subtopics: updatedSubtopics,
    }));
  };

  // Add new subtopic
  const addSubtopic = () => {
    setFormData((prev) => ({
      ...prev,
      subtopics: [
        ...prev.subtopics,
        { title: "", content: "", order: prev.subtopics.length + 1 },
      ],
    }));
  };

  // Remove subtopic
  const removeSubtopic = (index) => {
    const updatedSubtopics = formData.subtopics.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      subtopics: updatedSubtopics.map((sub, i) => ({ ...sub, order: i + 1 })),
    }));
  };

  // Move subtopic up/down
  const moveSubtopic = (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.subtopics.length) return;

    const updatedSubtopics = [...formData.subtopics];
    [updatedSubtopics[index], updatedSubtopics[newIndex]] = [
      updatedSubtopics[newIndex],
      updatedSubtopics[index],
    ];

    // Update order numbers
    updatedSubtopics.forEach((sub, i) => (sub.order = i + 1));

    setFormData((prev) => ({
      ...prev,
      subtopics: updatedSubtopics,
    }));
  };

  // Add tag
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  // Create content
  const handleCreate = async () => {
    if (!formData.topic.trim()) {
      toast.error("Topic is required");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();

      // Add text data
      formDataToSend.append("topic", formData.topic);
      formDataToSend.append("subtopics", JSON.stringify(formData.subtopics));
      formDataToSend.append("status", formData.status);
      formDataToSend.append("tags", JSON.stringify(formData.tags));
      formDataToSend.append("createdBy", formData.createdBy);

      // Add images
      imageFiles.forEach((file, index) => {
        formDataToSend.append("images", file);
      });

      const response = await fetch(
        "https://indigenousyoungmoms-bvv4.vercel.app/api/content/create",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Content created successfully!");
        setShowCreateModal(false);
        resetForm();
        fetchContent();
        fetchDashboardStats();
      } else {
        toast.error(data.message || "Failed to create content");
      }
    } catch (error) {
      toast.error("Failed to create content");
    } finally {
      setLoading(false);
    }
  };

  // Edit content
  const handleEdit = (content) => {
    setEditingContent(content);
    setFormData({
      topic: content.topic,
      subtopics: content.subtopics || [{ title: "", content: "", order: 1 }],
      status: content.status,
      tags: content.tags,
      images: content.images || [],
      createdBy: content.createdBy || "507f1f77bcf86cd799439012",
    });
    setShowEditModal(true);
  };

  // Update content
  const handleUpdate = async () => {
    if (!editingContent) return;

    setLoading(true);
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("topic", formData.topic);
      formDataToSend.append("subtopics", JSON.stringify(formData.subtopics));
      formDataToSend.append("status", formData.status);
      formDataToSend.append("tags", JSON.stringify(formData.tags));

      imageFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      const response = await fetch(
        `https://indigenousyoungmoms-bvv4.vercel.app/api/content/${editingContent._id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Content updated successfully!");
        setShowEditModal(false);
        setEditingContent(null);
        resetForm();
        fetchContent();
      } else {
        toast.error(data.message || "Failed to update content");
      }
    } catch (error) {
      toast.error("Failed to update content");
    } finally {
      setLoading(false);
    }
  };

  // Delete content
  const handleDelete = async (contentId) => {
    if (!window.confirm("Are you sure you want to delete this content?"))
      return;

    try {
      const response = await fetch(
        `https://indigenousyoungmoms-bvv4.vercel.app/api/content/${contentId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Content deleted successfully!");
        fetchContent();
        fetchDashboardStats();
      } else {
        toast.error(data.message || "Failed to delete content");
      }
    } catch (error) {
      toast.error("Failed to delete content");
    }
  };

  // Search content
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchContent();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://indigenousyoungmoms-bvv4.vercel.app/api/content/search/${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();

      if (data.success) {
        setContents(data.data);
      }
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Filter content by status
  const filteredContents = contents.filter(
    (content) => filterStatus === "all" || content.status === filterStatus
  );

  const ContentModal = ({ isEdit = false }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? "Edit Content" : "Create New Content"}
            </h2>
            <button
              onClick={() => {
                isEdit ? setShowEditModal(false) : setShowCreateModal(false);
                resetForm();
              }}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic *
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => handleInputChange("topic", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter content topic..."
            />
          </div>

          {/* Subtopics */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Subtopics
              </label>
              <button
                onClick={addSubtopic}
                className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 flex items-center gap-1"
              >
                <Plus size={16} /> Add Subtopic
              </button>
            </div>

            {formData.subtopics.map((subtopic, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-3"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Subtopic {index + 1}
                  </span>
                  <div className="flex gap-2">
                    {index > 0 && (
                      <button
                        onClick={() => moveSubtopic(index, "up")}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <ArrowUp size={16} />
                      </button>
                    )}
                    {index < formData.subtopics.length - 1 && (
                      <button
                        onClick={() => moveSubtopic(index, "down")}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <ArrowDown size={16} />
                      </button>
                    )}
                    {formData.subtopics.length > 1 && (
                      <button
                        onClick={() => removeSubtopic(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={subtopic.title}
                    onChange={(e) =>
                      handleSubtopicChange(index, "title", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="Subtopic title..."
                  />
                  <textarea
                    value={subtopic.content}
                    onChange={(e) =>
                      handleSubtopicChange(index, "content", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Subtopic content..."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
                className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Add a tag..."
              />
              <button
                onClick={addTag}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <Tag size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-orange-600 hover:text-orange-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {imageFiles.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {imageFiles.length} file(s) selected
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => {
              isEdit ? setShowEditModal(false) : setShowCreateModal(false);
              resetForm();
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={isEdit ? handleUpdate : handleCreate}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={16} />
            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Content Management
          </h1>
          <p className="text-gray-600">Create, edit, and manage your content</p>
        </div>

        {/* Dashboard Stats */}
        {dashboardStats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Content
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {dashboardStats.statistics.totalContent}
                  </p>
                </div>
                <FileText className="text-blue-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600">
                    {dashboardStats.statistics.publishedContent}
                  </p>
                </div>
                <Eye className="text-green-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {dashboardStats.statistics.draftContent}
                  </p>
                </div>
                <Edit3 className="text-orange-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Views
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {dashboardStats.statistics.totalViews}
                  </p>
                </div>
                <BarChart3 className="text-red-500" size={24} />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Subtopics
                  </p>
                  <p className="text-2xl font-bold text-gray-600">
                    {dashboardStats.statistics.averageSubtopics?.toFixed(1) ||
                      0}
                  </p>
                </div>
                <User className="text-gray-500" size={24} />
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="flex gap-2 flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Search content..."
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <Search size={16} />
                  Search
                </button>
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 flex items-center gap-2"
            >
              <Plus size={16} />
              Create Content
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : filteredContents.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No content found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Topic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtopics
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContents.map((content) => (
                    <tr key={content._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {content.topic}
                        </div>
                        <div className="text-sm text-gray-500">
                          {content.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            content.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {content.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {content.tags?.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {content.tags?.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{content.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {content.subtopicCount ||
                          content.subtopics?.length ||
                          0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {content.viewCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(content.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(content)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(content._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modals */}
        {showCreateModal && <ContentModal />}
        {showEditModal && <ContentModal isEdit={true} />}

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default Content;
