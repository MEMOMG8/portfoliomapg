import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manuel Perez Gil — Software Engineer",
  description:
    "Software Engineer specializing in Cloud & AI. AWS, Python, React, Next.js. Texas Tech CS '27.",
  keywords: ["Software Engineer", "Cloud", "AI", "AWS", "Python", "React", "Next.js", "Texas Tech"],
  authors: [{ name: "Manuel Perez Gil" }],
  openGraph: {
    title: "Manuel Perez Gil — Software Engineer",
    description:
      "Software Engineer specializing in Cloud & AI. AWS, Python, React, Next.js. Texas Tech CS '27.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
