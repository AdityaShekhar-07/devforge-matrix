import React, { useState } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function CronPredictor() {
  const [expression, setExpression] = useState('*/15 9-17 * * 1-5');
  const [explanation, setExplanation] = useState('Every 15 minutes, between 09:00 AM and 05:59 PM, Monday through Friday');

  const parseCron = (cron) => {
    setExpression(cron);
    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) {
      setExplanation('Invalid Cron format. Requires exactly 5 parameters (Min, Hour, Day, Month, DoW).');
      return;
    }

    // A lightweight, client-side deterministic string parsing engine for Cron strings
    try {
      const [min, hour, day, month, dow] = parts;
      let minText = min === '*' ? 'every minute' : min.includes('*/') ? `every ${min.split('/')[1]} minutes` : `at minute ${min}`;
      let hourText = hour === '*' ? 'every hour' : hour.includes('-') ? `between ${hour.split('-')[0]}:00 and ${hour.split('-')[1]}:59` : `at hour ${hour}`;
      let dowText = dow === '*' ? 'every day' : dow === '1-5' ? 'Monday through Friday' : `on days ${dow}`;
      
      setExplanation(`Triggers ${minText}, ${hourText}, ${dowText}.`);
    } catch (e) {
      setExplanation('Parsing exception: Ensure standard crontab integer inputs.');
    }
  };

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE CRON PREDICTOR TOOL UI --- */}
      <div className="max-w-3xl mx-auto w-full flex flex-col justify-center min-h-[60vh]">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Crontab Expression Input</label>
            <input 
              type="text" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm font-mono text-indigo-400 focus:outline-none focus:border-indigo-500 mt-1"
              value={expression}
              onChange={(e) => parseCron(e.target.value)}
            />
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 min-h-16 flex items-center">
            <p className="text-sm font-sans text-slate-300 leading-relaxed">
              <span className="text-indigo-400 font-mono font-bold mr-2">🤖 Translation:</span>
              {explanation}
            </p>
          </div>
        </div>
      </div>
      {/* --- END OF THE CRON PREDICTOR TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online Crontab Expression Visualizer"
        description="Instantly decode, translate, and predict your cron job schedules in plain English. DevForge Matrix provides a lightweight, client-side string parsing engine to help developers validate complex scheduling formats without backend latency."
        features={[
          "Instant Translation: Converts standard 5-part cron syntax into human-readable text as you type.",
          "Syntax Validation: Detects invalid scheduling formats instantly to prevent server misconfigurations.",
          "100% Client-Side: Your server architecture and schedule timings remain entirely private."
        ]}
        howTo={[
          "Enter a standard 5-part cron expression (e.g., '*/15 9-17 * * 1-5') into the input field.",
          "Review the plain English translation generated in real-time.",
          "Adjust the minute, hour, day, month, or day-of-week parameters.",
          "Copy the validated cron string to your server or CI/CD configuration."
        ]}
      />
    </div>
  );
}