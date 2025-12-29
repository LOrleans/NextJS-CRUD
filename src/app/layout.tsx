import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Crud Next App",
  description: "Developing a Crud Next App for learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
