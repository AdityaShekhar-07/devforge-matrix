import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function QrGenerator() {
  const [value, setValue] = useState('https://devforge.matrix');
  const [isDownloading, setIsDownloading] = useState(false);

  // Directly constructs the production API URL based on input
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(value || ' ')}`;

  // Safe client-side blob fetching to trigger downloads without navigating away
  const handleDownload = async () => {
    if (!value) return;
    setIsDownloading(true);
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'devforge-qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image payload", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE QR GENERATOR TOOL UI --- */}
      <div className="w-full min-h-[50vh] pt-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8 items-center h-full">
          
          {/* Control Configuration Panel */}
          <div className="border p-6 rounded-2xl flex flex-col gap-4 tool-card shadow-sm">
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Target URL / Text Data</label>
              <input 
                type="text" 
                className="w-full p-3 mt-1 border rounded-xl text-sm focus:outline-none" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                placeholder="Enter URL to map code..."
              />
            </div>
            
            <button 
              onClick={handleDownload} 
              disabled={isDownloading || !value}
              className="btn-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50 transition-colors mt-2"
            >
              {isDownloading ? (
                <span className="animate-pulse">Processing Download...</span>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download QR Image asset (.PNG)
                </>
              )}
            </button>
          </div>

          {/* Render Output Panel */}
          <div className="flex flex-col items-center justify-center p-6 border rounded-2xl tool-card shadow-sm h-full max-h-[340px]">
            {value ? (
              <img 
                src={qrImageUrl} 
                alt="Generated Code Vector" 
                className="bg-white p-3 rounded-xl shadow-sm w-full max-w-[220px] h-auto border border-slate-200"
              />
            ) : (
              <div className="text-xs font-mono opacity-50 uppercase tracking-wider">Awaiting input payload</div>
            )}
          </div>
        </div>
      </div>
      {/* --- END OF THE QR GENERATOR TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online Instant QR Code Generator"
        description="Transform any URL or text into a high-quality QR code instantly. DevForge Matrix provides a simple, ad-free utility to generate PNG-formatted QR codes for your projects, business cards, or marketing materials."
        features={[
          "Real-Time Generation: Create your QR code as you type your URL or message.",
          "High-Compatibility: Generates standard PNG images compatible with any QR scanner.",
          "Ad-Free & Fast: No clutter, no sign-ups, and no tracking. Just pure utility."
        ]}
        howTo={[
          "Enter your website URL or text data into the input field.",
          "The QR code will automatically update to reflect your input.",
          "Click 'Download QR Image asset' to save the generated code to your device."
        ]}
      />

    </div>
  );
}