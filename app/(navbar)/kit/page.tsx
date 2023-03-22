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
        <h3 id="hardware">Hardware</h3>
        <ul>
          <li>14&quot; Macbook Pro (2020)</li>
          <li>Logitech MX Master 3 Mouse &amp; Keyboard</li>
        </ul>
        <h3 id="software">Software</h3>
        <ul>
          <li>
            <a href="https://notion.grsm.io/xx5n064t2ldu">Notion</a>, all-in-one
            workspace
          </li>
          <li>
            <a href="https://qonto.com/r/m9ohxm">Qonto</a>, business bank
          </li>
          <li>
            <a href="https://revolut.com/referral/jancled9gq!MAR1-23-AR">
              Revolut
            </a>
            , private bank
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
            <a href="https://neotaste.app/invite/Jan22">NeoTaste</a>, restaurant
            recommendations &amp; deals
          </li>
          <li>
            <a href="https://urbansportsclub.com/join-as-friend/JH13678">
              Urban Sports Club
            </a>
            , sports &amp; spa
          </li>
          <li>Things 3, todos</li>
          <li>Amie, calendar</li>
          <li>Superhuman, emails</li>
          <li>VS Code, programming</li>
          <li>Figma, designing</li>
          <li>Raycast, macOS Spotlight alternative</li>
          <li>Spotify, music</li>
          <li>vamos!, find events &amp; activities</li>
        </ul>
      </div>
    </section>
  );
}
