import type { Metadata } from "next";
import Link from "next/link";
import EntityLink from "components/entity-link";

export const metadata: Metadata = {
  title: "About",
  description: "Co-Founder, Aniva",
};

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">About Me</h1>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
        <p>
          I started programming when I was 14, running my own Minecraft server
          with a small team, website, web shop, and creative maps. I developed
          all this with help from{" "}
          <EntityLink
            href="https://github.com/hannibal002"
            logo="/logos/lorenz.png"
            shape="circle"
          >
            Lorenz
          </EntityLink>
          , my first mentor, who taught me the basics of Java. That's when I
          realized{" "}
          <b>
            I loved coding, building things, and creating online communities.
          </b>
        </p>
        <p>
          Around that time, I thought about starting a game server hosting
          business but decided against it since I wasn't 18 yet, and PayPal
          wouldn't allow a business account. My parents wanted me to focus on
          school until I finished my A-Levels, but looking back, I wish I had
          started the business then.
        </p>
        <p>
          During my final year of high school, I launched my first business. It
          all began with a one-week workshop in a big city, where my friends and
          I were trying to find things to do but didn't know anyone. Out of that
          need, I started{" "}
          <EntityLink logo="/logos/vamos.png">vamos!</EntityLink>—a social
          network for young people to connect and see what's going on nearby.
        </p>
        <p>
          In 2023, vamos! got{" "}
          <Link
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
          , a hyperlocal community app from Berlin with significantly more
          users, funding, and experience. After the acquisition, I worked on
          product and moderation at Jodel.
        </p>
        <p>
          Now,{" "}
          <EntityLink
            href="https://www.linkedin.com/in/noahpetermann/"
            logo="/logos/noah.jpg"
            shape="circle"
          >
            Noah
          </EntityLink>{" "}
          and I are building{" "}
          <EntityLink
            href="https://anivahealth.com/?utm_source=hecker.vc&utm_medium=referral&utm_campaign=personal-site&utm_content=about"
            logo="/logos/aniva.png"
          >
            Aniva
          </EntityLink>
          —a health OS that tracks your biomarkers and gives you personalized
          supplements and advice to stay healthy.
        </p>
        <p className="mb-8">
          Feel free to follow or <Link href="/links">connect with me</Link>!
        </p>
      </div>
    </section>
  );
}
