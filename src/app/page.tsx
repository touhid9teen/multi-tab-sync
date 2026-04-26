"use client";

import Link from "next/link";
import { LAB_MODULES } from "@/lib/variables";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 lg:p-24 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Sync Labs v1.0
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">
            Multi-Tab <br />
            Synchronization
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            A high-performance laboratory exploring advanced browser
            synchronization strategies for modern web applications.
          </p>
        </div>

        {/* Lab Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LAB_MODULES.map((lab) => (
            <Link
              key={lab.href}
              href={lab.href}
              className={`group p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl ${lab.shadow} ${lab.hoverBorder} transition-all duration-500 relative overflow-hidden flex flex-col justify-between`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${lab.color} rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}></div>
              <div className="relative z-10 space-y-4">
                <div className={`w-12 h-12 ${lab.color} ${lab.textColor} rounded-2xl flex items-center justify-center shadow-sm`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={lab.iconPath} />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  {lab.title}
                </h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                  {lab.description}
                </p>
              </div>
              
              <div className="relative z-10 pt-6 flex items-center text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Explore Lab
                <svg 
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
