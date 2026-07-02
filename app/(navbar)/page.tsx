import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { cacheLife } from "next/cache";
import avatar from "app/(navbar)/jan.jpeg";
import contactData from "../card/contact.json";
import SpotifyStatus from "components/spotify-status";
import EntityLink from "components/entity-link";
import {
  SpotifyFollowers,
  GithubFollowers,
  WeightKg,
  InlineNumberSkeleton,
} from "components/metrics";

// cacheComponents forbids the current time in the static shell; a cached
// component re-evaluates daily instead.
async function Age() {
  "use cache";
  cacheLife("days");
  const today = new Date();
  const birth = new Date(contactData.birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return <>{age}</>;
}

export default function HomePage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">Jan Hecker</h1>
      <p className="my-5 max-w-[500px] text-neutral-800 dark:text-neutral-200">
        <>
          I'm building{" "}
          <EntityLink
            href="https://anivahealth.com/?utm_source=hecker.vc&utm_medium=referral&utm_campaign=personal-site&utm_content=home"
            logo="/logos/aniva.png"
          >
            Aniva
          </EntityLink>
          , a personal health concierge that helps you stay healthy for the
          long run.
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
          draggable={false}
        />
        <div className="ml-6 md:ml-6 space-y-2">
          <SpotifyStatus />
          <SpotifyFollowers />
          <GithubFollowers />
        </div>
      </div>
      <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        <>
          Ex-founder of{" "}
          <EntityLink logo="/logos/vamos.png">vamos!</EntityLink> (
          <Link
            className="underline transition-all decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em]"
            href="https://www.businessinsider.de/gruenderszene/business/koelner-studenten-app-wird-an-jodel-verkauft-kommt-jetzt-der-relaunch/"
            target="_blank"
            rel="noopener noreferrer"
          >
            acquired
          </Link>{" "}
          by{" "}
          <EntityLink href="https://jodel.com/de/" logo="/logos/jodel.png">
            Jodel
          </EntityLink>
          ). Curious builder, health
          enthusiast. Working out more.{" "}
          <Link
            className="underline transition-all decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em]"
            href="/weight"
          >
            <Suspense fallback={<InlineNumberSkeleton />}>
              <WeightKg />
            </Suspense>{" "}
            kg
          </Link>
          . <Age /> years old.
        </>
      </p>
    </section>
  );
}
