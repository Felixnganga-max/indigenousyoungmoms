import React, { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Edit,
  AlertCircle,
  Check,
  X,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [currentAbout, setCurrentAbout] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState({});
  const [message, setMessage] = useState({ type: "", text: "", section: "" });
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Initialize empty form data
  const getEmptyFormData = () => ({
    heroContent: {
      title: "",
      subtitle: "",
      statistics: [],
    },
    images: {
      hero: "",
      objectives: [],
    },
    visionMission: {
      title: "",
      subtitle: "",
      vision: {
        title: "",
        color: "amber",
        description: "",
      },
      mission: {
        title: "",
        color: "green",
        description: "",
      },
    },
    objectives: {
      title: "",
      subtitle: "",
      items: [],
    },
    historyContent: {
      title: "",
      subtitle: "",
      sections: [],
    },
    timelineData: [],
    callToAction: {
      title: "",
      subtitle: "",
      primaryButton: {
        text: "",
        icon: "",
      },
      secondaryButton: {
        text: "",
        icon: "",
      },
      statistics: [],
    },
    isActive: true,
    version: "1.0",
    lastUpdatedBy: "Admin",
  });

  const [formData, setFormData] = useState(getEmptyFormData());

  // Load all about data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://indigenousyoungmoms-bvv4.vercel.app/api/about/about-data"
        );
        if (response.ok) {
          const data = await response.json();
          setAboutData(data.data);
          if (data.data.length > 0) {
            setCurrentAbout(data.data[0]);
            setFormData(data.data[0]);
            setEditMode(true);
          }
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setInitialLoadComplete(true);
      }
    };

    fetchData();
  }, []);

  const fetchAllAbout = async () => {
    try {
      const response = await fetch(
        "https://indigenousyoungmoms-bvv4.vercel.app/api/about/about-data"
      );
      if (response.ok) {
        const data = await response.json();
        setAboutData(data.data);
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    }
  };

  const showMessage = (type, text, section = "") => {
    setMessage({ type, text, section });
    setTimeout(() => setMessage({ type: "", text: "", section: "" }), 3000);
  };

  const handleInputChange = (path, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addArrayItem = (path, defaultItem) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = [
        ...current[keys[keys.length - 1]],
        defaultItem,
      ];
      return newData;
    });
  };

  const removeArrayItem = (path, index) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter(
        (_, i) => i !== index
      );
      return newData;
    });
  };

  const updateArrayItem = (path, index, field, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
      const newData = { ...prev };
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]][index][field] = value;
      return newData;
    });
  };

  const saveSection = async (sectionName, sectionData) => {
    setLoading((prev) => ({ ...prev, [sectionName]: true }));

    try {
      const url =
        editMode && currentAbout
          ? `https://indigenousyoungmoms-bvv4.vercel.app/api/about/${currentAbout._id}`
          : "https://indigenousyoungmoms-bvv4.vercel.app/api/about/create-about";

      const method = editMode && currentAbout ? "PUT" : "POST";

      const payload =
        editMode && currentAbout ? { [sectionName]: sectionData } : formData;

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        showMessage(
          "success",
          `${sectionName} saved successfully!`,
          sectionName
        );

        if (!editMode) {
          setCurrentAbout(result);
          setEditMode(true);
        }

        await fetchAllAbout();
      } else {
        const errorData = await response.json();
        showMessage(
          "error",
          errorData.message || `Failed to save ${sectionName}`,
          sectionName
        );
      }
    } catch (error) {
      showMessage("error", "Network error. Please try again.", sectionName);
    } finally {
      setLoading((prev) => ({ ...prev, [sectionName]: false }));
    }
  };

  const loadAboutForEdit = (about) => {
    setFormData(about);
    setCurrentAbout(about);
    setEditMode(true);
  };

  const deleteAbout = async (id) => {
    if (!window.confirm("Are you sure you want to delete this about page?"))
      return;

    try {
      const response = await fetch(
        `https://indigenousyoungmoms-bvv4.vercel.app/api/about/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        showMessage("success", "About page deleted successfully!");
        await fetchAllAbout();
        if (currentAbout && currentAbout._id === id) {
          setCurrentAbout(null);
          setFormData(getEmptyFormData());
          setEditMode(false);
        }
      } else {
        showMessage("error", "Failed to delete about page");
      }
    } catch (error) {
      showMessage("error", "Network error. Please try again.");
    }
  };

  const toggleActive = async (id) => {
    try {
      const response = await fetch(
        `https://indigenousyoungmoms-bvv4.vercel.app/api/about/${id}/activate`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        showMessage("success", "About page status updated!");
        await fetchAllAbout();
      } else {
        showMessage("error", "Failed to update status");
      }
    } catch (error) {
      showMessage("error", "Network error. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData(getEmptyFormData());
    setCurrentAbout(null);
    setEditMode(false);
    setMessage({ type: "", text: "", section: "" });
  };

  const colorOptions = ["red", "green", "amber", "blue", "purple", "emerald"];
  const iconOptions = [
    "Heart",
    "Camera",
    "BookOpen",
    "Leaf",
    "Users",
    "Mountain",
    "TreePine",
    "Sunrise",
  ];

  if (!initialLoadComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                About Page Management
              </h1>
              <p className="text-gray-600 mt-2">
                {editMode ? "Edit" : "Create"} comprehensive information about
                the Yaaku Indigenous Tribe
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={resetForm}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                <span>New About Page</span>
              </button>
              <button
                onClick={fetchAllAbout}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Existing About Pages */}
        {aboutData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Existing About Pages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aboutData.map((about) => (
                <div
                  key={about._id}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                    currentAbout?._id === about._id
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {about.heroContent?.title || "Untitled"}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        about.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {about.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {about.heroContent?.subtitle || "No subtitle"}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => loadAboutForEdit(about)}
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => toggleActive(about._id)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${
                        about.isActive
                          ? "bg-gray-500 text-white hover:bg-gray-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {about.isActive ? (
                        <EyeOff className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                      <span>{about.isActive ? "Hide" : "Show"}</span>
                    </button>
                    <button
                      onClick={() => deleteAbout(about._id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Alert */}
        {message.text && (
          <div
            className={`rounded-lg p-4 mb-6 flex items-center space-x-3 ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            {message.type === "success" ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">
              {message.section && `${message.section}: `}
              {message.text}
            </span>
          </div>
        )}

        {/* Hero Content Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <div className="w-2 h-6 bg-red-500 mr-3"></div>
              Hero Content
            </h2>
            <button
              onClick={() => saveSection("heroContent", formData.heroContent)}
              disabled={loading.heroContent}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
            >
              {loading.heroContent ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Hero</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.heroContent?.title || ""}
                onChange={(e) =>
                  handleInputChange("heroContent.title", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter hero title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.heroContent?.subtitle || ""}
                onChange={(e) =>
                  handleInputChange("heroContent.subtitle", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter hero subtitle"
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Statistics
              </label>
              <button
                type="button"
                onClick={() =>
                  addArrayItem("heroContent.statistics", {
                    label: "",
                    value: "",
                    color: "amber",
                  })
                }
                className="flex items-center space-x-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Statistic</span>
              </button>
            </div>

            {formData.heroContent?.statistics?.map((stat, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 mb-3 p-3 bg-gray-50 rounded-md"
              >
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) =>
                    updateArrayItem(
                      "heroContent.statistics",
                      index,
                      "label",
                      e.target.value
                    )
                  }
                  placeholder="Label"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) =>
                    updateArrayItem(
                      "heroContent.statistics",
                      index,
                      "value",
                      e.target.value
                    )
                  }
                  placeholder="Value"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <select
                  value={stat.color}
                  onChange={(e) =>
                    updateArrayItem(
                      "heroContent.statistics",
                      index,
                      "color",
                      e.target.value
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {colorOptions.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    removeArrayItem("heroContent.statistics", index)
                  }
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <div className="w-2 h-6 bg-green-500 mr-3"></div>
              Images
            </h2>
            <button
              onClick={() => saveSection("images", formData.images)}
              disabled={loading.images}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
            >
              {loading.images ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Images</span>
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Image URL
            </label>
            <input
              type="url"
              value={formData.images?.hero || ""}
              onChange={(e) => handleInputChange("images.hero", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter hero image URL"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Objective Images
              </label>
              <button
                type="button"
                onClick={() => addArrayItem("images.objectives", "")}
                className="flex items-center space-x-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Image</span>
              </button>
            </div>

            {formData.images?.objectives?.map((url, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    const newObjectives = [...formData.images.objectives];
                    newObjectives[index] = e.target.value;
                    handleInputChange("images.objectives", newObjectives);
                  }}
                  placeholder="Enter image URL"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("images.objectives", index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <div className="w-2 h-6 bg-yellow-500 mr-3"></div>
              Vision & Mission
            </h2>
            <button
              onClick={() =>
                saveSection("visionMission", formData.visionMission)
              }
              disabled={loading.visionMission}
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50"
            >
              {loading.visionMission ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Vision & Mission</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={formData.visionMission?.title || ""}
                onChange={(e) =>
                  handleInputChange("visionMission.title", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter section title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Subtitle
              </label>
              <input
                type="text"
                value={formData.visionMission?.subtitle || ""}
                onChange={(e) =>
                  handleInputChange("visionMission.subtitle", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter section subtitle"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Vision</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.visionMission?.vision?.title || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "visionMission.vision.title",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter vision title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <select
                    value={formData.visionMission?.vision?.color || "amber"}
                    onChange={(e) =>
                      handleInputChange(
                        "visionMission.vision.color",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.visionMission?.vision?.description || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "visionMission.vision.description",
                        e.target.value
                      )
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter vision description"
                  />
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Mission</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.visionMission?.mission?.title || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "visionMission.mission.title",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter mission title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <select
                    value={formData.visionMission?.mission?.color || "green"}
                    onChange={(e) =>
                      handleInputChange(
                        "visionMission.mission.color",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.visionMission?.mission?.description || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "visionMission.mission.description",
                        e.target.value
                      )
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter mission description"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <div className="w-2 h-6 bg-blue-500 mr-3"></div>
              Objectives
            </h2>
            <button
              onClick={() => saveSection("objectives", formData.objectives)}
              disabled={loading.objectives}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading.objectives ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Objectives</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={formData.objectives?.title || ""}
                onChange={(e) =>
                  handleInputChange("objectives.title", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter objectives title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Subtitle
              </label>
              <input
                type="text"
                value={formData.objectives?.subtitle || ""}
                onChange={(e) =>
                  handleInputChange("objectives.subtitle", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter objectives subtitle"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Objective Items
              </label>
              <button
                type="button"
                onClick={() =>
                  addArrayItem("objectives.items", {
                    title: "",
                    description: "",
                    icon: "Heart",
                    color: "blue",
                  })
                }
                className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Objective</span>
              </button>
            </div>

            {formData.objectives?.items?.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      updateArrayItem(
                        "objectives.items",
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Objective title"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2">
                    <select
                      value={item.icon}
                      onChange={(e) =>
                        updateArrayItem(
                          "objectives.items",
                          index,
                          "icon",
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                    <select
                      value={item.color}
                      onChange={(e) =>
                        updateArrayItem(
                          "objectives.items",
                          index,
                          "color",
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {colorOptions.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      updateArrayItem(
                        "objectives.items",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Objective description"
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("objectives.items", index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History Content Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <div className="w-2 h-6 bg-purple-500 mr-3"></div>
              History Content
            </h2>
            <button
              onClick={() =>
                saveSection("historyContent", formData.historyContent)
              }
              disabled={loading.historyContent}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
            >
              {loading.historyContent ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save History</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={formData.historyContent?.title || ""}
                onChange={(e) =>
                  handleInputChange("historyContent.title", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter history title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Subtitle
              </label>
              <input
                type="text"
                value={formData.historyContent?.subtitle || ""}
                onChange={(e) =>
                  handleInputChange("historyContent.subtitle", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter history subtitle"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                History Sections
              </label>
              <button
                type="button"
                onClick={() =>
                  addArrayItem("historyContent.sections", {
                    title: "",
                    description: "",
                    imageUrl: "",
                  })
                }
                className="flex items-center space-x-2 px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Section</span>
              </button>
            </div>

            {formData.historyContent?.sections?.map((section, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) =>
                      updateArrayItem(
                        "historyContent.sections",
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Section title"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="url"
                    value={section.imageUrl}
                    onChange={(e) =>
                      updateArrayItem(
                        "historyContent.sections",
                        index,
                        "imageUrl",
                        e.target.value
                      )
                    }
                    placeholder="Image URL"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <textarea
                    value={section.description}
                    onChange={(e) =>
                      updateArrayItem(
                        "historyContent.sections",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Section description"
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem("historyContent.sections", index)
                    }
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Data Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <div className="w-2 h-6 bg-emerald-500 mr-3"></div>
              Timeline Data
            </h2>
            <button
              onClick={() => saveSection("timelineData", formData.timelineData)}
              disabled={loading.timelineData}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50"
            >
              {loading.timelineData ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Timeline</span>
            </button>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                Timeline Events
              </label>
              <button
                type="button"
                onClick={() =>
                  addArrayItem("timelineData", {
                    year: "",
                    title: "",
                    description: "",
                    icon: "Calendar",
                    color: "emerald",
                  })
                }
                className="flex items-center space-x-2 px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>

            {formData.timelineData?.map((event, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg mb-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  <input
                    type="text"
                    value={event.year}
                    onChange={(e) =>
                      updateArrayItem(
                        "timelineData",
                        index,
                        "year",
                        e.target.value
                      )
                    }
                    placeholder="Year"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) =>
                      updateArrayItem(
                        "timelineData",
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Event title"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="flex space-x-2">
                    <select
                      value={event.icon}
                      onChange={(e) =>
                        updateArrayItem(
                          "timelineData",
                          index,
                          "icon",
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                    <select
                      value={event.color}
                      onChange={(e) =>
                        updateArrayItem(
                          "timelineData",
                          index,
                          "color",
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {colorOptions.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <textarea
                    value={event.description}
                    onChange={(e) =>
                      updateArrayItem(
                        "timelineData",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Event description"
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("timelineData", index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <div className="w-2 h-6 bg-orange-500 mr-3"></div>
              Call to Action
            </h2>
            <button
              onClick={() => saveSection("callToAction", formData.callToAction)}
              disabled={loading.callToAction}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
            >
              {loading.callToAction ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save Call to Action</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.callToAction?.title || ""}
                onChange={(e) =>
                  handleInputChange("callToAction.title", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter CTA title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.callToAction?.subtitle || ""}
                onChange={(e) =>
                  handleInputChange("callToAction.subtitle", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter CTA subtitle"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Primary Button
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text
                  </label>
                  <input
                    type="text"
                    value={formData.callToAction?.primaryButton?.text || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "callToAction.primaryButton.text",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter button text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <select
                    value={
                      formData.callToAction?.primaryButton?.icon || "Heart"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "callToAction.primaryButton.icon",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Secondary Button
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text
                  </label>
                  <input
                    type="text"
                    value={formData.callToAction?.secondaryButton?.text || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "callToAction.secondaryButton.text",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter button text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <select
                    value={
                      formData.callToAction?.secondaryButton?.icon || "Camera"
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "callToAction.secondaryButton.icon",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Statistics */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">
                CTA Statistics
              </label>
              <button
                type="button"
                onClick={() =>
                  addArrayItem("callToAction.statistics", {
                    label: "",
                    value: "",
                    color: "orange",
                  })
                }
                className="flex items-center space-x-2 px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Statistic</span>
              </button>
            </div>

            {formData.callToAction?.statistics?.map((stat, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 mb-3 p-3 bg-gray-50 rounded-md"
              >
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) =>
                    updateArrayItem(
                      "callToAction.statistics",
                      index,
                      "label",
                      e.target.value
                    )
                  }
                  placeholder="Label"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) =>
                    updateArrayItem(
                      "callToAction.statistics",
                      index,
                      "value",
                      e.target.value
                    )
                  }
                  placeholder="Value"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <select
                  value={stat.color}
                  onChange={(e) =>
                    updateArrayItem(
                      "callToAction.statistics",
                      index,
                      "color",
                      e.target.value
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {colorOptions.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() =>
                    removeArrayItem("callToAction.statistics", index)
                  }
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save All Button */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Save Complete About Page
              </h3>
              <p className="text-gray-600">
                Save all sections as one complete about page
              </p>
            </div>
            <button
              onClick={() => saveSection("complete", formData)}
              disabled={loading.complete}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
            >
              {loading.complete ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>Save Complete Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
