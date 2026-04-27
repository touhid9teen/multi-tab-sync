import React from "react";

export default function Theory() {
  return (
    <div className="bg-white rounded-[32px] shadow-2xl shadow-indigo-100/50 border border-gray-100 p-12 space-y-16 overflow-hidden relative">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>

      {/* 1. Introduction Section */}
      <section className="relative space-y-4">
        <div className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-200">
          The Tech Behind the Lab
        </div>
        <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">
          BroadcastChannel API: <br />
          The "Invisible Event Bus"
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
          The BroadcastChannel API allows simple, peer-to-peer communication
          between browsing contexts (windows, tabs, frames, or iframes) that
          share the exact same origin.
        </p>
      </section>

      {/* 2. Core Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-gray-50 rounded-[24px] border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h4 className="text-lg font-black text-gray-900 tracking-tight">
            Zero Server Load
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Unlike WebSockets or SSE, this logic runs entirely in the browser.
            Tab A talks directly to Tab B without hitting your database or API.
          </p>
        </div>

        <div className="p-8 bg-gray-50 rounded-[24px] border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h4 className="text-lg font-black text-gray-900 tracking-tight">
            Ultra Low Latency
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Messages are dispatched instantly through the browser kernel. Tab B
            usually receives the signal in less than 5ms.
          </p>
        </div>

        <div className="p-8 bg-gray-50 rounded-[24px] border border-gray-100 space-y-4">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h4 className="text-lg font-black text-gray-900 tracking-tight">
            Same-Origin Security
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Strictly restricted to the exact same domain, protocol, and port.
            Malicious sites can't listen in on your channel.
          </p>
        </div>
      </div>

      {/* 3. The Implementation Flow */}
      <section className="space-y-8 bg-white p-12 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
        <h3 className="text-3xl font-black tracking-tighter text-gray-900">
          1. Professional Hook Implementation (SSR-Safe)
        </h3>

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
              In modern Next.js/React apps, manual lifecycle management is error-prone. We use a custom 
              <code className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded ml-1 mr-1">useBroadcastChannel</code> 
              hook that automatically handles opening, message listening, and closing to prevent memory leaks.
            </p>
            <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 font-mono text-xs leading-relaxed shadow-xl">
              <p className="text-indigo-400 mb-4">// hooks/use-broadcast-channel.ts</p>
              <p><span className="text-pink-400">export function</span> <span className="text-blue-400">useBroadcastChannel</span>(name, onMessage) {"{"}</p>
              <p className="ml-4 text-gray-500">// SSR Safety: Only runs on the client</p>
              <p className="ml-4"><span className="text-blue-400">useEffect</span>(() {"=>"} {"{"}</p>
              <p className="ml-8"><span className="text-pink-400">const</span> channel = <span className="text-yellow-400">new</span> BroadcastChannel(name);</p>
              <p className="ml-8">channel.onmessage = (e) {"=>"} onMessage(e.data);</p>
              <p className="ml-8"><span className="text-pink-400">return</span> () {"=>"} channel.<span className="text-blue-400">close</span>(); <span className="text-gray-500">// Critical Cleanup</span></p>
              <p className="ml-4">{"}"}, [name]);</p>
              <br />
              <p className="ml-4"><span className="text-pink-400">return</span> {"{"} postMessage: (msg) {"=>"} channel.<span className="text-blue-400">postMessage</span>(msg) {"}"};</p>
              <p>{"}"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center font-black text-sm italic text-indigo-600">
                  01
                </div>
                <h5 className="text-xl font-bold tracking-tight text-gray-900">
                  Usage: Dispatching
                </h5>
              </div>
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 font-mono text-xs leading-relaxed text-indigo-200">
                <p><span className="text-pink-400">const</span> {"{"} postMessage {"}"} = useBroadcastChannel(<span className="text-green-400">'sync'</span>);</p>
                <p>postMessage(<span className="text-green-400">'REFETCH'</span>);</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-black text-sm italic text-green-600">
                  02
                </div>
                <h5 className="text-xl font-bold tracking-tight text-gray-900">
                  Usage: Listening
                </h5>
              </div>
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 font-mono text-xs leading-relaxed text-green-200">
                <p>useBroadcastChannel(<span className="text-green-400">'sync'</span>, (msg) {"=>"} {"{"}</p>
                <p className="ml-4">queryClient.<span className="text-blue-400">invalidateQueries</span>();</p>
                <p>{"}"});</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Behind the Scenes */}
      <div className="bg-indigo-600 rounded-[48px] p-12 text-white overflow-hidden relative shadow-2xl shadow-indigo-900/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="relative z-10 space-y-12">
          <div className="max-w-2xl space-y-4">
            <h3 className="text-4xl font-black tracking-tighter">
              2. Behind the Scenes: <br />
              The Structured Clone Algorithm
            </h3>
            <p className="text-indigo-100 text-lg font-medium leading-relaxed">
              The browser doesn't just "share" a reference to your object. It
              physically copies the data using the Structured Clone Algorithm to
              prevent cross-tab memory leaks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-2xl font-black text-indigo-300 italic">
                01. Serializing
              </div>
              <p className="text-sm text-indigo-100">
                The browser deeply converts your JS object into a portable
                binary format. Functions and DOM nodes cannot be cloned and will
                throw an error.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-2xl font-black text-indigo-300 italic">
                02. Transferring
              </div>
              <p className="text-sm text-indigo-100">
                The binary payload travels through the Browser Kernel—an
                isolated environment that securely routes the message to
                listening tabs.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-2xl font-black text-indigo-300 italic">
                03. Deserializing
              </div>
              <p className="text-sm text-indigo-100">
                The receiving tab unpacks the binary payload and creates a
                completely new, identical object in its own memory space.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Execution Context Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-black tracking-tighter text-gray-900">
            3. The Execution Lifecycle
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Understanding how the JavaScript Event Loop manages cross-tab
            messaging asynchronously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow space-y-6">
            <h5 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                A
              </span>
              The Sending Tab
            </h5>
            <p className="text-sm text-gray-500 leading-relaxed">
              When{" "}
              <code className="bg-gray-100 px-1 rounded text-pink-500">
                postMessage
              </code>{" "}
              is called, it's pushed to the <strong>Call Stack</strong>. The JS
              Engine hands the payload to the <strong>Web API</strong>. Since
              it's fire-and-forget, the function is popped off the stack
              immediately, never blocking the main thread.
            </p>
          </div>
          <div className="p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow space-y-6">
            <h5 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                B
              </span>
              The Receiving Tab
            </h5>
            <p className="text-sm text-gray-500 leading-relaxed">
              The message arrives in Tab B's <strong>Task Queue</strong>{" "}
              (Macrotask). The <strong>Event Loop</strong> waits until Tab B's
              Call Stack is completely empty, then moves the{" "}
              <code className="bg-gray-100 px-1 rounded text-blue-500">
                onmessage
              </code>{" "}
              callback into the stack for execution.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Advanced Practical Case: Global Session Logout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 p-12 rounded-[48px] border border-gray-100">
        <div className="space-y-6">
          <h3 className="text-3xl font-black tracking-tighter text-gray-900">
            4. Practical Use Case: <br />
            Global Session Logout
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Beyond fetching data, `BroadcastChannel` is critical for security.
            If a user logs out (or their token expires) in one tab, they should
            be securely redirected to the login screen across all open tabs
            instantly.
          </p>
          <ul className="space-y-4 mt-8">
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                1
              </div>
              <p className="text-sm text-gray-600">
                User clicks "Logout" in Tab 1.
              </p>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </div>
              <p className="text-sm text-gray-600">
                Tab 1 clears localStorage and broadcasts a `LOGOUT` action.
              </p>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </div>
              <p className="text-sm text-gray-600">
                All other background tabs receive the action and execute
                `window.location.href = '/login'`.
              </p>
            </li>
          </ul>
        </div>
        <div className="bg-gray-900 p-8 rounded-[32px] border border-gray-800 font-mono text-xs leading-relaxed shadow-2xl text-gray-300">
          <p className="text-indigo-400 mb-4">// auth-sync.ts</p>
          <p>
            <span className="text-pink-400">const</span> authChannel ={" "}
            <span className="text-yellow-400">new</span> BroadcastChannel(
            <span className="text-green-400">'auth'</span>);
          </p>
          <br />
          <p>
            <span className="text-pink-400">export function</span>{" "}
            <span className="text-blue-400">logout</span>() {"{"}
          </p>
          <p className="ml-4">
            localStorage.<span className="text-blue-400">removeItem</span>(
            <span className="text-green-400">'token'</span>);
          </p>
          <p className="ml-4">
            authChannel.<span className="text-blue-400">postMessage</span>({"{"}{" "}
            action: <span className="text-green-400">'LOGOUT'</span> {"}"});
          </p>
          <p className="ml-4">
            window.location.href ={" "}
            <span className="text-green-400">'/login'</span>;
          </p>
          <p>{"}"}</p>
          <br />
          <p>
            authChannel.<span className="text-blue-400">onmessage</span> = (e) =
            {">"} {"{"}
          </p>
          <p className="ml-4">
            <span className="text-pink-400">if</span> (e.data.action ==={" "}
            <span className="text-green-400">'LOGOUT'</span>) {"{"}
          </p>
          <p className="ml-8 text-gray-500">
            // Force redirect on background tabs
          </p>
          <p className="ml-8">
            window.location.href ={" "}
            <span className="text-green-400">'/login'</span>;
          </p>
          <p className="ml-4">{"}"}</p>
          <p>{"}"};</p>
        </div>
      </section>

      {/* 7. Best Practices & Limitations (NEW) */}
      <section className="space-y-8">
        <h3 className="text-3xl font-black tracking-tighter text-gray-900 border-b border-gray-100 pb-4">
          5. Rules, Limits & Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 p-8 rounded-[24px] shadow-sm">
            <h5 className="font-bold text-red-500 mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              Memory Leaks (The Golden Rule)
            </h5>
            <p className="text-sm text-gray-600 leading-relaxed">
              Always call{" "}
              <code className="bg-gray-100 px-1 rounded text-red-500">
                channel.close()
              </code>{" "}
              when a component unmounts. If you don't, the channel stays open in
              memory, and the browser will execute the `onmessage` callback
              multiple times (Ghost Messages) whenever a new event is fired.
            </p>
          </div>
          <div className="bg-white border border-gray-100 p-8 rounded-[24px] shadow-sm">
            <h5 className="font-bold text-amber-500 mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                ></path>
              </svg>
              Strict Same-Origin Policy
            </h5>
            <p className="text-sm text-gray-600 leading-relaxed">
              `https://app.example.com` cannot broadcast to
              `https://blog.example.com`. It must be the exact same protocol,
              domain, and port. If cross-origin is required, you must use
              `window.postMessage` instead.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Conclusion */}
      <div className="text-center p-12 border-2 border-dashed border-gray-100 rounded-[32px] space-y-4">
        <h4 className="text-2xl font-black text-gray-900 tracking-tight">
          Why use this instead of Polling?
        </h4>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Polling is like checking your mailbox every 5 seconds.
          <strong> BroadcastChannel </strong> is like having a private radio
          frequency. It's infinitely more efficient, saves massive amounts of
          battery and server cost, and provides a truly "Real-Time" user
          experience without the architectural complexity of a WebSockets
          Server.
        </p>
      </div>
    </div>
  );
}
