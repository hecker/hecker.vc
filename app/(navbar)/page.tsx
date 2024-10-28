import Image from "next/image";
import Link from "next/link";
import { SpotifyIcon, GitHubIcon } from "components/icons";
import { getSpotifyFollowers, getCurrentlyPlaying } from "lib/spotify-metrics";
import { getGithubFollowers } from "lib/github-metrics";
import { getLatestWeight } from "lib/weight-metrics";
import avatar from "app/(navbar)/jan.png";
import contactData from "../card/contact.json";

export const revalidate = 30;

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

  let spotifyFollowers, currentlyPlaying, githubFollowers, latestWeight;

  const [spotifyResult, currentlyPlayingResult, githubResult, weightResult] =
    await Promise.allSettled([
      getSpotifyFollowers(),
      getCurrentlyPlaying(),
      getGithubFollowers(),
      getLatestWeight(),
    ]);

  if (spotifyResult.status === "fulfilled") {
    spotifyFollowers = spotifyResult.value;
  } else {
    console.error("Failed to get Spotify followers:", spotifyResult.reason);
  }

  if (currentlyPlayingResult.status === "fulfilled") {
    currentlyPlaying = currentlyPlayingResult.value;
  } else {
    console.error(
      "Failed to get currently playing track:",
      currentlyPlayingResult.reason,
    );
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
          I am {contactData.firstName}. {age} years old. I work on{" "}
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
            <div className="flex items-start flex-wrap text-neutral-500 dark:text-neutral-400">
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href="https://open.spotify.com/user/eja8fqoy7qpqdm4bk7e5nt8o3?si=43929b476d604ad4"
                className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400"
              >
                <SpotifyIcon
                  className={
                    currentlyPlaying && currentlyPlaying.is_playing
                      ? "animate-spin-slow"
                      : ""
                  }
                />
                <span>{spotifyFollowers} listeners</span>
              </Link>
              {currentlyPlaying &&
                currentlyPlaying.is_playing &&
                currentlyPlaying.item && (
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href={currentlyPlaying.item.external_urls.spotify}
                  >
                    : {currentlyPlaying.item.name} by{" "}
                    {currentlyPlaying.item.artists
                      .map((artist: { name: string }) => artist.name)
                      .join(", ")}
                  </Link>
                )}
            </div>
          )}
          {githubFollowers && (
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/hecker"
              className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400"
            >
              <GitHubIcon />
              {`${githubFollowers} hackers`}
            </Link>
          )}
        </div>
      </div>
      <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        <>
          I joined Jodel after they have acquired my startup vamos! Always
          curious, learning, building.{" "}
          {latestWeight && !isNaN(latestWeight.weight)
            ? `Working out more, currently at ${Math.round(latestWeight.weight)} kg.`
            : ""}
        </>
      </p>
    </section>
  );
}
