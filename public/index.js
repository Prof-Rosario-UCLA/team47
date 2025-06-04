import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function App() {
    const [count, setCount] = React.useState(0);
  return (
    <main className="p-6">
        <h1 className="text-center text-2xl font-bold text-red-600">BruinEvents</h1>
        <button
            className="flex items-center justify-center           /* center the icon   */
                    w-9 h-9 aspect-square                    /* 56 px square      */
                    rounded-[30%]                              /* <- the squircle   */
                    bg-blue-800 text-white                     /* dark-blue + white */
                    hover:bg-blue-700 active:scale-95          /* little feedback   */
                    focus:outline-none focus-visible:ring-4
                    focus-visible:ring-blue-400 transition">
            <span className="sr-only">Add item</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 5v14m7-7H5" />
            </svg>
        </button>

        <DateStepper/>

        <p>You’ve clicked {count} times.</p>
        <button onClick={() => setCount(c => c + 1)}>Click me</button>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

function DateStepper() {
  // ① state = today
  const [day, setDay] = React.useState(() => new Date());

  // ② handy formatter (US locale → tweak as you need)
  const fmt = d =>
    d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // ③ click helpers
  const shift = delta =>
    setDay(d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + delta));

  return (
    <div className="flex items-center gap-4 font-medium text-slate-800">
      {/* left chevron */}
      <button
        className="p-2 rounded-full hover:bg-slate-200
                   focus:outline-none focus-visible:ring-2
                   focus-visible:ring-indigo-500 transition"
        onClick={() => shift(-1)}
        aria-label="Previous day"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {/* date text */}
      <span className="min-w-[12ch] text-center text-lg select-none">
        {fmt(day)}
      </span>

      {/* right chevron */}
      <button
        className="p-2 rounded-full hover:bg-slate-200
                   focus:outline-none focus-visible:ring-2
                   focus-visible:ring-indigo-500 transition"
        onClick={() => shift(+1)}
        aria-label="Next day"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}