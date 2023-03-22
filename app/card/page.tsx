import Image from "next/image";
import type { Metadata } from "next";
import jan from "./jan.json";
// import avatar from "../../app/jan.png";
import avatar from "app/(navbar)/jan.png";

export const metadata: Metadata = {
  description: "Online Business Card",
};

export default function CardPage() {
  return (
    <section>
      <Image
        title={jan.name}
        alt={jan.name}
        className="rounded-full grayscale"
        src={avatar}
        placeholder="blur"
        width={100}
        priority
      />
      <h1 className="font-bold text-3xl font-serif mt-8 mb-2">Jan Hecker</h1>
      <p>{jan.bio}</p>
    </section>
  );
}
