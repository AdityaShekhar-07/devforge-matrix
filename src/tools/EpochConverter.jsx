import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function EpochConverter() {
  const [epochInput, setEpochInput] = useState('1781711021');
  const [humanDate, setHumanDate] = useState('Wed, 17 Jun 2026 15:43:41 GMT');

  const convertEpoch = () => {
    try {
      const date = new Date(parseInt(epochInput) * 1000);
      setHumanDate(isNaN(date.getTime()) ? 'Error: Invalid timestamp' : date.toUTCString());
    } catch {
      setHumanDate('Error: Invalid integer runtime parameter.');
    }
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE EPOCH CONVERTER TOOL UI --- */}
      <div className="w-full min-h-[50vh] pt-8">
        <div className="max-w-2xl mx-auto border p-6 rounded-2xl flex flex-col gap-5 tool-container">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs font-mono font-bold uppercase tracking-wider">Target Unix Timestamp String</label>
              <input type="text" className="w-full p-2.5 mt-1 border rounded-xl font-mono text-sm focus:outline-none" value={epochInput} onChange={(e) => setEpochInput(e.target.value)} />
            </div>
            <button onClick={convertEpoch} className="h-10 mt-5 px-6 action-btn-primary text-xs font-semibold rounded-xl cursor-pointer">Parse Payload</button>
          </div>
          <div className="border p-4 rounded-xl flex flex-col gap-1 min-h-16 justify-center output-box select-all">
            <span className="text-[10px] font-mono opacity-50 uppercase tracking-wider">Resolved Calendar String Object</span>
            <p className="text-sm font-mono font-bold">{humanDate}</p>
          </div>
          {humanDate && (
            <button onClick={() => navigator.clipboard.writeText(humanDate)} className="action-btn-secondary py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">Copy String Object</button>
          )}
        </div>
      </div>
      {/* --- END OF THE EPOCH CONVERTER TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online Unix Epoch Time Converter"
        description="Instantly convert Unix timestamps (Epoch time) to human-readable dates and UTC calendar strings. DevForge Matrix provides a fast, client-side utility perfect for debugging database records, JWT expiration claims, and server API payloads."
        features={[
          "100% Client-Side Parsing: Time calculations happen locally with zero latency or server calls.",
          "Developer Focused: Built specifically for formatting integer data payloads from backend systems.",
          "One-Click Copy: Instantly copy the resolved human-readable calendar string to your clipboard."
        ]}
        howTo={[
          "Paste your integer Unix timestamp into the target input field.",
          "Click 'Parse Payload' to execute the conversion.",
          "View the resolved human-readable calendar string.",
          "Click 'Copy String Object' to copy the UTC date to your clipboard."
        ]}
      />

    </div>
  );
}