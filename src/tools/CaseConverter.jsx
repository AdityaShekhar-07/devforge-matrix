import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function CaseConverter() {
  const [text, setText] = useState('type or paste your content here to format and inspect metrics...');

  const processCase = (mode) => {
    if (!text.trim()) return;
    if (mode === 'upper') setText(text.toUpperCase());
    if (mode === 'lower') setText(text.toLowerCase());
    if (mode === 'title') {
      setText(text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
    }
    if (mode === 'sentence') {
      setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
    }
    if (mode === 'alternate') {
      setText(text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE CASE CONVERTER TOOL UI --- */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-3 gap-6 min-h-[65vh]">
        <div className="col-span-2 flex flex-col gap-4 h-full">
          <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">String Content Field</label>
          <textarea 
            className="w-full flex-1 p-5 border rounded-2xl text-sm focus:outline-none resize-none shadow-sm tool-card leading-relaxed font-sans" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
          />
          
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => processCase('upper')} className="btn-secondary py-3 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer border">UPPERCASE</button>
            <button onClick={() => processCase('lower')} className="btn-secondary py-3 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer border">lowercase</button>
            <button onClick={() => processCase('title')} className="btn-secondary py-3 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer border">Title Case</button>
            <button onClick={() => processCase('sentence')} className="btn-secondary py-3 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer border">Sentence case</button>
            <button onClick={() => processCase('alternate')} className="btn-secondary py-3 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer border">aLtErNaTe</button>
            
            <button onClick={handleCopy} className="btn-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Copy Text Contents
            </button>
          </div>
        </div>

        <div className="tool-card border p-6 rounded-2xl h-fit flex flex-col gap-6 shadow-sm">
          <div className="flex items-center gap-2 border-b pb-3 border-slate-200 dark:border-slate-800">
            <svg className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Analysis Data</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-50">Word Matrix</span>
            <span className="text-3xl font-mono font-black text-indigo-600 dark:text-indigo-400">{words}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider opacity-50">Character Stream</span>
            <span className="text-3xl font-mono font-black text-indigo-600 dark:text-indigo-400">{chars}</span>
          </div>
        </div>
      </div>
      {/* --- END OF THE CASE CONVERTER TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online Case Converter & Word Counter"
        description="Instantly transform your text between UPPERCASE, lowercase, Title Case, and Sentence case. DevForge Matrix offers a lightning-fast, client-side text formatter equipped with real-time character and word counting metrics."
        features={[
          "Instant Case Transformation: Format paragraphs of text instantly with one click.",
          "Real-Time Analytics: Track word counts and character streams as you type.",
          "Absolute Privacy: Your text is processed securely in your browser and never saved or transmitted."
        ]}
        howTo={[
          "Paste your unformatted text into the main string content field.",
          "Select your desired formatting mode (e.g., Title Case, UPPERCASE).",
          "Review the real-time word and character metrics in the analysis panel.",
          "Click the 'Copy Text Contents' button to export your formatted string."
        ]}
      />
    </div>
  );
}