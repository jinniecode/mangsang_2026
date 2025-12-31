import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '새해 망상 레벨 테스트',
  description: '내 망상 지수는 과연 몇 레벨일까? 지금 확인해보자!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#FAFAFA',
  openGraph: {
    title: '새해 망상 레벨 테스트',
    description: '내 망상 지수는 과연 몇 레벨일까? 지금 확인해보자!',
    type: 'website',
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
      <body className="font-handwriting">{children}</body>
    </html>
  )
}
