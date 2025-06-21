import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Indigenous Young Moms
              </h3>
              <p className="text-gray-300 text-lg font-light">
                Empowering communities
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-green-400">
                Yaaku Indigenous Tribe • Mukogodo Forest
              </h4>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                  Preserve
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                  Revive
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                  Thrive
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Reviving the endangered Yaakunte language and preserving Yaaku
                culture while empowering indigenous young mothers in Mukogodo
                Forest. Protecting 74,000 acres of ancestral forest and building
                sustainable livelihoods through traditional knowledge.
              </p>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  8,000
                </div>
                <div className="text-sm text-gray-400">Yaaku People</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-1">1</div>
                <div className="text-sm text-gray-400">Fluent Speaker Left</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">74K</div>
                <div className="text-sm text-gray-400">Acres Protected</div>
              </div>
            </div>
          </div>

          {/* Navigation & Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {[
                "Home",
                "About",
                "Missions",
                "Events",
                "Projects",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="mt-8">
              <h5 className="text-sm font-semibold mb-4 text-gray-400 uppercase tracking-wide">
                Take Action
              </h5>
              <div className="space-y-2">
                <a
                  href="#support"
                  className="block text-green-400 hover:text-green-300 transition-colors"
                >
                  Support Our Mission
                </a>
                <a
                  href="#learn"
                  className="block text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Learn Yaakunte
                </a>
              </div>
            </div>
          </div>

          {/* Our Impact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Our Impact
            </h4>
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">🗣️</span>
                  <h5 className="font-semibold">Language Revival</h5>
                </div>
                <p className="text-sm text-gray-300">
                  AI-powered Yaakunte learning app with the last fluent speaker
                </p>
                <div className="mt-2">
                  <div className="text-green-400 text-sm font-medium">
                    98% Revival Success
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">🌳</span>
                  <h5 className="font-semibold">Forest Protection</h5>
                </div>
                <p className="text-sm text-gray-300">
                  Safeguarding Mukogodo Forest ecosystem
                </p>
                <div className="mt-2">
                  <div className="text-blue-400 text-sm font-medium">
                    Net Zero Goals
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">🍯</span>
                  <h5 className="font-semibold">Women Empowerment</h5>
                </div>
                <p className="text-sm text-gray-300">
                  Sustainable livelihoods for young mothers
                </p>
                <div className="mt-2">
                  <div className="text-purple-400 text-sm font-medium">
                    100+ Women Helped
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leriman Leitiko Tribute */}
        <div className="border-t border-gray-700 mt-16 pt-12">
          <div className="max-w-4xl mx-auto text-center">
            <h4 className="text-2xl font-light mb-4 text-gray-200">
              Honoring Our Elder
            </h4>
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-8 mb-6">
              <h5 className="text-xl font-semibold mb-2 text-green-400">
                Leriman Leitiko
              </h5>
              <p className="text-gray-300 mb-4">
                Elder, Church Leader & Guardian of Yaakunte
              </p>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Through his unwavering dedication, Leriman Leitiko has transformed
              despair into hope, ensuring that the Yaaku culture will not only
              survive but thrive for generations to come.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2025 Indigenous Young Moms. Preserving culture, protecting
                environment, empowering communities.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-green-400 text-sm font-medium">
                99.9% Mission Success
              </span>
              <a
                href="#account"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                My Account
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <p className="text-gray-500 text-xs max-w-3xl mx-auto">
                Join us in preserving culture, protecting the environment, and
                empowering communities. Together, we can create lasting change
                for the Yaaku people and Mukogodo Forest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
