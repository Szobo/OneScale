import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdZRXI26yjuPVqJ7vVxLCZGqB78bsfAe-DkvIsVfwdo1oiMTg/viewform";

function AIInsights() {
  const [isDemoHovered, setIsDemoHovered] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    document.title = "AI Insights | OneScale";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Leverage AI-powered insights for predictions, smart alerts, and concise summaries — right from your data warehouse with OneScale.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = 'Leverage AI-powered insights for predictions, smart alerts, and concise summaries — right from your data warehouse with OneScale.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-28 bg-gradient-to-br from-[#0a1020] via-[#0a1020] to-[#1a223a] text-white">
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">Smarter Decisions. Real-Time.</h1>
          <p className="text-lg md:text-xl mb-8 text-zinc-300 max-w-2xl mx-auto">Leverage AI-powered insights for predictions, smart alerts, and concise summaries — right from your data warehouse.</p>
          {/* AI Icon/Illustration */}
          <div className="w-24 h-24 mb-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#7a3cff] to-[#33e6c1] p-1">
            <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-zinc-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#6133e6]">Overview</h2>
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
            OneScale's AI Insights simplifies data interpretation for non-technical users. Transform complex datasets into clear, actionable intelligence that drives better business decisions. No coding required — just ask questions in plain English and get instant insights.
          </p>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-zinc-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#33e6c1]">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Use Case 1 */}
            <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800 transition-transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#7a3cff] group">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-[#7a3cff]/10">
                <svg className="w-8 h-8 text-[#7a3cff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Forecast Revenue</h3>
              <p className="text-zinc-400 text-center">Predict future sales trends and revenue patterns based on historical data and market indicators.</p>
            </div>

            {/* Use Case 2 */}
            <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800 transition-transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#33e6c1] group">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-[#33e6c1]/10">
                <svg className="w-8 h-8 text-[#33e6c1]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Get Patient Risk Alerts</h3>
              <p className="text-zinc-400 text-center">Identify high-risk patients and receive proactive alerts for early intervention and better care outcomes.</p>
            </div>

            {/* Use Case 3 */}
            <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800 transition-transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#7a3cff] group">
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-[#7a3cff]/10">
                <svg className="w-8 h-8 text-[#7a3cff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Summarize Data in Plain English</h3>
              <p className="text-zinc-400 text-center">Convert complex datasets into clear, concise summaries that anyone can understand and act upon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-zinc-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#6133e6]">Built for Action</h2>
          <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#33e6c1]">Real-Time Insights, Zero Complexity</h3>
                <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                  Get real-time insights directly from your dashboards or receive smart alerts without needing to write queries. Our AI understands your data context and delivers actionable intelligence when you need it most.
                </p>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✔</span>
                    <span>Natural language queries in plain English</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✔</span>
                    <span>Instant alerts for critical insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✔</span>
                    <span>Predictive analytics and trend forecasting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✔</span>
                    <span>Automated data summarization</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-64 h-64 flex items-center justify-center bg-gradient-to-br from-[#7a3cff]/20 to-[#33e6c1]/20 rounded-full border border-[#7a3cff]/30">
                  <svg className="w-32 h-32 text-[#7a3cff]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
}

export default AIInsights; 