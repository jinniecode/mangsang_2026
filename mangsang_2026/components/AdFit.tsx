"use client";

import React, { useEffect, useRef } from 'react';

interface AdFitProps {
  unit: string;
  width: string;
  height: string;
}

const AdFit = ({ unit, width, height }: AdFitProps) => {
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
  }, [unit]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* ADVERTISEMENT 문구 제거 완료 */}
      <div 
        ref={adRef}
        className="relative flex items-center justify-center"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <ins className="kakao_ad_area relative z-10" 
             style={{ display: 'none' }}
             data-ad-unit={unit}
             data-ad-width={width} 
             data-ad-height={height}></ins>
      </div>
    </div>
  );
};

export default AdFit;
