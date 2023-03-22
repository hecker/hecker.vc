import "./global.css";
import clsx from "clsx";
import Navbar from "components/navbar";
import { Libre_Baskerville } from "next/font/google";
import { Metadata } from "next";
import BackgroundMusicOnL from "components/music";
import React from "react";

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-baskerville",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jan Hecker",
    template: "%s | Jan Hecker",
  },
  description: "founder, amateur",
  openGraph: {
    title: "Jan Hecker",
    description: "founder, amateur",
    url: "https://hecker.vc",
    siteName: "Jan Hecker",
    images: [
      {
        url: "https://hecker.vc/og.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Jan Hecker",
    card: "summary_large_image",
    creator: "@janhecker29",
    site: "@janhecker29",
  },
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        "cursor-black dark:cursor-white text-black bg-white dark:text-white dark:bg-[#111010]",
        baskerville.variable
      )}
    >
      <body
        key="without-navbar"
        className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto"
      >
        <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
          {children}
        </main>
      </body>
    </html>
  );
}
