"use client";

import { useCallback, useEffect, useState, useRef } from "react";

// Create the <audio> element on first play only. Constructing it during
// render made every navbar page request the multi-MB track up front.
function useLazyAudio(url: string) {
  const ref = useRef<HTMLAudioElement | null>(null);
  return useCallback(() => {
    if (typeof Audio === "undefined") return null;
    ref.current ??= new Audio(url);
    return ref.current;
  }, [url]);
}

function BackgroundMusicOnL() {
  const [isPlaying, setIsPlaying] = useState(false);
  const url = "/music/last-of-the-real-ones.mp3";
  const audio = useLazyAudio(url);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "l") {
        if (!isPlaying) {
          audio()?.play();
          setIsPlaying(true);
        } else {
          audio()?.pause();
          setIsPlaying(false);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, audio]);
  return null;
}

export default BackgroundMusicOnL;

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const url = "/music/beautiful-mind.mp3";
  const audio = useLazyAudio(url);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    const handleClick = () => {
      if (!isPlaying) {
        audio()?.play();
        setIsPlaying(true);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "l") {
        if (!isPlaying) {
          audio()?.play();
          setIsPlaying(true);
        } else {
          audio()?.pause();
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
  }, [isPlaying, audio]);

  return null;
}
