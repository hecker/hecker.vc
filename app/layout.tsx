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
  description: "founder & developer-to-be",
  openGraph: {
    title: "Jan Hecker",
    description: "founder & developer-to-be",
    url: "https://hecker.vc",
    siteName: "Jan Hecker",
    images: [
      {
        url: "https://leerob.io/og.jpg",
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
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  // verification: {
  //   google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
  //   yandex: '14d2e73487fa6c71',
  // },
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
      <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
        <Navbar />
        <BackgroundMusicOnL />
        <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
          {children}
        </main>
      </body>
    </html>
  );
}
