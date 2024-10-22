const getAccessToken = async () => {
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

  return JSON.parse(responseBody);
};

export async function getSpotifyFollowers(): Promise<number> {
  const access_token = await getAccessToken();
  const response = await fetch("https://api.spotify.com/v1/me/", {
    headers: {
      Authorization: `Bearer ${access_token.access_token}`,
    },
  });
  const data = await response.json();
  return data.followers.total;
}
