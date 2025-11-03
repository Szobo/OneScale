import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const DataIngestion = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    document.title = "Data Ingestion | OneScale";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Bring all your data together with OneScale. Upload files, connect tools, or transcribe audio to start building your organization\'s data foundation.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = 'Bring all your data together with OneScale. Upload files, connect tools, or transcribe audio to start building your organization\'s data foundation.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 bg-gradient-to-br from-[#0a1020] via-[#0a1020] to-[#1a223a] overflow-hidden min-h-[45vh]">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
            Bring All Your Data Together
          </h1>
          <p className="text-lg md:text-xl mb-6 text-zinc-300 max-w-3xl mx-auto">
            Upload files, connect tools, or transcribe audio to start building your organization's data foundation.
          </p>
        </div>
      </section>

      {/* Data Flow Section */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Complete data collected across your entire organization
          </h2>
          <div className="relative max-w-6xl mx-auto">
            {/* Segment-like Flow Visualization on dark surface */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/70 to-zinc-950/90 shadow-[0_0_60px_-20px_rgba(32,140,255,0.35)] px-4 py-8 md:px-8">
              {/* Overlay SVG for curved flows */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 1200 600"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.25" />
                  </linearGradient>
                  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Left sources -> hub */}
                <path d="M 180 120 C 420 140, 520 220, 600 300" stroke="url(#flowGradient)" strokeWidth="6" fill="none" filter="url(#softGlow)" />
                <path d="M 180 220 C 420 220, 520 250, 600 300" stroke="url(#flowGradient)" strokeWidth="6" fill="none" filter="url(#softGlow)" />
                <path d="M 180 320 C 420 300, 520 280, 600 300" stroke="url(#flowGradient)" strokeWidth="6" fill="none" filter="url(#softGlow)" />
                <path d="M 180 420 C 420 360, 520 320, 600 300" stroke="url(#flowGradient)" strokeWidth="6" fill="none" filter="url(#softGlow)" />

                {/* hub -> right destinations */}
                <path d="M 600 300 C 680 220, 780 160, 1020 140" stroke="url(#flowGradient)" strokeWidth="6" fill="none" filter="url(#softGlow)" />
                <path d="M 600 300 C 700 260, 820 260, 1020 260" stroke="url(#flowGradient)" strokeWidth="6" fill="none" filter="url(#softGlow)" />
                <path d="M 600 300 C 700 340, 820 360, 1020 380" stroke="url(#flowGradient)" strokeWidth="6" fill="none" filter="url(#softGlow)" />
                <path d="M 600 300 C 700 380, 820 440, 1020 500" stroke="url(#flowGradient)" strokeWidth="6" fill="none" filter="url(#softGlow)" />
              </svg>

              {/* Content grid: sources | hub | destinations */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Left - Sources */}
                <div className="mx-auto flex w-full max-w-[220px] flex-col gap-4 md:mx-0">
                  {[
                    { icon: '📊', label: 'Spreadsheets' },
                    { icon: '🌐', label: 'Web' },
                    { icon: '🏢', label: 'Data Warehouses' },
                    { icon: '🗄️', label: 'Databases' },
                    { icon: '📱', label: 'Mobile' },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className="group flex items-center justify-center rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950/70 px-4 py-3 text-center shadow-sm transition-all hover:shadow-lg hover:border-cyan-500/40"
                    >
                      <div className="mr-2 text-xl">{n.icon}</div>
                      <p className="text-sm font-medium text-zinc-200">{n.label}</p>
                    </div>
                  ))}
                </div>

                {/* Center - OneScale hub with pulse */}
                <div className="relative mx-auto flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/20" style={{ filter: 'blur(8px)' }} />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-500 shadow-[0_0_30px_0_rgba(56,189,248,0.6)] ring-2 ring-cyan-300/30">
                      <span className="text-4xl text-white">∞</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-cyan-300">OneScale</p>
                </div>

                {/* Right - Destinations */}
                <div className="mx-auto flex w-full max-w-[260px] flex-col gap-4 md:mx-0">
                  {[
                    { icon: '📈', label: 'Analytics' },
                    { icon: '💬', label: 'Messaging' },
                    { icon: '🤖', label: 'Machine Learning Models' },
                    { icon: '🧠', label: 'AI Insights' },
                    { icon: '⚡', label: 'Agentic AI' },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className="group flex items-center justify-center rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950/70 px-4 py-3 text-center shadow-sm transition-all hover:shadow-lg hover:border-cyan-500/40"
                    >
                      <div className="mr-2 text-xl">{n.icon}</div>
                      <p className="text-sm font-medium text-zinc-200">{n.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* subtle bottom glow */}
              <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[70%] -translate-x-1/2 rounded-[100%] bg-cyan-500/10 blur-3xl" />
            </div>
          </div>
          <p className="text-lg text-zinc-400 mt-8 max-w-3xl mx-auto">
            OneScale makes it easy to centralize all your operational data, no matter the format or source.
          </p>
        </div>
      </section>

      {/* Data Ingestion Options */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-[#7a3cff]">
            Choose How You Start Ingesting Data
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Upload Files */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-[#7a3cff] transition-all duration-300">
              <div className="text-5xl mb-4">📁</div>
              <h3 className="text-xl font-semibold mb-4 text-white">Upload Files</h3>
              <p className="text-zinc-400 mb-6">CSV, Excel, PDFs, Receipts, Spreadsheets</p>
              <Link
                to="/login"
                className="inline-block bg-[#7a3cff] hover:bg-[#6a2ce6] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Start Uploading
              </Link>
            </div>

            {/* Connect Tools */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-[#7a3cff] transition-all duration-300">
              <div className="text-5xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-4 text-white">Connect Tools</h3>
              <p className="text-zinc-400 mb-6">Google Sheets, Google Drive, Databases, Socials</p>
              <Link
                to="/login"
                className="inline-block bg-[#7a3cff] hover:bg-[#6a2ce6] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Connect Now
              </Link>
            </div>

            {/* Voice/Audio Input */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-[#7a3cff] transition-all duration-300 relative">
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Coming Soon
              </div>
              <div className="text-5xl mb-4">🎤</div>
              <h3 className="text-xl font-semibold mb-4 text-white">Voice/Audio Input</h3>
              <p className="text-zinc-400 mb-6">Record audio or upload voice notes for instant transcription</p>
              <button
                disabled
                className="inline-block bg-zinc-700 text-zinc-400 font-semibold py-3 px-6 rounded-lg cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#7a3cff]">
            What Makes Our Ingestion Unique
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4 text-white">✓</div>
              <h3 className="text-xl font-semibold mb-4 text-white">Works with structured and unstructured data</h3>
              <p className="text-zinc-400">Handle any data format, from spreadsheets to voice recordings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4 text-white">✓</div>
              <h3 className="text-xl font-semibold mb-4 text-white">Optimized for offline-first and low-resource environments</h3>
              <p className="text-zinc-400">Built to sustain connectivity challenges</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4 text-white">✓</div>
              <h3 className="text-xl font-semibold mb-4 text-white">No-code setup for non-technical users</h3>
              <p className="text-zinc-400">Anyone can start collecting and organizing data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex items-center gap-6">
            <div className="text-4xl flex-shrink-0">🛡️</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 text-white">Your Data Stays Yours</h3>
              <p className="text-zinc-400 text-lg">All uploads are encrypted. We never sell your data.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DataIngestion 