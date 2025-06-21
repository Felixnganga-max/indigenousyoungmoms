import React from "react";
import { assets } from "../assets/assets";

const Leriman = () => {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Leriman Leitiko Tribute */}
          <div className="text-center text-gray-800">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Portrait */}
                <div className="w-40 h-40 mx-auto mb-12 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full blur-xl opacity-20"></div>
                  <img
                    src={assets.leriman}
                    alt="Leriman Leitiko - Guardian of Yaakunte Language"
                    className="relative w-full h-full object-cover rounded-full border-2 border-gray-300 shadow-lg"
                  />
                </div>

                {/* Name and Title */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-light mb-3 text-gray-900">
                    Leriman Leitiko
                  </h2>
                  <p className="text-lg text-gray-600 mb-16 font-light">
                    Elder, Church Leader & Guardian of Yaakunte
                  </p>
                </div>

                {/* Emotional Quote */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-12 mb-16 shadow-sm">
                  <blockquote className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed">
                    "Seeing their efforts, I'm emotional, not with tears of pain
                    but tears of joy. The language was pronounced dead. Now I
                    see that it's alive again."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* His Four Key Works */}
          <div className="mt-20">
            <h3 className="text-3xl font-light text-center text-gray-900 mb-16">
              His Legacy
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "Language Preservation",
                  description:
                    "Documenting and teaching Yaakunte language through oral traditions and modern technology",
                  icon: "📚",
                  delay: 0,
                },
                {
                  title: "Cultural Documentation",
                  description:
                    "Establishing cultural centers and museums to preserve Yaaku heritage and traditions",
                  icon: "🏛️",
                  delay: 100,
                },
                {
                  title: "Forest Conservation",
                  description:
                    "Advocating for Mukogodo Forest protection using traditional ecological knowledge",
                  icon: "🌿",
                  delay: 200,
                },
                {
                  title: "Community Leadership",
                  description:
                    "Guiding youth away from cultural assimilation while bridging traditional and modern worlds",
                  icon: "👥",
                  delay: 300,
                },
              ].map((work, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="text-4xl mb-4 opacity-60">{work.icon}</div>
                  <h4 className="text-xl font-medium mb-3 text-gray-900">
                    {work.title}
                  </h4>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {work.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Statement */}
          <div className="text-center mt-20 max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              Through his unwavering dedication, Leriman Leitiko has transformed
              despair into hope, ensuring that the Yaaku culture will not only
              survive but thrive for generations to come.
            </p>
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-40 left-20 w-24 h-24 bg-gray-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-gray-400/15 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default Leriman;
