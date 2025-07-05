import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Filter,
  Eye,
  Star,
  ChevronRight,
  Tag,
  User,
  Mail,
  Phone,
  Building,
  DollarSign,
  X,
  MessageCircle,
  ExternalLink,
  Heart,
  Share2,
  Award,
  BookOpen,
  TreePine,
  Globe,
  Briefcase,
  GraduationCap,
  Coffee,
  Mic,
} from "lucide-react";

const Mission = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = [
    {
      value: "all",
      label: "All Events",
      color: "bg-gray-100 text-gray-700",
      icon: Globe,
    },
    {
      value: "ceremony",
      label: "Ceremony",
      color: "bg-purple-100 text-purple-700",
      icon: Award,
    },
    {
      value: "workshop",
      label: "Workshop",
      color: "bg-blue-100 text-blue-700",
      icon: Coffee,
    },
    {
      value: "community",
      label: "Community",
      color: "bg-orange-100 text-orange-700",
      icon: Users,
    },
    {
      value: "environmental",
      label: "Environmental",
      color: "bg-green-100 text-green-700",
      icon: TreePine,
    },
    {
      value: "cultural",
      label: "Cultural",
      color: "bg-pink-100 text-pink-700",
      icon: Heart,
    },
    {
      value: "educational",
      label: "Educational",
      color: "bg-indigo-100 text-indigo-700",
      icon: GraduationCap,
    },
    {
      value: "conference",
      label: "Conference",
      color: "bg-cyan-100 text-cyan-700",
      icon: Briefcase,
    },
    {
      value: "meeting",
      label: "Meeting",
      color: "bg-slate-100 text-slate-700",
      icon: Mic,
    },
  ];

  const whatsappNumber = "0797743366";

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://indigenousyoungmoms-bvv4.vercel.app/api/events/"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched events:", data);

      if (data.success) {
        setEvents(Array.isArray(data.data) ? data.data : []);
      } else {
        console.error("API returned success: false", data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
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

  const getCategoryInfo = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat || { color: "bg-gray-100 text-gray-700", icon: Globe };
  };

  const handleWhatsAppContact = (event) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the event "${
        event.title
      }" scheduled for ${formatDate(
        event.startDate
      )}. Could you please provide more information?`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(
      /\D/g,
      ""
    )}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShare = (event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${event.title} - ${window.location.href}`);
      alert("Event link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover and join amazing events in your community
            </p>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{events.length} Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>Community Driven</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.value
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent size={16} />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const categoryInfo = getCategoryInfo(event.category);
              const IconComponent = categoryInfo.icon;

              return (
                <div
                  key={event._id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Event Image/Header */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 p-4">
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${categoryInfo.color}`}
                      >
                        <IconComponent size={14} />
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          event.ticketPrice === 0
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {event.ticketPrice === 0
                          ? "Free"
                          : `$${event.ticketPrice}`}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="line-clamp-1">
                          {event.location?.name || "Location TBD"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={16} className="text-gray-400" />
                        <span>{event.maxAttendees} attendees</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {event.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{event.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowDetailsModal(true);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye size={16} />
                        Details
                      </button>
                      <button
                        onClick={() => handleWhatsAppContact(event)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <MessageCircle size={16} />
                        Contact
                      </button>
                      <button
                        onClick={() => handleShare(event)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No Events Found */}
        {filteredEvents.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md mx-auto">
              <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-lg font-semibold mb-2">No Events Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any events matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {showDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedEvent.title}
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Event Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Date & Time</p>
                      <p className="text-gray-600">
                        {formatDate(selectedEvent.startDate)}
                      </p>
                      <p className="text-gray-600">
                        Ends: {formatDate(selectedEvent.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">
                        {selectedEvent.location?.name || "Location TBD"}
                      </p>
                      {selectedEvent.location?.address && (
                        <p className="text-gray-600">
                          {selectedEvent.location.address}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Capacity</p>
                      <p className="text-gray-600">
                        {selectedEvent.maxAttendees} max attendees
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedEvent.organizer?.name && (
                    <div className="flex items-start gap-3">
                      <User className="text-blue-600 mt-1" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">Organizer</p>
                        <p className="text-gray-600">
                          {selectedEvent.organizer.name}
                        </p>
                        {selectedEvent.organizer.organization && (
                          <p className="text-gray-600">
                            {selectedEvent.organizer.organization}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <DollarSign className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Price</p>
                      <p className="text-gray-600">
                        {selectedEvent.ticketPrice === 0
                          ? "Free"
                          : `$${selectedEvent.ticketPrice}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Tag className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Category</p>
                      <p className="text-gray-600 capitalize">
                        {selectedEvent.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedEvent.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    About This Event
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleWhatsAppContact(selectedEvent)}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Contact on WhatsApp
                </button>
                <button
                  onClick={() => handleShare(selectedEvent)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mission;
