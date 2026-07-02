"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
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

type Track = { label: string; url: string };

function toTrack(data: SpotifyData | null): Track | null {
  if (!data || !data.is_playing || !data.item) return null;
  return {
    label: `${data.item.name} by ${data.item.artists
      .map((artist) => artist.name)
      .join(", ")}`,
    url: data.item.external_urls.spotify,
  };
}

function sameTrack(a: Track | null, b: Track | null) {
  return a?.label === b?.label && a?.url === b?.url;
}

// Matches --text-swap-dur and the hardcoded 200ms exit fade in the
// texts-reveal snippet (both in global.css).
const SWAP_DUR = 150;
const HIDE_DUR = 200;

// Last track this browser saw, so a revisit shows the line instantly and
// statically — like the server-rendered lines — instead of replaying the
// entrance. Refreshed by the poll; ignored once stale.
const STORAGE_KEY = "spotify-track";
const STORAGE_TTL = 5 * 60 * 1000;

function readStoredTrack(): Track | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { label, url, at } = JSON.parse(raw);
    if (typeof label !== "string" || typeof url !== "string") return null;
    if (typeof at !== "number" || Date.now() - at > STORAGE_TTL) return null;
    return { label, url };
  } catch {
    return null;
  }
}

function storeTrack(track: Track | null) {
  // Keep the pre-paint slot flag (read by the inline script in
  // app/layout.tsx) in sync with the stored track.
  document.documentElement.toggleAttribute("data-spotify", track !== null);
  try {
    if (track) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...track, at: Date.now() }),
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage unavailable → the next visit simply replays the entrance.
  }
}

export default function SpotifyStatus() {
  const [track, setTrack] = useState<Track | null>(null);
  // What is currently rendered; lags behind `track` during animations.
  const [displayed, setDisplayed] = useState<Track | null>(null);
  // texts-reveal line states, state-driven: hidden (neither), shown, hiding.
  const [shown, setShown] = useState(false);
  const [hiding, setHiding] = useState(false);
  const swapRef = useRef<HTMLSpanElement>(null);
  // Which enter animation to run after the next commit.
  const pendingEnterRef = useRef<"line" | "text" | null>(null);

  useEffect(() => {
    // A recently-seen track renders immediately with no animation — the
    // poll below confirms or corrects it.
    const stored = readStoredTrack();
    if (stored) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setTrack(stored);
      setDisplayed(stored);
      setShown(true);
      /* eslint-enable react-hooks/set-state-in-effect */
    }

    const fetchSpotifyStatus = async () => {
      try {
        const response = await fetch("/api/spotify");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        const next = toTrack(data);
        storeTrack(next);
        // Keep the previous reference when nothing changed so React can
        // bail out of re-rendering on every poll tick.
        setTrack((prev) => (sameTrack(prev, next) ? prev : next));
      } catch (error) {
        console.error("Error fetching Spotify status:", error);
      }
    };

    // Fetch immediately
    fetchSpotifyStatus();

    // Then fetch every 10 seconds, but not while the tab is hidden
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchSpotifyStatus();
      }
    }, 10000);

    // Refresh right away when the tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchSpotifyStatus();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Animated transitions, per transitions.dev:
  //   appear (nothing stored, null → track): texts reveal — the line mounts
  //     hidden and .is-shown plays the staggered rise,
  //   disappear (track → null): texts reveal .is-hiding — quiet fade, then
  //     unmount,
  //   change (track → other track): text states swap on the track span only.
  useEffect(() => {
    if (sameTrack(track, displayed)) {
      return;
    }
    /* eslint-disable react-hooks/set-state-in-effect --
       rendered content intentionally lags the fetched track so the
       enter/exit animations can run between the two states */
    if (!displayed && track) {
      pendingEnterRef.current = "line";
      setDisplayed(track);
      return;
    }
    if (displayed && !track) {
      setHiding(true);
      setShown(false);
      const timeout = setTimeout(() => {
        setDisplayed(null);
        setHiding(false);
      }, HIDE_DUR);
      return () => {
        // The track came back mid-fade: revert to the visible state.
        clearTimeout(timeout);
        setHiding(false);
        setShown(true);
      };
    }
    /* eslint-enable react-hooks/set-state-in-effect */
    const el = swapRef.current;
    if (!el) {
      setDisplayed(track);
      return;
    }
    el.classList.add("is-exit");
    const timeout = setTimeout(() => {
      pendingEnterRef.current = "text";
      setDisplayed(track);
    }, SWAP_DUR);
    return () => {
      clearTimeout(timeout);
      el.classList.remove("is-exit");
    };
  }, [track, displayed]);

  // Runs after the new content is committed.
  useLayoutEffect(() => {
    const pending = pendingEnterRef.current;
    if (!pending) return;
    pendingEnterRef.current = null;
    if (pending === "line") {
      // The line just mounted in its hidden resting state. Give it one
      // painted frame, then flip to .is-shown so the staggered rise runs —
      // Safari skips transitions whose start state never painted.
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    // Text swap enter: jump below without a transition, force a reflow,
    // then release so the new text animates back to rest.
    const el = swapRef.current;
    if (!el) return;
    el.classList.remove("is-exit");
    el.classList.add("is-enter-start");
    void el.offsetHeight;
    el.classList.remove("is-enter-start");
  }, [displayed]);

  if (!displayed) {
    // Zero-height unless the inline script reserved it pre-paint.
    return <div className="spotify-slot" />;
  }

  return (
    <div
      className={clsx(
        "t-stagger flex items-center gap-2 text-neutral-500 dark:text-neutral-400",
        shown && "is-shown",
        hiding && "is-hiding",
      )}
    >
      <SpotifyIcon className="t-stagger-line t-stagger-line--1 flex-shrink-0 animate-spin-slow" />
      <div className="t-stagger-line t-stagger-line--2">
        <span className="text-neutral-800 dark:text-neutral-200">
          Currently streaming:
        </span>{" "}
        <span ref={swapRef} className="t-text-swap">
          <Link rel="noopener noreferrer" target="_blank" href={displayed.url}>
            {displayed.label}
          </Link>
        </span>
      </div>
    </div>
  );
}
