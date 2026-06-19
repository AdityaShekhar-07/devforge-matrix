import React, { useState, useEffect, useRef } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function MemeGenerator() {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [topText, setTopText] = useState('WHEN THE WEB UTILITY');
  const [bottomText, setBottomText] = useState('LOADS IN 0.2 SECONDS WITHOUT ADS');
  const canvasRef = useRef(null);

  // Fetch Meme Templates
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMemes(data.data.memes);
          setSelectedMeme(data.data.memes[0]);
        }
      });
  }, []);

  // Real-Time Canvas Drawing Engine
  useEffect(() => {
    if (!selectedMeme) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.crossOrigin = "anonymous";
    img.src = selectedMeme.url;
    
    img.onload = () => {
      // Sync canvas resolution exactly to image resolution
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw background image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Calculate responsive font size (10% of image width)
      const fontSize = Math.floor(canvas.width / 10);
      
      // CRITICAL FIX: Standardized font string declaration
      ctx.font = `bold ${fontSize}px Impact, sans-serif`;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = Math.floor(fontSize / 8); 
      ctx.textAlign = "center";
      
      // Draw Top Text (Dynamically padded from top edge)
      ctx.textBaseline = "top";
      const topY = fontSize * 0.2;
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, topY, canvas.width - 40);
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, topY, canvas.width - 40);
      
      // Draw Bottom Text (Dynamically padded from bottom edge)
      ctx.textBaseline = "bottom";
      const bottomY = canvas.height - (fontSize * 0.2);
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, bottomY, canvas.width - 40);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, bottomY, canvas.width - 40);
    };
  }, [selectedMeme, topText, bottomText]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `${selectedMeme?.name?.replace(/\s+/g, '-').toLowerCase() || 'meme-export'}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE MEME GENERATOR TOOL UI --- */}
      <div className="w-full min-h-[60vh] pt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8 items-start h-full">
          <div className="flex flex-col gap-5 border p-6 rounded-2xl tool-container shadow-sm">
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider">Select Blank Meme Layout</label>
              <select className="w-full p-3 mt-1 border rounded-xl font-sans text-sm focus:outline-none" onChange={(e) => setSelectedMeme(memes.find(m => m.id === e.target.value))}>
                {memes.map(m => (<option key={m.id} value={m.id}>{m.name}</option>))}
              </select>
            </div>
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider">Header Caption</label>
              <input type="text" className="w-full p-3 mt-1 border rounded-xl text-sm focus:outline-none" value={topText} onChange={(e) => setTopText(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider">Footer Caption</label>
              <input type="text" className="w-full p-3 mt-1 border rounded-xl text-sm focus:outline-none" value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
            </div>
            
            <button onClick={handleDownload} className="w-full action-btn-primary py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Export High-Res PNG Asset
            </button>
          </div>

          <div className="flex flex-col items-center justify-center p-4 border rounded-2xl relative h-full tool-container shadow-sm overflow-hidden">
            <canvas ref={canvasRef} className="max-w-full max-h-full object-contain rounded-lg shadow-sm border border-slate-200/50 dark:border-slate-700/50" />
          </div>
        </div>
      </div>
      {/* --- END OF THE MEME GENERATOR TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online Meme Template Studio"
        description="Create your own memes in seconds. Our Meme Template Studio offers access to hundreds of trending meme backgrounds, allowing you to add custom top and bottom text captions and export high-resolution PNG images instantly, right in your browser."
        features={[
          "Instant Preview: Watch your captions render in real-time on top of your selected meme template.",
          "High-Resolution Exports: Generate clean, high-quality PNG assets ready for social sharing.",
          "Privacy First: All meme generation happens client-side, ensuring your creations stay yours."
        ]}
        howTo={[
          "Browse our selection of classic and trending meme templates.",
          "Type your desired top and bottom captions into the text inputs.",
          "Use the real-time preview to adjust your content for maximum comedic impact.",
          "Click 'Export High-Res PNG Asset' to save your meme to your device."
        ]}
      />

    </div>
  );
}