import React, { useEffect, useState } from 'react';

const CAMPUS_URLS = {
  katale: 'https://katale.scoobydoointernational.ac.ug/',
  gulu: 'https://gulu.scoobydoointernational.ac.ug/',
};

/** Only prompt visitors arriving on the shared school domain
 *  (add ?campus-selector to any URL to preview the popup) */
const shouldShow = () => {
  if (typeof window === 'undefined') return false;
  if (window.location.search.includes('campus-selector')) return true;
  return window.location.hostname.replace(/^www\./, '') === 'scoobydoointernational.ac.ug';
};

const CampusSelector = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (shouldShow()) {
      setOpen(true);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!open) return null;

  const choose = (campus) => {
    const target = new URL(CAMPUS_URLS[campus]);
    if (window.location.hostname === target.hostname) {
      // Already on this campus's site (e.g. previewing) — just close
      document.body.style.overflow = '';
      setOpen(false);
    } else {
      window.location.href = target.href;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="campus-selector-title"
    >
      <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        <div className="bg-[#6e1d0f] px-6 py-6 flex flex-col items-center gap-3">
          <img
            src="/scoobydoo-logo.png"
            alt="Scoobydoo International School Uganda"
            className="h-40 w-40 object-contain"
          />
          <h2 id="campus-selector-title" className="text-white text-lg font-bold text-center leading-snug">
            Scoobydoo International School Uganda
          </h2>
          <p className="text-[#ffb606] text-sm font-medium">Please take your pick and checkout the Campus of your choice</p>
        </div>

        <div className="p-6 flex flex-col gap-3">
          <button
            onClick={() => choose('katale')}
            className="w-full border-2 border-[#6e1d0f] px-5 py-4 text-left font-semibold text-[#6e1d0f] hover:bg-[#6e1d0f] hover:text-white active:scale-[0.98] transition-all duration-200"
          >
            Scoobydoo International School Uganda
            <span className="block text-sm font-normal opacity-80">Katale Campus</span>
          </button>
          <button
            onClick={() => choose('gulu')}
            className="w-full border-2 border-[#6e1d0f] px-5 py-4 text-left font-semibold text-[#6e1d0f] hover:bg-[#6e1d0f] hover:text-white active:scale-[0.98] transition-all duration-200"
          >
            Scoobydoo International School Uganda
            <span className="block text-sm font-normal opacity-80">Gulu Campus</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampusSelector;
