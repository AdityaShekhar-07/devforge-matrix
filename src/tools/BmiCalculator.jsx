import React, { useState, useMemo } from 'react';
import SeoArticle from '../components/SeoArticle';

export default function BmiCalculator() {
  const [weight, setWeight] = useState('72');
  const [height, setHeight] = useState('178');
  const [bmi, setBmi] = useState(null);

  const parsedMetrics = useMemo(() => {
    if (!bmi) return { text: 'Enter metrics above', color: 'text-slate-400', rotation: -90 };
    const val = parseFloat(bmi);
    
    // Map BMI range (15 to 35) onto a 180-degree semicircular gauge loop (-90deg to +90deg)
    let degrees = ((val - 15) / (35 - 15)) * 180 - 90;
    if (degrees < -90) degrees = -90;
    if (degrees > 90) degrees = 90;

    if (val < 18.5) return { text: 'Underweight Range', color: 'text-amber-500', rotation: degrees };
    if (val < 24.9) return { text: 'Normal Healthy Baseline', color: 'text-emerald-500', rotation: degrees };
    if (val < 29.9) return { text: 'Overweight Range', color: 'text-orange-500', rotation: degrees };
    return { text: 'Obesity Category Alert', color: 'text-rose-500', rotation: degrees };
  }, [bmi]);

  return (
    <div className="flex flex-col w-full gap-16 pb-12">
      
      {/* --- THE BMI TOOL UI --- */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-2 gap-8 items-center min-h-[60vh]">
        <div className="border p-6 rounded-2xl flex flex-col gap-4 bg-white/20 dark:bg-slate-900/10 backdrop-blur-md">
          <label className="text-xs font-mono font-bold uppercase tracking-wider opacity-60">Metrics Target Mapping</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono opacity-70">Weight (KG)</label>
              <input type="text" className="w-full p-2.5 mt-1 border rounded-xl font-mono text-sm focus:outline-none" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-mono opacity-70">Height (CM)</label>
              <input type="text" className="w-full p-2.5 mt-1 border rounded-xl font-mono text-sm focus:outline-none" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
          </div>
          <button onClick={() => setBmi((parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(1))} className="w-full action-btn-primary py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer">
            Compute BMI Vector Index
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-8 border rounded-2xl bg-white/20 dark:bg-slate-900/10 backdrop-blur-md h-full max-h-[340px]">
          <div className="relative h-28 w-56 flex items-end justify-center mb-4">
            {/* Main Semicircular Arc Track Line */}
            <div className="absolute inset-0 border-[10px] border-b-0 rounded-t-full border-slate-300/40 dark:border-slate-700/30"></div>
            
            {/* Custom segment indicators */}
            <div className="absolute bottom-0 inset-x-0 flex justify-between text-[10px] font-mono font-bold opacity-40 select-none px-1 translate-y-1">
              <span>15</span>
              <span className="-mt-14">25</span>
              <span>35</span>
            </div>

            {/* Precision Indicator Pointer needle */}
            <div 
              className="absolute bottom-0 h-22 w-0.5 bg-indigo-600 dark:bg-indigo-400 origin-bottom transition-transform duration-500 ease-out z-20"
              style={{ transform: `rotate(${parsedMetrics.rotation}deg)` }}
            >
              <div className="absolute -top-1 -left-1 h-2 w-2 bg-indigo-600 dark:bg-indigo-400 rounded-full shadow-md"></div>
            </div>
            <div className="absolute bottom-0 h-3 w-3 bg-slate-700 dark:bg-slate-200 rounded-full translate-y-1.5 z-30 border border-white dark:border-slate-900"></div>
          </div>

          <div className="text-center mt-2 select-none">
            <span className="text-[10px] font-mono opacity-40 uppercase tracking-wider">Computed Results</span>
            <h3 className="text-4xl font-mono font-black tracking-tight mt-0.5">{bmi || '00.0'}</h3>
            <p className={`text-xs font-bold font-sans mt-1 transition-all ${parsedMetrics.color}`}>{parsedMetrics.text}</p>
          </div>
        </div>
      </div>
      {/* --- END OF THE BMI TOOL UI --- */}

      {/* --- THE SEO ARTICLE --- */}
      <SeoArticle 
        title="Free Online BMI Fitness Index Calculator"
        description="Instantly calculate your Body Mass Index (BMI) and determine your health category. DevForge Matrix provides a private, client-side calculator with a dynamic visual gauge to help you track your fitness goals without storing or transmitting your personal health data."
        features={[
          "Absolute Privacy: Your physical metrics are processed completely locally and never uploaded to a server.",
          "Visual Target Gauge: Instantly see where you fall on the health spectrum with the real-time needle indicator.",
          "Lightweight & Ad-Free: A distraction-free utility designed for rapid metric checking."
        ]}
        howTo={[
          "Enter your current Weight in kilograms (KG).",
          "Enter your Height in centimeters (CM).",
          "Click the 'Compute BMI Vector Index' button.",
          "Read your calculated BMI score and health category on the dynamic visual gauge."
        ]}
      />
    </div>
  );
}