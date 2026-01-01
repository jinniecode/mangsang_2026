"use client";

import React, { useEffect } from 'react';

const AdFit = () => {
  useEffect(() => {
    // 애드핏 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kas/static/ba.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거 (메모리 관리)
      const adScripts = document.querySelectorAll('script[src*="ba.min.js"]');
      adScripts.forEach(s => s.remove());
    };
  }, []);

  return (
    <div className="flex justify-center my-8">
      {/* ⚠️ data-ad-unit 부분에 본인의 광고 단위 ID를 넣으세요 */}
      <ins className="kakao_ad_area" style={{ display: 'none' }}
           data-ad-unit="DAN-Xp0kA4ImcKSQrg7f"
           data-ad-width="320"
           data-ad-height="50"></ins>
    </div>
  );
};

export default AdFit;