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
  const url = "/music/beautiful-mind.mp3";
  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(url) : undefined
  );

  useEffect(() => {
    const handleClick = () => {
      if (!isPlaying) {
        audio.current?.play();
        setIsPlaying(true);
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
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [isPlaying]);

  return null;
}
