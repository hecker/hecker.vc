import type { Metadata } from "next";
import { ArrowIcon } from "components/icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CV",
  description: "It all began in 2000...",
};

export default function CVPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">Jan Clemens Hecker</h1>
      <div
        className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200"
        style={{ lineHeight: "1.4", whiteSpace: "nowrap" }}
      >
        <p>
          Kalkarer Str. 47b, 47574 Goch, Germany <br></br>
          Mobile:{" "}
          <Link href={"tel:+4915792354107"} style={{ fontWeight: "normal" }}>
            +49 157 92354107
          </Link>{" "}
          | E-Mail:{" "}
          <Link
            href={
              "mailto:jan@hecker.vc?body=Hi%20Jan%2C%0A%0AI%20saw%20your%20CV%20on%20your%20website%20and%20wanted%20to%20reach%20out%20to%20you%20about%3A%0A%0A"
            }
            style={{ fontWeight: "normal" }}
          >
            jan@hecker.vc
          </Link>
        </p>
        <b className="text-xl">EDUCATION</b>
        <hr
          className="space-y-0"
          style={{ margin: "0em", borderWidth: "1px" }}
        />

        <p className="justify-between">
          <b className="grid grid-cols-2">
            <span>University of Mannheim</span>
            <span className="text-right">Mannheim, Germany</span>
          </b>
          <p className="grid grid-cols-2" style={{ marginTop: "0rem" }}>
            <i>Bachelor in Business Informatics (Latest GPA: 2,9)</i>
            <span className="text-right">09/2020 – 08/2023</span>
          </p>
        </p>

        <p className="justify-between">
          <b className="grid grid-cols-2">
            <span>Collegium Augustinianum Gaesdonck</span>
            <span className="text-right">Goch, Germany</span>
          </b>
          <p
            className="grid grid-cols-2"
            style={{ marginTop: "0rem", marginBottom: "0rem" }}
          >
            <i>A-Levels / Abitur (Final GPA: 2.6)</i>
            <span className="text-right">08/2017 – 07/2020</span>
          </p>
          <li
            className="my-0"
            style={{ marginTop: "0rem", marginBottom: "0rem" }}
          >
            Advanced courses: Mathematics, Geography
          </li>
          <li style={{ marginTop: "0rem" }}>
            Head of the Preliminary Committee
          </li>
        </p>

        <b className="text-xl">WORK EXPERIENCE</b>
        <hr
          className="space-y-0"
          style={{ margin: "0em", borderWidth: "1px" }}
        />
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
