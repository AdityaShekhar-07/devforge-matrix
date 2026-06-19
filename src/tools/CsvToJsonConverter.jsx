import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function CsvToJsonConverter() {
  const [csv, setCsv] = useState("id,name,role\n1,Aditya Shekhar,Engineer\n2,John Doe,Analyst");
  const [jsonResult, setJsonResult] = useState('');

  const handleConvert = () => {
    const lines = csv.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',');
    const result = lines.slice(1).map(line => {
      const obj = {};
      const currentline = line.split(',');
      headers.forEach((header, j) => {
        obj[header.trim()] = currentline[j]?.trim() || '';
      });
      return obj;
    });
    setJsonResult(JSON.stringify(result, null, 2));
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE CSV TO JSON TOOL UI --- */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-2 gap-6 min-h-[65vh]">
        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Raw CSV Comma-Separated String</label>
          <textarea className="w-full flex-1 p-5 border rounded-2xl font-mono text-sm focus:outline-none resize-none tool-card" value={csv} onChange={(e) => setCsv(e.target.value)} />
          <button onClick={handleConvert} className="btn-primary py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer">Compile JSON Matrix</button>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Compiled Target JSON Data String</label>
          <div className="w-full flex-1 p-5 border rounded-2xl font-mono text-sm overflow-auto whitespace-pre-wrap select-all tool-card">
            <pre>{jsonResult || '// Structured JSON output maps here...'}</pre>
          </div>
          {jsonResult && (
            <button onClick={() => navigator.clipboard.writeText(jsonResult)} className="w-full btn-secondary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
              Copy JSON Output
            </button>
          )}
        </div>
      </div>
      {/* --- END OF THE CSV TO JSON TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online CSV to JSON Converter"
        description="Instantly convert comma-separated values (CSV) or Excel data into a structured JSON format. DevForge Matrix provides a fast, client-side data compilation tool that parses your tabular data into clean, readable JSON arrays without uploading your sensitive files to a server."
        features={[
          "Instant Compilation: Parses thousands of rows into structured JSON matrices in milliseconds.",
          "Client-Side Privacy: Your tabular datasets remain completely local and secure in your browser.",
          "Developer Ready: Automatically maps CSV headers to JSON keys for direct use in APIs, databases, or application states."
        ]}
        howTo={[
          "Paste your raw CSV string or export data into the left input canvas.",
          "Ensure your first row contains the specific header keys.",
          "Click 'Compile JSON Matrix' to instantly generate the structured array.",
          "Copy the formatted JSON output directly to your clipboard."
        ]}
      />
      
    </div>
  );
}