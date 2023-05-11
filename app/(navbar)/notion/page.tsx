import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowIcon } from "components/icons";

export const metadata: Metadata = {
  title: "Notion",
  description: "I am offering a variety of Notion services.",
};

export default function NotionPage() {
  return (
    <section>
      <h1 className="cursor-notion font-bold text-3xl font-serif">
        My Notion Services
      </h1>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
        <p>
          I am offering a variety of Notion services. I am using Notion for over
          3 years, built my own startup using Notion, published a few{" "}
          <Link
            href="https://www.notion.so/templates/subscription-management-2"
            style={{ fontWeight: "normal" }}
          >
            templates
          </Link>
          , deployed the{" "}
          <Link href="https://getvamos.app" style={{ fontWeight: "normal" }}>
            vamos! website
          </Link>{" "}
          out of a Notion page and hold the{" "}
          <Link
            href="https://www.credly.com/badges/60c570b9-3b2e-4325-8dbe-b549a811f770/public_url"
            style={{ fontWeight: "normal" }}
          >
            Notion Essentials Badge certificate
          </Link>{" "}
          since December 2022. My services include:
        </p>
        <ul>
          <li>1:1 Consulting Hour</li>
          <li>Deployment of your Notion page to a website</li>
          <li>Custom templates, processes and structures for your team</li>
          <li>Set up your Notion workspace with permissions &amp; co</li>
        </ul>
      </div>
      <div className="flex items-center md:items-center flex-row md:flex-row">
        <div className="md:mt-0 mr-0 md:mr-6 space-y-2 text-neutral-500 dark:text-neutral-400">
          <Link
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.fiverr.com/janhecker29"
          >
            <ArrowIcon />
            <p className="h-7">Commission me on Fiverr</p>
          </Link>
          <Link
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:jan@hecker.vc?subject=Notion%20Services&body=Hi%20Jan%2C%0A%0AI%20came%20across%20your%20website%20and%20saw%20that%20you%20offer%20services%20and%20consulting%20in%20Notion.%0A%0AHere's%20what%20I'm%20interested%20in%3A%0A%0ABest%20regards"
          >
            <ArrowIcon />
            <p className="h-7">Write me an email</p>
          </Link>
        </div>
        <Image
          alt="Notion Avatar"
          src="/images/notion-avatar.svg"
          width={150}
          height={150}
          priority
        />
      </div>
    </section>
  );
}
