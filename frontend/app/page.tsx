"use client";
// @ts-ignore
import homeBg from "@/assets/images/homeBg.svg";
import Image from "next/image";

import { WalletProvider } from "./context";
import StartGameButton from "@/app/components/StartGameButton";

export default function Home() {
  return (
    <>
      <main className="">
        <div className="fixed inset-0 z-[-1] bg-black">
          <Image
            src={homeBg}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="absolute bottom-40 left-0 right-0 flex flex-row items-center justify-center">
          <StartGameButton />
        </div>
      </main>
    </>
  );
}
