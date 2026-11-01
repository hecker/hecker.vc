import type { Metadata } from "next";
import EntityLink from "components/entity-link";

export const metadata: Metadata = {
  title: "Kit",
  description: "Hardware, tools and apps I use every day.",
};

type Item = {
  name: string;
  href: string;
  logo: string;
  note: string;
};

const hardware: Item[] = [
  {
    name: "MacBook Pro 14″ (2026)",
    href: "https://www.apple.com/macbook-pro/",
    logo: "/logos/apple.png",
    note: "M5 Pro, 18-core CPU, 20-core GPU, 64 GB unified memory, 2 TB, Space Black",
  },
  {
    name: "Mac mini",
    href: "https://www.apple.com/mac-mini/",
    logo: "/logos/apple.png",
    note: "M4, 10-core CPU, 24 GB, always-on home server for my agents",
  },
  {
    name: "Dell UltraSharp U3224KB",
    href: "https://www.dell.com/en-us/search/u3224kb",
    logo: "/logos/dell.png",
    note: "32″ 6K monitor",
  },
  {
    name: "NuPhy Air75 V3 Raycast Edition",
    href: "https://nuphy.com/products/nuphy-air75-v3-raycast-edition",
    logo: "/logos/nuphy.png",
    note: "daily driver",
  },
  {
    name: "Lofree Hyzen",
    href: "https://www.lofree.co/pages/hyzen",
    logo: "/logos/lofree.png",
    note: "the other keyboard on my desk",
  },
  {
    name: "Logitech MX Master 3",
    href: "https://www.logitech.com/products/mice/mx-master-3.html",
    logo: "/logos/logitech.png",
    note: "mouse",
  },
  {
    name: "iPhone 17 Pro",
    href: "https://www.apple.com/iphone-17-pro/",
    logo: "/logos/apple.png",
    note: "phone",
  },
  {
    name: "Apple Watch",
    href: "https://www.apple.com/watch/",
    logo: "/logos/apple.png",
    note: "workouts & sleep",
  },
];

const building: Item[] = [
  {
    name: "Claude Code",
    href: "https://claude.com/product/claude-code",
    logo: "/logos/claude.png",
    note: "programming, with way too many MCP servers",
  },
  {
    name: "Devin",
    href: "https://devin.ai",
    logo: "/logos/devin.png",
    note: "programming",
  },
  {
    name: "Linear",
    href: "https://linear.app",
    logo: "/logos/linear.png",
    note: "product & issue tracking",
  },
  {
    name: "Notion",
    href: "https://notion.grsm.io/xx5n064t2ldu",
    logo: "/logos/notion.png",
    note: "docs, notes & projects",
  },
  {
    name: "Granola",
    href: "https://join.granola.ai/t/kx3c279pvk",
    logo: "/logos/granola.png",
    note: "meeting notes",
  },
  {
    name: "Figma",
    href: "https://www.figma.com",
    logo: "/logos/figma.png",
    note: "designing",
  },
  {
    name: "Raycast",
    href: "https://www.raycast.com",
    logo: "/logos/raycast.png",
    note: "launcher, replaces Spotlight",
  },
  {
    name: "Aside",
    href: "https://aside.com/r/9H4kmzxqic",
    logo: "/logos/aside.png",
    note: "AI browser",
  },
  {
    name: "Superhuman",
    href: "https://superhuman.com/refer/3c8uwohx",
    logo: "/logos/superhuman.png",
    note: "email",
  },
  {
    name: "Zeeg",
    href: "https://zeeg.cello.so/nPKEzGJGf2r",
    logo: "/logos/zeeg.png",
    note: "scheduling",
  },
  {
    name: "Amie",
    href: "https://amie.so",
    logo: "/logos/amie.png",
    note: "calendar",
  },
  {
    name: "Things 3",
    href: "https://culturedcode.com/things/",
    logo: "/logos/things.png",
    note: "todos",
  },
  {
    name: "Rows",
    href: "https://rows.com",
    logo: "/logos/rows.png",
    note: "spreadsheets",
  },
  {
    name: "1Password",
    href: "https://1password.com",
    logo: "/logos/1password.png",
    note: "passwords",
  },
  {
    name: "Opal",
    href: "https://applink.opal.so/invite-friend?rc=9QDSV&rNme=janhecker&rId=3ebSfmeMiuh5pTwMP25FDD8OeOD3",
    logo: "/logos/opal.png",
    note: "blocks distracting apps",
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/user/eja8fqoy7qpqdm4bk7e5nt8o3",
    logo: "/logos/spotify.png",
    note: "music",
  },
];

const life: Item[] = [
  {
    name: "Revolut",
    href: "https://revolut.com/referral/jancled9gq!MAR1-23-AR",
    logo: "/logos/revolut.png",
    note: "personal banking",
  },
  {
    name: "Qonto",
    href: "https://qonto.com/r/m9ohxm",
    logo: "/logos/qonto.png",
    note: "business banking",
  },
  {
    name: "Finom",
    href: "https://app.finom.co/r/M7r3mP07",
    logo: "/logos/finom.png",
    note: "banking for my side business",
  },
  {
    name: "Scalable Capital",
    href: "https://de.scalable.capital/einladung/bvstpp",
    logo: "/logos/scalable-capital.png",
    note: "neo broker",
  },
  {
    name: "Urban Sports Club",
    href: "https://urbansportsclub.com/join-as-friend/JH68134",
    logo: "/logos/urban-sports-club.png",
    note: "sports & spa",
  },
  {
    name: "Sleep Cycle",
    href: "https://apps.apple.com/redeem?ctx=offercodes&id=320606217&code=DREAMX3",
    logo: "/logos/sleep-cycle.png",
    note: "sleep tracking",
  },
  {
    name: "Flink",
    href: "https://bit.ly/3QQJ1he",
    logo: "/logos/flink.png",
    note: "grocery delivery",
  },
  {
    name: "NeoTaste",
    href: "https://neotaste.app/invite/JanHecker1",
    logo: "/logos/neotaste.png",
    note: "restaurant deals",
  },
  {
    name: "Jodel",
    href: "https://shared.jodel.com/3rxqoI9ixzb",
    logo: "/logos/jodel.png",
    note: "local and anonymous community",
  },
];

function KitList({ title, items }: { title: string; items: Item[] }) {
  return (
    <>
      <h3 id={title.toLowerCase()}>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <EntityLink href={item.href} logo={item.logo}>
              {item.name}
            </EntityLink>
            , {item.note}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function KitPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">Tech &amp; Tools Kit</h1>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
        <p>
          The hardware and tools I use every day. Some links are referral links
          that support me at no extra cost to you.
        </p>
        <KitList title="Hardware" items={hardware} />
        <KitList title="Building" items={building} />
        <KitList title="Life" items={life} />
      </div>
    </section>
  );
}
