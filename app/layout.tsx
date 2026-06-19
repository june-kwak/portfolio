import type { Metadata } from "next";
import { Gamja_Flower, Gowun_Dodum } from "next/font/google";
import "./globals.css";

const gamjaFlower = Gamja_Flower({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const gowunDodum = Gowun_Dodum({
  variable: "--font-sans",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "주은 | UX 디자이너",
  description:
    "사람과 제품 사이의 거리를 좁히는 UX 디자이너 주은의 포트폴리오입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${gamjaFlower.variable} ${gowunDodum.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
