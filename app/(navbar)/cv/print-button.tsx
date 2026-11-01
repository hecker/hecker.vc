"use client";

import { ArrowIcon } from "components/icons";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all cursor-pointer"
    >
      <ArrowIcon />
      <span className="h-7 leading-7">Save as PDF</span>
    </button>
  );
}
