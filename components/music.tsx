"use client";

import { useEffect, useState } from "react";
import useSound from "use-sound";

function BackgroundMusicOnL() {
  const url = "/music/last-of-the-real-ones.mp3";
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause }] = useSound(url, {
    volume: 0.25,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "l") {
        if (isPlaying) {
          pause();
        } else {
          play();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return null;
}

export default BackgroundMusicOnL;
