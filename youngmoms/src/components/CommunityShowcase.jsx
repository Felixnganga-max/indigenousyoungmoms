import React from "react";
import {
  Mountain,
  Shield,
  Book,
  Calendar,
  Users,
  Volume2,
  Trees,
} from "lucide-react";

const CommunityShowcase = () => {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-gray-900 py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Community Identity */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Yaaku Indigenous Tribe
          </h2>
          <p className="text-xl md:text-2xl text-cyan-400 font-light">
            Guardians of Mukogodo Forest • Keepers of Ancient Wisdom
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            {[
              { icon: Users, value: "8,000", label: "Indigenous People" },
              { icon: Volume2, value: "1", label: "Fluent Speaker Remaining" },
              { icon: Trees, value: "74,000", label: "Acres Protected" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300"
              >
                <stat.icon className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 p-8 rounded-2xl border border-purple-400/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                VISION
              </span>
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We envision creating a poverty free Yaaku community. Where every
              person's dignity is protected especially those affected by human
              and natural crisis.
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 p-8 rounded-2xl border border-emerald-400/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                MISSION
              </span>
            </h3>
            <p className="text-gray-300 leading-relaxed">
              To provide people affected by human & natural crisis in Yaaku
              community with educational programs, sustainable social economic
              programs and promote peace building & effective governance.
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-center text-white mb-4">
            Our Objectives
          </h3>
          <p className="text-xl text-center text-cyan-400 mb-12 max-w-3xl mx-auto">
            Dedicated to preserving heritage, empowering communities, and
            protecting our sacred lands
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cultural Revival & Language Preservation",
                description:
                  "Revival of Yaaku culture and our dying Yaakunte language, working with our last fluent speaker to preserve ancient wisdom for future generations.",
                icon: Book,
                color: "purple",
              },
              {
                title: "Climate Action & Forest Protection",
                description:
                  "Protecting Mukogodo Forest through sustainable practices and community-led conservation efforts to combat climate change.",
                icon: Trees,
                color: "emerald",
              },
              {
                title: "Gender Equality & Women Empowerment",
                description:
                  "Empowering Yaaku women through the Eco village initiative and eliminating harmful practices while promoting economic independence.",
                icon: Shield,
                color: "pink",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-${item.color}-900/20 to-gray-800/50 p-8 rounded-xl border border-${item.color}-400/20 hover:border-${item.color}-400/40 transition-all duration-300 h-full`}
              >
                <item.icon
                  className={`w-10 h-10 text-${item.color}-400 mb-6`}
                />
                <h4 className="text-xl font-bold text-white mb-4">
                  {item.title}
                </h4>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Heritage Timeline */}
        <div className="bg-gray-800/50 rounded-2xl p-8 md:p-12 backdrop-blur-lg border border-cyan-400/20">
          <h3 className="text-3xl font-bold text-white mb-2">
            Mukogodo Forest Heritage
          </h3>
          <p className="text-xl text-cyan-400 mb-8">Background History</p>
          <p className="text-gray-300 mb-8 leading-relaxed">
            From the Western slopes of Mount Kenya, the Yaaku people have been
            guardians of Mukogodo Forest for generations. In the expansive Rift
            valley (Laikipia north district) western slopes of Mount Kenya lives
            one of the smallest indigenous tribes in the world. The Yaaku, with
            a population of approximately 8000 and only 1 Elder who can speak
            fluent native yaakunte language Mr. Leriman Leitiko who is the
            motivation behind formation of our organisation. Making it one of
            the worlds endangered languages as per UNESCO's Red Book under
            "language endangerment and facing extinction".
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: Mountain,
                title: "Ancient Heritage",
                description:
                  "Mount Kenya slopes, rock caves, traditional lifestyle",
              },
              {
                icon: Shield,
                title: "Forest Guardians",
                description: "74,000 acres of Mukogodo Forest protection",
              },
              {
                icon: Volume2,
                title: "Language Crisis",
                description: "UNESCO endangered language, 1 fluent speaker",
              },
              {
                icon: Calendar,
                title: "2019 - IYM Founded",
                description: "Indigenous Young Moms CBO established",
              },
              {
                icon: Book,
                title: "Cultural Revival",
                description: "Present day renaissance and preservation efforts",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/20 hover:border-cyan-400/30 transition-all"
              >
                <item.icon className="w-8 h-8 text-cyan-400 mb-3" />
                <h4 className="font-bold text-white mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <button className="mt-12 group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-xl flex items-center justify-center space-x-3 mx-auto">
            <a href="/about">
              <span>Discover our complete story</span>
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunityShowcase;
