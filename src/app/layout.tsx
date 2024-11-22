import React from 'react';
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_Antique } from "next/font/google";
import "./globals.css";

const ZenKakuGothicNew = Zen_Kaku_Gothic_Antique({
  display: 'swap',
  weight: ['500', '700'],
  preload: false,
});

export const metadata: Metadata = {
  title: "Webut",
  description: "人の温かさがわかるメモアプリ",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={ZenKakuGothicNew.className}>
        {children}
        {modal}
      </body>
    </html>
  );
}