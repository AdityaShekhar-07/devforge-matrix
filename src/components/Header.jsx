import React from 'react';

export default function Header({ activeToolName }) {
  return (
    <header className="h-16 border-b border-slate-800/80 px-8 flex items-center justify-between bg-slate-900/20 backdrop-blur">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-1 rounded">V1.0.0 Static</span>
        <span className="text-slate-600">/</span>
        <h2 className="text-sm font-medium text-slate-300 font-mono">{activeToolName}</h2>
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Zero-Trust Sandbox Secured
      </div>
    </header>
  );
}