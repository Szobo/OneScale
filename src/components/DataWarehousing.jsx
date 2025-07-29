import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const DataWarehousing = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    document.title = "Data Warehousing | OneScale";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Organize, view, and manage all your structured data from one central warehouse with OneScale.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = 'Organize, view, and manage all your structured data from one central warehouse with OneScale.';
      document.head.appendChild(meta);
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Hero Section with background image */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 md:py-40 bg-black overflow-hidden min-h-[480px]">
        {/* Background image - slightly reduced brightness */}
        <img
          src="/data-warehouse.png"
          alt="Illustration of a data warehouse with data flows and tables"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'brightness(0.92) blur(0.5px)' }}
        />
        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg" style={{textShadow: '0 2px 16px rgba(0,0,0,0.32)'}}>Your Secure Home for All Uploaded Data</h1>
          <p className="text-lg md:text-xl mb-8 text-zinc-100" style={{textShadow: '0 2px 12px rgba(0,0,0,0.24)'}}>Organize, view, and manage all your structured data from one central warehouse.</p>
          <Link
            to="/products/data-ingestion"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300"
          >
            Try OneScale
          </Link>
        </div>
      </section>
      {/* Feature Highlights */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="text-xl font-semibold mb-2">View Upload History</h3>
            <p className="text-zinc-400">See every file, sheet, or record you’ve ever uploaded—instantly searchable.</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800">
            <span className="text-4xl mb-4">📂</span>
            <h3 className="text-xl font-semibold mb-2">Organize Data by Source or Table</h3>
            <p className="text-zinc-400">Group, filter, and tag your data by source, project, or table for easy access.</p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800">
            <span className="text-4xl mb-4">🔗</span>
            <h3 className="text-xl font-semibold mb-2">Connects to AI & Analytics in One Click</h3>
            <p className="text-zinc-400">Seamlessly link your warehouse to dashboards, AI, and export tools.</p>
          </div>
        </div>
      </section>
      {/* Integration Flow */}
      <section className="py-16 px-4 bg-zinc-950 flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
          {/* Mini flow graphic */}
          <div className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex items-center gap-1"><span className="bg-zinc-900 px-3 py-2 rounded-lg">Ingestion</span> <span className="text-2xl">→</span></span>
            <span className="flex items-center gap-1"><span className="bg-zinc-900 px-3 py-2 rounded-lg border border-purple-600">Warehousing</span> <span className="text-2xl">→</span></span>
            <span className="flex items-center gap-1"><span className="bg-zinc-900 px-3 py-2 rounded-lg">AI Insights</span> <span className="text-2xl">/</span></span>
            <span className="flex items-center gap-1"><span className="bg-zinc-900 px-3 py-2 rounded-lg">Analytics</span> <span className="text-2xl">/</span></span>
            <span className="flex items-center gap-1"><span className="bg-zinc-900 px-3 py-2 rounded-lg">Export</span></span>
          </div>
        </div>
        <div className="text-zinc-400 text-center text-lg max-w-xl">Everything starts with clean, reliable data.</div>
      </section>
      <Footer />
    </div>
  );
};

export default DataWarehousing; 