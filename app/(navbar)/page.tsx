import Image from "next/image";
import Link from "next/link";
import { SpotifyIcon, GitHubIcon } from "components/icons";
import { getSpotifyFollowers } from "lib/spotify-metrics";
import { getGithubFollowers } from "lib/github-metrics";
import { getLatestWeight } from "lib/weight-metrics";
import avatar from "app/(navbar)/jan.png";
import contactData from "../card/contact.json";

export const revalidate = 60;

function calculateAge() {
  const today = new Date();
  const birth = new Date(contactData.birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default async function HomePage() {
  const age = calculateAge();

  let spotifyFollowers;
  let githubFollowers;
  let latestWeight;

  const [spotifyResult, githubResult, weightResult] = await Promise.allSettled([
    getSpotifyFollowers(),
    getGithubFollowers(),
    getLatestWeight(),
  ]);

  if (spotifyResult.status === "fulfilled") {
    spotifyFollowers = spotifyResult.value;
  } else {
    console.error("Failed to get Spotify followers:", spotifyResult.reason);
  }

  if (githubResult.status === "fulfilled") {
    githubFollowers = githubResult.value;
  } else {
    console.error("Failed to get GitHub followers:", githubResult.reason);
  }

  if (weightResult.status === "fulfilled") {
    latestWeight = weightResult.value;
  } else {
    console.error("Failed to get latest weight:", weightResult.reason);
  }

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">Jan Hecker</h1>
      <p className="my-5 max-w-[500px] text-neutral-800 dark:text-neutral-200">
        <>
          I am {contactData.firstName}. {age} years old.{" "}
          {latestWeight && !isNaN(latestWeight.weight)
            ? `${Math.round(latestWeight.weight)} kg heavy. `
            : ""}
          I work on{" "}
          <b>
            product at{" "}
            <Link
              href="https://jodel.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jodel
            </Link>
          </b>{" "}
          and share my ideas online.
        </>
      </p>
      <div className="flex items-center my-8 flex-row">
        <Image
          title="Jan Hecker"
          alt="Jan Hecker"
          className="rounded-full grayscale pointer-events-none"
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
              {`${spotifyFollowers} listeners`}
            </Link>
          )}
          {githubFollowers && (
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/hecker"
              className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400"
            >
              <GitHubIcon />
              {`${githubFollowers} hackers`}
            </Link>
          )}
        </div>
      </div>
      <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        <>
          I joined Jodel after they have acquired my startup vamos! Currently,
          I'm learning Flutter &amp; React (Next.js) and starting to work out
          again.
        </>
      </p>
    </section>
  );
}
