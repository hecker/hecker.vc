export async function fetchYouTubeSubscribers(): Promise<number> {
  if (!process.env.YOUTUBE_API_KEY) {
    return -1;
  }
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCoskbG0wO6RawevcsI41EWQ&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await response.json();
  return parseInt(data.items[0].statistics.subscriberCount, 10);
}
