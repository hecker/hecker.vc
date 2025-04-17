"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SpotifyIcon } from "./icons";

type SpotifyData = {
  is_playing: boolean;
  item: {
    name: string;
    external_urls: {
      spotify: string;
    };
    artists: Array<{
      name: string;
    }>;
  };
};

export default function SpotifyStatus() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<SpotifyData | null>(
    null,
  );

  useEffect(() => {
    const fetchSpotifyStatus = async () => {
      try {
        const response = await fetch("/api/spotify");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCurrentlyPlaying(data);
      } catch (error) {
        console.error("Error fetching Spotify status:", error);
      }
    };

    // Fetch immediately
    fetchSpotifyStatus();

    // Then fetch every 10 seconds
    const interval = setInterval(fetchSpotifyStatus, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!currentlyPlaying || !currentlyPlaying.is_playing) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
      <SpotifyIcon className="flex-shrink-0 animate-spin-slow" />
      <div>
        <span className="text-neutral-800 dark:text-neutral-200">
          Currently streaming:
        </span>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={currentlyPlaying.item.external_urls.spotify}
        >
          {" "}
          {currentlyPlaying.item.name} by{" "}
          {currentlyPlaying.item.artists
            .map((artist) => artist.name)
            .join(", ")}
        </Link>
      </div>
    </div>
  );
}
