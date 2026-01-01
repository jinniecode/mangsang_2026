import type { Metadata, Viewport } from 'next'
import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google';

// 1. 일반 메타데이터 설정 (SEO 및 SNS 공유용)
export const metadata: Metadata = {
  title: '새해 망상 레벨 테스트',
  description: '내 망상 지수는 과연 몇 레벨일까? 지금 확인해보자!',
  openGraph: {
    title: '새해 망상 레벨 테스트',
    description: '내 망상 지수는 과연 몇 레벨일까? 지금 확인해보자!',
    type: 'website',
    url: 'https://mangsang-2026.vercel.app',
    siteName: '망상 2026',
    locale: 'ko_KR',
  },
}

// 2. 뷰포트 및 테마 컬러 설정 (최신 Next.js 표준 방식)
// Metadata에서 분리하여 export해야 브라우저 호환성이 가장 좋습니다.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FAFAFA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      {/* Next.js가 viewport 설정을 자동으로 관리하므로, 
        <head> 내의 수동 <meta> 태그는 삭제하여 중복을 방지합니다. 
      */}
      <GoogleTagManager gtmId="GTM-55BC96LR" />
      <body className="font-handwriting">{children}</body>
    </html>
  )
}
