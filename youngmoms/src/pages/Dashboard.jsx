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
  ChevronLeft,
  LayoutDashboard,
} from "lucide-react";
import Gallery from "../components/Gallery";
import Events from "../components/Events";
import Mission from "../components/Mission";
import Programs from "../components/Programs";
import Content from "../components/Content";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);

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

    // Get sidebar state from localStorage
    const savedSidebarState = localStorage.getItem("isSidebarOpen");
    if (savedSidebarState !== null) {
      setIsSidebarOpen(JSON.parse(savedSidebarState));
    }
  }, []);

  // Save active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const navigationItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "Gallery", label: "Gallery", icon: Image },
    { id: "Events", label: "Events", icon: Calendar },
    { id: "Mission", label: "Mission & Events", icon: Target },
    { id: "Programs", label: "Programs", icon: Users },
    { id: "Content", label: "Content/Blogs", icon: FileText },
  ];

  const handleLogout = () => {
    // Remove all user-related data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Optionally, you can also clear the tab state on logout
    // localStorage.removeItem("activeTab");
    // localStorage.removeItem("isSidebarOpen");
    // Redirect to home page
    window.location.href = "/";
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Extract first name from username
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
      case "Mission":
        return <Mission />;
      case "Programs":
        return <Programs />;
      case "Content":
        return <Content />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-white animate-pulse"
                style={{ backgroundColor: "#E50914" }}
              >
                <LayoutDashboard size={48} className="text-white" />
              </div>
              <h3 className="text-5xl font-bold text-gray-800 mb-6 drop-shadow-sm">
                Dashboard Content
              </h3>
              <p className="text-2xl text-gray-700 max-w-2xl font-medium leading-relaxed">
                Welcome to your dashboard! Select a tab to get started.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-72" : "w-20"
        } bg-white text-gray-800 transition-all duration-300 ease-in-out flex flex-col shadow-2xl border-r border-gray-200`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                DASHBOARD
              </h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md"
            >
              {isSidebarOpen ? (
                <ChevronLeft size={22} className="text-black" />
              ) : (
                <Menu size={22} className="text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "bg-red-600 text-white shadow-xl transform scale-105"
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50 hover:shadow-md"
                }`}
                style={{
                  backgroundColor: isActive ? "#E50914" : undefined,
                }}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-90"></div>
                )}
                <Icon
                  size={24}
                  className={`relative z-10 ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 group-hover:text-red-600"
                  } transition-all duration-200`}
                />
                {isSidebarOpen && (
                  <span
                    className={`relative z-10 font-semibold text-base ${
                      isActive ? "text-white" : "group-hover:text-red-600"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
                {isActive && (
                  <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-4 px-5 py-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 group hover:shadow-md ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <LogOut
              size={22}
              className="group-hover:text-red-600 transition-colors"
            />
            {isSidebarOpen && (
              <span className="font-semibold text-base">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-xl border-b border-emerald-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-white mb-1 drop-shadow-lg">
                {activeTab}
              </h2>
              <p className="text-emerald-100 text-lg">
                Welcome to your magnificent dashboard
              </p>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleUserDropdown}
                className="flex items-center space-x-4 bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-2xl transition-all duration-300 group border border-white border-opacity-30 hover:border-opacity-50 shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: "#E50914" }}
                >
                  <User size={20} className="text-white" />
                </div>
                <span className="text-black font-semibold text-lg drop-shadow-sm">
                  {userData ? getFirstName() : "User"}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-white transition-transform duration-300 ${
                    isUserDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isUserDropdownOpen && userData && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <p className="text-lg font-semibold text-gray-800">
                      {userData.username}
                    </p>
                    <p className="text-sm text-gray-600">{userData.email}</p>
                  </div>
                  <button className="w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium">
                    Account Settings
                  </button>
                  <button className="w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium">
                    Preferences
                  </button>
                  <div className="border-t border-gray-100 mt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 transition-colors font-semibold"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 rounded-3xl shadow-xl p-12 h-full border border-blue-200">
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
