import React, { useState, useRef } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Waitlist from './components/Waitlist';

function LandingPage() {
  const [isDemoHovered, setIsDemoHovered] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const productsTimeoutRef = useRef();
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdZRXI26yjuPVqJ7vVxLCZGqB78bsfAe-DkvIsVfwdo1oiMTg/viewform";

  const handleProductsEnter = () => {
    clearTimeout(productsTimeoutRef.current);
    setIsProductsHovered(true);
  };

  const handleProductsLeave = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setIsProductsHovered(false);
    }, 120); // 120ms delay
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="w-full flex flex-wrap items-center justify-between px-2 sm:px-6 py-3 sm:py-4 border-b border-zinc-800 bg-black/80 sticky top-0 z-20">
        <div className="flex flex-wrap items-center w-full sm:w-auto min-w-0 gap-4 sm:gap-8">
          <a href="#" className="flex items-center hover:opacity-80 transition-opacity min-w-0 flex-shrink-0 -ml-2 sm:ml-0">
            <div className="font-extrabold text-lg sm:text-2xl tracking-tight -ml-2 sm:-ml-4 whitespace-nowrap flex items-center">
              <span className="text-[#6133e6]" style={{background: 'linear-gradient(90deg, #7a3cff 0%, #33e6c1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>One</span><span className="text-white">Scale</span>
            </div>
          </a>
          <nav className="hidden md:flex gap-4 sm:gap-8 text-sm font-medium flex-shrink-0">
            <a href="#about" className="hover:text-[#6133e6] transition">About</a>
            <div
              className="relative"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              <button
                className="hover:text-[#6133e6] transition flex items-center gap-1"
                type="button"
              >
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isProductsHovered && (
                <div
                  className="absolute top-full mt-2 left-0 w-[32rem] bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-30"
                >
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Link to="/products/data-ingestion" className="block p-3 rounded-lg hover:bg-zinc-800 transition-colors">
                        <div className="font-semibold text-white">Data Ingestion</div>
                        <div className="text-sm text-zinc-400 mt-1">Upload files or connect socials, voice, or sheets</div>
                      </Link>
                      <Link to="/products/data-warehousing" className="block p-3 rounded-lg hover:bg-zinc-800 transition-colors">
                        <div className="font-semibold text-white">Data Warehousing</div>
                        <div className="text-sm text-zinc-400 mt-1">View all stored data and upload history</div>
                      </Link>
                      <Link to="/products/dashboards-analytics" className="block p-3 rounded-lg hover:bg-zinc-800 transition-colors">
                        <div className="font-semibold text-white">Dashboards & Analytics</div>
                        <div className="text-sm text-zinc-400 mt-1">Explore trends and visualizations</div>
                      </Link>
                    </div>
                    <div className="space-y-3">
                      <Link to="/products/ai-insights" className="block p-3 rounded-lg hover:bg-zinc-800 transition-colors">
                        <div className="font-semibold text-white">AI Insights</div>
                        <div className="text-sm text-zinc-400 mt-1">Get predictions, smart alerts, and summaries</div>
                      </Link>
                      <Link to="/products/download-export" className="block p-3 rounded-lg hover:bg-zinc-800 transition-colors">
                        <div className="font-semibold text-white">Download & Export</div>
                        <div className="text-sm text-zinc-400 mt-1">Export data or reports in multiple formats</div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <a href="#how" className="hover:text-[#6133e6] transition">How It Works</a>
            <a href="#why" className="hover:text-[#6133e6] transition">Our Why</a>
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center w-full sm:w-auto mt-3 sm:mt-0 basis-auto min-w-0">
          <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 text-sm sm:text-base w-full sm:w-auto text-center whitespace-nowrap">Get Started</a>
          <div className="relative w-full sm:w-auto">
            <button
              onMouseEnter={() => setIsDemoHovered(true)}
              onMouseLeave={() => setIsDemoHovered(false)}
              className="border border-purple-600 text-purple-600 font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:bg-purple-700 hover:text-white hover:border-purple-700 text-sm sm:text-base w-full sm:w-auto text-center whitespace-nowrap"
              type="button"
            >
              Book a Demo
            </button>
            {isDemoHovered && (
              <div
                className="absolute top-full mt-2 right-0 w-max max-w-xs bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-3 shadow-lg z-30"
              >
                We're still under development, and a product will be ready soon. We appreciate your patience!
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center min-h-[80vh]">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/bg.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        {/* Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">Data. AI. Intelligence. <span className="text-[#6133e6] font-semibold">All in One Place</span></h1>
          <p className="text-lg md:text-xl mb-8 text-zinc-300 max-w-xl">Unify messy data, unlock local intelligence, and power your future—securely, effortlessly, and at scale. The first AI-native data platform for Kenya’s realities.</p>
          <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">Get Started</a>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-4 md:px-0 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#6133e6]">About Us</h2>
        <p className="text-zinc-300 text-lg">One Scale transforms everyday activity across Kenya into structured, usable data for AI.</p>
        <p className="text-zinc-300 text-lg">We are a unified data, analytics and AI platform that enables teams to store, clean, analyze, and act on data from everywhere.</p>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-16 px-4 bg-zinc-950">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-[#6133e6]">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto justify-center">
          {/* Card 1 */}
          <div className="flex-1 min-w-[260px] bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#7a3cff]/10">
              <span className="text-3xl text-[#7a3cff]">📥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Data Collection</h3>
            <p className="text-zinc-400">We gather clean and store diverse, real-world data from files, voice, sheets, social, SMS, APIs, and more.</p>
          </div>
          {/* Card 2 */}
          <div className="flex-1 min-w-[260px] bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#7a3cff]/10">
              <span className="text-3xl text-[#7a3cff]">✨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Achieve AI Success</h3>
            <p className="text-zinc-400">Harness the power of AI using your data, tailored to your needs.</p>
          </div>
          {/* Card 3 - Data Analytics */}
          <div className="flex-1 min-w-[260px] bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#7a3cff]/10">
              <span className="text-3xl text-[#7a3cff]">📊</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
            <p className="text-zinc-400">Explore your data visually—spot trends, reveal patterns, and make smarter moves.</p>
          </div>
          {/* Card 4 */}
          <div className="flex-1 min-w-[260px] bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#7a3cff]/10">
              <span className="text-3xl text-[#7a3cff]">🔗</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">API Integration</h3>
            <p className="text-zinc-400">Seamlessly access and integrate Kenyan data into your products via robust APIs.</p>
          </div>
        </div>
      </section>

      {/* Our Why Section */}
      <section id="why" className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#6133e6]">Our Why</h2>
        <p className="text-zinc-300 text-lg">Kenya's future depends on data that reflects its people, businesses, and realities. One Scale exists to empower the next generation of Kenyan AI and technology.</p>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Put Your Data to Work?</h2>
        <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
          Click 'Get Started' to join our waitlist, and tell us how you'd want us to help turn your data into real, actionable insights.
        </p>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-black text-center border-t border-zinc-800">
        <div className="text-zinc-400">© 2025 OneScale. All Rights Reserved.</div>
        <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 inline-block">Sign Up</a>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/waitlist" element={<Waitlist />} />
      <Route path="/products/data-ingestion" element={<div className="min-h-screen bg-black text-white flex items-center justify-center"><div className="text-center"><h1 className="text-3xl font-bold mb-4">Data Ingestion</h1><p className="text-zinc-400">Upload files or connect socials, voice, or sheets</p></div></div>} />
      <Route path="/products/data-warehousing" element={<div className="min-h-screen bg-black text-white flex items-center justify-center"><div className="text-center"><h1 className="text-3xl font-bold mb-4">Data Warehousing</h1><p className="text-zinc-400">View all stored data and upload history</p></div></div>} />
      <Route path="/products/dashboards-analytics" element={<div className="min-h-screen bg-black text-white flex items-center justify-center"><div className="text-center"><h1 className="text-3xl font-bold mb-4">Dashboards & Analytics</h1><p className="text-zinc-400">Explore trends and visualizations</p></div></div>} />
      <Route path="/products/ai-insights" element={<div className="min-h-screen bg-black text-white flex items-center justify-center"><div className="text-center"><h1 className="text-3xl font-bold mb-4">AI Insights</h1><p className="text-zinc-400">Get predictions, smart alerts, and summaries</p></div></div>} />
      <Route path="/products/download-export" element={<div className="min-h-screen bg-black text-white flex items-center justify-center"><div className="text-center"><h1 className="text-3xl font-bold mb-4">Download & Export</h1><p className="text-zinc-400">Export data or reports in multiple formats</p></div></div>} />
    </Routes>
  );
}

export default App;