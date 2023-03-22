import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Online Business Card",
};

export default function CardPage() {
  return (
    <section>
      <h1 className="cursor-notion font-bold text-3xl font-serif">
        Jan Hecker
      </h1>
    </section>
  );
}
