"use client";

import { useEffect, useState, useRef } from "react";

function BackgroundMusicOnL() {
  const [isPlaying, setIsPlaying] = useState(false);
  const url = "/music/last-of-the-real-ones.mp3";
  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(url) : undefined
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "l") {
        if (!isPlaying) {
          audio.current?.play();
          setIsPlaying(true);
        } else {
          audio.current?.pause();
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

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const url = "/music/west-connect.mp3";
  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(url) : undefined
  );

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      if (event.target !== undefined && !isPlaying) {
        console.log("yooooo");
        setTimeout(() => {
          audio.current?.play();
          setIsPlaying(true);
        }, 1000);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "l") {
        if (!isPlaying) {
          audio.current?.play();
          setIsPlaying(true);
        } else {
          audio.current?.pause();
          setIsPlaying(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isPlaying]);
  return null;
}
