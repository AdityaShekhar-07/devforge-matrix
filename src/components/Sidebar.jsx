import React from 'react';

export default function Sidebar({ tools, activeTool, setActiveTool, searchQuery, setSearchQuery }) {
  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20">DF</div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">DevForge Matrix</h1>
        </div>
        
        <div className="relative mb-6">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 text-sm">🔍</span>
          <input 
            type="text" 
            placeholder="Search tools..." 
            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 text-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <nav className="space-y-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeTool === tool.id 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
              }`}
            >
              <span>{tool.icon}</span>
              <span className="truncate">{tool.name}</span>
            </button>
          ))}
          {tools.length === 0 && (
            <p className="text-xs font-mono text-slate-600 p-2">No tools match your filter.</p>
          )}
        </nav>
      </div>

      <div className="p-4 bg-slate-950/40 border-t border-slate-800/60 text-center">
        <p className="text-xs text-slate-500 font-mono">⚡ Core Execution: Client Sandbox</p>
      </div>
    </aside>
  );
}