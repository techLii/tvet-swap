import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kenya Technical Trainers",
  description: "The premier community for Technical Trainers in Kenya.",
  openGraph: {
    title: "Kenya Technical Trainers",
    description: "The premier community for Technical Trainers in Kenya.",
    images: ["/swap.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenya Technical Trainers",
    description: "The premier community for Technical Trainers in Kenya.",
    images: ["/swap.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
