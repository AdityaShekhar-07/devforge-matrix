import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function UrlEncoder() {
  const [input, setInput] = useState('https://devforge.matrix/search query?param=value&status=active');
  const [output, setOutput] = useState('');

  const processText = (mode) => {
    try {
      setOutput(mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch {
      setOutput('Error: Invalid malformed sequence payload.');
    }
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE URL ENCODER TOOL UI --- */}
      <div className="w-full min-h-[60vh] pt-8">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-2 gap-6 h-full">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-mono font-bold uppercase tracking-wider">Raw Input</label>
            <textarea className="w-full flex-1 p-4 border rounded-xl font-mono text-sm focus:outline-none resize-none" value={input} onChange={(e) => setInput(e.target.value)} />
            <div className="flex gap-2">
              <button onClick={() => processText('encode')} className="flex-1 action-btn-primary py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer">Encode</button>
              <button onClick={() => processText('decode')} className="flex-1 action-btn-secondary py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer">Decode</button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-xs font-mono font-bold uppercase tracking-wider">Output Payload</label>
            <div className="w-full flex-1 p-4 border rounded-xl font-mono text-sm relative overflow-auto output-box select-all">
              {output || '// Results return here...'}
            </div>
            {output && (
              <button onClick={() => navigator.clipboard.writeText(output)} className="w-full action-btn-secondary py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Copy Output String
              </button>
            )}
          </div>
        </div>
      </div>
      {/* --- END OF THE URL ENCODER TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online URL Encoder & Decoder"
        description="Safely encode or decode URL components and query parameters. DevForge Matrix provides a rapid, client-side utility to sanitize web addresses, ensuring special characters are properly escaped for safe use in APIs, web requests, and database storage."
        features={[
          "Instant Sanitization: Escape special characters and spaces instantly to create valid URL strings.",
          "Bi-Directional Conversion: Seamlessly toggle between encoded payloads and human-readable text.",
          "100% Client-Side: Your sensitive URL data remains local in your browser, ensuring complete privacy."
        ]}
        howTo={[
          "Paste your raw URL string or query parameter into the input area.",
          "Select 'Encode' to escape special characters or 'Decode' to revert them.",
          "View the transformed result in the output panel.",
          "Click 'Copy Output String' to save the ready-to-use URL to your clipboard."
        ]}
      />

    </div>
  );
}