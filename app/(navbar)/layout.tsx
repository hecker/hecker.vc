import Navbar from "components/navbar";
import BackgroundMusicOnL from "components/music";
import React from "react";

export default function NavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      key="with-navbar"
      className="antialiased flex flex-col md:flex-row"
    >
      <Navbar />
      <BackgroundMusicOnL />
      <main>{children}</main>
    </section>
  );
}
