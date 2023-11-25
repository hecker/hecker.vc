import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kit",
  description: "Here's what tools and tech I'm currently using.",
};

export default function KitPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">Tech &amp; Tools Kit</h1>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
        <p>
          Here's what tools and tech I'm currently using. All links are referral
          links, with which you can support me for free.
        </p>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <h3 id="software">Software</h3>
        <ul>
          <li>
            <a href="https://notion.grsm.io/xx5n064t2ldu">Notion</a>, docs,
            notes &amp; projects
          </li>
          <li>
            <a href="https://qonto.com/r/m9ohxm">Qonto</a>, business bank
          </li>
          <li>
            <a href="https://revolut.com/referral/jancled9gq!MAR1-23-AR">
              Revolut
            </a>
            , personal bank
          </li>
          <li>
            <a href="https://de.scalable.capital/einladung/bvstpp">
              Scalable Capital
            </a>
            , neo broker
          </li>
          <li>
            <a href="https://bit.ly/3QQJ1he">Flink</a>, delivery service
          </li>
          <li>
            <a href="https://neotaste.app/invite/JanHecker1">NeoTaste</a>,
            restaurant deals
          </li>
          <li>
            <a href="https://urbansportsclub.com/join-as-friend/JH13678">
              Urban Sports Club
            </a>
            , sports &amp; spa
          </li>
          <li>
            <a href="https://apps.apple.com/redeem?ctx=offercodes&id=320606217&code=DREAMX3">
              Sleep Cycle
            </a>
            , sleep tracking
          </li>
          <li>
            <a href="https://shared.jodel.com/3rxqoI9ixzb">Jodel</a>, what's
            going on around me
          </li>
          <li>
            <a href="https://arc.net/gift/ff1dc0de">Arc</a>, browser
          </li>
          <li>
            <a href="https://superhuman.com/refer/3c8uwohx">Superhuman</a>,
            emails
          </li>
          <li>
            <a href="https://zeeg.me/">Zeeg</a>, scheduling{" "}
            <span className="text-gray-400">(use code "hecker")</span>
          </li>
          <li>Things 3, todos</li>
          <li>Amie, calendar</li>
          <li>VS Code, programming</li>
          <li>Figma, designing</li>
          <li>Raycast, macOS Spotlight alternative</li>
          <li>Spotify, music</li>
          <li>Artifact, news</li>
        </ul>
        <h3 id="hardware">Hardware</h3>
        <ul>
          <li>14&quot; Macbook Pro (2020)</li>
          <li>Logitech MX Master 3 Mouse &amp; Keyboard</li>
        </ul>
      </div>
    </section>
  );
}
