import React from 'react';

export default function SeoArticle({ title, description, features, howTo }) {
  return (
    <article className="max-w-4xl mx-auto mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">{title}</h2>
      <p className="mb-8 leading-relaxed">{description}</p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Why use our tool?</h3>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">How to use</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            {howTo.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}