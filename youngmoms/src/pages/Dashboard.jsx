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
  X,
} from "lucide-react";
import Gallery from "../components/Gallery";
import Events from "../components/Events";
// import Mission from "../components/Mission";
import Programs from "../components/Programs";
import Content from "../components/Content";
import Projects from "../components/Projects";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed on mobile
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
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "Gallery", label: "Gallery", icon: Image },
    { id: "Events", label: "Events", icon: Calendar },
    { id: "Projects", label: "Projects", icon: Calendar },
    // { id: "Mission", label: "Mission & Events", icon: Target },
    { id: "Programs", label: "Programs", icon: Users },
    { id: "Content", label: "Content/Blogs", icon: FileText },
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
    // Close sidebar on mobile after selecting a tab
    if (isMobile) {
      setIsSidebarOpen(false);
    }
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
      // return <Mission />;
      case "Programs":
        return <Projects />;
      case "Projects":
        return <Programs />;
      case "Content":
        return <Content />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center px-4">
              <div
                className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-2xl border-4 border-white animate-pulse"
                style={{ backgroundColor: "#E50914" }}
              >
                <LayoutDashboard
                  size={isMobile ? 32 : 48}
                  className="text-white"
                />
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6 drop-shadow-sm">
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
    <div className="flex h-screen">
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
              } w-64`
            : `${
                isSidebarOpen ? "w-72" : "w-20"
              } transition-all duration-300 ease-in-out`
        } bg-white text-gray-800 flex flex-col shadow-2xl border-r border-gray-200`}
      >
        {/* Sidebar Header */}
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {(isSidebarOpen || isMobile) && (
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                DASHBOARD
              </h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 md:p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md"
            >
              {isMobile ? (
                <X size={20} className="text-black" />
              ) : isSidebarOpen ? (
                <ChevronLeft size={22} className="text-black" />
              ) : (
                <Menu size={22} className="text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 md:p-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center px-3 md:px-5 py-3 md:py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  !isSidebarOpen && !isMobile
                    ? "justify-center space-x-0"
                    : "space-x-4"
                } ${
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
                  size={20}
                  className={`relative z-10 flex-shrink-0 ${
                    isActive
                      ? "text-white"
                      : !isSidebarOpen && !isMobile
                      ? "text-black group-hover:text-red-600"
                      : "text-gray-600 group-hover:text-red-600"
                  } transition-all duration-200`}
                />
                {(isSidebarOpen || isMobile) && (
                  <span
                    className={`relative z-10 font-semibold text-sm md:text-base ${
                      isActive ? "text-white" : "group-hover:text-red-600"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
                {isActive && (isSidebarOpen || isMobile) && (
                  <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 md:p-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-3 md:px-5 py-3 md:py-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 group hover:shadow-md ${
              !isSidebarOpen && !isMobile
                ? "justify-center space-x-0"
                : "space-x-4"
            }`}
          >
            <LogOut
              size={20}
              className={`flex-shrink-0 ${
                !isSidebarOpen && !isMobile
                  ? "text-black group-hover:text-red-600"
                  : "group-hover:text-red-600"
              } transition-colors`}
            />
            {(isSidebarOpen || isMobile) && (
              <span className="font-semibold text-sm md:text-base">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-xl border-b border-emerald-700 px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl transition-all duration-300 border border-white border-opacity-30"
                >
                  <Menu size={20} className="text-white" />
                </button>
              )}
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">
                  {activeTab}
                </h2>
                <p className="text-emerald-100 text-sm md:text-lg hidden sm:block">
                  Welcome to your magnificent dashboard
                </p>
              </div>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleUserDropdown}
                className="flex items-center space-x-2 md:space-x-4 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 md:px-6 py-2 md:py-3 rounded-2xl transition-all duration-300 group border border-white border-opacity-30 hover:border-opacity-50 shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <div
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: "#E50914" }}
                >
                  <User size={isMobile ? 16 : 20} className="text-white" />
                </div>
                <span className="text-black font-semibold text-sm md:text-lg drop-shadow-sm hidden sm:block">
                  {userData ? getFirstName() : "User"}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-white transition-transform duration-300 ${
                    isUserDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isUserDropdownOpen && userData && (
                <div className="absolute right-0 mt-3 w-56 md:w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50">
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
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="rounded-2xl md:rounded-3xl p-6 md:p-12 h-full">
            {renderActiveTab()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
