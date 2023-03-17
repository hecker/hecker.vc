"use client";

import { useEffect, useState, useRef } from "react";

function BackgroundMusicOnL() {
  const [isPlaying, setIsPlaying] = useState(false);
  const url = "/music/last-of-the-real-ones.mp3";
  // @ts-ignore
  // eslint-disable-next-line
  const audio = useRef(new Audio(url));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "l") {
        if (!isPlaying) {
          audio.current.play();
          setIsPlaying(true);
        } else {
          audio.current.pause();
          setIsPlaying(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]);

  return null;
}

export default BackgroundMusicOnL;
