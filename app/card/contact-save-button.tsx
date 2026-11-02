"use client";

import { useEffect, useRef } from "react";
import { ArrowIcon } from "components/icons";
import Link from "next/link";
import contact from "./contact.json";

type VcardModule = typeof import("./vcard");

function downloadContactVcf({ createContactVcf }: VcardModule) {
  const file = createContactVcf();
  const url = URL.createObjectURL(file);

  const a = document.createElement("a");
  a.style.display = "none";
  a.download = `${contact.firstName} ${contact.lastName}.vcf`;
  a.href = url;
  console.log(url);
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

export function ContactSaveButton() {
  const vcard = useRef<VcardModule | null>(null);

  // Fetch the vCard module after hydration, so the click can build
  // and download the file synchronously (iOS drops downloads that lose
  // the tap's user activation across an await).
  useEffect(() => {
    import("./vcard").then((mod) => {
      vcard.current = mod;
    });
  }, []);

  const handleClick = () => {
    if (vcard.current) {
      downloadContactVcf(vcard.current);
    } else {
      import("./vcard").then(downloadContactVcf);
    }
  };

  return (
    <Link
      className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all text-neutral-500 dark:text-neutral-400 mt-2"
      href="/card"
      scroll={false}
      onClick={handleClick}
    >
      <ArrowIcon />
      <p className="h-7">Save in Contacts</p>
    </Link>
  );
}
