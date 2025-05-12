import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Co-founder at Livy",
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
          <Link href="https://github.com/hannibal002">Lorenz</Link>, my first
          mentor, who taught me the basics of Java. That's when I realized{" "}
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
          need, I started <b>vamos!</b>—a social network for young people to
          connect and see what's going on nearby.
        </p>
        <p>
          In 2023, vamos! got acquired by{" "}
          <Link href="https://jodel.com/de/">Jodel</Link>, a hyperlocal
          community app from Berlin with significantly more users, funding, and
          experience. Now, I focus on product and moderation at Jodel.
        </p>
        <p>
          Now,{" "}
          <Link
            href="https://www.linkedin.com/in/noahpetermann/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Noah
          </Link>{" "}
          and I are building a health OS that tracks your biomarkers and gives
          you personalized supplements and advice to stay healthy.
        </p>
        <p className="mb-8">
          Feel free to follow or <Link href="links">connect with me</Link>!
        </p>
      </div>
    </section>
  );
}
