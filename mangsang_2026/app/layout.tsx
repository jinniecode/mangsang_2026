// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: '새해 망상 레벨 테스트',
  description: '내 망상 지수는 과연 몇 레벨일까? 지금 확인해보자!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#FAFAFA',
  openGraph: {
    title: '새해 망상 레벨 테스트',
    description: '내 망상 지수는 과연 몇 레벨일까? 지금 확인해보자!',
    type: 'website',
    url: 'https://mangsang-2026.vercel.app',
    siteName: '망상 2026',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">

      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <GoogleTagManager gtmId="GTM-55BC96LR" />
      <body className="font-handwriting">{children}</body>
    </html>
  )
}
