import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [generatedText, setGeneratedText] = useState('');

  const baseLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const generateText = () => {
    let result = [];
    for (let i = 0; i < paragraphs; i++) {
      result.push(baseLorem);
    }
    setGeneratedText(result.join('\n\n'));
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE LOREM IPSUM TOOL UI --- */}
      <div className="w-full min-h-[50vh] pt-8">
        <div className="max-w-4xl mx-auto border p-8 rounded-2xl shadow-sm flex flex-col gap-6 tool-card">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Paragraph Loop Count</label>
              <input 
                type="number" 
                min="1" 
                max="20" 
                className="w-24 p-3 border rounded-xl font-mono text-sm focus:outline-none text-center" 
                value={paragraphs} 
                onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)} 
              />
            </div>
            <button onClick={generateText} className="btn-primary text-xs font-bold px-8 py-3 rounded-xl transition-colors cursor-pointer shadow-sm">
              Generate Text
            </button>
          </div>
          
          {generatedText && (
            <>
              <div className="p-6 border rounded-xl max-h-80 overflow-y-auto text-sm font-sans leading-relaxed select-all bg-white/50 dark:bg-slate-900/50">
                {generatedText.split('\n\n').map((p, i) => <p key={i} className="mb-4 last:mb-0">{p}</p>)}
              </div>
              <button onClick={() => navigator.clipboard.writeText(generatedText)} className="btn-secondary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
                Copy Generated Text
              </button>
            </>
          )}
        </div>
      </div>
      {/* --- END OF THE LOREM IPSUM TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online Lorem Ipsum Text Generator"
        description="Need high-quality placeholder text for your mockups and prototypes? DevForge Matrix provides a lightning-fast Lorem Ipsum generator that creates professional-grade dummy text instantly. Perfect for web design, UI testing, and documentation formatting."
        features={[
          "Instant Generation: Create custom-length placeholder text blocks with a single click.",
          "Clean Formatting: Generates standard paragraph structures ideal for testing typography and layout flow.",
          "Distraction-Free: A simple, ad-free utility that runs entirely in your browser."
        ]}
        howTo={[
          "Specify the number of paragraphs you need using the input field.",
          "Click the 'Generate Text' button to create your content.",
          "Click 'Copy Generated Text' to export the block directly to your clipboard for use in your designs."
        ]}
      />

    </div>
  );
}