import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Waitlist from './components/Waitlist';
import DataIngestion from './components/DataIngestion';
import DataWarehousing from './components/DataWarehousing';
import Header from './components/Header';
import Footer from './components/Footer';
import AnalyticsPage from './components/AnalyticsPage';
import AIInsights from './components/AIInsights';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function LandingPageContent() {
  const [isDemoHovered, setIsDemoHovered] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const productsTimeoutRef = useRef();
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc0QJnBNCX0kiRRUu0S9hBWsPViNSWDLOAEZG2G5zb5UaYJ2w/viewform?usp=header";

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
      <Header />
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
          <p className="text-sm text-zinc-400 mt-4">Click "Get Started" to join our waitlist and be among the first to try OneScale</p>
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
      <Footer />
    </div>
  );
}

function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return <LandingPageContent />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/products/data-ingestion" element={<DataIngestion />} />
        <Route path="/products/data-warehousing" element={<DataWarehousing />} />
        <Route path="/products/dashboards-analytics" element={<AnalyticsPage />} />
        <Route path="/products/ai-insights" element={<AIInsights />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dev-dashboard" 
          element={<Dashboard />} 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;