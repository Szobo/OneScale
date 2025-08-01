import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Minimal Header for Login */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black/80">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <div className="font-extrabold text-2xl tracking-tight flex items-center">
            <span className="text-[#6133e6]" style={{background: 'linear-gradient(90deg, #7a3cff 0%, #33e6c1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>One</span><span className="text-white">Scale</span>
          </div>
        </Link>
      </header>
      
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#7a3cff] to-[#33e6c1] bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-zinc-400">
                Sign in to access your OneScale dashboard
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-300">
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </button>

            <div className="mt-6 text-center">
              <p className="text-zinc-400 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/')}
                  className="text-[#7a3cff] hover:text-[#33e6c1] transition-colors"
                >
                  Go back home
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Minimal Footer for Login */}
      <footer className="py-6 text-center text-zinc-400">
        <p>© 2025 OneScale. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Login; 