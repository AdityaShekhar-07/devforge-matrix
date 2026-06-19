import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('Select parameters and generate');

  const generate = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      <div className="w-full min-h-[50vh] pt-8">
        {/* Added 'tool-card' class to match your site design */}
        <div className="max-w-2xl mx-auto border p-8 rounded-2xl tool-card shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-base text-emerald-400 break-all select-all cursor-pointer">
            {password}
          </div>
          
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-sans font-bold uppercase text-xs">Character Length</span>
              <div className="flex items-center gap-3">
                <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(e.target.value)} className="w-32 accent-indigo-500" />
                <span className="font-mono font-bold text-indigo-400 w-6">{length}</span>
              </div>
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer py-1">
              <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} className="rounded accent-indigo-600 h-4 w-4" />
              Include Uppercase Letters (A-Z)
            </label>
            <label className="flex items-center gap-3 cursor-pointer py-1">
              <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="rounded accent-indigo-600 h-4 w-4" />
              Include Numeric Digits (0-9)
            </label>
            <label className="flex items-center gap-3 cursor-pointer py-1">
              <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="rounded accent-indigo-600 h-4 w-4" />
              Include Special Symbols (!@#$)
            </label>
          </div>

          <button onClick={generate} className="w-full btn-primary py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-wider">
            Generate Secure Password
          </button>
        </div>
      </div>
      {/* --- END OF THE PASSWORD GENERATOR TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online Secure Password Generator"
        description="Create cryptographically strong, random passwords instantly. DevForge Matrix uses the browser's native `crypto.getRandomValues` API to generate high-entropy strings, ensuring your credentials are safe, private, and never transmitted over the internet."
        features={[
          "Cryptographic Entropy: Utilizes the browser's native Web Crypto API for true randomness.",
          "Customizable Strength: Configure password length and character sets (uppercase, numbers, symbols) based on your security requirements.",
          "Total Privacy: No password-sharing, no logs, and no server-side generation. Everything happens in your browser."
        ]}
        howTo={[
          "Adjust the character length slider to your desired complexity.",
          "Toggle character options (Uppercase, Numbers, Symbols) to enforce specific security policies.",
          "Click 'Generate Secure Password' to create your unique, random credential.",
          "Click the password display box to instantly copy it to your clipboard."
        ]}
      />

    </div>
  );
}