import { Suspense } from "react";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { SpotifyIcon, GitHubIcon } from "components/icons";
import Digits from "components/digits";
import { getSpotifyFollowers } from "lib/spotify-metrics";
import { getGithubFollowers } from "lib/github-metrics";
import { getAllWeights, type WeightEntry } from "lib/weight-metrics";

// Cached data wrappers: served instantly from cache on navigation,
// revalidated in the background per the "metrics" profile in
// next.config.ts. Errors are thrown before an entry is stored, so a failed
// fetch is retried on the next request instead of being cached.
async function cachedSpotifyFollowers() {
  "use cache";
  cacheLife("metrics");
  return getSpotifyFollowers();
}

async function cachedGithubFollowers() {
  "use cache";
  cacheLife("metrics");
  return getGithubFollowers();
}

// Single cache entry for weight data, shared by the home-page number and
// the /weight page stats. Sorted oldest → newest.
export async function cachedWeights(): Promise<WeightEntry[]> {
  "use cache";
  cacheLife("metrics");
  const weights = await getAllWeights();
  weights.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
  return weights;
}

// transitions.dev skeleton pulse (14); size via className, e.g. "h-4 w-28".
export function Skeleton({ className }: { className: string }) {
  return (
    <span className="t-skel-skeleton is-pulsing">
      <span
        className={`inline-block rounded bg-neutral-200 dark:bg-neutral-800 align-middle ${className}`}
      />
    </span>
  );
}

export function InlineNumberSkeleton() {
  return <Skeleton className="h-4 w-[2ch]" />;
}

// Streams just the number; everything around it is static.
async function FollowerCount({
  load,
  name,
  errorLabel,
}: {
  load: () => Promise<number>;
  name: string;
  errorLabel: string;
}) {
  let value = "–";
  try {
    value = String(await load());
  } catch (error) {
    console.error(`Failed to get ${errorLabel}:`, error);
  }
  return <Digits name={name} value={value} />;
}

// Static line — icon, link, and label render with the shell; only the
// count suspends.
function FollowerLink({
  load,
  href,
  icon,
  name,
  suffix,
  errorLabel,
}: {
  load: () => Promise<number>;
  href: string;
  icon: React.ReactNode;
  name: string;
  suffix: string;
  errorLabel: string;
}) {
  return (
    <Link
      rel="noopener noreferrer"
      target="_blank"
      href={href}
      className="flex flex-shrink-0 items-center gap-2 text-neutral-500 dark:text-neutral-400"
    >
      {icon}
      <span>
        <Suspense fallback={<InlineNumberSkeleton />}>
          <FollowerCount load={load} name={name} errorLabel={errorLabel} />
        </Suspense>{" "}
        {suffix}
      </span>
    </Link>
  );
}

export function SpotifyFollowers() {
  return (
    <FollowerLink
      load={cachedSpotifyFollowers}
      href="https://open.spotify.com/user/eja8fqoy7qpqdm4bk7e5nt8o3?si=43929b476d604ad4"
      icon={<SpotifyIcon />}
      name="spotify-followers"
      suffix="followers"
      errorLabel="Spotify followers"
    />
  );
}

export function GithubFollowers() {
  return (
    <FollowerLink
      load={cachedGithubFollowers}
      href="https://github.com/hecker"
      icon={<GitHubIcon />}
      name="github-followers"
      suffix="fellow hackers"
      errorLabel="GitHub followers"
    />
  );
}

// Only the number itself is fetched; the surrounding sentence stays static.
export async function WeightKg() {
  let value = "–";
  try {
    const weights = await cachedWeights();
    const latest = weights[weights.length - 1];
    if (latest && !isNaN(latest.weight)) {
      value = String(Math.round(latest.weight));
    }
  } catch (error) {
    console.error("Failed to get latest weight:", error);
  }
  return <Digits name="weight-kg" value={value} />;
}
