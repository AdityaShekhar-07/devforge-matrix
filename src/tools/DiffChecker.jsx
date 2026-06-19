import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function DiffChecker() {
  const [text1, setText1] = useState('const user = {\n  name: "Aditya",\n  role: "Engineer"\n};');
  const [text2, setText2] = useState('const user = {\n  name: "Aditya",\n  role: "Senior Java Developer"\n};');
  const [diffResult, setDiffResult] = useState([]);

  const computeDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    const result = [];

    for (let i = 0; i < maxLines; i++) {
      if (lines1[i] === lines2[i]) {
        result.push({ type: 'normal', text: lines1[i], line: i + 1 });
      } else {
        if (lines1[i] !== undefined) result.push({ type: 'removed', text: lines1[i], line: i + 1 });
        if (lines2[i] !== undefined) result.push({ type: 'added', text: lines2[i], line: i + 1 });
      }
    }
    setDiffResult(result);
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE DIFF CHECKER TOOL UI --- */}
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-5 min-h-[70vh]">
        <div className="grid grid-cols-2 gap-4 h-[35vh]">
          <div className="flex flex-col gap-2 h-full">
            <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Original Text (Version A)</label>
            <textarea className="w-full h-full p-4 border rounded-2xl font-mono text-sm resize-none focus:outline-none tool-card" value={text1} onChange={(e) => setText1(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2 h-full">
            <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Modified Text (Version B)</label>
            <textarea className="w-full h-full p-4 border rounded-2xl font-mono text-sm resize-none focus:outline-none tool-card" value={text2} onChange={(e) => setText2(e.target.value)} />
          </div>
        </div>
        
        <button onClick={computeDiff} className="btn-primary py-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm shrink-0">Compute Side-by-Side Diff Analysis</button>
        
        <div className="flex-1 border rounded-2xl overflow-y-auto font-mono text-sm shadow-sm tool-card min-h-[25vh]">
          {diffResult.length === 0 ? (
            <div className="p-5 opacity-60">// Diff results will map here...</div>
          ) : (
            diffResult.map((item, idx) => (
              <div key={idx} className={`flex px-4 py-2 border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 ${item.type === 'added' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : item.type === 'removed' ? 'bg-rose-500/20 text-rose-700 dark:text-rose-400' : ''}`}>
                <span className="w-10 select-none opacity-40 text-right pr-4">{item.line}</span>
                <span className="w-6 select-none font-bold opacity-60">{item.type === 'added' ? '+' : item.type === 'removed' ? '-' : ' '}</span>
                <span className="whitespace-pre-wrap">{item.text}</span>
              </div>
            ))
          )}
        </div>
      </div>
      {/* --- END OF THE DIFF CHECKER TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Side-by-Side Text & Code Diff Checker"
        description="Compare two blocks of text or code to find the exact differences instantly. Our local diff checker highlights additions, deletions, and modifications line-by-line without uploading your proprietary code to a server."
        features={[
          "Enterprise-Grade Privacy: Compare API keys, config files, and private code safely.",
          "Granular Highlighting: Spots even single-character changes.",
          "Side-by-Side View: The industry standard layout for code review."
        ]}
        howTo={[
          "Paste your original text or code into the left panel.",
          "Paste the modified version into the right panel.",
          "The engine instantly calculates the diff.",
          "Review the highlighted red (deletions) and green (additions) changes."
        ]}
      />
    </div>
  );
}