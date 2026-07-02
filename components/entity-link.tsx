import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

type EntityLinkProps = {
  /* Path under /public, e.g. "/logos/aniva.png" */
  logo: string;
  /* "circle" for people, "rounded" for company marks */
  shape?: "circle" | "rounded";
  /* Without href it renders a plain span: same hover reveal, not a link */
  href?: ComponentProps<typeof Link>["href"];
} & Omit<ComponentProps<typeof Link>, "href">;

/* Inline link that reveals the entity's logo/avatar on hover or keyboard
   focus (transitions.dev card-resize, inline variant — pure CSS). */
export default function EntityLink({
  logo,
  shape = "rounded",
  children,
  className,
  href,
  ...linkProps
}: EntityLinkProps) {
  const entityClassName = className ? `t-entity ${className}` : "t-entity";
  const logoSlot = (
    <span
      className={`t-entity-logo${shape === "circle" ? " is-circle" : ""}`}
      aria-hidden="true"
    >
      {/* eager: lazy images inside the width-0 slot never load until first
          hover, so the reveal runs before the logo has arrived */}
      <Image
        src={logo}
        alt=""
        width={64}
        height={64}
        loading="eager"
        draggable={false}
      />
    </span>
  );

  if (!href) {
    return (
      <span className={entityClassName}>
        {logoSlot}
        {children}
      </span>
    );
  }

  const external = typeof href === "string" && href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      {...linkProps}
      className={entityClassName}
    >
      {logoSlot}
      {children}
    </Link>
  );
}
