import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "components/icons";
import avatar from "../app/jan.png";

export default function HomePage() {
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
      <div className="flex items-start md:items-center my-8 flex-col md:flex-row">
        <Image
          title="Jan Hecker"
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
          Currently, I'm learning Flutter &amp; React (Next.js) and doing a lot
          of sports. Since 2011, I have tried to become ranked gold in League of
          Legends but have failed every season.
        </>
      </p>
      <i>
        I got a lot of inspiration from{" "}
        <Link href="https://github.com/leerob/leerob.io">Lee's website</Link>.
      </i>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400">
        <li>
          <Link
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/janhecker/"
          >
            <ArrowIcon />
            <p className="h-7">Follow me on LinkedIn</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.youtube.com/channel/UCoskbG0wO6RawevcsI41EWQ"
          >
            <ArrowIcon />
            <p className="h-7">Watch me on YouTube</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}
