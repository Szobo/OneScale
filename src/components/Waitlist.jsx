import React from 'react';

function Waitlist() {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdZRXI26yjuPVqJ7vVxLCZGqB78bsfAe-DkvIsVfwdo1oiMTg/viewform";

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-6">Join the One Scale Waitlist</h1>
        <a
          href={googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 inline-block shadow-lg"
        >
          Join the Waitlist
        </a>
      </div>
    </div>
  );
}

export default Waitlist; 