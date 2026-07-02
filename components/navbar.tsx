"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { HeckerIcon } from "./icons";

const navItems: { [_: string]: any } = {
  "/": {
    name: "Home",
  },
  "/about": {
    name: "About",
  },
  "/kit": {
    name: "Kit",
  },
  "/links": {
    name: "Links",
  },
};

export default function Navbar() {
  const pathname = usePathname() || "/";
  const listRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updatePill = () => {
      const active = list.querySelector<HTMLElement>(
        `[data-path="${pathname}"]`,
      );
      if (!active) {
        setPill(null);
        return;
      }
      setPill({
        left: active.offsetLeft,
        top: active.offsetTop,
        width: active.offsetWidth,
        height: active.offsetHeight,
      });
    };

    updatePill();
    // Reposition when the layout flips between row (mobile) and column (md+)
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [pathname]);

  return (
    <aside className="md:w-[150px] md:flex-shrink-0 -mx-6 md:mx-0 md:px-0 font-serif">
      <div className="lg:sticky lg:top-20">
        <Link
          className="invisible md:visible md:w-12 w-0 ml-2 md:ml-[12px] mb-2 px-4 md:px-0 md:mb-8 flex md:flex-row items-start"
          aria-label="Jan Hecker"
          href="/"
        >
          <HeckerIcon />
        </Link>
        <nav
          className="flex overflow-hidden flex-row md:flex-col items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div
            ref={listRef}
            className="relative flex flex-row md:flex-col space-x-0 pr-10 mb-2 mt-2 md:mt-0"
          >
            {pill && (
              <div
                className="absolute bg-neutral-100 dark:bg-neutral-800 rounded-md z-[-1] transition-all duration-300 ease-out"
                style={{
                  left: pill.left,
                  top: pill.top,
                  width: pill.width,
                  height: pill.height,
                }}
              />
            )}
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname;
              return (
                <Link
                  key={path}
                  href={path}
                  className={clsx(
                    "group transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle self-start focus-visible:outline-hidden focus-visible:text-neutral-800 dark:focus-visible:text-neutral-200",
                    {
                      "text-neutral-600": !isActive,
                    },
                  )}
                >
                  <span
                    data-path={path}
                    className={clsx(
                      "relative py-[5px] px-[10px] rounded-md transition-colors group-focus-visible:bg-neutral-100 dark:group-focus-visible:bg-neutral-800",
                      // Static pill on the server-rendered HTML; the measured
                      // floating pill replaces it in the same commit it
                      // appears, so refreshes don't flicker.
                      isActive && !pill && "bg-neutral-100 dark:bg-neutral-800",
                    )}
                  >
                    {name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
