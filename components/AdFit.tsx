"use client";

import React, { useEffect, useRef } from 'react';

const AdFit = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. 이미 스크립트가 있다면 새로고침을 위해 기존 스크립트 태그를 지우거나 재실행 유도
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kas/static/ba.min.js';
    script.async = true;
    
    // 컴포넌트가 화면에 붙을 때 스크립트를 추가
    if (adRef.current) {
      adRef.current.appendChild(script);
    }

    return () => {
      // 컴포넌트가 사라질 때 내부의 스크립트 정리
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="flex justify-center my-8 w-full min-h-[50px]" ref={adRef}>
      {/* display: 'none' 대신 'block'으로 설정하여 영역 확인 */}
      <ins className="kakao_ad_area" style={{ display: 'block' }}
           data-ad-unit="DAN-Xp0kA4ImcKSQrg7f"
           data-ad-width="320"
           data-ad-height="50"></ins>
    </div>
  );
};

export default AdFit;