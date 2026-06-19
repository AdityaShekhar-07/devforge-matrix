import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function HashTool() {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  const generateHash = async (val) => {
    setInput(val);
    if (!val) { setHash(''); return; }
    try {
      const msgUint8 = new TextEncoder().encode(val);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
    } catch (e) {
      setHash('Target Crypto WebAPI is inaccessible.');
    }
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE HASH TOOL UI --- */}
      <div className="w-full min-h-[50vh] pt-8">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl flex flex-col gap-4 shadow-xl">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">String Content Data Input</label>
              <input 
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-indigo-500 font-mono text-emerald-400"
                placeholder="Type content string to parse instant checksum..."
                value={input}
                onChange={(e) => generateHash(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">SHA-256 Checksum Signature</label>
              <div 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 px-4 font-mono text-sm text-slate-300 break-all select-all cursor-pointer hover:border-slate-700 transition-colors"
                title="Click to select checksum"
              >
                {hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-500 leading-relaxed">
              🛡️ <b>Security Context:</b> Data operations run inside a client-side sandbox context. Character inputs are parsed entirely within temporary browser threads and are never transmitted across a network layer.
            </p>
          </div>
        </div>
      </div>
      {/* --- END OF THE HASH TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online SHA-256 Hash Generator"
        description="Instantly generate secure SHA-256 cryptographic hashes from any text input. DevForge Matrix provides a lightning-fast, client-side hashing utility leveraging the native Web Crypto API to ensure your sensitive strings never leave your browser."
        features={[
          "Client-Side Cryptography: Hashes are computed locally using the browser's native Web Crypto API.",
          "Real-Time Computation: Watch the checksum signature generate instantly as you type.",
          "Zero Tracking & Secure: Perfect for generating one-way hashes for passwords, keys, and private data streams."
        ]}
        howTo={[
          "Type or paste your sensitive string into the input field.",
          "The tool automatically computes the SHA-256 cryptographic hash.",
          "Click the generated checksum output box to select the text.",
          "Copy the signature to your clipboard for use in your application."
        ]}
      />

    </div>
  );
}