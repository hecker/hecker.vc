import React from "react";
import Image from "next/image";
import Script from "next/script";
import avatar from "app/(navbar)/jan.png";

export default function DatePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Image
          title="Jan Hecker"
          alt="Jan Hecker"
          className="rounded-full"
          src={avatar}
          placeholder="blur"
          width={64}
          height={64}
          priority
        />
        <div>
          <h1 className="font-bold text-2xl font-serif">Jan Hecker</h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Founder, Berlin &amp; Helsinki
          </p>
        </div>
      </div>

      <div className="prose dark:prose-invert">
        <p className="text-lg">
          Since we matched, let's skip the whole "when are you free?"
          back-and-forth and make it super simple to find a time that works for
          both of us. Just pick any slot below that fits your schedule:
        </p>
      </div>

      <div className="rounded-lg overflow-hidden -mx-2 sm:mx-0 bg-neutral-50 dark:bg-neutral-900">
        <div
          className="zeeg-inline-widget"
          id="zeeg-embed-hecker-date"
          style={{ minWidth: 320, height: 600 }}
        />
        <Script
          src="https://assets.zeeg.me/embed.min.js"
          data-user="hecker"
          data-event-type="date"
          data-background-color="ffffff"
          data-text-color="171717"
          data-primary-color="171717"
          data-hide-details="1"
          data-compact="1"
          strategy="lazyOnload"
        />
      </div>

      <div className="prose dark:prose-invert">
        <p className="text-lg">
          If you have a place in mind, I'm always happy to discover new places.
          Looking forward to meeting you in person!
        </p>
      </div>
    </div>
  );
}
