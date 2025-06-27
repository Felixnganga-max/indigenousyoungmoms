import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  X,
  TreePine,
  Rocket,
  Users,
  Heart,
  Lightbulb,
  Target,
  Globe,
  Book,
  Music,
} from "lucide-react";

const API_BASE_URL = "https://indigenousyoungmoms-bvv4.vercel.app/api/projects";

const iconOptions = [
  { value: "TreePine", icon: TreePine, label: "Tree Pine" },
  { value: "Rocket", icon: Rocket, label: "Rocket" },
  { value: "Users", icon: Users, label: "Users" },
  { value: "Heart", icon: Heart, label: "Heart" },
  { value: "Lightbulb", icon: Lightbulb, label: "Lightbulb" },
  { value: "Target", icon: Target, label: "Target" },
  { value: "Globe", icon: Globe, label: "Globe" },
  { value: "Book", icon: Book, label: "Book" },
  { value: "Music", icon: Music, label: "Music" },
];

const gradientOptions = [
  "from-emerald-400 via-green-500 to-teal-600",
  "from-red-400 via-red-500 to-red-600",
  "from-orange-400 via-orange-500 to-orange-600",
  "from-blue-400 via-blue-500 to-blue-600",
  "from-gray-400 via-gray-500 to-gray-600",
  "from-red-400 via-orange-500 to-orange-600",
  "from-blue-400 via-green-500 to-teal-600",
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    goal: "",
    icon: "TreePine",
    description: [""],
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    order: 1,
    isActive: true,
    images: [],
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      const result = await response.json();

      if (result.success) {
        setProjects(result.data);
      } else {
        setError("Failed to fetch projects");
      }
    } catch (err) {
      setError("Error fetching projects: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDescriptionChange = (index, value) => {
    const newDescription = [...formData.description];
    newDescription[index] = value;
    setFormData((prev) => ({
      ...prev,
      description: newDescription,
    }));
  };

  const addDescriptionField = () => {
    setFormData((prev) => ({
      ...prev,
      description: [...prev.description, ""],
    }));
  };

  const removeDescriptionField = (index) => {
    if (formData.description.length > 1) {
      const newDescription = formData.description.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        description: newDescription,
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const clearPreviews = () => {
    previewImages.forEach((url) => URL.revokeObjectURL(url));
    setPreviewImages([]);
    setSelectedFiles([]);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      goal: "",
      icon: "TreePine",
      description: [""],
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      order: 1,
      isActive: true,
      images: [],
    });
    clearPreviews();
    setEditingProject(null);
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        goal: project.goal,
        icon: project.icon,
        description: project.description,
        gradient: project.gradient,
        order: project.order,
        isActive: project.isActive,
        images: project.images || [],
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      // Add form fields
      Object.keys(formData).forEach((key) => {
        if (key === "description") {
          formData.description.forEach((desc, index) => {
            formDataToSend.append(`description[${index}]`, desc);
          });
        } else if (key !== "images") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add files
      selectedFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      const url = editingProject
        ? `${API_BASE_URL}/${editingProject._id}`
        : `${API_BASE_URL}/create`;

      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(
          editingProject
            ? "Project updated successfully!"
            : "Project created successfully!"
        );
        fetchProjects();
        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        setError(result.message || "Operation failed");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Project deleted successfully!");
        fetchProjects();
        setDeleteConfirm(null);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(result.message || "Delete failed");
      }
    } catch (err) {
      setError("Error deleting project: " + err.message);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/toggle-status`, {
        method: "PATCH",
      });

      const result = await response.json();

      if (result.success) {
        fetchProjects();
        setSuccess("Project status updated!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(result.message || "Status update failed");
      }
    } catch (err) {
      setError("Error updating status: " + err.message);
    }
  };

  const getIconComponent = (iconName) => {
    const iconOption = iconOptions.find((opt) => opt.value === iconName);
    return iconOption ? iconOption.icon : TreePine;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Projects Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your cultural revival projects
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const IconComponent = getIconComponent(project.icon);
            return (
              <div
                key={project._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div
                  className={`h-32 bg-gradient-to-r ${project.gradient} flex items-center justify-center`}
                >
                  <IconComponent className="w-12 h-12 text-white" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleStatus(project._id)}
                        className={`p-1 rounded ${
                          project.isActive ? "text-green-600" : "text-gray-400"
                        }`}
                        title={project.isActive ? "Active" : "Inactive"}
                      >
                        {project.isActive ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-orange-600 font-medium mb-3">
                    {project.goal}
                  </p>

                  <div className="space-y-2 mb-4">
                    {project.description.slice(0, 2).map((desc, index) => (
                      <p
                        key={index}
                        className="text-gray-600 text-sm line-clamp-2"
                      >
                        {desc}
                      </p>
                    ))}
                    {project.description.length > 2 && (
                      <p className="text-gray-400 text-sm">
                        +{project.description.length - 2} more...
                      </p>
                    )}
                  </div>

                  {project.images && project.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {project.images.slice(0, 3).map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt=""
                          className="w-12 h-12 object-cover rounded border border-gray-200"
                        />
                      ))}
                      {project.images.length > 3 && (
                        <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs text-gray-500">
                          +{project.images.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        project.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {project.isActive ? "Active" : "Inactive"}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(project)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(project)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <TreePine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first cultural revival project to get started.
            </p>
            <button
              onClick={() => openModal()}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Project
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProject ? "Edit Project" : "Create New Project"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                {/* Goal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal
                  </label>
                  <input
                    type="text"
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gradient */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gradient
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {gradientOptions.map((gradient, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, gradient }))
                        }
                        className={`h-12 rounded-lg bg-gradient-to-r ${gradient} border-2 ${
                          formData.gradient === gradient
                            ? "border-gray-900"
                            : "border-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  {formData.description.map((desc, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <textarea
                        value={desc}
                        onChange={(e) =>
                          handleDescriptionChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        rows="3"
                        placeholder={`Description ${index + 1}`}
                        required
                      />
                      {formData.description.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDescriptionField(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDescriptionField}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    + Add description
                  </button>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-gray-600">Click to upload images</p>
                      <p className="text-gray-400 text-sm">
                        PNG, JPG up to 10MB
                      </p>
                    </label>
                  </div>

                  {/* Image Previews */}
                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {previewImages.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newPreviews = previewImages.filter(
                                (_, i) => i !== index
                              );
                              const newFiles = selectedFiles.filter(
                                (_, i) => i !== index
                              );
                              URL.revokeObjectURL(url);
                              setPreviewImages(newPreviews);
                              setSelectedFiles(newFiles);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Order and Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      min="1"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Active
                      </span>
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    {editingProject ? "Update Project" : "Create Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Project
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{deleteConfirm.title}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
