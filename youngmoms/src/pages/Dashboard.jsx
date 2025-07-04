import React, { useState, useEffect } from "react";
import {
  Image,
  Calendar,
  Target,
  Users,
  FileText,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
  Bell,
  Search,
  Settings,
  Home,
  Briefcase,
  BookOpen,
  Activity,
  TrendingUp,
  Users2,
  Star,
  Clock,
  ArrowRight,
  Plus,
  Filter,
  MoreHorizontal,
  Zap,
  Award,
  Globe,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Shield,
  PieChart,
  BarChart3,
  LineChart,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Rocket,
  Sparkles,
  Palette,
  Camera,
  Video,
  Headphones,
  Mic,
} from "lucide-react";

// Import your actual components
import Gallery from "../components/Gallery";
import Events from "../components/Events";
import Programs from "../components/Programs";
import Content from "../components/Content";
import Projects from "../components/Projects";
import About from "../components/About";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(true);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTabletOrDesktop(width >= 768);

      // On mobile, always start with sidebar closed
      if (width < 768) {
        setIsSidebarOpen(false);
      } else {
        // On desktop, check localStorage for sidebar state
        const savedSidebarState = localStorage.getItem("isSidebarOpen");
        if (savedSidebarState !== null) {
          setIsSidebarOpen(JSON.parse(savedSidebarState));
        } else {
          setIsSidebarOpen(true); // Default to open on desktop
        }
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // Get user data from localStorage on component mount
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    }

    // Get the last active tab from localStorage
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // Save sidebar state to localStorage whenever it changes (only for desktop)
  useEffect(() => {
    if (isTabletOrDesktop) {
      localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
    }
  }, [isSidebarOpen, isTabletOrDesktop]);

  const navigationItems = [
    { id: "Dashboard", label: "Dashboard", icon: Home, color: "bg-blue-500" },
    { id: "Gallery", label: "Gallery", icon: Camera, color: "bg-purple-500" },
    { id: "Events", label: "Events", icon: Calendar, color: "bg-green-500" },
    {
      id: "Projects",
      label: "Projects",
      icon: Briefcase,
      color: "bg-orange-500",
    },
    { id: "About", label: "About", icon: Info, color: "bg-cyan-500" },
    { id: "Programs", label: "Programs", icon: Users2, color: "bg-pink-500" },
    { id: "Content", label: "Content", icon: FileText, color: "bg-indigo-500" },
  ];

  const handleLogout = () => {
    // Remove all user-related data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Redirect to home page
    window.location.href = "/";
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const getFirstName = () => {
    if (!userData?.username) return "User";
    return userData.username.split(" ")[0];
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Gallery":
        return <Gallery />;
      case "Events":
        return <Events />;
      case "About":
        return <About />;
      case "Programs":
        return <Programs />;
      case "Projects":
        return <Projects />;
      case "Content":
        return <Content />;
      default:
        return <DashboardHome />;
    }
  };

  const DashboardHome = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {getFirstName()}!
            </h1>
            <p className="text-blue-100 text-lg">
              Here's what's happening with your dashboard today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles size={40} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Projects
              </p>
              <p className="text-3xl font-bold text-gray-900">24</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+12%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Events</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+3</span>
            <span className="text-gray-500 ml-1">new this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gallery Items</p>
              <p className="text-3xl font-bold text-gray-900">156</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Camera size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+28</span>
            <span className="text-gray-500 ml-1">added recently</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Content Posts</p>
              <p className="text-3xl font-bold text-gray-900">42</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+7</span>
            <span className="text-gray-500 ml-1">published this month</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Quick Actions
            </h3>
            <MoreHorizontal size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {navigationItems.slice(1).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">
                        Go to {item.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        Manage your {item.label.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-gray-400 group-hover:text-gray-600 transition-colors"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h3>
            <RefreshCw size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              {
                action: "New project created",
                time: "2 hours ago",
                icon: Plus,
                color: "bg-green-500",
              },
              {
                action: "Gallery updated",
                time: "4 hours ago",
                icon: Camera,
                color: "bg-purple-500",
              },
              {
                action: "Event scheduled",
                time: "6 hours ago",
                icon: Calendar,
                color: "bg-blue-500",
              },
              {
                action: "Content published",
                time: "1 day ago",
                icon: FileText,
                color: "bg-indigo-500",
              },
              {
                action: "Program launched",
                time: "2 days ago",
                icon: Users2,
                color: "bg-pink-500",
              },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon size={14} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } w-72`
            : `${
                isSidebarOpen ? "w-72" : "w-30"
              } transition-all duration-300 ease-in-out`
        } bg-white border-r border-gray-200 flex flex-col shadow-lg`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {(isSidebarOpen || isMobile) && (
              <div className="flex items-center space-x-3">
                <div className="w-18 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-sm text-gray-500">Control Panel</p>
                </div>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobile ? (
                <X size={20} className="text-gray-600" />
              ) : (
                <Menu size={20} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                  !isSidebarOpen && !isMobile ? "justify-center" : "space-x-3"
                } ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? "bg-white bg-opacity-20" : item.color
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-white" : "text-white"}
                  />
                </div>
                {(isSidebarOpen || isMobile) && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 ${
              !isSidebarOpen && !isMobile ? "justify-center" : "space-x-3"
            }`}
          >
            <LogOut size={18} />
            {(isSidebarOpen || isMobile) && (
              <span className="font-medium text-sm">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu size={20} className="text-gray-600" />
                </button>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeTab}
                </h2>
                <p className="text-sm text-gray-500">
                  Manage your {activeTab.toLowerCase()} content
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Settings */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {userData?.username || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userData?.email || "user@example.com"}
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {userData?.username || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {userData?.email || "user@example.com"}
                      </p>
                    </div>
                    <div className="py-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                        <User size={16} />
                        <span>Profile Settings</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                        <Settings size={16} />
                        <span>Account Settings</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                        <Bell size={16} />
                        <span>Notifications</span>
                      </button>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{renderActiveTab()}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
