// AdFit.tsx 내 return 부분 수정
<div 
  ref={adRef}
  className="relative bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center overflow-hidden"
  style={{ width: '300px', height: '250px' }} // 👈 높이를 250px로 변경
>
  <span className="absolute text-xs text-gray-400 font-medium">
    광고 준비 중입니다 ✨
  </span>

  <ins className="kakao_ad_area relative z-10" 
       style={{ display: 'block' }}
       data-ad-unit="DAN-Xp0kA4ImcKSQrg7f"
       data-ad-width="300"  // 👈 300으로 변경
       data-ad-height="250" // 👈 250으로 변경
  ></ins>
</div>
