import type { Metadata } from "next";
import { Literata } from "next/font/google";
import "./portfolio.css";

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
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
    <html lang="en" className={literata.variable}>
      <body>{children}</body>
    </html>
  );
}
