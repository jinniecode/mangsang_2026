import type { Metadata, Viewport } from 'next' // Viewport 타입 추가
import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google';

// 1. 일반 메타데이터 설정 (viewport, themeColor 제외)
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

// 2. 뷰포트 및 테마 컬러 설정 (분리된 export 사용)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // 'no' 대신 false를 사용합니다.
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
        <head> 내의 수동 <meta name="viewport" ... /> 태그는 삭제했습니다.
      */}
      <GoogleTagManager gtmId="GTM-55BC96LR" />
      <body className="font-handwriting">{children}</body>
    </html>
  )
}