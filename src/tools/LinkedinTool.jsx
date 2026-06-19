import React, { useState, useRef } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function LinkedinTool() {
  // Starts completely empty so users don't have to delete text
  const [input, setInput] = useState('');
  const textRef = useRef(null);

  // 1-to-1 Explicit Mapping: Mathematically guarantees no surrogate pair gibberish
  const charMaps = {
    bold: {'a':'𝗮','b':'𝗯','c':'𝗰','d':'𝗱','e':'𝗲','f':'𝗳','g':'𝗴','h':'𝗵','i':'𝗶','j':'𝗷','k':'𝗸','l':'𝗹','m':'𝗺','n':'𝗻','o':'𝗼','p':'𝗽','q':'𝗾','r':'𝗿','s':'𝘀','t':'𝘁','u':'𝘂','v':'𝘃','w':'𝘄','x':'𝘅','y':'𝘆','z':'𝘇','A':'𝗔','B':'𝗕','C':'𝗖','D':'𝗗','E':'𝗘','F':'𝗙','G':'𝗚','H':'𝗛','I':'𝗜','J':'𝗝','K':'𝗞','L':'𝗟','M':'𝗠','N':'𝗡','O':'𝗢','P':'𝗣','Q':'𝗤','R':'𝗥','S':'𝗦','T':'𝗧','U':'𝗨','V':'𝗩','W':'𝗪','X':'𝗫','Y':'𝗬','Z':'𝗭','0':'𝟬','1':'𝟭','2':'𝟮','3':'𝟯','4':'𝟰','5':'𝟱','6':'𝟲','7':'𝟳','8':'𝟴','9':'𝟵'},
    italic: {'a':'𝘢','b':'𝘣','c':'𝘤','d':'𝘥','e':'𝘦','f':'𝘧','g':'𝘨','h':'𝘩','i':'𝘪','j':'𝘫','k':'𝘬','l':'𝘭','m':'𝘮','n':'𝘯','o':'𝘰','p':'𝘱','q':'𝘲','r':'𝘳','s':'𝘴','t':'𝘵','u':'𝘶','v':'𝘷','w':'𝘸','x':'𝘹','y':'𝘺','z':'𝘻','A':'𝘈','B':'𝘉','C':'𝘊','D':'𝘋','E':'𝘌','F':'𝘍','G':'𝘎','H':'𝘏','I':'𝘐','J':'𝘑','K':'𝘒','L':'𝘓','M':'𝘔','N':'𝘕','O':'𝘖','P':'𝘗','Q':'𝘘','R':'𝘙','S':'𝘚','T':'𝘛','U':'𝘜','V':'𝘝','W':'𝘞','X':'𝘟','Y':'𝘠','Z':'𝘡','0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9'},
    script: {'a':'𝓪','b':'𝓫','c':'𝓬','d':'𝓭','e':'𝓮','f':'𝓯','g':'𝓰','h':'𝓱','i':'𝓲','j':'𝓳','k':'𝓴','l':'𝓵','m':'𝓶','n':'𝓷','o':'𝓸','p':'𝓹','q':'𝓺','r':'𝓻','s':'𝓼','t':'𝓽','u':'𝓾','v':'𝓿','w':'𝔀','x':'𝔁','y':'𝔂','z':'𝔃','A':'𝓐','B':'𝓑','C':'𝓒','D':'𝓓','E':'𝓔','F':'𝓕','G':'𝓖','H':'𝓗','I':'𝓘','J':'𝓙','K':'𝓚','L':'𝓛','M':'𝓜','N':'𝓝','O':'𝓞','P':'𝓟','Q':'𝓠','R':'𝓡','S':'𝓢','T':'𝓣','U':'𝓤','V':'𝓥','W':'𝓦','X':'𝓧','Y':'𝓨','Z':'𝓩','0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9'}
  };

  const applyFormat = (type) => {
    const textarea = textRef.current;
    if (!textarea || !input) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const map = charMaps[type];

    // Safely translates characters without breaking Unicode
    const translate = (str) => Array.from(str).map(char => map[char] || char).join('');

    if (start === end) {
      // Nothing highlighted: Format the entire string
      setInput(translate(input));
    } else {
      // Specific text highlighted: Format ONLY the highlighted portion
      const before = input.slice(0, start);
      const selected = input.slice(start, end);
      const after = input.slice(end);
      setInput(before + translate(selected) + after);
    }
    
    // Auto-focus back to the text box so the user can keep typing
    setTimeout(() => textarea.focus(), 0);
  };

  // Fallback text just so the preview box doesn't look broken when empty
  const displayText = input || "Type your hook here to stand out in the feed algorithm...\n\nHighlight specific words and click a style button below to format them!";

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE LINKEDIN TOOL UI --- */}
      <div className="w-full min-h-[60vh] pt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-6 h-full">
          <div className="flex flex-col gap-4">
            <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Post Composition Sandbox</label>
            <textarea 
              ref={textRef}
              placeholder="Type your hook here to stand out in the feed algorithm...&#10;&#10;Highlight specific words and click a style button below to format them!"
              className="w-full flex-1 p-5 border rounded-2xl text-sm focus:outline-none resize-none shadow-sm tool-card leading-relaxed" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
            />
            <div className="flex gap-2">
              <button onClick={() => applyFormat('bold')} className="flex-1 py-3 rounded-xl text-xs font-bold border cursor-pointer btn-secondary">Bold Sans</button>
              <button onClick={() => applyFormat('italic')} className="flex-1 py-3 rounded-xl text-xs font-bold border cursor-pointer btn-secondary">Italic Serif</button>
              <button onClick={() => applyFormat('script')} className="flex-1 py-3 rounded-xl text-xs font-bold border cursor-pointer btn-secondary">Script Style</button>
            </div>
          </div>

          <div className="flex flex-col gap-4 h-full">
            <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Feed Simulator Preview</label>
            <div className="w-full flex-1 p-5 border rounded-2xl tool-card flex flex-col gap-3 shadow-sm overflow-y-auto">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-slate-400 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-white font-mono">U</div>
                <div>
                  <h4 className="text-xs font-bold font-sans">Professional Profile Identity</h4>
                  <p className="text-[10px] opacity-50 font-sans">Creator Core Stack Developer • 1m • Edited</p>
                </div>
              </div>
              <p className={`text-sm font-sans whitespace-pre-wrap leading-relaxed select-text mt-1 ${!input ? 'opacity-40' : ''}`}>
                {displayText}
              </p>
            </div>
            
            <button 
              onClick={() => navigator.clipboard.writeText(input)} 
              disabled={!input}
              className="w-full btn-primary py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors disabled:opacity-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
              </svg>
              Copy Formatted Text Payload
            </button>
          </div>
        </div>
      </div>
      {/* --- END OF THE LINKEDIN TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="LinkedIn Post Formatter & Preview Simulator"
        description="Stand out in the feed algorithm. This tool allows you to bypass standard social media limits by converting plain text into beautiful bold, italic, and script unicode characters, while simulating exactly how your post will look on mobile."
        features={[
          "Unicode Conversion: Mathematically maps your text to bold/italic sans-serif characters.",
          "Safe Character Mapping: Avoids 'alien text' gibberish by strictly mapping supported glyphs.",
          "Feed Preview: See exactly where the 'See More' cutoff will happen before you post."
        ]}
        howTo={[
          "Type your viral hook into the composition sandbox.",
          "Highlight the specific words you want to emphasize.",
          "Click the Bold or Italic buttons to format the selection.",
          "Copy the generated text payload and paste it directly into LinkedIn."
        ]}
      />

    </div>
  );
}