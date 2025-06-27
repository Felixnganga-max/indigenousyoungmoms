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
  Sparkles,
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
    { value: "all", label: "All Events", color: "bg-emerald-600", icon: Globe },
    {
      value: "ceremony",
      label: "Ceremony",
      color: "bg-purple-600",
      icon: Award,
    },
    {
      value: "workshop",
      label: "Workshop",
      color: "bg-blue-600",
      icon: Coffee,
    },
    {
      value: "community",
      label: "Community",
      color: "bg-orange-600",
      icon: Users,
    },
    {
      value: "environmental",
      label: "Environmental",
      color: "bg-green-600",
      icon: TreePine,
    },
    { value: "cultural", label: "Cultural", color: "bg-pink-600", icon: Heart },
    {
      value: "educational",
      label: "Educational",
      color: "bg-indigo-600",
      icon: GraduationCap,
    },
    {
      value: "conference",
      label: "Conference",
      color: "bg-cyan-600",
      icon: Briefcase,
    },
    { value: "meeting", label: "Meeting", color: "bg-slate-600", icon: Mic },
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
    return cat || { color: "bg-gray-600", icon: Globe };
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
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${event.title} - ${window.location.href}`);
      alert("Event link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-300 via-teal-400 to-cyan-500 text-gray-900">
      {/* Animated Background Overlay */}
      <div className="fixed inset-0 bg-gradient-to-r from-emerald-200/30 via-transparent to-teal-200/30 animate-pulse pointer-events-none" />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-emerald-600/95 via-teal-700/95 to-cyan-700/95 backdrop-blur-lg border-b border-emerald-400/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 animate-gradient-x" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full border-2 border-emerald-300/50 backdrop-blur-sm shadow-lg">
              <Sparkles className="text-yellow-300 animate-pulse" size={20} />
              <span className="text-base font-bold text-white">
                Discover Amazing Events
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Upcoming Events
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-emerald-50 max-w-4xl mx-auto leading-relaxed font-medium">
              Join us for incredible experiences, networking opportunities, and
              memorable moments in your community
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Calendar className="text-emerald-200" size={18} />
                <span className="text-white font-medium">
                  {events.length} Events
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Users className="text-emerald-200" size={18} />
                <span className="text-white font-medium">Community Driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col xl:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-emerald-600"
              size={24}
            />
            <input
              type="text"
              placeholder="Search events by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white/90 backdrop-blur-sm border-2 border-emerald-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition-all text-lg font-medium shadow-lg hover:shadow-xl placeholder-emerald-500"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            <div className="flex gap-3 min-w-max">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`group flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      selectedCategory === category.value
                        ? `${category.color} text-white shadow-2xl scale-105 ring-4 ring-white/30`
                        : "bg-white/80 hover:bg-white/95 text-gray-700 border-2 border-emerald-200 hover:border-emerald-400"
                    }`}
                  >
                    <IconComponent
                      size={20}
                      className={
                        selectedCategory === category.value
                          ? "text-white"
                          : "text-emerald-600"
                      }
                    />
                    {category.label}
                    {selectedCategory === category.value && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-emerald-200 border-t-emerald-600 mx-auto"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-pulse"></div>
            </div>
            <p className="mt-8 text-2xl font-bold text-emerald-700">
              Discovering amazing events...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredEvents.map((event) => {
              const categoryInfo = getCategoryInfo(event.category);
              const IconComponent = categoryInfo.icon;

              return (
                <div
                  key={event._id}
                  className="group bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm border-2 border-emerald-200/50 rounded-3xl overflow-hidden hover:border-emerald-400 transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl shadow-lg hover:shadow-emerald-200/50 flex flex-col h-full"
                >
                  {/* Increased image height */}
                  <div className="relative h-56 sm:h-64 bg-gradient-to-br from-emerald-400/90 via-teal-500/90 to-cyan-500/90 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-transparent to-teal-500/30 animate-pulse" />

                    <div className="absolute top-4 left-4">
                      <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold text-white ${categoryInfo.color} shadow-lg backdrop-blur-sm border border-white/20`}
                      >
                        <IconComponent size={16} />
                        {event.category}
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => handleShare(event)}
                        className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-lg border border-white/30 group-hover:scale-110"
                      >
                        <Share2 size={18} className="text-white" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowDetailsModal(true);
                        }}
                        className="p-3 bg-gradient-to-r from-emerald-500/70 to-teal-500/70 rounded-full hover:from-emerald-500/90 hover:to-teal-500/90 transition-all duration-300 backdrop-blur-lg border border-white/30 group-hover:scale-110"
                      >
                        <Eye size={18} className="text-white" />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-lg border ${
                            event.ticketPrice === 0
                              ? "bg-green-500/80 text-white border-green-300/50"
                              : "bg-orange-500/80 text-white border-orange-300/50"
                          } shadow-lg`}
                        >
                          {event.ticketPrice === 0
                            ? "FREE EVENT"
                            : `$${event.ticketPrice}`}
                        </span>
                        <div className="flex items-center gap-2 px-3 py-2 bg-yellow-400/90 text-yellow-900 rounded-full backdrop-blur-lg border border-yellow-300/50 shadow-lg">
                          <Star size={16} fill="currentColor" />
                          <span className="text-sm font-bold">Featured</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content section with increased padding and spacing */}
                  <div className="p-6 lg:p-8 flex-1 flex flex-col">
                    <h3 className="text-xl lg:text-2xl font-black mb-4 text-gray-800 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm lg:text-base mb-6 line-clamp-3 leading-relaxed flex-grow">
                      {event.description}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-4 text-sm lg:text-base text-gray-600">
                        <Calendar
                          size={18}
                          className="text-emerald-600 flex-shrink-0"
                        />
                        <span className="font-semibold">
                          {formatDate(event.startDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm lg:text-base text-gray-600">
                        <MapPin
                          size={18}
                          className="text-emerald-600 flex-shrink-0"
                        />
                        <span className="font-semibold line-clamp-1">
                          {event.location?.name || "Location TBD"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm lg:text-base text-gray-600">
                        <Users
                          size={18}
                          className="text-emerald-600 flex-shrink-0"
                        />
                        <span className="font-semibold">
                          {event.maxAttendees} max attendees
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.tags?.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-300"
                        >
                          #{tag}
                        </span>
                      ))}
                      {event.tags?.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-300">
                          +{event.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowDetailsModal(true);
                        }}
                        className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg border border-gray-300"
                      >
                        <Eye size={18} />
                        View Details
                      </button>
                      <button
                        onClick={() => handleWhatsAppContact(event)}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <MessageCircle size={18} />
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredEvents.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-lg border-2 border-emerald-200 rounded-3xl p-12 lg:p-16 max-w-lg mx-auto shadow-2xl">
              <Calendar className="mx-auto mb-8 text-emerald-600" size={80} />
              <h3 className="text-3xl font-black mb-6 text-emerald-700">
                No Events Found
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                We couldn't find any events matching your criteria. Try
                adjusting your search or check back later for new events!
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {showDetailsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-white via-emerald-50/50 to-white border-2 border-emerald-300 rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600/95 via-teal-600/95 to-emerald-600/95 backdrop-blur-lg p-6 lg:p-8 border-b-2 border-emerald-300">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white ${
                        getCategoryInfo(selectedEvent.category).color
                      }`}
                    >
                      {React.createElement(
                        getCategoryInfo(selectedEvent.category).icon,
                        { size: 16 }
                      )}
                      {selectedEvent.category}
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        selectedEvent.ticketPrice === 0
                          ? "bg-green-500/90 text-white"
                          : "bg-orange-500/90 text-white"
                      }`}
                    >
                      {selectedEvent.ticketPrice === 0
                        ? "FREE EVENT"
                        : `$${selectedEvent.ticketPrice}`}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-3 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm border border-white/30"
                >
                  <X size={28} className="text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 lg:p-10 space-y-10">
              {/* Event Hero Section */}
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 rounded-3xl p-8 lg:p-10 border-2 border-emerald-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <Calendar
                        className="text-emerald-600 flex-shrink-0 mt-1"
                        size={28}
                      />
                      <div>
                        <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-1">
                          Event Date & Time
                        </p>
                        <p className="text-xl font-black text-gray-800 mb-2">
                          {formatDate(selectedEvent.startDate)}
                        </p>
                        <p className="text-base text-gray-600 font-semibold">
                          Ends: {formatDate(selectedEvent.endDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <MapPin
                        className="text-emerald-600 flex-shrink-0 mt-1"
                        size={28}
                      />
                      <div>
                        <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-1">
                          Location
                        </p>
                        <p className="text-xl font-black text-gray-800 mb-2">
                          {selectedEvent.location?.name || "Location TBD"}
                        </p>
                        {selectedEvent.location?.address && (
                          <p className="text-base text-gray-600 font-semibold mb-1">
                            {selectedEvent.location.address}
                          </p>
                        )}
                        {selectedEvent.location?.city && (
                          <p className="text-base text-gray-600 font-semibold">
                            {selectedEvent.location.city},{" "}
                            {selectedEvent.location.state}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <Users
                        className="text-emerald-600 flex-shrink-0 mt-1"
                        size={28}
                      />
                      <div>
                        <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-1">
                          Capacity
                        </p>
                        <p className="text-xl font-black text-gray-800 mb-2">
                          {selectedEvent.maxAttendees} max attendees
                        </p>
                        <p className="text-base text-gray-600 font-semibold">
                          Registration{" "}
                          {selectedEvent.registrationRequired
                            ? "Required"
                            : "Not Required"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {selectedEvent.organizer?.name && (
                      <div className="flex items-start gap-5">
                        <User
                          className="text-emerald-600 flex-shrink-0 mt-1"
                          size={28}
                        />
                        <div>
                          <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-1">
                            Organized by
                          </p>
                          <p className="text-xl font-black text-gray-800 mb-2">
                            {selectedEvent.organizer.name}
                          </p>
                          {selectedEvent.organizer.organization && (
                            <p className="text-base text-gray-600 font-semibold">
                              {selectedEvent.organizer.organization}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedEvent.organizer?.email && (
                      <div className="flex items-start gap-5">
                        <Mail
                          className="text-emerald-600 flex-shrink-0 mt-1"
                          size={28}
                        />
                        <div>
                          <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-1">
                            Email
                          </p>
                          <p className="text-xl font-black text-gray-800">
                            {selectedEvent.organizer.email}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-5">
                      <DollarSign
                        className="text-emerald-600 flex-shrink-0 mt-1"
                        size={28}
                      />
                      <div>
                        <p className="text-sm font-bold text-emerald-600 uppercase tracking-wide mb-1">
                          Ticket Price
                        </p>
                        <p className="text-xl font-black text-gray-800">
                          {selectedEvent.ticketPrice === 0
                            ? "Free Entry"
                            : `$${selectedEvent.ticketPrice}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedEvent.description && (
                <div className="bg-white rounded-3xl p-8 lg:p-10 border-2 border-emerald-200 shadow-lg">
                  <h3 className="text-2xl lg:text-3xl font-black mb-6 text-emerald-700">
                    About This Event
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap font-medium">
                      {selectedEvent.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Tags */}
              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div className="bg-white rounded-3xl p-8 lg:p-10 border-2 border-emerald-200 shadow-lg">
                  <h3 className="text-2xl lg:text-3xl font-black mb-6 text-emerald-700">
                    Event Tags
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedEvent.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full border-2 border-emerald-300 font-bold text-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 lg:p-12 border-2 border-green-400 shadow-2xl">
                <div className="text-center">
                  <MessageCircle
                    className="mx-auto mb-6 text-white"
                    size={64}
                  />
                  <h3 className="text-2xl lg:text-3xl font-black mb-6 text-white">
                    Interested in This Event?
                  </h3>
                  <p className="text-white/90 mb-8 text-lg lg:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
                    Get in touch with us for more information, registration
                    details, or any questions you might have!
                  </p>
                  <button
                    onClick={() => handleWhatsAppContact(selectedEvent)}
                    className="bg-white text-green-600 hover:text-green-700 px-10 py-5 rounded-2xl font-black text-lg lg:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center gap-4 mx-auto"
                  >
                    <MessageCircle size={28} />
                    Contact us on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mission;
