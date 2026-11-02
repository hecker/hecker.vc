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

  return (
    <Link
      {...props}
      prefetch={intent ? true : "auto"}
      onMouseEnter={(e) => {
        setIntent(true);
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        setIntent(true);
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        setIntent(true);
        onTouchStart?.(e);
      }}
    />
  );
}
