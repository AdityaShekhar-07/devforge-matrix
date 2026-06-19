import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function JsonTool() {
  const [input, setInput] = useState('{\n  "project": "DevForge",\n  "status": "Production Ready"\n}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const runFormat = (minify = false) => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      setOutput(minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2));
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE TOOL GRID --- */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-2 gap-6 min-h-[65vh]">
        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Raw Input JSON String</label>
          <textarea 
            className="w-full flex-1 p-5 border rounded-2xl font-mono text-sm focus:outline-none resize-none shadow-sm tool-card"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={() => runFormat(false)} className="flex-1 btn-primary py-3 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer">Prettify Format</button>
            <button onClick={() => runFormat(true)} className="flex-1 btn-secondary py-3 rounded-xl font-bold text-xs transition-all cursor-pointer">Minify JSON</button>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Validated Production Output</label>
          <div className="w-full flex-1 p-5 border rounded-2xl font-mono text-sm relative overflow-auto shadow-sm tool-card select-all">
            {error && <p className="text-red-500 font-sans font-bold">⚠️ Parse Exception: {error}</p>}
            {!error && <pre className="whitespace-pre-wrap leading-relaxed">{output || '// Outputs formatted data structures cleanly here...'}</pre>}
          </div>
          {output && !error && (
            <button onClick={() => navigator.clipboard.writeText(output)} className="w-full btn-secondary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
              Copy Validated JSON
            </button>
          )}
        </div>
      </div>
      {/* --- END OF THE TOOL GRID --- */}

      {/* --- THE SEO ARTICLE (Now completely outside the grid) --- */}
      <SeoArticle 
        title="Free Online JSON Formatter & Validator"
        description="Instantly format, prettify, and validate your JSON data. DevForge Matrix provides a lightning-fast, entirely client-side JSON parser that helps developers spot syntax errors and format minified payloads into highly readable, indented structures."
        features={[
          "100% Local Processing: Your data never leaves your browser.",
          "Instant Validation: Spots missing commas and syntax errors instantly.",
          "Zero tracking, zero ads, zero latency."
        ]}
        howTo={[
          "Paste your raw or minified JSON into the left editor canvas.",
          "The tool instantly validates the syntax structure.",
          "Click 'Format' to apply proper indentation and spacing.",
          "Copy the clean payload to your clipboard."
        ]}
      />

    </div>
  );}