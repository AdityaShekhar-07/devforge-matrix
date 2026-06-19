import React, { useState, useEffect } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function UserAgentDebugger() {
  const [ua, setUa] = useState('');
  const [platform, setPlatform] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    setUa(navigator.userAgent);
    setPlatform(navigator.platform || 'Unknown Platform');
    setLanguage(navigator.language || 'Unknown Language');
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(ua);
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE USER AGENT TOOL UI --- */}
      <div className="w-full min-h-[50vh] pt-8">
        <div className="max-w-4xl mx-auto border p-8 rounded-2xl flex flex-col gap-6 tool-card shadow-sm">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Your Current Client Header Identity String</label>
            <div className="w-full p-5 border rounded-xl font-mono text-sm leading-relaxed select-all break-all bg-white/50 dark:bg-slate-900/50">
              {ua || 'Fetching User-Agent...'}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs font-mono font-bold opacity-70">
            <div className="p-4 border rounded-xl bg-white/30 dark:bg-slate-900/30">
              System Platform: {platform}
            </div>
            <div className="p-4 border rounded-xl bg-white/30 dark:bg-slate-900/30">
              Language Matrix: {language}
            </div>
          </div>

          <button onClick={handleCopy} className="w-full btn-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Copy User-Agent String
          </button>
        </div>
      </div>
      {/* --- END OF THE USER AGENT TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online User-Agent Debugger"
        description="Instantly inspect your browser's User-Agent string, platform architecture, and language settings. DevForge Matrix provides a rapid, client-side diagnostics tool perfect for web developers troubleshooting compatibility, API responses, or device-specific rendering."
        features={[
          "Instant Identity Inspection: Retrieve your browser's full User-Agent string in real-time.",
          "System Metrics: Quickly identify your platform architecture and language preference.",
          "Clipboard Integration: Easily copy your identity string for debugging or submission in development tickets."
        ]}
        howTo={[
          "Open the tool to automatically detect your browser's identity.",
          "Review your system platform and language settings immediately.",
          "Click 'Copy User-Agent String' to save your identity data for troubleshooting or developer reports."
        ]}
      />

    </div>
  );
}