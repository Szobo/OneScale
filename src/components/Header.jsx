import React, { useState, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc0QJnBNCX0kiRRUu0S9hBWsPViNSWDLOAEZG2G5zb5UaYJ2w/viewform?usp=header";

function Header() {
  const [isDemoHovered, setIsDemoHovered] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const productsTimeoutRef = useRef();
  const location = useLocation();
  const { user } = useAuth();
  const isAIInsightsPage = location.pathname === '/products/ai-insights';
  const isDataIngestionPage = location.pathname === '/products/data-ingestion';
  const isDataWarehousingPage = location.pathname === '/products/data-warehousing';
  const isAnalyticsPage = location.pathname === '/products/dashboards-analytics';

  const handleProductsEnter = () => {
    clearTimeout(productsTimeoutRef.current);
    setIsProductsHovered(true);
  };

  const handleProductsLeave = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setIsProductsHovered(false);
    }, 120);
  };

  return (
    <header className="w-full flex flex-wrap items-center justify-between px-2 sm:px-6 py-3 sm:py-4 border-b border-zinc-800 bg-black/80 sticky top-0 z-20">
      <div className="flex flex-wrap items-center w-full sm:w-auto min-w-0 gap-4 sm:gap-8">
        <Link to={user ? "/dashboard" : "/"} className="flex items-center hover:opacity-80 transition-opacity min-w-0 flex-shrink-0 -ml-2 sm:ml-0">
          <div className="font-extrabold text-lg sm:text-2xl tracking-tight -ml-2 sm:-ml-4 whitespace-nowrap flex items-center">
            <span className="text-[#6133e6]" style={{background: 'linear-gradient(90deg, #7a3cff 0%, #33e6c1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>One</span><span className="text-white">Scale</span>
          </div>
        </Link>
        {!user && (
          <nav className="hidden md:flex gap-4 sm:gap-8 text-sm font-medium flex-shrink-0">
            <Link to="/#about" className="hover:text-[#6133e6] transition">About</Link>
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
                      <Link to="/products/data-ingestion" className={`block p-3 rounded-lg transition-colors ${isDataIngestionPage ? 'bg-zinc-800 border-l-2 border-[#7a3cff]' : 'hover:bg-zinc-800'}`}>
                        <div className="font-semibold text-white">Data Ingestion</div>
                        <div className="text-sm text-zinc-400 mt-1">Upload files or connect socials, voice, or sheets</div>
                      </Link>
                      <Link to="/products/data-warehousing" className={`block p-3 rounded-lg transition-colors ${isDataWarehousingPage ? 'bg-zinc-800 border-l-2 border-[#7a3cff]' : 'hover:bg-zinc-800'}`}>
                        <div className="font-semibold text-white">Data Warehousing</div>
                        <div className="text-sm text-zinc-400 mt-1">View all stored data and upload history</div>
                      </Link>
                    </div>
                    <div className="space-y-3">
                      <Link to="/products/dashboards-analytics" className={`block p-3 rounded-lg transition-colors ${isAnalyticsPage ? 'bg-zinc-800 border-l-2 border-[#7a3cff]' : 'hover:bg-zinc-800'}`}>
                        <div className="font-semibold text-white">Analytics</div>
                        <div className="text-sm text-zinc-400 mt-1">Explore trends, patterns and visualizations</div>
                      </Link>
                      <Link to="/products/ai-insights" className={`block p-3 rounded-lg transition-colors ${isAIInsightsPage ? 'bg-zinc-800 border-l-2 border-[#7a3cff]' : 'hover:bg-zinc-800'}`}>
                        <div className="font-semibold text-white">AI Insights</div>
                        <div className="text-sm text-zinc-400 mt-1">Get predictions, smart alerts, and summaries</div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link to="/#how" className="hover:text-[#6133e6] transition">How It Works</Link>
            <Link to="/#why" className="hover:text-[#6133e6] transition">Our Why</Link>
          </nav>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center w-full sm:w-auto mt-3 sm:mt-0 basis-auto min-w-0">
        {user ? (
          <Link to="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 text-sm sm:text-base w-full sm:w-auto text-center whitespace-nowrap">
            Dashboard
          </Link>
        ) : (
          <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 text-sm sm:text-base w-full sm:w-auto text-center whitespace-nowrap">
            Sign In
          </a>
        )}
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
  );
}

export default Header; 