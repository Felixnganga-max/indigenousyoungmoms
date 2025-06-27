import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Star,
  ChevronRight,
  Tag,
  User,
  Mail,
  Phone,
  Building,
  DollarSign,
  Image as ImageIcon,
  X,
  Save,
  Upload,
} from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    category: "environmental",
    startDate: "",
    endDate: "",
    location: {
      name: "",
      address: "",
      city: "Nairobi",
      state: "Nairobi County",
      country: "Kenya",
    },
    organizer: {
      name: "",
      email: "",
      phone: "",
      organization: "",
    },
    maxAttendees: 50,
    registrationRequired: true,
    ticketPrice: 0,
    tags: [],
  });

  const categories = [
    { value: "all", label: "All Events", color: "bg-gray-500" },
    { value: "environmental", label: "Environmental", color: "bg-green-500" },
    { value: "community", label: "Community", color: "bg-orange-500" },
    { value: "education", label: "Education", color: "bg-red-500" },
    { value: "health", label: "Health", color: "bg-white text-black border" },
    { value: "technology", label: "Technology", color: "bg-black" },
  ];

  // Toast notification function
  const showToast = (message, type = "success") => {
    console.log(`${type.toUpperCase()}: ${message}`);
    // You can replace this with a proper toast library like react-hot-toast
    alert(`${type.toUpperCase()}: ${message}`);
  };

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/events/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched events:", data);

      if (data.success) {
        setEvents(Array.isArray(data.data) ? data.data : []);
      } else {
        console.error("API returned success: false", data);
        showToast(data.message || "Failed to fetch events", "error");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      showToast(
        "Failed to fetch events. Make sure your backend is running.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Create event
  const createEvent = async () => {
    if (!newEvent.title.trim()) {
      showToast("Please enter an event title", "error");
      return;
    }

    setLoading(true);
    try {
      const eventData = {
        ...newEvent,
        createdBy: "60b5d6c8f1b2c3d4e5f6a7b8", // You should replace this with actual user ID
        status: "upcoming",
        tags: Array.isArray(newEvent.tags) ? newEvent.tags : [],
      };

      console.log("Creating event with data:", eventData);

      const response = await fetch("http://localhost:3000/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Create event response:", data);

      if (data.success) {
        showToast("Event created successfully!");
        setShowCreateModal(false);
        fetchEvents();
        resetForm();
      } else {
        showToast(data.message || "Failed to create event", "error");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      showToast("Failed to create event. Check console for details.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Update event
  const updateEvent = async (id, updatedData) => {
    if (!id) {
      showToast("Event ID is required", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update event response:", data);

      if (data.success) {
        showToast("Event updated successfully!");
        fetchEvents();
        setEditingEvent(null);
      } else {
        showToast(data.message || "Failed to update event", "error");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      showToast("Failed to update event", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    if (!id) {
      showToast("Event ID is required", "error");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Delete event response:", data);

      if (data.success) {
        showToast("Event deleted successfully!");
        fetchEvents();
      } else {
        showToast(data.message || "Failed to delete event", "error");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      showToast("Failed to delete event", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewEvent({
      title: "",
      description: "",
      category: "environmental",
      startDate: "",
      endDate: "",
      location: {
        name: "",
        address: "",
        city: "Nairobi",
        state: "Nairobi County",
        country: "Kenya",
      },
      organizer: {
        name: "",
        email: "",
        phone: "",
        organization: "",
      },
      maxAttendees: 50,
      registrationRequired: true,
      ticketPrice: 0,
      tags: [],
    });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getCategoryColor = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.color : "bg-gray-500";
  };

  // Format datetime for input fields
  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16);
    } catch (error) {
      return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-green-400 bg-clip-text text-transparent">
                Events Manager
              </h1>
              <p className="text-gray-300 mt-2">
                Discover and manage amazing events in your community
              </p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 px-8 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              <Plus size={20} />
              Create Event
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category.value
                    ? `${category.color} text-white shadow-lg scale-105`
                    : "bg-white/10 hover:bg-white/20 text-gray-300"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading events...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
              >
                <div className="relative h-48 bg-gradient-to-br from-red-500/20 via-orange-500/20 to-green-500/20">
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(
                        event.category
                      )}`}
                    >
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowDetailsModal(true);
                      }}
                      className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="p-2 bg-red-500/50 rounded-full hover:bg-red-500/70 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar size={14} />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin size={14} />
                      <span>{event.location?.name || "TBD"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users size={14} />
                      <span>{event.maxAttendees} max attendees</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        event.ticketPrice === 0
                          ? "bg-green-500/20 text-green-400"
                          : "bg-orange-500/20 text-orange-400"
                      }`}
                    >
                      {event.ticketPrice === 0
                        ? "FREE"
                        : `$${event.ticketPrice}`}
                    </span>
                    <ChevronRight className="text-gray-400" size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredEvents.length === 0 && !loading && (
          <div className="text-center py-12">
            <Calendar className="mx-auto mb-4 text-gray-500" size={64} />
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-gray-400">
              Try adjusting your search or create a new event
            </p>
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Create New Event
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Describe your event"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={newEvent.startDate}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startDate: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={newEvent.endDate}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endDate: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={newEvent.location.name}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        location: {
                          ...newEvent.location,
                          name: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    placeholder="Venue name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={newEvent.location.address}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        location: {
                          ...newEvent.location,
                          address: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    placeholder="Street address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    value={newEvent.maxAttendees}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        maxAttendees: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ticket Price
                  </label>
                  <input
                    type="number"
                    value={newEvent.ticketPrice}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        ticketPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="flex items-center gap-3 pt-8">
                  <input
                    type="checkbox"
                    checked={newEvent.registrationRequired}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        registrationRequired: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-red-500"
                  />
                  <label className="text-sm">Registration Required</label>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Organizer Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Organizer Name
                    </label>
                    <input
                      type="text"
                      value={newEvent.organizer.name}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          organizer: {
                            ...newEvent.organizer,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={newEvent.organizer.organization}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          organizer: {
                            ...newEvent.organizer,
                            organization: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newEvent.organizer.email}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          organizer: {
                            ...newEvent.organizer,
                            email: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={newEvent.organizer.phone}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          organizer: {
                            ...newEvent.organizer,
                            phone: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createEvent}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {selectedEvent.title}
                </h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${getCategoryColor(
                    selectedEvent.category
                  )}`}
                >
                  {selectedEvent.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    selectedEvent.ticketPrice === 0
                      ? "bg-green-500/20 text-green-400"
                      : "bg-orange-500/20 text-orange-400"
                  }`}
                >
                  {selectedEvent.ticketPrice === 0
                    ? "FREE"
                    : `$${selectedEvent.ticketPrice}`}
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-red-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-400">Start Date</p>
                      <p className="font-semibold">
                        {formatDate(selectedEvent.startDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="text-red-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-400">End Date</p>
                      <p className="font-semibold">
                        {formatDate(selectedEvent.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="text-red-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="font-semibold">
                        {selectedEvent.location?.name || "TBD"}
                      </p>
                      {selectedEvent.location?.address && (
                        <p className="text-sm text-gray-400">
                          {selectedEvent.location.address}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="text-red-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-400">Max Attendees</p>
                      <p className="font-semibold">
                        {selectedEvent.maxAttendees}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedEvent.organizer?.name && (
                    <div className="flex items-center gap-3">
                      <User className="text-red-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Organizer</p>
                        <p className="font-semibold">
                          {selectedEvent.organizer.name}
                        </p>
                        {selectedEvent.organizer.organization && (
                          <p className="text-sm text-gray-400">
                            {selectedEvent.organizer.organization}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedEvent.organizer?.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="text-red-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="font-semibold">
                          {selectedEvent.organizer.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedEvent.organizer?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="text-red-400" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="font-semibold">
                          {selectedEvent.organizer.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <DollarSign className="text-red-400" size={20} />
                    <div>
                      <p className="text-sm text-gray-400">Registration</p>
                      <p className="font-semibold">
                        {selectedEvent.registrationRequired
                          ? "Required"
                          : "Not Required"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedEvent.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>
              )}

              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Edit Event
                </h2>
                <button
                  onClick={() => setEditingEvent(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={editingEvent.title}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={editingEvent.description}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Describe your event"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={formatDateTimeForInput(editingEvent.startDate)}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={formatDateTimeForInput(editingEvent.endDate)}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={editingEvent.location?.name || ""}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        location: {
                          ...editingEvent.location,
                          name: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    placeholder="Venue name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={editingEvent.location?.address || ""}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        location: {
                          ...editingEvent.location,
                          address: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    placeholder="Street address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    value={editingEvent.maxAttendees}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        maxAttendees: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ticket Price
                  </label>
                  <input
                    type="number"
                    value={editingEvent.ticketPrice}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        ticketPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="flex items-center gap-3 pt-8">
                  <input
                    type="checkbox"
                    checked={editingEvent.registrationRequired}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        registrationRequired: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-red-500"
                  />
                  <label className="text-sm">Registration Required</label>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Organizer Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Organizer Name
                    </label>
                    <input
                      type="text"
                      value={editingEvent.organizer?.name || ""}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          organizer: {
                            ...editingEvent.organizer,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={editingEvent.organizer?.organization || ""}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          organizer: {
                            ...editingEvent.organizer,
                            organization: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editingEvent.organizer?.email || ""}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          organizer: {
                            ...editingEvent.organizer,
                            email: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editingEvent.organizer?.phone || ""}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          organizer: {
                            ...editingEvent.organizer,
                            phone: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                <button
                  onClick={() => setEditingEvent(null)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateEvent(editingEvent._id, editingEvent)}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
