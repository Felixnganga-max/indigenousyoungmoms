import React, { useState, useEffect } from "react";
import {
  EyeOff,
  Eye,
  LogIn,
  UserPlus,
  Mail,
  User,
  Lock,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Account = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Validation
      if (!formData.email || !formData.password) {
        throw new Error("Email and password are required");
      }

      if (!isLogin && !formData.username) {
        throw new Error("Username is required for registration");
      }

      if (!isLogin && formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const url = isLogin
        ? "https://indigenousyoungmoms-bvv4.vercel.app/api/auth/login"
        : "https://indigenousyoungmoms-bvv4.vercel.app/api/auth/register";

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (data.success && data.token) {
        // Store token and user data in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("Token stored:", data.token);
        console.log("User data stored:", data.user);

        setSuccess(
          data.message ||
            (isLogin ? "Login successful!" : "Registration successful!")
        );
        setWelcomeUser(data.user);
        setShowWelcome(true);

        // Clear form
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Redirect to dashboard after showing welcome message
        setTimeout(() => {
          if (onAuthSuccess) {
            onAuthSuccess(data.user, data.token);
          } else {
            navigate("/dashboard");
          }
        }, 2500);
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setIsPasswordFocused(false);
    setIsConfirmPasswordFocused(false);
    setError("");
    setSuccess("");
    setShowWelcome(false);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const getEmojiExpression = () => {
    if (showWelcome) return "🎉";
    if (isLoading) return "🤔";
    if (success && !showWelcome) return "🥳";
    if (error) return "😢";
    if (isPasswordFocused || isConfirmPasswordFocused) return "🙈";
    if (showPassword || showConfirmPassword) return "😉";
    return "😊";
  };

  // Welcome screen when user successfully authenticates
  if (showWelcome && welcomeUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100 p-4">
        <div className="w-full max-w-md mx-auto overflow-hidden bg-white shadow-2xl border-0 rounded-lg">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 opacity-10 rounded-lg"></div>

            <div className="text-center p-8 relative z-10">
              <div className="mb-6 flex justify-center">
                <div className="text-6xl animate-bounce">🎉</div>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in">
                Welcome, {welcomeUser.username || "Friend"}!
              </h1>

              <p className="text-gray-600 mb-6 animate-fade-in">
                {isLogin ? "Great to see you again!" : "Thanks for joining us!"}
              </p>

              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-blue-100 p-4">
      <div className="w-full max-w-md mx-auto overflow-hidden bg-white shadow-2xl border-0 rounded-lg">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-blue-600 to-emerald-600 opacity-10 rounded-lg"></div>

          <div className="text-center pb-8 pt-8 relative z-10">
            <div className={`mb-6 flex justify-center`}>
              <div
                className={`text-6xl transition-all duration-500 transform ${
                  isPasswordFocused || isConfirmPasswordFocused
                    ? "scale-110 rotate-3"
                    : "scale-100 rotate-0"
                } ${
                  showPassword || showConfirmPassword ? "animate-bounce" : ""
                } ${isLoading ? "animate-pulse" : ""} ${
                  success ? "animate-bounce" : ""
                }`}
              >
                {getEmojiExpression()}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h1>
            <p className="text-gray-600">
              {isLogin ? "Sign in to your account" : "Join us today"}
            </p>
          </div>

          <div className="px-8 pb-8 relative z-10">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm animate-fade-in">
                {error}
              </div>
            )}

            {success && !showWelcome && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm animate-fade-in">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  isLogin ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
                }`}
              >
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      disabled={isLoading}
                      className="w-full pl-10 h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl transition-all duration-300 outline-none px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                )}
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 outline-none px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  disabled={isLoading}
                  className="w-full pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl transition-all duration-300 outline-none px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div
                className={`transition-all duration-500 overflow-hidden ${
                  isLogin ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
                }`}
              >
                {!isLogin && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      onFocus={() => setIsConfirmPasswordFocused(true)}
                      onBlur={() => setIsConfirmPasswordFocused(false)}
                      disabled={isLoading}
                      className="w-full pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl transition-all duration-300 outline-none px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={handleConfirmPasswordToggle}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  isLogin
                    ? "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                    : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                }`}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : isLogin ? (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-5 w-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={toggleMode}
                disabled={isLoading}
                className="group inline-flex items-center text-gray-600 hover:text-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full -translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full translate-x-16 translate-y-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
