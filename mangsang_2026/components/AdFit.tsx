"use client";

import React, { useEffect, useRef } from 'react';

const AdFit = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kas/static/ba.min.js';
    script.async = true;
    
    if (adRef.current) {
      adRef.current.appendChild(script);
    }

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center my-8 w-full">
      <span className="text-[10px] text-gray-400 mb-1">ADVERTISEMENT</span>
      <div 
        ref={adRef}
        className="relative bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center overflow-hidden"
        style={{ width: '300px', height: '250px' }}
      >
        <ins className="kakao_ad_area relative z-10" 
             style={{ display: 'block' }}
             data-ad-unit="DAN-Xp0kA4ImcKSQrg7f"
             data-ad-width="300" 
             data-ad-height="250"></ins>
      </div>
    </div>
  );
};

// 🌟 이 줄이 반드시 있어야 'Attempted import error'가 해결됩니다.
export default AdFit;
