"use client";

import { useCallback, useEffect, useState, useRef } from "react";

// Create the <audio> element on first play only. Constructing it during
// render made every navbar page request the multi-MB track up front.
function useLazyAudio(url: string) {
  const ref = useRef<HTMLAudioElement | null>(null);
  return useCallback(() => {
    ref.current ??= new Audio(url);
    return ref.current;
  }, [url]);
}

// Pressing "l" toggles playback; with startOnClick, any click starts it.
function useBackgroundMusic(url: string, startOnClick = false) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useLazyAudio(url);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    const play = () => {
      audio().play();
      setIsPlaying(true);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "l") return;
      if (isPlaying) {
        audio().pause();
        setIsPlaying(false);
      } else {
        play();
      }
    };
    const handleClick = () => {
      if (!isPlaying) play();
    };

    document.addEventListener("keydown", handleKeyDown);
    if (startOnClick) document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [isPlaying, audio, startOnClick]);
}

function BackgroundMusicOnL() {
  useBackgroundMusic("/music/last-of-the-real-ones.mp3");
  return null;
}

export default BackgroundMusicOnL;

export function BackgroundMusic() {
  useBackgroundMusic("/music/beautiful-mind.mp3", true);
  return null;
}
