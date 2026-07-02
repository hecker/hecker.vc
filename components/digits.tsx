"use client";

import { useEffect, useRef } from "react";

// False only while the post-hydration effect pass is running. Digits mounted
// later (client-side navigations, streamed Suspense content) see true.
let hydrationPassDone = false;

// transitions.dev number pop-in (02), gated: animates only when the value
// first appears (nothing seen before, e.g. after a loading skeleton) or when
// it differs from the value last shown in this browser. An unchanged,
// instantly-served number renders without motion.
export default function Digits({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  const groupRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isHydration = !hydrationPassDone;
    if (isHydration) {
      // All effects of the hydration commit run before this fires, so
      // sibling Digits in the same pass all see isHydration = true.
      setTimeout(() => {
        hydrationPassDone = true;
      }, 0);
    }

    const key = `t-digits:${name}`;
    let last: string | null = null;
    try {
      last = localStorage.getItem(key);
      if (last === value) return;
      localStorage.setItem(key, value);
    } catch {
      // Storage unavailable → treat as first sight and animate.
    }

    // On the initial HTML the number is already visible before JS runs; on
    // a slow connection hydration can land seconds after paint, and
    // replaying the pop-in on a long-visible number reads as a glitch.
    // (Streamed and client-navigation mounts appear with their animation,
    // so they are exempt.)
    if (isHydration && performance.now() > 3000) return;

    const el = groupRef.current;
    if (!el) return;
    // Replay per the skill: remove the class, force a reflow, re-add.
    el.classList.remove("is-animating");
    void el.offsetHeight;
    el.classList.add("is-animating");
  }, [name, value]);

  const chars = value.split("");
  return (
    <span ref={groupRef} className="t-digit-group">
      {chars.map((char, i) => (
        <span
          key={i}
          className="t-digit"
          data-stagger={
            i === chars.length - 2
              ? "1"
              : i === chars.length - 1
                ? "2"
                : undefined
          }
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
