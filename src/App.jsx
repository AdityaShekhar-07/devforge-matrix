import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import ImageConverter from './tools/ImageConverter';
import CaseConverter from './tools/CaseConverter';
import JsonTool from './tools/JsonTool';
import LinkedinTool from './tools/LinkedinTool';
import Base64Tool from './tools/Base64Tool';
import HashTool from './tools/HashTool';
import CronPredictor from './tools/CronPredictor';
import PasswordGenerator from './tools/PasswordGenerator';
import UrlEncoder from './tools/UrlEncoder';
import MarkdownPreviewer from './tools/MarkdownPreviewer';
import DiffChecker from './tools/DiffChecker';
import QrGenerator from './tools/QrGenerator';
import RegexTester from './tools/RegexTester';
import EpochConverter from './tools/EpochConverter';
import UserAgentDebugger from './tools/UserAgentDebugger';
import ImageTextExtractor from './tools/ImageTextExtractor';
import MemeGenerator from './tools/MemeGenerator';
import CsvToJsonConverter from './tools/CsvToJsonConverter';
import LoremIpsumGenerator from './tools/LoremIpsumGenerator';
import BmiCalculator from './tools/BmiCalculator';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  const toolsList = [
    { id: 'image-converter', name: 'Bulk Image to WebP', category: 'Media Tools' },
    { id: 'qr-gen', name: 'Instant QR Code Generator', category: 'Media Tools' },
    { id: 'meme-gen', name: 'Meme Template Studio', category: 'Media Tools' },
    { id: 'case-converter', name: 'Case Converter & Counter', category: 'Office Utilities' },
    { id: 'md-preview', name: 'Markdown Live Previewer', category: 'Office Utilities' },
    { id: 'lorem-gen', name: 'Lorem Ipsum Text Generator', category: 'Office Utilities' },
    { id: 'image-ocr', name: 'Image Text Extractor (OCR)', category: 'Office Utilities' },
    { id: 'json-formatter', name: 'JSON Prettifier & Validator', category: 'Dev Utilities' },
    { id: 'cron-predict', name: 'Crontab Expression Visualizer', category: 'Dev Utilities' },
    { id: 'url-codec', name: 'URL Encoder / Decoder', category: 'Dev Utilities' },
    { id: 'diff-check', name: 'Side-by-Side Diff Checker', category: 'Dev Utilities' },
    { id: 'regex-test', name: 'Real-Time RegEx Playground', category: 'Dev Utilities' },
    { id: 'csv-json', name: 'Excel CSV to JSON Engine', category: 'Dev Utilities' },
    { id: 'linkedin-preview', name: 'LinkedIn Post Formatter', category: 'Growth Tools' },
    { id: 'ua-debug', name: 'User-Agent Header Debugger', category: 'Growth Tools' },
    { id: 'bmi-calc', name: 'BMI Fitness Index Calculator', category: 'Growth Tools' },
    { id: 'base64', name: 'Base64 Encoder / Decoder', category: 'Security & Crypto' },
    { id: 'hash-gen', name: 'Instant Hashing Utility', category: 'Security & Crypto' },
    { id: 'epoch-conv', name: 'Unix Epoch Time Converter', category: 'Security & Crypto' },
    { id: 'password-gen', name: 'Secure Password Generator', category: 'Security & Crypto' },
  ];

  const categories = ['Dev Utilities', 'Media Tools', 'Office Utilities', 'Security & Crypto', 'Growth Tools'];

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return toolsList.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);
  /* --- DYNAMIC SEO TITLE HOOK --- */
  useEffect(() => {
    // 1. Check if we are inside a tool route
    if (location.pathname.startsWith('/tools/')) {
      // Extract the ID from the URL (e.g., 'json-formatter')
      const currentToolId = location.pathname.split('/')[2];
      // Find the matching tool in your registry
      const currentTool = toolsList.find(t => t.id === currentToolId);

      if (currentTool) {
        // Format: "JSON Prettifier & Validator | DevForge Matrix"
        document.title = `${currentTool.name} | DevForge Matrix`;
      } else {
        // Fallback if URL is invalid
        document.title = 'DevForge Matrix | Developer Utility Platform';
      }
    } else {
      // 2. We are on the homepage
      document.title = 'DevForge Matrix | Developer Utility Platform';
    }
  }, [location, toolsList]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden font-sans select-none">
      <header className="h-16 border-b px-8 flex items-center justify-between z-50 shrink-0 relative">
        <div className="flex items-center gap-10 h-full">
          <div 
            className="flex items-center gap-3 select-none cursor-pointer"
            onClick={() => navigate('/')}
          >
            {/* Light Theme Logo */}
            <img 
              src="/logo-light.png" 
              alt="DevForge Light" 
              className="logo-light h-10 w-auto object-contain" 
            />

            {/* Dark Theme Logo */}
            <img 
              src="/logo-dark.png" 
              alt="DevForge Dark" 
              className="logo-dark h-10 w-auto object-contain" 
            />

            <span className="brand-text text-lg font-bold tracking-tight">
              DevForge Matrix
            </span>
          </div>
          
          <nav className="flex items-center gap-1 h-full">
            {categories.map((cat) => (
              <div key={cat} className="relative group h-full flex items-center">
                <button className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer">
                  <span>{cat}</span>
                  <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute left-0 top-full mt-0 w-64 border rounded-xl shadow-xl p-2 hidden group-hover:block z-50 bg-white dark:bg-slate-900">
                  {toolsList.filter(t => t.category === cat).map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => navigate(`/tools/${tool.id}`)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors truncate block cursor-pointer ${
                        location.pathname === `/tools/${tool.id}` ? 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold' : ''
                      }`}
                    >
                      {tool.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* SEARCH WORKSPACE INPUT ELEMENT */}
        <div className="flex-1 max-w-sm mx-12 relative">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search utility tools instantly..."
              className="w-full bg-slate-100/60 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-indigo-500/60 transition-all"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
            />
            <svg className="absolute left-3 top-2.5 h-3.5 w-3.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {showSearchDropdown && filteredTools.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 border rounded-xl shadow-2xl p-1.5 flex flex-col gap-0.5 z-50 bg-white dark:bg-slate-900">
              {filteredTools.map(t => (
                <button
                  key={t.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    navigate(`/tools/${t.id}`);
                    setSearchQuery('');
                    setShowSearchDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <span className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{t.name}</span>
                  <span className="text-[10px] font-mono opacity-50 border px-1.5 py-0.5 rounded-md">{t.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl border hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer transition-all shadow-sm"
          >
            {darkMode ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/20 dark:border-emerald-500/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Sandbox Verified
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 select-text">
        <Routes>
          <Route path="/" element={
            <div className="max-w-4xl mx-auto text-center mt-20">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">The Developer Utility Matrix</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">Select a tool from the navigation bar or use the search box to get started. All tools run 100% locally in your browser.</p>
            </div>
          } />
          
          <Route path="/tools/image-converter" element={<ImageConverter />} />
          <Route path="/tools/qr-gen" element={<QrGenerator />} />
          <Route path="/tools/meme-gen" element={<MemeGenerator />} />
          <Route path="/tools/case-converter" element={<CaseConverter />} />
          <Route path="/tools/md-preview" element={<MarkdownPreviewer />} />
          <Route path="/tools/lorem-gen" element={<LoremIpsumGenerator />} />
          <Route path="/tools/image-ocr" element={<ImageTextExtractor />} />
          <Route path="/tools/json-formatter" element={<JsonTool />} />
          <Route path="/tools/cron-predict" element={<CronPredictor />} />
          <Route path="/tools/url-codec" element={<UrlEncoder />} />
          <Route path="/tools/diff-check" element={<DiffChecker />} />
          <Route path="/tools/regex-test" element={<RegexTester />} />
          <Route path="/tools/csv-json" element={<CsvToJsonConverter />} />
          <Route path="/tools/linkedin-preview" element={<LinkedinTool />} />
          <Route path="/tools/ua-debug" element={<UserAgentDebugger />} />
          <Route path="/tools/bmi-calc" element={<BmiCalculator />} />
          <Route path="/tools/base64" element={<Base64Tool />} />
          <Route path="/tools/hash-gen" element={<HashTool />} />
          <Route path="/tools/epoch-conv" element={<EpochConverter />} />
          <Route path="/tools/password-gen" element={<PasswordGenerator />} />
        </Routes>
      </main>
    </div>
  );
}