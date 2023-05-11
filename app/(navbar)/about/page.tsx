import type { Metadata } from "next";
import { GitHubIcon, YouTubeIcon, LinkedInIcon } from "components/icons";

export const metadata: Metadata = {
  title: "About",
  description: "Founder of vamos!",
};

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">About Me</h1>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
        <p>
          I started programming when I was around the age of 14. Back then, I
          had my own Minecraft server with a small team, website, web shop and
          some creative maps and game modes, which I developed by myself and
          with the help of <a href="https://github.com/hannibal002">Lorenz</a>,
          who was my first mentor and taught me all the basics in Java. I
          noticed that{" "}
          <b>I loved coding, building stuff and creating online communities.</b>
        </p>
        <p>
          During that time I had the idea to start a game server hosting
          business but decided not to because I was under the age of 18, PayPal
          wouldn't allow me to create a business account (even if I legally
          owned a business), and my parents told me that school was too
          important and that I should wait until I finished my A-Levels. In
          retrospect, I very much regret not having founded it then.
        </p>
        <p>
          During my senior year of high school, I got to start{" "}
          <a href="https://getvamos.app">vamos!</a> The starting point was a
          one-week workshop in a big city. We were there with some from school
          and wanted to do something in the evening - unfortunately, we didn't
          know anyone and there was no way to spontaneously meet new people.
          There, I thought to myself, "Why not?" Out of this need, I founded the
          social network vamos! so that young people can connect with each other
          and see what's going on in the area.
        </p>
        <p>
          This era ended in 2023 after we got acquired by{" "}
          <a href="https://jodel.com/de/">Jodel</a>, another social network from
          Berlin, Germany, but with significantly more users, funding, and
          experience. Since then, I've been working on product and moderation at
          Jodel.
        </p>
        <p className="mb-8">
          If you want to follow my journey or just want to grab a (virtual)
          coffee, feel free to <a href="links">connect with me</a>!
        </p>

        {/* <div className="flex flex-col gap-2 md:flex-row md:gap-2"> */}
        <div className="hidden">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/hecker"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <GitHubIcon />
              <div className="ml-3">GitHub</div>
            </div>
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.youtube.com/@janhecker00"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <YouTubeIcon />
              <div className="ml-3">YouTube</div>
            </div>
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/janhecker/"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <LinkedInIcon />
              <div className="ml-3">LinkedIn</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
