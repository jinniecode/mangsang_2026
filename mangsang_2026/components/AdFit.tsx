"use client";

import React, { useEffect, useRef } from 'react';

// 광고 유닛 정보와 크기를 받아올 수 있도록 타입을 설정합니다.
interface AdFitProps {
  unit: string;
  width: string;
  height: string;
}

const AdFit = ({ unit, width, height }: AdFitProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 광고 스크립트 생성
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
  }, [unit]); // unit 값이 변경될 때마다 광고를 새로 고침 합니다.

  return (
    <div className="flex flex-col items-center w-full">
      <span className="text-[10px] text-gray-400 mb-1">ADVERTISEMENT</span>
      {/* [심사 통과를 위한 핵심 수정] 
        - rounded 제거 (모서리 직각 유지)
        - overflow-hidden 제거 (광고 잘림 방지)
        - border 및 background 제거 (광고 강조 금지)
      */}
      <div 
        ref={adRef}
        className="relative flex items-center justify-center"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <ins className="kakao_ad_area relative z-10" 
             style={{ display: 'none' }} // ba.min.js가 로드되면서 block으로 바뀝니다.
             data-ad-unit={unit}
             data-ad-width={width} 
             data-ad-height={height}></ins>
      </div>
    </div>
  );
};

export default AdFit;
