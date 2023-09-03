import Image from "next/image";
import Link from "next/link";
import {
  YouTubeIcon,
  LeagueOfLegendsIcon,
  SpotifyIcon,
} from "components/icons";
import { getSpotifyFollowers } from "lib/spotify-metrics";
import { fetchYouTubeSubscribers } from "lib/youtube-metrics";
import { fetchLeagueRank } from "lib/league-metrics";
import avatar from "app/(navbar)/jan.png";

export const revalidate = 60;

export default async function HomePage() {
  // Get Spotify followers, YouTube subscribers and LoL rank
  let spotifyFollowers, youtubeSubscribers, leagueRank;
  try {
    [spotifyFollowers] = await Promise.all([getSpotifyFollowers()]);
  } catch (error) {
    console.error(error);
  }
  try {
    [youtubeSubscribers] = await Promise.all([fetchYouTubeSubscribers()]);
  } catch (error) {
    console.error(error);
  }
  try {
    [leagueRank] = await Promise.all([fetchLeagueRank()]);
  } catch (error) {
    console.error(error);
  }

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">Jan Hecker</h1>
      <p className="my-5 max-w-[500px] text-neutral-800 dark:text-neutral-200">
        <>
          I am Jan. I work on{" "}
          <b>
            product at <Link href="https://jodel.com/de/">Jodel</Link>
          </b>{" "}
          and share my ideas online.
        </>
      </p>
      <div className="flex items-center my-8 flex-row">
        <Image
          title="Jan Hecker"
          alt="Jan Hecker"
          className="rounded-full grayscale pointer-events-none hover:animate-spin-slow"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="ml-6 md:ml-6 space-y-2">
          {spotifyFollowers && (
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://open.spotify.com/user/eja8fqoy7qpqdm4bk7e5nt8o3?si=43929b476d604ad4"
              className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400"
            >
              <SpotifyIcon />
              {`${spotifyFollowers} followers`}
            </Link>
          )}
          {youtubeSubscribers && (
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.youtube.com/channel/UCoskbG0wO6RawevcsI41EWQ"
              className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400"
            >
              <YouTubeIcon />
              {`${youtubeSubscribers} subscribers`}
            </Link>
          )}
          {leagueRank && (
            <Link
              rel="noopener noreferrer"
              target="_self"
              href="/lol/janhecker"
              className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400"
            >
              <LeagueOfLegendsIcon />
              {leagueRank}
            </Link>
          )}
        </div>
      </div>
      <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        <>
          I joined Jodel after they have acquired my startup{" "}
          <Link href="https://getvamos.app">vamos!</Link> Currently, I'm
          learning Flutter &amp; React (Next.js) and starting to work out again.
          Also seeking a shared flat or apartment in Berlin.{" "}
          <Link
            href="https://www.linkedin.com/in/janhecker/"
            className="text-gray-400"
          >
            Get in touch
          </Link>{" "}
          if you have tips.
        </>
      </p>
      <i>
        Thanks, <Link href="https://twitter.com/leeerob">Lee,</Link> for
        inspiring me to start web development &amp; launching my own website.
      </i>
    </section>
  );
}
