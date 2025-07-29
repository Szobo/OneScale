import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function AnalyticsPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    document.title = "Analytics | OneScale";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Transform your data into actionable insights with powerful analytics and visualization tools from OneScale.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = 'Transform your data into actionable insights with powerful analytics and visualization tools from OneScale.';
      document.head.appendChild(meta);
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full bg-gradient-to-br from-[#0a1020] via-[#0a1020] to-[#1a223a] py-16 md:py-24 flex items-center justify-center">
          <div className="text-center max-w-[1400px] mx-auto px-2 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#7a3cff] to-[#33e6c1] bg-clip-text text-transparent">Analytics</h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto">Transform your data into actionable insights with powerful analytics and visualization tools.</p>
          </div>
        </div>
        <div className="w-full max-w-[1400px] mx-auto px-2 md:px-8 py-16 flex flex-col gap-32 items-center justify-center">
          {/* Row 1: Text left, image right */}
          <section className="w-full flex flex-col md:flex-row gap-8 md:gap-32 items-center justify-between min-h-[60vh]">
            <div className="flex-1 max-w-xl flex flex-col items-start justify-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#7a3cff]">See Your Growth</h2>
              <p className="text-zinc-300 text-lg md:text-xl">Track your key metrics and watch your business grow with real-time analytics. Instantly spot trends and make data-driven decisions.</p>
            </div>
            <div className="flex-[1.5] min-w-[320px] md:min-w-[700px] min-h-[320px] md:min-h-[520px] flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
              <img src="/users.png" alt="Data ingestion and user growth trends" className="object-contain w-full h-full" />
            </div>
          </section>
          {/* Row 2: Image left, text right */}
          <section className="w-full flex flex-col md:flex-row-reverse gap-8 md:gap-32 items-center justify-between min-h-[60vh]">
            <div className="flex-1 max-w-xl flex flex-col items-end justify-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#33e6c1] text-right">Visualize Everything</h2>
              <p className="text-zinc-300 text-lg md:text-xl text-right">From pie charts to bar graphs, get a clear picture of your data. Our dashboards make complex information easy to understand at a glance.</p>
            </div>
            <div className="flex-[1.5] min-w-[320px] md:min-w-[700px] min-h-[320px] md:min-h-[520px] flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
              <img src="/pie-chart.png" alt="Category distribution pie chart" className="object-contain w-full h-full" />
            </div>
          </section>
          {/* Row 3: Text left, image right */}
          <section className="w-full flex flex-col md:flex-row gap-8 md:gap-32 items-center justify-between min-h-[60vh]">
            <div className="flex-1 max-w-xl flex flex-col items-start justify-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#7a3cff]">Share Insights Easily</h2>
              <p className="text-zinc-300 text-lg md:text-xl">Export, share, and collaborate on your analytics. Empower your team with the insights they need, wherever they are.</p>
            </div>
            <div className="flex-[1.5] min-w-[320px] md:min-w-[700px] min-h-[240px] md:min-h-[400px] flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
              <img src="/full-analytics.png" alt="Full analytics dashboard with comprehensive data visualization" className="object-contain w-full h-full" />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AnalyticsPage; 