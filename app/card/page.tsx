import Image from "next/image";
import type { Metadata } from "next";
import {
  GitHubIcon,
  YouTubeIcon,
  LinkedInIcon,
  ArrowIcon,
  EmailIcon,
  PhoneIcon,
  LinkIcon,
  PostBoxIcon,
} from "components/icons";
import contact from "./contact.json";
import avatar from "app/(navbar)/jan.png";
import Link from "next/link";
import { BackgroundMusic } from "components/music";

export const metadata: Metadata = {
  description: "Online Business Card",
};

export default function CardPage() {
  return (
    <>
      <BackgroundMusic />
      <section className="pl-2 pr-44">
        <Image
          title={contact.name}
          alt={contact.name}
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="items-center rounded-lg shadow-lg hover:shadow-xl overflow-hidden p-4 mt-4">
          <div className="flex flex-col gap-1">
            <div className="border-dashed border-l-2 pl-4">
              <h1 className="font-bold text-2xl font-serif">Jan Hecker</h1>
              <p>{contact.bio}</p>
            </div>
            <Link
              className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all text-neutral-500 dark:text-neutral-400 mt-2"
              rel="noopener noreferrer"
              target="_blank"
              href="#"
            >
              <ArrowIcon />
              <p className="h-7">Store to Contacts</p>
            </Link>
          </div>
        </div>

        <div className="items-center rounded-lg shadow-lg hover:shadow-2xl overflow-hidden p-4 mt-4">
          <h2 className="font-bold text-2xl font-serif mb-2">
            Contact Details
          </h2>
          <div className="flex flex-col gap-2">
            <Link
              className="flex items-center gap-3 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all text-neutral-500 dark:text-neutral-400"
              rel="noopener noreferrer"
              target="_blank"
              href={"mailto:" + contact.email}
            >
              <EmailIcon />
              <p className="h-7">{contact.email}</p>
            </Link>
            <Link
              className="flex items-center gap-3 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all text-neutral-500 dark:text-neutral-400"
              rel="noopener noreferrer"
              target="_blank"
              href={"tel:" + contact.phone}
            >
              <PhoneIcon />
              <p className="h-7">{contact.phone}</p>
            </Link>
            <Link
              className="flex items-center gap-3 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all text-neutral-500 dark:text-neutral-400"
              rel="noopener noreferrer"
              target="_blank"
              href={contact.website}
            >
              <LinkIcon />
              <p className="h-7">
                {contact.website.replace(/(^\w+:|^)\/\//, "")}
              </p>
            </Link>
            <p className="flex items-center gap-3">
              <PostBoxIcon />
              {contact.address.name}
              <br />
              {contact.address.street}
              <br />
              {contact.address.country === "Germany"
                ? `D-${contact.address.zip} ${contact.address.city}`
                : `${contact.address.zip} ${contact.address.city}`}
              <br />
            </p>
          </div>
        </div>

        <h2 className="font-bold text-2xl font-serif mt-6 mb-2">Links</h2>
        <div className="flex flex-col gap-3">
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/hecker"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <GitHubIcon />
              <div className="ml-3">GitHub</div>
            </div>
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.youtube.com/@janhecker29"
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <YouTubeIcon />
              <div className="ml-3">YouTube</div>
            </div>
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={contact.socials.linkedin}
            className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
          >
            <div className="flex items-center">
              <LinkedInIcon />
              <div className="ml-3">LinkedIn</div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
