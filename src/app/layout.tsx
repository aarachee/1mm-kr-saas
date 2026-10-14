import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1mm.kr | 모바일 인앱 탈출 단축링크 & 1mm Pay 크리에이터 솔루션",
  description: "로그인 풀림 없는 13자 인앱 탈출 단축 URL, 300 DPI QR 스튜디오 및 인스타·스레드 댓글 자동 DM, 1mm Pay 원클릭 결제 엔진",
  keywords: ["인앱브라우저 탈출", "단축링크", "쿠팡앱 바로열기", "1mm Pay", "인스타 전자책 판매", "인스타 댓글 자동 DM", "노션 템플릿 판매", "1mm.kr", "QR코드 생성기"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="trust"
          themes={['trust', 'modern', 'creative']}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
