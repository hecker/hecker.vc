"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";

// <Link> already prefetches the route's App Shell when it enters the
// viewport. On intent (hover, keyboard focus, touch) upgrade to a full
// prefetch so the destination is resolved in the ~300ms before the click.
export default function PrefetchLink({
  onMouseEnter,
  onFocus,
  onTouchStart,
  ...props
}: Omit<ComponentProps<typeof Link>, "prefetch">) {
  const [intent, setIntent] = useState(false);
  const withIntent =
    <E,>(handler?: (event: E) => void) =>
    (event: E) => {
      setIntent(true);
      handler?.(event);
    };

  return (
    <Link
      {...props}
      prefetch={intent ? true : "auto"}
      onMouseEnter={withIntent(onMouseEnter)}
      onFocus={withIntent(onFocus)}
      onTouchStart={withIntent(onTouchStart)}
    />
  );
}
