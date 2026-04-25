import Link from 'next/link';

export default function LabPortal() {
  const labs = [
    {
      id: 'broadcast',
      title: 'Lab 1: BroadcastChannel',
      description: 'The "Single-Origin Event Bus". Simple, robust synchronization for same-origin tabs.',
      href: '/broadcast-lab',
      color: 'blue',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4-4m-4 4l4 4" />
        </svg>
      )
    },
    {
      id: 'worker',
      title: 'Lab 2: Shared Workers',
      description: 'The "Centralized Browser Hub". A background thread shared by all tabs for heavy lifting.',
      href: '/worker-lab',
      color: 'indigo',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 'polling',
      title: 'Lab 3: TanStack Polling',
      description: 'The "Stale-While-Revalidate Sync". Reliable fallback synchronization using periodic fetches.',
      href: '/polling-lab',
      color: 'purple',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black tracking-tighter text-gray-900">
            Sync<span className="text-blue-600">Labs</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium">Explore the frontiers of cross-tab state management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {labs.map((lab) => (
            <Link 
              key={lab.id} 
              href={lab.href}
              className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-${lab.color}-50 text-${lab.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {lab.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{lab.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{lab.description}</p>
              <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-blue-600">
                Enter Lab
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="pt-12 border-t border-gray-200 text-center">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            Experimental Environment • Next.js 15 • Neon DB
          </p>
        </div>
      </div>
    </main>
  );
}
