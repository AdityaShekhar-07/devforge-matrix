import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function Base64Tool() {
  const [input, setInput] = useState('DevForge Engine Runtime');
  const [output, setOutput] = useState('');

  const handleProcess = (mode) => {
    try {
      setOutput(mode === 'encode' ? btoa(input) : atob(input));
    } catch {
      setOutput('Error: Invalid cryptographic base64 padding configuration alignment.');
    }
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE BASE64 TOOL UI --- */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-2 gap-6 min-h-[65vh]">
        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono font-bold uppercase tracking-wider">String Content Buffer</label>
          <textarea className="w-full flex-1 p-4 border rounded-xl font-mono text-sm focus:outline-none resize-none" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex gap-2">
            <button onClick={() => handleProcess('encode')} className="flex-1 action-btn-primary py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer">Binary Encode</button>
            <button onClick={() => handleProcess('decode')} className="flex-1 action-btn-secondary py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer">Binary Decode</button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono font-bold uppercase tracking-wider">Computed Representation Output</label>
          <div className="w-full flex-1 p-4 border rounded-xl font-mono text-sm output-box overflow-auto break-all select-all">
            {output || '// Encryption stream transforms return here...'}
          </div>
          {output && (
            <button onClick={() => navigator.clipboard.writeText(output)} className="w-full action-btn-secondary py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
              Copy Buffer Output
            </button>
          )}
        </div>
      </div>
      {/* --- END OF THE BASE64 TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online Base64 Encoder & Decoder"
        description="Securely encode plain text into Base64 format or decode Base64 strings back into readable text. DevForge Matrix provides a lightning-fast, client-side utility for transforming data streams without sending your sensitive information over the network."
        features={[
          "Zero-Server Architecture: All cryptographic transforms happen locally in your browser.",
          "Instant Execution: Encodes and decodes buffers instantly without API latency.",
          "Developer Ready: Perfect for handling data URIs, API authentication tokens, and payload debugging."
        ]}
        howTo={[
          "Paste your text or Base64 string into the input buffer.",
          "Click 'Binary Encode' to convert plain text into Base64.",
          "Click 'Binary Decode' to reverse a Base64 string back to readable text.",
          "Copy the generated output directly to your clipboard."
        ]}
      />
    </div>
  );
}