import Link from 'next/link';
import React from 'react';

export default function BackToHome() {
  return (
    <Link 
      href="/" 
      className="inline-flex items-center gap-2 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors group mb-2"
    >
      <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Laboratory Hub
    </Link>
  );
}
