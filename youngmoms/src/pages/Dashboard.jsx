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

// Mock components for demonstration
const Gallery = () => (
  <div className="p-4">
    <h3 className="text-2xl font-bold">Gallery Content</h3>
  </div>
);
const Events = () => (
  <div className="p-4">
    <h3 className="text-2xl font-bold">Events Content</h3>
  </div>
);
const Mission = () => (
  <div className="p-4">
    <h3 className="text-2xl font-bold">Mission Content</h3>
  </div>
);
const Programs = () => (
  <div className="p-4">
    <h3 className="text-2xl font-bold">Programs Content</h3>
  </div>
);
const Content = () => (
  <div className="p-4">
    <h3 className="text-2xl font-bold">Content/Blogs</h3>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState({
    username: "John Doe",
    email: "john@example.com",
  });

  // Using React state to persist data (simulating localStorage behavior)
  const [persistedData, setPersistedData] = useState({
    activeTab: "Dashboard",
    isSidebarOpen: true,
  });

  useEffect(() => {
    // Simulate getting user data from memory
    const user = { username: "John Doe", email: "john@example.com" };
    if (user) {
      setUserData(user);
    }

    // Set initial states from persisted data
    setActiveTab(persistedData.activeTab);
    setIsSidebarOpen(persistedData.isSidebarOpen);
  }, []);

  // Update persisted data whenever activeTab or sidebar state changes
  useEffect(() => {
    setPersistedData((prev) => ({
      ...prev,
      activeTab: activeTab,
    }));
  }, [activeTab]);

  useEffect(() => {
    setPersistedData((prev) => ({
      ...prev,
      isSidebarOpen: isSidebarOpen,
    }));
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
    // Clear persisted data
    setPersistedData({
      activeTab: "Dashboard",
      isSidebarOpen: true,
    });
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
              <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 drop-shadow-sm">
                Dashboard Content
              </h3>
              <p className="text-lg md:text-2xl text-gray-700 max-w-2xl font-medium leading-relaxed">
                Welcome to your dashboard! Select a tab to get started.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-blue-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64 md:w-72" : "w-16 md:w-20"
        } bg-white text-gray-800 transition-all duration-300 ease-in-out flex flex-col shadow-2xl border-r border-gray-200 flex-shrink-0`}
      >
        {/* Sidebar Header */}
        <div className="p-3 md:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                DASHBOARD
              </h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 md:p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md"
            >
              {isSidebarOpen ? (
                <ChevronLeft size={20} className="text-black" />
              ) : (
                <Menu size={20} className="text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-2 md:p-6 space-y-1 md:space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-center md:justify-start space-x-0 md:space-x-4 px-2 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "bg-red-600 text-white shadow-xl transform scale-105"
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50 hover:shadow-md"
                }`}
                style={{
                  backgroundColor: isActive ? "#E50914" : undefined,
                }}
                title={!isSidebarOpen ? item.label : undefined}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-90"></div>
                )}
                <Icon
                  size={isSidebarOpen ? 24 : 20}
                  className={`relative z-10 ${
                    isActive
                      ? "text-white"
                      : "text-black group-hover:text-red-600"
                  } transition-all duration-200 flex-shrink-0`}
                />
                {isSidebarOpen && (
                  <span
                    className={`relative z-10 font-semibold text-sm md:text-base ${
                      isActive ? "text-white" : "group-hover:text-red-600"
                    } hidden md:block`}
                  >
                    {item.label}
                  </span>
                )}
                {isActive && isSidebarOpen && (
                  <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-2 md:p-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center md:justify-start space-x-0 md:space-x-4 px-2 md:px-5 py-3 md:py-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl md:rounded-2xl transition-all duration-300 group hover:shadow-md`}
            title={!isSidebarOpen ? "Logout" : undefined}
          >
            <LogOut
              size={20}
              className="text-black group-hover:text-red-600 transition-colors flex-shrink-0"
            />
            {isSidebarOpen && (
              <span className="font-semibold text-sm md:text-base hidden md:block">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-xl border-b border-emerald-700 px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg truncate">
                {activeTab}
              </h2>
              <p className="text-emerald-100 text-sm md:text-lg hidden sm:block">
                Welcome to your magnificent dashboard
              </p>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative flex-shrink-0 ml-4">
              <button
                onClick={toggleUserDropdown}
                className="flex items-center space-x-2 md:space-x-4 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl transition-all duration-300 group border border-white border-opacity-30 hover:border-opacity-50 shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <div
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0"
                  style={{ backgroundColor: "#E50914" }}
                >
                  <User size={16} className="text-white md:w-5 md:h-5" />
                </div>
                <span className="text-black font-semibold text-sm md:text-lg drop-shadow-sm hidden sm:block">
                  {userData ? getFirstName() : "User"}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-white transition-transform duration-300 ${
                    isUserDropdownOpen ? "rotate-180" : ""
                  } hidden sm:block`}
                />
              </button>

              {isUserDropdownOpen && userData && (
                <div className="absolute right-0 mt-3 w-48 md:w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50">
                  <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
                    <p className="text-base md:text-lg font-semibold text-gray-800 truncate">
                      {userData.username}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 truncate">
                      {userData.email}
                    </p>
                  </div>
                  <button className="w-full text-left px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium">
                    Account Settings
                  </button>
                  <button className="w-full text-left px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors font-medium">
                    Preferences
                  </button>
                  <div className="border-t border-gray-100 mt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-red-600 hover:bg-red-50 transition-colors font-semibold"
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
        <main className="flex-1 p-4 md:p-8 overflow-auto min-w-0">
          <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-12 h-full border border-blue-200">
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
