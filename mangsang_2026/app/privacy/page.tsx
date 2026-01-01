"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white p-8 font-sans text-gray-800">
      <button onClick={() => router.back()} className="mb-6 text-gray-500 text-sm">← 뒤로가기</button>
      <h1 className="text-2xl font-bold mb-6">개인정보 처리방침</h1>
      <div className="space-y-4 text-sm leading-relaxed">
        <p>본 서비스는 사용자의 개인정보를 소중히 다룹니다.</p>
        <h2 className="font-bold text-lg mt-4">1. 수집하는 항목</h2>
        <p>- 본 서비스는 직접적인 개인 식별 정보(이름, 연락처 등)를 수집하지 않습니다.<br/>
           - 서비스 이용 과정에서 쿠키, 방문 기록, 기기 정보가 자동 생성되어 수집될 수 있습니다.</p>
        <h2 className="font-bold text-lg mt-4">2. 광고 관련 안내</h2>
        <p>- 본 서비스는 카카오 애드핏 등 제3자 광고 플랫폼을 사용하며, 맞춤형 광고 제공을 위해 비식별 정보를 활용할 수 있습니다.</p>
        <p className="mt-8 text-gray-400 text-xs text-center">© 2026 망상레벨테스트. All rights reserved.</p>
      </div>
    </div>
  );
}