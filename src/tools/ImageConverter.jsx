import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function ImageConverter() {
  const [images, setImages] = useState([]);
  const [quality, setQuality] = useState(80);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const mappedFiles = files.map(file => ({
      file,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      preview: URL.createObjectURL(file),
      convertedUrl: null
    }));
    setImages(prev => [...prev, ...mappedFiles]);
  };

  const convertToWebp = () => {
    if (images.length === 0) return;
    setProcessing(true);

    images.forEach((imgObj, index) => {
      const img = new Image();
      img.src = imgObj.preview;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Dynamic client-side quality compression matrix parsing
        const webpDataUrl = canvas.toDataURL('image/webp', quality / 100);
        
        setImages(prev => {
          const updated = [...prev];
          updated[index].convertedUrl = webpDataUrl;
          return updated;
        });
        if (index === images.length - 1) setProcessing(false);
      };
    });
  };

  const downloadSingle = (url, originalName) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = originalName.substring(0, originalName.lastIndexOf('.')) + '.webp';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE IMAGE CONVERTER TOOL UI --- */}
      <div className="w-full min-h-[50vh] pt-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="border-2 border-dashed border-slate-800 bg-slate-900/40 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 hover:border-indigo-500/50 transition-colors relative">
            <input 
              type="file" 
              multiple 
              accept="image/png, image/jpeg" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleFileChange}
            />
            <span className="text-3xl">📥</span>
            <div>
              <p className="text-sm font-medium text-slate-200">Drag & drop images here or browse</p>
              <p className="text-xs text-slate-500 font-mono mt-1">Supports PNG, JPG, JPEG (Processes locally)</p>
            </div>
          </div>

          {images.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div className="flex items-center gap-4">
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Compression Quality</label>
                  <input 
                    type="range" min="10" max="100" value={quality} 
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-32 accent-indigo-500"
                  />
                  <span className="text-xs font-mono font-bold text-indigo-400">{quality}%</span>
                </div>
                <button 
                  onClick={convertToWebp} disabled={processing}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {processing ? 'Processing Engine...' : 'Convert Images to WebP'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                {images.map((img, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800/60 rounded-xl text-xs font-mono">
                    <div className="flex items-center gap-3 truncate max-w-[70%]">
                      <img src={img.preview} className="h-8 w-8 object-cover rounded-md border border-slate-800" alt="Thumbnail" />
                      <div className="truncate">
                        <p className="text-slate-300 truncate font-sans">{img.name}</p>
                        <p className="text-[10px] text-slate-500">{img.size}</p>
                      </div>
                    </div>
                    {img.convertedUrl ? (
                      <button 
                        onClick={() => downloadSingle(img.convertedUrl, img.name)}
                        className="text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 rounded-md hover:bg-emerald-500/10 transition-colors"
                      >
                        Download WebP
                      </button>
                    ) : (
                      <span className="text-slate-600">Pending</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* --- END OF THE IMAGE CONVERTER TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online Bulk Image to WebP Converter"
        description="Instantly compress and convert your PNG and JPEG images into the next-generation WebP format. DevForge Matrix offers a secure, 100% client-side batch image converter that drastically reduces file sizes for better web performance without uploading your photos to a server."
        features={[
          "Batch Processing: Convert multiple images simultaneously with zero server latency.",
          "Custom Compression: Adjust the quality slider to find the perfect balance between file size and visual fidelity.",
          "Absolute Privacy: Your images are processed securely using your browser's native Canvas API. Nothing is ever uploaded."
        ]}
        howTo={[
          "Drag and drop your JPEG or PNG images into the upload zone.",
          "Use the slider to set your desired WebP compression quality.",
          "Click 'Convert Images to WebP' to process the batch locally.",
          "Download your optimized WebP images individually."
        ]}
      />

    </div>
  );
}