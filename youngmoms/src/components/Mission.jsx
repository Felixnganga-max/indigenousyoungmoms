import React from "react";
import { Target } from "lucide-react";

const Mission = () => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-white animate-pulse"
            style={{ backgroundColor: "#E50914" }}
          >
            <Target size={48} className="text-white" />
          </div>
          <h3 className="text-5xl font-bold text-gray-800 mb-6 drop-shadow-sm">
            Mission & Events Content
          </h3>
          <p className="text-2xl text-gray-700 max-w-2xl font-medium leading-relaxed">
            View and manage your organization's mission and related events.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
