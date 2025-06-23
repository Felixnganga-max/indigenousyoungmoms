import React from "react";

const Mission = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mission</h1>
          <p className="text-xl text-indigo-600 font-semibold">Coming Soon</p>
        </div>
        <p className="text-gray-600 mb-6">
          We're working hard to bring you something amazing. Stay tuned for
          updates!
        </p>
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
