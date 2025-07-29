import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';

function Dashboard() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDemoHovered, setIsDemoHovered] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#7a3cff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Dashboard Header - Minimal for Authenticated Users */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black/80">
        <Link to="/dashboard" className="flex items-center hover:opacity-80 transition-opacity">
          <div className="font-extrabold text-2xl tracking-tight flex items-center">
            <span className="text-[#6133e6]" style={{background: 'linear-gradient(90deg, #7a3cff 0%, #33e6c1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>One</span><span className="text-white">Scale</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onMouseEnter={() => setIsDemoHovered(true)}
            onMouseLeave={() => setIsDemoHovered(false)}
            className="border border-purple-600 text-purple-600 font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:bg-purple-700 hover:text-white hover:border-purple-700 text-sm"
          >
            Book a Demo
          </button>
          {isDemoHovered && (
            <div className="absolute top-full mt-2 right-0 w-max max-w-xs bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg p-3 shadow-lg z-30">
              We're still under development, and a product will be ready soon. We appreciate your patience!
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-br from-[#0a1020] via-[#0a1020] to-[#1a223a] py-16">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#7a3cff] to-[#33e6c1] bg-clip-text text-transparent">
                  Welcome back, {user.user_metadata?.full_name || user.email}
                </h1>
                <p className="text-zinc-400">Manage your data, analytics, and AI insights</p>
              </div>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {isSigningOut ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Data Ingestion Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-[#7a3cff] transition-colors">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-[#7a3cff]/10">
                <span className="text-2xl">📥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Ingestion</h3>
              <p className="text-zinc-400 mb-4">Upload and process your data from multiple sources</p>
              <button className="text-[#7a3cff] hover:text-[#33e6c1] transition-colors">
                Manage Data →
              </button>
            </div>

            {/* Analytics Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-[#33e6c1] transition-colors">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-[#33e6c1]/10">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-zinc-400 mb-4">View insights and create visualizations</p>
              <button className="text-[#33e6c1] hover:text-[#7a3cff] transition-colors">
                View Analytics →
              </button>
            </div>

            {/* AI Insights Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-[#7a3cff] transition-colors">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-[#7a3cff]/10">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
              <p className="text-zinc-400 mb-4">Get AI-powered recommendations and predictions</p>
              <button className="text-[#7a3cff] hover:text-[#33e6c1] transition-colors">
                Explore AI →
              </button>
            </div>

            {/* Data Warehouse Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-[#33e6c1] transition-colors">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-[#33e6c1]/10">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Warehouse</h3>
              <p className="text-zinc-400 mb-4">Store and organize your data efficiently</p>
              <button className="text-[#33e6c1] hover:text-[#7a3cff] transition-colors">
                Manage Warehouse →
              </button>
            </div>

            {/* API Integration Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-[#7a3cff] transition-colors">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-[#7a3cff]/10">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">API Integration</h3>
              <p className="text-zinc-400 mb-4">Connect your data to external applications</p>
              <button className="text-[#7a3cff] hover:text-[#33e6c1] transition-colors">
                Manage APIs →
              </button>
            </div>

            {/* Settings Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-[#33e6c1] transition-colors">
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-[#33e6c1]/10">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Settings</h3>
              <p className="text-zinc-400 mb-4">Configure your account and preferences</p>
              <button className="text-[#33e6c1] hover:text-[#7a3cff] transition-colors">
                Manage Settings →
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Quick Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#7a3cff] mb-2">0</div>
                <div className="text-zinc-400">Data Sources</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#33e6c1] mb-2">0</div>
                <div className="text-zinc-400">Analytics Reports</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#7a3cff] mb-2">0</div>
                <div className="text-zinc-400">AI Insights</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#33e6c1] mb-2">0</div>
                <div className="text-zinc-400">API Calls</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Minimal Footer for Dashboard */}
      <footer className="py-6 text-center text-zinc-400">
        <p>© 2025 OneScale. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard; 