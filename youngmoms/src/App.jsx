import React, { useState, useEffect } from "react";
import { Trees, Globe, Heart } from "lucide-react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Mission from "./pages/Mission";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import { assets } from "./assets/assets.js";

const logo = assets.logoImage;

// Loader Component
const WebsiteLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_white_1px,_transparent_0)] bg-[length:60px_60px]"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo/Brand Area */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <img
                src={logo}
                alt="Yaaku Heritage Logo"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain animate-pulse"
              />
              {/* Animated ring around logo */}
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-cyan-400 rounded-full animate-spin"></div>
              <div
                className="absolute inset-2 border-2 border-transparent border-t-green-400 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1s",
                }}
              ></div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight text-white tracking-tight">
            <span className="block mb-1">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Preserving Heritage,
              </span>
            </span>
            <span className="block mb-1">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Empowering Communities
              </span>
            </span>
            <span className="block">
              <span className="bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                Protecting Future
              </span>
            </span>
          </h1>
          <p className="text-gray-300 text-sm">
            Preserving Culture, Empowering Communities
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-gray-400 text-sm">
          <div className="animate-pulse">
            Initializing Yaaku Heritage Experience...
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component with Loader
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    // Load assets including logo
    const loadAssets = async () => {
      try {
        // Load your logo and other assets
        await Promise.all([
          new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = logo;
          }),
          // Add more asset loading here if needed
        ]);

        // Minimum loading time for smooth UX
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsLoading(false);
      } catch (error) {
        console.error("Loading failed:", error);
        // Still proceed even if logo fails to load
        setTimeout(() => setIsLoading(false), 3000);
      }
    };

    loadAssets();
  }, []);

  if (isLoading) {
    return <WebsiteLoader />;
  }

  return (
    <div>
      {!isDashboard && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/missions" element={<Mission />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default App;
