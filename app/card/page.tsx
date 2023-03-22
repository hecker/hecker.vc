import Image from "next/image";
import type { Metadata } from "next";
import jan from "./jan.json";
import avatar from "../../app/jan.png";

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
      <div className="mt-8 flex justify-center">
        <div>
          <div className="line w-full h-0.5 bg-white mt-1e"></div>
          <div>
            <p>Test 123</p>
            <p>Test 123123123123123123</p>
          </div>
        </div>
      </div>
    </section>
  );
}
