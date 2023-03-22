import Link from "next/link";
import Image from "next/image";
import * as leagueMetrics from "lib/league-metrics";
import avatar from "/app/jan.png";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  let playerExists,
    leagueName,
    leagueRegisteredDate,
    leagueImageUrl,
    leagueLevel,
    leagueRank,
    fetchPlayerWithMostMatches;

  // Convert line breaks properly.
  slug = slug.replace(/%20/g, "");

  try {
    playerExists = await leagueMetrics.checkPlayerExists(slug);
    [
      leagueName,
      leagueRegisteredDate,
      leagueImageUrl,
      leagueLevel,
      leagueRank,
      fetchPlayerWithMostMatches,
    ] = await Promise.all([
      leagueMetrics.fetchLeagueName(slug),
      leagueMetrics.fetchLeagueRegisteredDate(slug),
      leagueMetrics.fetchLeagueImageUrl(slug),
      leagueMetrics.fetchLeagueLevel(slug),
      leagueMetrics.fetchLeagueRank(slug),
      leagueMetrics.fetchPlayerWithMostMatches(slug),
    ]);
  } catch (error) {
    console.error(error);
  }

  return (
    <section>
      {playerExists ? (
        <>
          <h1 className="font-bold text-3xl font-serif">{leagueName}</h1>
          <div className="flex items-center my-8 flex-row">
            <Image
              title={leagueName}
              alt={leagueName as string}
              className="rounded-full"
              src={leagueImageUrl ?? avatar}
              width={100}
              height={100}
              priority
            />
            <div className="ml-6 md:ml-6 space-y-2">
              {fetchPlayerWithMostMatches !== "" && (
                <Link
                  rel="noopener noreferrer"
                  target="_self"
                  href="/lol/fetchPlayerWithMostMatches"
                  className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400"
                >
                  {`Most played with ${fetchPlayerWithMostMatches}`}
                </Link>
              )}
              <p>{leagueRank}</p>
              <p>Level {leagueLevel}</p>
            </div>
          </div>
        </>
      ) : (
        <h1 className="cursor-notion font-bold text-3xl font-serif">
          Player not found
        </h1>
      )}
    </section>
  );
}
