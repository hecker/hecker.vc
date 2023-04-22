import type { Metadata } from "next";
import {
  GitHubIcon,
  YouTubeIcon,
  LinkedInIcon,
  TwitchIcon,
  PolyworkIcon,
  TwitterIcon,
  SpotifyIcon,
  TikTokIcon,
  InstagramIcon,
  BeRealIcon,
  DiscordIcon,
  WhatsAppIcon,
} from "components/icons";

function Link({
  href,
  icon,
  title,
}: {
  href: string;
  icon: JSX.Element;
  title: string;
}) {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={href}
      className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
    >
      <div className="flex items-center">
        {icon}
        <div className="ml-3">{title}</div>
      </div>
    </a>
  );
}

export const metadata: Metadata = {
  title: "Socials",
  description: "All important socials from me.",
};

export default function SocialsPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">Socials</h1>
      <div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
        <p>And don't you dare not follow me on every single channel!</p>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
          <Link
            href="https://github.com/hecker"
            icon={<GitHubIcon />}
            title="GitHub"
          />
          <Link
            href="https://www.youtube.com/@janhecker29"
            icon={<YouTubeIcon />}
            title="YouTube"
          />
          <Link
            href="https://www.twitch.tv/hecker"
            icon={<TwitchIcon />}
            title="Twitch"
          />
          <Link
            href="https://www.polywork.com/hecker"
            icon={<PolyworkIcon />}
            title="Polywork"
          />
          <Link
            href="https://www.linkedin.com/in/janhecker/"
            icon={<LinkedInIcon />}
            title="LinkedIn"
          />
          <Link
            href="https://twitter.com/janhecker29"
            icon={<TwitterIcon />}
            title="Twitter"
          />
          <Link
            href="https://open.spotify.com/user/eja8fqoy7qpqdm4bk7e5nt8o3?si=43929b476d604ad4"
            icon={<SpotifyIcon />}
            title="Spotify"
          />
          <Link
            href="https://www.tiktok.com/@janhecker"
            icon={<TikTokIcon />}
            title="TikTok"
          />
          <Link
            href="https://www.instagram.com/janhecker29/"
            icon={<InstagramIcon />}
            title="Instagram"
          />
          <Link
            href="https://bere.al/janhecker"
            icon={<BeRealIcon />}
            title="BeReal"
          />
          <Link
            // Save for later: https://discordapp.com/users/220992532836777985
            href="https://discord.gg/YYuraFejJX"
            icon={<DiscordIcon />}
            title="Discord"
          />
          <Link
            href="https://chat.whatsapp.com/LhFGMUMgsylHwZF5Irfh8l"
            icon={<WhatsAppIcon />}
            title="WhatsApp"
          />
        </div>
      </div>
    </section>
  );
}
