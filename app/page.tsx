import Image from "next/image";
import { ArrowIcon } from "components/icons";
import { avatar } from "lib/info";

export default function Home() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">Jan Hecker</h1>
      <p className="my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200">
        <>
          Hey, I'm Lee. I'm the <b>VP of Developer Experience at Vercel</b>{" "}
          where my team helps developers build a faster web.
        </>
      </p>
      <div className="flex items-start md:items-center my-8 flex-col md:flex-row">
        <Image
          alt="Jan Hecker"
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
      </div>
      <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        <>
          I'm a Next.js contributor and help lead our open-source communities.
          I'm passionate about frontend development and have created courses on
          React, Next.js, and web development. I'm an advisor and investor in
          early stage startups.
        </>
      </p>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400">
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/janhecker/"
          >
            <ArrowIcon />
            <p className="h-7">Follow me on LinkedIn</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.youtube.com/channel/UCoskbG0wO6RawevcsI41EWQ"
          >
            <ArrowIcon />
            <p className="h-7">Watch me on YouTube</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
