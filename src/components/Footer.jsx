import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full pt-8 pb-10 px-4 bg-gradient-to-br from-[#0a1020] via-[#0a1020] to-[#1a223a] text-white text-center border-t border-zinc-800 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Put Your Data to Work?</h2>
      <p className="text-lg text-zinc-300 max-w-2xl mx-auto mb-8">
        Begin your journey towards data optimization
      </p>
      <p className="text-sm text-zinc-400 mb-4">Click "Sign Up" to join our waitlist and be among the first to try OneScale</p>
      <div className="text-zinc-400 mb-4">© 2025 OneScale. All Rights Reserved.</div>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSc0QJnBNCX0kiRRUu0S9hBWsPViNSWDLOAEZG2G5zb5UaYJ2w/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 inline-block">Sign Up</a>
    </footer>
  );
}

export default Footer; 