import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function RegexTester() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [text, setText] = useState('Drop user data inputs here to test regex processing like support@devforge.com or client-data@srmist.edu.');
  const [matches, setMatches] = useState([]);

  const testRegex = () => {
    try {
      if (!pattern) return;
      const regex = new RegExp(pattern, 'g');
      setMatches(text.match(regex) || []);
    } catch (e) {
      setMatches(['⚠️ Exception: Invalid Regular Expression Syntax.']);
    }
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE REGEX TOOL UI --- */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-2 gap-6 min-h-[65vh]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Regex Expression Pattern</label>
            <input type="text" className="w-full p-4 border rounded-xl font-mono text-sm focus:outline-none tool-card" value={pattern} onChange={(e) => setPattern(e.target.value)} />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Target Evaluation Canvas</label>
            <textarea className="w-full flex-1 p-4 border rounded-xl font-sans text-sm resize-none focus:outline-none tool-card" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <button onClick={testRegex} className="btn-primary py-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm">Evaluate Expressions</button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Identified Matches ({matches.length})</label>
          <div className="w-full flex-1 p-5 border rounded-2xl overflow-auto flex flex-col gap-2 shadow-sm tool-card">
            {matches.length === 0 ? (
              <span className="text-sm font-mono opacity-60">// No match patterns compiled yet...</span>
            ) : (
              matches.map((match, idx) => (
                <div key={idx} className="p-3 border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 font-mono text-sm font-bold rounded-xl break-all">
                  {match}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* --- END OF THE REGEX TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Real-Time JavaScript RegEx Tester & Playground"
        description="Write, test, and debug Regular Expressions instantly. DevForge Matrix provides a live testing environment where your RegEx patterns are evaluated against test strings in real-time, completely within your browser."
        features={[
          "Instant Visual Feedback: See matches highlight as you type.",
          "Client-Side Privacy: Your sensitive test data (emails, logs, passwords) never leaves your machine.",
          "Cheatsheet Included: Quick reference for anchors, quantifiers, and character classes."
        ]}
        howTo={[
          "Type your Regular Expression pattern in the top input field.",
          "Select your flags (Global, Multi-line, Case-insensitive).",
          "Paste your test strings into the target text area.",
          "Watch exact matches highlight instantly without server round-trips."
        ]}
      />
    </div>
  );
}