import React from "react";

const Missions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Coming Soon Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-6">
            Coming Soon
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto mb-8"></div>
          <h2 className="text-2xl md:text-3xl font-light text-gray-600 mb-4">
            Our Missions Page
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We're preparing something special to showcase our missions in
            preserving Yaaku culture, protecting Mukogodo Forest, and empowering
            indigenous young mothers.
          </p>
        </div>

        {/* Mission Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="text-4xl mb-4 opacity-60">🗣️</div>
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              Language Revival
            </h3>
            <p className="text-gray-600 text-sm">
              Reviving Yaakunte with AI technology and community education
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="text-4xl mb-4 opacity-60">🌳</div>
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              Forest Protection
            </h3>
            <p className="text-gray-600 text-sm">
              Safeguarding 74,000 acres of ancestral Mukogodo Forest
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-sm">
            <div className="text-4xl mb-4 opacity-60">👩‍👧‍👦</div>
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              Women Empowerment
            </h3>
            <p className="text-gray-600 text-sm">
              Supporting indigenous young mothers with sustainable livelihoods
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 border border-gray-200 shadow-sm mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Page Development Progress
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full animate-pulse"
              style={{ width: "75%" }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm">75% Complete - Launching Soon</p>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <p className="text-gray-600">
            Want to learn more about our work right now?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Support Our Mission
            </button>
            <button className="px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200">
              Contact Us
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default Missions;
