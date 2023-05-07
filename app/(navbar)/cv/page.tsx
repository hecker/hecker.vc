import type { Metadata } from "next";
import { ArrowIcon } from "components/icons";
import Link from "next/link";
import CV_DATA from "./cv-data.json";

export const metadata: Metadata = {
  title: "CV",
  description: "It all began in 2000...",
};

function parseHighlightText(highlight: string) {
  return highlight.split(/({.*?})/).map((part, index) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      const [text, link] = part.slice(1, -1).split(",");
      return (
        <Link
          key={index}
          className="font-normal"
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

function Section({ title, data }: { title: string; data: any[] }) {
  return (
    <>
      <b className="text-xl">{title}</b>
      <hr className="space-y-0" style={{ margin: "0em", borderWidth: "1px" }} />
      {data.map((item: any, index: number) => (
        <div key={index} style={{ marginBottom: "0.5rem" }}>
          <div
            className="justify-between"
            style={{ marginTop: "0rem", marginBottom: "0rem" }}
          >
            <b className="md:grid md:grid-cols-[4fr_1fr]">
              <span className="whitespace-pre-wrap">{item.organization}</span>
              <span className="hidden md:block text-right">
                {item.location}
              </span>
            </b>
            <p
              className="md:hidden"
              style={{ marginTop: "0rem", marginBottom: "0rem" }}
            >
              {item.date} in {item.location}
            </p>
            <p
              className="md:grid md:grid-cols-[4fr_1fr]"
              style={{ marginTop: "0rem", marginBottom: "0rem" }}
            >
              <i className="whitespace-pre-wrap">{item.position}</i>
              <span className="hidden md:block text-right">{item.date}</span>
            </p>
          </div>
          {item.highlights && (
            <ul
              className="list-disc hover:list-decimal m-0"
              style={{ paddingLeft: "1.2em" }}
            >
              {item.highlights.map((highlight: string, index: number) => (
                <li
                  key={index}
                  className="whitespace-pre-wrap"
                  style={{ marginTop: "0rem", marginBottom: "0rem" }}
                >
                  {parseHighlightText(highlight)}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <div style={{ height: "1rem" }} />
    </>
  );
}

export default function CVPage() {
  const { education, work, extracurricular } = CV_DATA;
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">Jan Hecker</h1>
      <div
        className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200"
        style={{ lineHeight: "1.4", whiteSpace: "nowrap" }}
      >
        <p>
          Kalkarer Str. 47b, 47574 Goch, Germany <br></br>
          Mobile:{" "}
          <Link href={"tel:+4915792354107"} className="font-normal">
            +49 157 92354107
          </Link>{" "}
          | E-Mail:{" "}
          <Link
            href={
              "mailto:jan@hecker.vc?body=Hi%20Jan%2C%0A%0AI%20saw%20your%20CV%20on%20your%20website%20and%20wanted%20to%20reach%20out%20to%20you%20about%3A%0A%0A"
            }
            className="font-normal"
          >
            jan@hecker.vc
          </Link>
        </p>

        <Section title={"EDUCATION"} data={CV_DATA.education} />
        <Section title={"WORK EXPERIENCE"} data={CV_DATA.work} />
        <Section
          title={"EXTRACURRICULAR ENGAGEMENT"}
          data={CV_DATA.extracurricular}
        />

        <b className="text-xl">FURTHER QUALIFICATIONS</b>
        <hr
          className="space-y-0"
          style={{ margin: "0em", borderWidth: "1px" }}
        />
        <div className="grid grid-cols-[auto_1fr] gap-x-4">
          <b>Languages:</b>
          <span className="whitespace-pre-line">
            German (native speaker) | English (proficient)
          </span>
          <b>IT Skills:</b>
          <span className="whitespace-pre-line">
            Java (beginner) | Dart & Flutter (beginner) | SQL (beginner)
          </span>
          <b>Software:</b>
          <span className="whitespace-pre-line">
            Git (GitHub) | Pitch | Notion | Typeform | Tally | Facebook Business
            Manager | Personio Cloud Platform | Firebase | Analytics | BigQuery
            | Looker | Google Workspace
          </span>
          <b>Interests:</b>
          <span className="whitespace-pre-line">
            Tennis | Piano | Fitness | Inline Skating | Travelling
          </span>
          <b>Values:</b>
          <span className="whitespace-pre-line">
            Impact | Authenticity | Sincerity
          </span>
        </div>
      </div>

      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400">
        <li>
          <Link
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="CV_Hecker_Jan_Clemens_2023.pdf"
          >
            <ArrowIcon />
            <p className="h-7">Download as PDF</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}
