import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Users,
  TreePine,
  Heart,
  ChevronDown,
  Send,
  Bold,
  Italic,
  Underline,
  X,
} from "lucide-react";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [message, setMessage] = useState("");
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const topics = [
    "Support Our Mission",
    "Volunteer Opportunities",
    "Partnership Inquiry",
    "Media & Press",
    "Learn Yaakunte Language",
    "Donate to Forest Protection",
    "Cultural Exchange Program",
    "Educational Collaboration",
    "General Inquiry",
  ];

  const handleSendMessage = () => {
    if (selectedTopic && message.trim()) {
      // Create mailto link with subject and body
      const subject = encodeURIComponent(
        `${selectedTopic} - Indigenous Young Moms`
      );
      const body = encodeURIComponent(message);
      window.location.href = `mailto:indigenousyoungmoms@gmail.com?subject=${subject}&body=${body}`;

      // Reset form
      setMessage("");
      setSelectedTopic("");
      setIsModalOpen(false);
    }
  };

  const applyFormatting = (format) => {
    const textarea = document.getElementById("message-textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = message.substring(start, end);

    if (selectedText) {
      let formattedText = selectedText;
      if (format === "bold") formattedText = `**${selectedText}**`;
      if (format === "italic") formattedText = `*${selectedText}*`;
      if (format === "underline") formattedText = `_${selectedText}_`;

      const newMessage =
        message.substring(0, start) + formattedText + message.substring(end);
      setMessage(newMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-red-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Indigenous Young Moms</h1>
          <p className="text-xl mb-2 text-blue-200">Empowering communities</p>
          <div className="flex items-center justify-center space-x-2 text-orange-300 mb-6">
            <span className="text-lg">Yaaku Indigenous Tribe</span>
            <span>•</span>
            <span className="text-lg">Mukogodo Forest</span>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg px-8 py-4 inline-block backdrop-blur-sm">
            <span className="text-2xl font-bold text-orange-300">
              Preserve • Revive • Thrive
            </span>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Reviving the endangered Yaakunte language and preserving Yaaku
            culture while empowering indigenous young mothers in Mukogodo
            Forest. Protecting 74,000 acres of ancestral forest and building
            sustainable livelihoods through traditional knowledge.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600">
            <div className="text-4xl font-bold text-blue-600 mb-2">8,000</div>
            <div className="text-gray-600">Yaaku People</div>
          </div>
          <div className="text-center bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-600">
            <div className="text-4xl font-bold text-red-600 mb-2">1</div>
            <div className="text-gray-600">Fluent Speaker Left</div>
          </div>
          <div className="text-center bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-600">
            <div className="text-4xl font-bold text-orange-600 mb-2">74K</div>
            <div className="text-gray-600">Acres Protected</div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Quick Links
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Home", "About", "Missions", "Events", "Projects", "Contact"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {link}
                </a>
              )
            )}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-colors">
              Support Our Mission
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold transition-colors">
              Learn Yaakunte
            </button>
          </div>
        </div>

        {/* Our Impact */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Impact
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <MessageCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Language Revival
              </h4>
              <p className="text-gray-600 mb-4">
                AI-powered Yaakunte learning app with the last fluent speaker
              </p>
              <div className="bg-blue-100 text-blue-800 font-bold py-2 px-4 rounded-full inline-block">
                98% Revival Success
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <TreePine className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Forest Protection
              </h4>
              <p className="text-gray-600 mb-4">
                Safeguarding Mukogodo Forest ecosystem
              </p>
              <div className="bg-green-100 text-green-800 font-bold py-2 px-4 rounded-full inline-block">
                Net Zero Goals
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <Heart className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Women Empowerment
              </h4>
              <p className="text-gray-600 mb-4">
                Sustainable livelihoods for young mothers
              </p>
              <div className="bg-red-100 text-red-800 font-bold py-2 px-4 rounded-full inline-block">
                100+ Women Helped
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Get In Touch
          </h3>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">
                    Phone Numbers
                  </h4>
                  <p className="text-gray-600">+254 795 285 373</p>
                  <p className="text-gray-600">+254 741 908 255</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-2">Email</h4>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-red-600 hover:text-red-700 underline"
                  >
                    indigenousyoungmoms@gmail.com
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Location</h4>
                  <p className="text-gray-600">Mukogodo Forest</p>
                  <p className="text-gray-600">Laikipia North District</p>
                  <p className="text-gray-600">Kenya</p>
                </div>
              </div>

              {/* Write Message Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Write Message</span>
              </button>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-bold text-gray-800 mb-6 text-xl">
                Follow Us
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                  <span className="font-medium">Facebook</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 bg-blue-400 hover:bg-blue-500 text-white p-4 rounded-lg transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                  <span className="font-medium">Twitter</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-lg transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                  <span className="font-medium">Instagram</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 bg-blue-800 hover:bg-blue-900 text-white p-4 rounded-lg transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="font-medium">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">Send Message</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Topic Dropdown */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  What would you like to discuss?
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-blue-500 focus:border-blue-500 focus:outline-none"
                  >
                    <span
                      className={
                        selectedTopic ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {selectedTopic || "Select a topic..."}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isTopicDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isTopicDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {topics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => {
                            setSelectedTopic(topic);
                            setIsTopicDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Your Message
                </label>

                {/* Formatting Toolbar */}
                <div className="flex space-x-2 mb-2">
                  <button
                    onClick={() => applyFormatting("bold")}
                    className={`p-2 rounded ${
                      isBold
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    } hover:bg-blue-100`}
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => applyFormatting("italic")}
                    className={`p-2 rounded ${
                      isItalic
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    } hover:bg-blue-100`}
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => applyFormatting("underline")}
                    className={`p-2 rounded ${
                      isUnderline
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    } hover:bg-blue-100`}
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                </div>

                <textarea
                  id="message-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!selectedTopic || !message.trim()}
                className={`w-full py-4 px-6 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all ${
                  selectedTopic && message.trim()
                    ? "bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
