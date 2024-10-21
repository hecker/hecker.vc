import Image from "next/image";
import type { Metadata } from "next";
import {
  GitHubIcon,
  YouTubeIcon,
  LinkedInIcon,
  EmailIcon,
  PhoneIcon,
  LinkIcon,
  PostBoxIcon,
  TwitchIcon,
  XIcon,
  WhatsAppIcon,
} from "components/icons";
import contact from "./contact.json";
import avatar from "app/(navbar)/jan.png";
import Link from "next/link";
import { BackgroundMusic } from "components/music";
import { ContactSaveButton } from "./contact-save-button";

export const metadata: Metadata = {
  description: "Online Business Card",
};

export default function CardPage() {
  return (
    <>
      {/* <BackgroundMusic /> */}
      <section className="pl-2 pr-2 md:pr-44">
        <Image
          title={contact.firstName + " " + contact.lastName}
          alt={contact.firstName + " " + contact.lastName}
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="items-center rounded-lg shadow-lg hover:shadow-xl overflow-hidden p-4 mt-4">
          <div className="flex flex-col items-start gap-1">
            <div className="border-dashed border-l-2 pl-4">
              <h1 className="font-bold text-2xl font-serif">Jan Hecker</h1>
              <p>
                {contact.work.role} at{" "}
                <Link href={contact.work.website}>{contact.work.company}</Link>
              </p>
            </div>
            <ContactSaveButton />
          </div>
        </div>

        <div className="items-center rounded-lg shadow-lg hover:shadow-2xl overflow-hidden p-4 mt-8">
          <h2 className="font-bold text-2xl font-serif mt-2 mb-2">
            Contact Details
          </h2>
          <div className="flex flex-col items-start gap-2">
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
        <div className="items-center rounded-lg shadow-lg hover:shadow-2xl overflow-hidden p-4 mt-8">
          <h2 className="font-bold text-2xl font-serif mt-2 mb-2">Links</h2>
          <div className="flex flex-col gap-3">
            {contact.socials.linkedin && (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={
                  "https://www.linkedin.com/in/" +
                  contact.socials.linkedin +
                  "/"
                }
                className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
              >
                <div className="flex items-center">
                  <LinkedInIcon />
                  <div className="ml-3">LinkedIn</div>
                </div>
              </Link>
            )}
            {contact.socials.github && (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={"https://github.com/" + contact.socials.github}
                className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
              >
                <div className="flex items-center">
                  <GitHubIcon />
                  <div className="ml-3">GitHub</div>
                </div>
              </Link>
            )}
            {contact.socials.whatsapp && (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={"https://wa.me/" + contact.socials.whatsapp}
                className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
              >
                <div className="flex items-center">
                  <WhatsAppIcon />
                  <div className="ml-3">WhatsApp</div>
                </div>
              </Link>
            )}
            {contact.socials.x && (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={"https://x.com/" + contact.socials.x}
                className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
              >
                <div className="flex items-center">
                  <XIcon />
                  <div className="ml-3">X</div>
                </div>
              </Link>
            )}
            {contact.socials.youtube && (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={"https://youtube.com/@" + contact.socials.youtube}
                className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
              >
                <div className="flex items-center">
                  <YouTubeIcon />
                  <div className="ml-3">YouTube</div>
                </div>
              </Link>
            )}
            {contact.socials.twitch && (
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={"https://www.twitch.tv/" + contact.socials.twitch}
                className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
              >
                <div className="flex items-center">
                  <TwitchIcon />
                  <div className="ml-3">Twitch</div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
