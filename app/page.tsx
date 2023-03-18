import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  YouTubeIcon,
  BabyIcon,
  LeagueOfLegendsIcon,
} from "components/icons";
import { fetchYouTubeSubscribers } from "lib/metrics";
import { fetchLeagueRank } from "lib/league-metrics";
import avatar from "../app/jan.png";

export const revalidate = 60;

export default async function HomePage() {
  let youtubeSubscribers, leagueRank;

  try {
    [youtubeSubscribers, leagueRank] = await Promise.all([
      fetchYouTubeSubscribers(),
      fetchLeagueRank(),
    ]);
  } catch (error) {
    console.error(error);
  }

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">Jan Hecker</h1>
      <p className="my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200">
        <>
          I am Jan.{" "}
          <b>
            Founder of <Link href="https://getvamos.app">vamos!</Link>
          </b>{" "}
          and business informatics student at the University of Mannheim.
        </>
      </p>
      {/* <div className="flex items-start md:items-center my-8 flex-col md:flex-row"> */}
      <div className="flex items-center my-8 flex-row">
        <Image
          title="Jan Hecker"
          alt="Jan Hecker"
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        {/* <div className="mt-8 md:mt-0 ml-0 md:ml-6 space-y-2"> */}
        <div className="ml-6 md:ml-6 space-y-2">
          <p className="flex items-center gap-2">
            <BabyIcon />
            {`${Math.floor(
              (Date.now() - new Date("2000-09-20").getTime()) / 31536000000
            )} years old`}
          </p>
          <Link
            rel="noopener noreferrer"
            target="_self"
            href="/lol/janhecker"
            className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400"
          >
            <LeagueOfLegendsIcon />
            {leagueRank}
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.youtube.com/channel/UCoskbG0wO6RawevcsI41EWQ"
            className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400"
          >
            <YouTubeIcon />
            {`${(youtubeSubscribers ?? "...").toLocaleString()} subscribers`}
          </Link>
        </div>
      </div>
      <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        <>
          Currently, I'm learning Flutter &amp; React (Next.js) and starting to
          work out again. Since 2011, I have tried to become ranked gold in
          League of Legends but have failed every season.
        </>
      </p>
      <i>
        Thanks, <Link href="https://twitter.com/leeerob">Lee,</Link> for
        inspiring me to start web development &amp; launching my own website.
      </i>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400">
        <li>
          <Link
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://open.spotify.com/user/eja8fqoy7qpqdm4bk7e5nt8o3?si=43929b476d604ad4"
          >
            <ArrowIcon />
            <p className="h-7">stalk me on spotify</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}
