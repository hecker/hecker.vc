import type { Metadata } from "next";
import { ArrowIcon } from "components/icons";
import Link from "next/link";
import CV_DATA from "./cv-data.json";
import PrintButton from "./print-button";

export const metadata: Metadata = {
  title: "CV",
  description: "Co-Founder of Aniva. Previously vamos! (acquired by Jodel).",
};

type Entry = {
  organization: string;
  position: string;
  location: string;
  date?: string;
  summary?: string;
  highlights?: string[];
};

const linkClass =
  "underline transition-all decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-neutral-800 dark:hover:decoration-neutral-300 underline-offset-2 decoration-[0.1em]";

// "{text,url}" inside a highlight becomes an inline link.
function parseHighlightText(highlight: string) {
  return highlight.split(/({.*?})/).map((part, index) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      const [text, link] = part.slice(1, -1).split(",");
      return (
        <Link
          key={index}
          className={linkClass}
          href={link.trim()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text.trim()}
        </Link>
      );
    }
    return part;
  });
}

function Section({ title, data }: { title: string; data: Entry[] }) {
  return (
    <section className="mt-12 break-inside-avoid-page">
      <h2 className="font-serif text-xl mb-5 pb-2 border-b border-neutral-200 dark:border-neutral-800">
        {title}
      </h2>
      <div className="space-y-7">
        {data.map((item) => (
          <article
            key={`${item.organization}-${item.position}`}
            className="break-inside-avoid"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {item.organization}
              </h3>
              {item.date && (
                <span className="text-sm tabular-nums text-neutral-500 dark:text-neutral-400 sm:whitespace-nowrap">
                  {item.date}
                </span>
              )}
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              {item.position}
              <span className="text-neutral-400 dark:text-neutral-600">
                {" · "}
                {item.location}
              </span>
            </p>
            {item.summary && (
              <p className="mt-2 text-pretty text-neutral-800 dark:text-neutral-200">
                {parseHighlightText(item.summary)}
              </p>
            )}
            {item.highlights && item.highlights.length > 0 && (
              <ul className="mt-2 space-y-1 list-disc pl-5 marker:text-neutral-300 dark:marker:text-neutral-700 text-neutral-800 dark:text-neutral-200">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="pl-1 text-pretty">
                    {parseHighlightText(highlight)}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function CVPage() {
  const { work, education, extracurricular, skills } = CV_DATA;
  return (
    <section className="max-w-[640px]">
      <h1 className="font-bold text-3xl font-serif">Jan Hecker</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Berlin, Germany
        <span className="text-neutral-400 dark:text-neutral-600"> · </span>
        <Link
          href="mailto:jan@hecker.vc?body=Hi%20Jan%2C%0A%0AI%20saw%20your%20CV%20on%20your%20website%20and%20wanted%20to%20reach%20out%20to%20you%20about%3A%0A%0A"
          className={linkClass}
        >
          jan@hecker.vc
        </Link>
        <span className="text-neutral-400 dark:text-neutral-600"> · </span>
        <Link
          href="https://www.linkedin.com/in/janhecker/"
          className={linkClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Link>
      </p>

      <Section title="Work Experience" data={work} />
      <Section title="Education" data={education} />
      <Section title="Extracurricular" data={extracurricular} />

      <section className="mt-12 break-inside-avoid">
        <h2 className="font-serif text-xl mb-5 pb-2 border-b border-neutral-200 dark:border-neutral-800">
          Skills &amp; Interests
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-x-6 gap-y-1 sm:gap-y-3">
          {skills.map(({ label, value }) => (
            <div key={label} className="contents">
              <dt className="font-semibold text-neutral-900 dark:text-neutral-100 mt-2 sm:mt-0">
                {label}
              </dt>
              <dd className="text-neutral-800 dark:text-neutral-200">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <ul className="print:hidden flex flex-col md:flex-row mt-12 space-x-0 md:space-x-4 space-y-1 md:space-y-0 text-neutral-500 dark:text-neutral-400">
        <li>
          <PrintButton />
        </li>
        <li>
          <Link
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/janhecker/"
          >
            <ArrowIcon />
            <p className="h-7">Connect on LinkedIn</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}
