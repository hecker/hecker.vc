// Spotify access tokens live ~1 hour; cache to avoid an OAuth refresh
// round-trip on every call.
let tokenCache: { token: string; expiresAt: number } | null = null;

const getAccessToken = async (): Promise<string> => {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}`,
  });

  const responseBody = await response.text();

  if (!response.ok) {
    throw new Error(
      `Spotify token fetch failed: ${response.status} ${response.statusText} - ${responseBody}`,
    );
  }

  const data = JSON.parse(responseBody);
  tokenCache = {
    token: data.access_token,
    // Refresh a minute early so we never send an expired token.
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return data.access_token;
};

export async function getSpotifyFollowers(): Promise<number> {
  const access_token = await getAccessToken();
  const response = await fetch("https://api.spotify.com/v1/me/", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await response.json();
  return Number(data.followers.total);
}

export async function getCurrentlyPlaying() {
  const access_token = await getAccessToken();
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  return data;
}
