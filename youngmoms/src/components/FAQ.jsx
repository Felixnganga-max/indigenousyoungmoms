import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Who are the Yaaku people and where do they live?",
      answer:
        "The Yaaku are one of the smallest indigenous tribes in the world, with approximately 8,000 people living on the western slopes of Mount Kenya in the expansive Rift Valley (Laikipia North District). They are the guardians of Mukogodo Forest, one of the largest indigenous forests in Eastern Africa, covering approximately 74,000 acres.",
    },
    {
      question: "What is the current state of the Yaakunte language?",
      answer:
        "The Yaakunte language is critically endangered according to UNESCO's Red Book, with only 1 fluent speaker remaining - Mr. Leriman Leitiko. This makes it one of the world's most endangered languages facing extinction. However, through the Indigenous Young Moms organization, there are active efforts to revive and document this ancient language.",
    },
    {
      question: "What is Indigenous Young Moms (IYM) and when was it founded?",
      answer:
        "Indigenous Young Moms CBO is a Yaaku Community Welfare organization founded in 2019. Since its inception, IYM's ultimate priority has been the survival and revival of the Yaakunte dialect and Yaaku culture in general, protection of Mukogodo Forest, preservation of indigenous knowledge, and livelihood support for the Yaaku people.",
    },
    {
      question: "What is the mission and vision of Indigenous Young Moms?",
      answer:
        "Vision: To create a poverty-free Yaaku community where every person's dignity is protected, especially those affected by human and natural crises. Mission: To provide people affected by human and natural crises in the Yaaku community with educational programs, sustainable social-economic programs, and promote peace building and effective governance.",
    },
    {
      question:
        "How did the Yaaku people traditionally live in Mukogodo Forest?",
      answer:
        "The Yaaku tribe traditionally lived in rock caves and stick-thatched houses in Mukogodo Forest. As hunters and gatherers, they depended on the forest for bush meat, nuts, fruits, beekeeping for honey, and natural dyes. The forest was and still is the main source of their livelihoods, and contains sacred sites used for religious and traditional practices.",
    },
    {
      question: "What does 'Mukogodo' and 'Yaaku' mean?",
      answer:
        "'Mukogodo' is a Yaakunte language term meaning 'people who live in rocks,' while 'Yaaku' means 'hunting people.' These names reflect the traditional lifestyle and habitat of the Yaaku people in the rocky caves and forest environment.",
    },
    {
      question: "What programs does Indigenous Young Moms run?",
      answer:
        "IYM runs several key programs including: Yaaku Sica Honey Project (organic honey production), Yaakunte Language Learning & Documentation, Agro-ecological Programs/Agroforestry, Economic Empowerment through Table Banking, Culture Survival through the Yaaku Cultural Resource Centre, and various climate change initiatives.",
    },
    {
      question: "What is the Yaaku Sica Honey Project?",
      answer:
        "SICA is raw organic honey from the Yaaku people of Mukogodo Forest. It's unpasteurized, pure organic honey collected directly from individual beekeepers and beekeeping groups. The proceeds from honey sales enable IYM to run their Yaaku community empowerment programs. 'Sica' means 'honey' in the Yaakunte language.",
    },
    {
      question: "How is IYM working to preserve the Yaakunte language?",
      answer:
        "IYM is involved in a comprehensive Yaakunte Language Documentation Program through the creation of an Artificial Intelligence-powered Chatbot App. They've also established the Yaaku Cultural Resource Centre for passing cultural knowledge and teaching Yaakunte language to community members from generation to generation.",
    },
    {
      question: "What conservation efforts are being made for Mukogodo Forest?",
      answer:
        "Mukogodo Forest is protected by the community with minimum government involvement. The 74,000-acre forest is habitat to indigenous species of trees and animals including giraffes, zebras, lions, and elephants. IYM works on climate change initiatives including kitchen gardening projects, carbon bed projects, and agroforestry programs to protect this ancestral land.",
    },
    {
      question: "Who is Mr. Leriman Leitiko and why is he important?",
      answer:
        "Mr. Leriman Leitiko is the last fluent speaker of the Yaakunte language and serves as an elder and church leader. He is the motivation behind the formation of Indigenous Young Moms organization. His dedication to language preservation has transformed despair into hope, as he works to ensure Yaaku culture survives and thrives for future generations.",
    },
    {
      question: "How can people support the Yaaku community?",
      answer:
        "People can support the Yaaku community by joining their mission to preserve heritage, protect Mukogodo Forest, and ensure ancient wisdom survives for future generations. This includes supporting their honey project, language preservation efforts, women empowerment initiatives, and forest conservation programs.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Learn more about the Yaaku Indigenous Tribe, their culture, language
            preservation efforts, and the work of Indigenous Young Moms
            organization
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/15"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-inset"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    <span className="text-white font-bold text-xl">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </div>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="h-px bg-white/20 mb-4"></div>
                  <p className="text-green-50 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Have More Questions?
            </h2>
            <p className="text-green-100 mb-6">
              Contact Indigenous Young Moms to learn more about supporting the
              Yaaku community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0795285373"
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                📞 Call: 0795 285 373
              </a>
              <a
                href="mailto:indigenousyoungmoms@gmail.com"
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                ✉️ Email Us
              </a>
            </div>
          </div>
        </div>

        {/* Statistics Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <div className="text-3xl font-bold text-orange-400 mb-2">8,000</div>
            <div className="text-white">Yaaku People</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <div className="text-3xl font-bold text-orange-400 mb-2">1</div>
            <div className="text-white">Fluent Speaker Left</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <div className="text-3xl font-bold text-orange-400 mb-2">74K</div>
            <div className="text-white">Acres Protected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
