import React, { useState } from 'react';
import { marked } from 'marked'; 
import SeoArticle from '../components/SeoArticle';

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState('');
  const placeholderText = `# DevForge Matrix\n\n## Subheading Feature\nThis is **bold text** and some \`inline code\`. Open-source component crafting made simple.`;

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE MARKDOWN TOOL UI --- */}
      <div className="w-full min-h-[60vh] pt-8">
        <div className="max-w-7xl mx-auto flex flex-col h-full">
          {/* Cheat Sheet Bar */}
          <div className="w-full p-4 mb-6 rounded-2xl border flex flex-wrap items-center justify-between text-xs font-mono shadow-sm tool-card gap-4 transition-all">
            <span className="font-bold opacity-60 flex items-center gap-2 uppercase tracking-wider">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Markdown Syntax Cheat Sheet:
            </span>
            <div className="flex flex-wrap items-center gap-4 opacity-80">
              <span><span className="font-bold bg-slate-200/50 dark:bg-slate-700/50 px-1.5 py-0.5 rounded"># Heading</span> = Main Title</span>
              <span><span className="font-bold bg-slate-200/50 dark:bg-slate-700/50 px-1.5 py-0.5 rounded">## Title</span> = Subtitle</span>
              <span><span className="font-bold bg-slate-200/50 dark:bg-slate-700/50 px-1.5 py-0.5 rounded">**text**</span> = Bold</span>
              <span><span className="font-bold bg-slate-200/50 dark:bg-slate-700/50 px-1.5 py-0.5 rounded">`code`</span> = Inline Code</span>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-6 min-h-[50vh]">
            {/* Editor Panel */}
            <div className="flex flex-col gap-3 h-full">
              <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Markdown Editor Canvas</label>
              <textarea
                className="w-full h-full p-6 border rounded-2xl font-mono text-sm resize-none focus:outline-none shadow-sm tool-card leading-relaxed transition-all text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent"
                placeholder={placeholderText}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
              />
            </div>

            {/* Preview Panel */}
            <div className="flex flex-col gap-3 h-full">
              <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Compiled Visual HTML Preview</label>
              <div 
                className={`w-full h-full p-6 border rounded-2xl overflow-y-auto shadow-sm tool-card transition-all
                  [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 
                  [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3 [&>h2]:mt-6 
                  [&>p]:mb-4 [&>p]:leading-relaxed
                  [&_strong]:font-bold 
                  [&_code]:bg-slate-200/50 [&_code]:dark:bg-slate-700/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-sm
                  ${!markdown ? 'opacity-40' : 'opacity-100'}`}
                dangerouslySetInnerHTML={{ 
                  __html: markdown ? marked.parse(markdown) : marked.parse(placeholderText) 
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* --- END OF THE MARKDOWN TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Markdown Live Previewer & HTML Compiler"
        description="A lightning-fast, zero-configuration Markdown editor. Write in plain text and see your headings, code blocks, and formatting compile into beautiful HTML instantly. Perfect for crafting README files, documentation, or blog posts."
        features={[
          "Split-Pane Editing: Write on the left, view production HTML on the right.",
          "Developer-Focused: Beautiful syntax highlighting for inline and block code.",
          "Distraction-Free & Private: No accounts required, processes entirely in the browser."
        ]}
        howTo={[
          "Start typing Markdown syntax in the left canvas.",
          "Use # for headings, ** for bold, and backticks for code.",
          "Preview the compiled HTML in real-time on the right.",
          "Copy the raw markdown or export the compiled HTML directly."
        ]}
      />

    </div>
  );
}