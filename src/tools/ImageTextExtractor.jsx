import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import SeoArticle from '../components/SeoArticle';

export default function ImageTextExtractor() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');

  const handleProcess = async (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;
    
    const fileUrl = URL.createObjectURL(file);
    setImage(fileUrl);
    setLoading(true);
    setText('');
    setProgress('Optimizing document contrast...');

    const img = new Image();
    img.src = fileUrl;
    
    img.onload = async () => {
      // Standard Professional Upscale (2x) for better document clarity
      const scale = 2;
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Gentle document filter: boosts contrast slightly without destroying anti-aliasing
      ctx.filter = 'grayscale(100%) contrast(150%) brightness(110%)';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const processedImageData = canvas.toDataURL('image/png');
      setProgress('Initializing Local OCR Engine...');

      try {
        const result = await Tesseract.recognize(processedImageData, 'eng', {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setProgress(`Scanning Document... ${Math.round(m.progress * 100)}%`);
            } else {
              setProgress(`Status: ${m.status}`);
            }
          }
        });
        
        // Clean up output formatting
        const cleanedText = result.data.text.replace(/\n\s*\n/g, '\n\n').trim();
        setText(cleanedText || 'No legible text could be extracted. Please ensure the image is a clear document or screenshot.');
      } catch (err) {
        setText('Error: Local OCR engine failed to process the image matrix.');
      } finally {
        setLoading(false);
        setProgress('');
      }
    };
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE OCR TOOL UI --- */}
      <div className="w-full min-h-[60vh] pt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8 h-full">
          <div className="flex flex-col gap-4 h-full">
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-8 text-center flex-1 flex flex-col items-center justify-center gap-4 relative tool-card shadow-sm transition-all hover:border-indigo-500 cursor-pointer overflow-hidden">
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleProcess} />
              
              {!image && (
                <>
                  <svg className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider">Upload Document / Screenshot</p>
                    <p className="text-xs font-mono opacity-60 mt-2">Optimized for printed text and digital receipts</p>
                  </div>
                </>
              )}
              
              {image && <img src={image} className="max-h-full max-w-full object-contain rounded-lg shadow-sm" alt="Uploaded Document" />}
              
              {loading && (
                <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20">
                  <div className="h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 text-center px-4">
                    {progress}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 h-full">
            <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Extracted Plain-Text Data Output</label>
            <textarea 
              className="w-full flex-1 p-5 border rounded-2xl text-sm focus:outline-none font-sans resize-none tool-card leading-relaxed"
              value={text}
              readOnly
              placeholder="// Extracted text contents will populate here cleanly..."
            />
            {text && !loading && (
              <button onClick={() => navigator.clipboard.writeText(text)} className="w-full btn-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Copy Extracted Text
              </button>
            )}
          </div>
        </div>
      </div>
      {/* --- END OF THE OCR TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online Image Text Extractor (OCR)"
        description="Digitize your documents instantly. Our browser-based Optical Character Recognition (OCR) engine converts images, scanned documents, and screenshots into editable plain text—all while keeping your data private and local."
        features={[
          "Local Processing: Your sensitive documents never leave your browser for external processing.",
          "High-Precision Engine: Pre-processes images with contrast enhancement to improve character recognition accuracy.",
          "Instant Digitization: Extract text from receipts, whiteboards, or printed documents in seconds."
        ]}
        howTo={[
          "Upload your document or image file into the drag-and-drop zone.",
          "The tool will automatically perform image cleanup and text scanning.",
          "Review the extracted content in the text area on the right.",
          "Copy the digitized text directly to your clipboard."
        ]}
      />

    </div>
  );
}