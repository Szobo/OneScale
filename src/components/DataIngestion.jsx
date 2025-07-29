import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdZRXI26yjuPVqJ7vVxLCZGqB78bsfAe-DkvIsVfwdo1oiMTg/viewform";

function DataIngestion() {
  const [isDemoHovered, setIsDemoHovered] = useState(false);
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    document.title = "Data Ingestion | OneScale";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Bring all your data together with OneScale: upload files, connect tools, or transcribe audio. Centralize fragmented data sources for analysis and AI insights.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = 'Bring all your data together with OneScale: upload files, connect tools, or transcribe audio. Centralize fragmented data sources for analysis and AI insights.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Hero Section - Deeper Dark Blue Gradient */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-28 bg-gradient-to-br from-[#0a1020] via-[#0a1020] to-[#1a223a] text-white">
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">Bring All Your Data Together</h1>
          <p className="text-lg md:text-xl mb-8 text-zinc-300 max-w-xl mx-auto">Upload files, connect tools, or transcribe audio to start building your organization’s data foundation.</p>
        </div>
      </section>
      {/* Data Flow Section */}
      <section className="w-full py-12 flex flex-col items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-950">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-zinc-100">Complete data collected across your entire organization</h2>
        <img src="/dataflow.png" alt="Data flow diagram showing sources and destinations" className="w-full max-w-4xl h-auto object-contain" style={{minHeight: '320px'}} />
        <div className="mt-4 text-zinc-400 text-center max-w-2xl">
          OneScale makes it easy to centralize all your operational data, no matter the format or source.
        </div>
      </section>
      {/* Ingestion Methods Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-zinc-100">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-[#6133e6]">Choose How You Start Ingesting Data</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Upload Files */}
          <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800 transition-transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#7a3cff] group cursor-pointer">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#7a3cff]/10">
              {/* Icon: Upload */}
              <svg className="w-8 h-8 text-[#7a3cff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16V4m0 0l-4 4m4-4l4 4"/><rect x="4" y="16" width="16" height="4" rx="2"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Files</h3>
            <p className="text-zinc-400 text-center mb-4">CSV, Excel, PDFs, Receipts, Spreadsheets</p>
          </div>
          {/* Card 2: Connect Tools */}
          <div className="bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800 transition-transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#33e6c1] group cursor-pointer">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#33e6c1]/10">
              {/* Icon: Connect */}
              <svg className="w-8 h-8 text-[#33e6c1]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M2 12h4m12 0h4M6.34 6.34l2.83 2.83m5.66-5.66l2.83 2.83m0 8.48l-2.83 2.83m-8.48 0l2.83-2.83"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect Tools</h3>
            <p className="text-zinc-400 text-center mb-4">Google Sheets, Google Drive, Databases, Socials</p>
          </div>
          {/* Card 3: Voice/Audio Input */}
          <div className="relative bg-zinc-900 rounded-xl p-8 flex flex-col items-center shadow-lg border border-zinc-800 transition-transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#7a3cff] group cursor-pointer">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-[#7a3cff]/10">
              {/* Icon: Voice */}
              <svg className="w-8 h-8 text-[#7a3cff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 18v2m-4-2a4 4 0 008 0V8a4 4 0 10-8 0v10z"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Voice/Audio Input</h3>
            <p className="text-zinc-400 text-center mb-4">Record audio or upload voice notes for instant transcription</p>
            {/* Coming Soon Badge */}
            <span className="absolute top-4 right-4 bg-gradient-to-r from-[#7a3cff] to-[#33e6c1] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">Coming Soon</span>
          </div>
        </div>
      </section>
      {/* Feature Highlights Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-zinc-100">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-[#6133e6]">What Makes Our Ingestion Unique</h2>
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Bullets only, centered */}
          <ul className="space-y-5 text-lg text-zinc-300 text-left w-full max-w-xl mx-auto">
            <li className="flex items-start gap-3"><span className="text-green-500 mt-1">✔</span> Works with structured and unstructured data</li>
            <li className="flex items-start gap-3"><span className="text-green-500 mt-1">✔</span> Optimized for offline-first and low-resource environments</li>
            <li className="flex items-start gap-3"><span className="text-green-500 mt-1">✔</span> No-code setup for non-technical users</li>
          </ul>
        </div>
      </section>
      {/* Trust & Support Section */}
      <section className="py-14 px-4 bg-gradient-to-br from-zinc-950 via-black to-zinc-900">
        <div className="max-w-2xl mx-auto rounded-xl border border-zinc-800 bg-zinc-900/70 flex flex-col md:flex-row items-center gap-6 p-8 shadow">
          <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#33e6c1]/20 border border-[#33e6c1]/30">
            {/* Security icon */}
            <svg className="w-8 h-8 text-[#33e6c1]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3l8 4v5c0 5.25-3.5 10-8 10S4 17.25 4 12V7l8-4z"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1 text-zinc-100">Your Data Stays Yours</h3>
            <p className="text-zinc-400">All uploads are encrypted. We never sell your data.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default DataIngestion; 