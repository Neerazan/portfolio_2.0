"use client";

import { useEffect, useRef, useState } from 'react';

const bootSequence = [
  "Initializing system kernel...",
  "Loading localized modules...",
  "Mounting file system...",
  "Checking memory integrity...",
  "Verifying developer protocols...",
  "Accessing secure shell...",
  "System ready."
];

export default function DevBootLoader() {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150); // Speed of logs

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 z-50 bg-black text-green-500 font-mono text-sm p-4 sm:p-8 flex flex-col justify-end">
      <div
        ref={scrollRef}
        className="overflow-hidden space-y-1 max-h-screen w-full"
      >
        {logs.map((log, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="opacity-50">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })}]</span>
            <span>{log}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 animate-pulse mt-2">
          <span className="opacity-50">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })}]</span>
          <span className="w-2 h-4 bg-green-500 block"></span>
        </div>
      </div>
    </div>
  );
}
