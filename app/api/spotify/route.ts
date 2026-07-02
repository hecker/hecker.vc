import { getCurrentlyPlaying } from "lib/spotify-metrics";
import { NextResponse, connection } from "next/server";

// Simple in-memory cache
let cache = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 5000; // 5 seconds cache

export async function GET() {
  // Opt out of build-time prerendering under cacheComponents.
  await connection();
  try {
    const now = Date.now();

    // Return cached data if it's fresh
    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json(cache.data);
    }

    // Fetch new data
    const currentlyPlaying = await getCurrentlyPlaying();

    // Update cache
    cache = {
      data: currentlyPlaying,
      timestamp: now,
    };

    return NextResponse.json(currentlyPlaying);
  } catch (error) {
    console.error("Error fetching Spotify status:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
