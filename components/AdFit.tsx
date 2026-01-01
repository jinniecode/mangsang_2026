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
      {/* 광고 라벨 (선택 사항) */}
      <span className="text-[10px] text-gray-400 mb-1">ADVERTISEMENT</span>
      
      <div 
        ref={adRef}
        className="relative bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center overflow-hidden"
        style={{ width: '320px', height: '50px' }}
      >
        {/* 플레이스홀더 문구: 광고가 로드되면 광고가 이 위를 덮게 됩니다 */}
        <span className="absolute text-xs text-gray-400 font-medium">
          광고 준비 중입니다 ✨
        </span>

        <ins className="kakao_ad_area relative z-10" 
             style={{ display: 'block' }}
             data-ad-unit="DAN-Xp0kA4ImcKSQrg7f"
             data-ad-width="320"
             data-ad-height="50"></ins>
      </div>
    </div>
  );
};

export default AdFit;