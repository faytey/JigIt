"use client";
import Navbar from "@/app/components/navbar";
// @ts-ignore
import * as headbreaker from "headbreaker";
import Image from "next/image";
import Link from "next/link";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import featuredTypeImage from "@/assets/images/featuredTypeImage.svg";
import customTypeImage from "@/assets/images/customTypeImage.svg";

const PuzzleTypeContainer = ({
  title,
  subtitle,
  urlLink = "",
  image,
}: {
  title: string;
  subtitle: string;
  urlLink?: string | undefined;
  image?: any;
}) => {
  return (
    <Link href={urlLink}>
      <div className="group flex flex-col gap-y-4 bg-white border shadow-sm hover:shadow-lg rounded-xl p-4 md:p-5 dar:bg-neutral-900 dar:border-neutral-700 dar:shadow-neutral-700/70 transition">
        <h3 className="text-2xl font-bold text-gray-800 dar:text-white">
          {title || "Featured Puzzle"}
        </h3>
        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-neutral-500">
          {subtitle || "Card subtitle"}
        </p>
        {/* <p className="mt-2 text-gray-500 dar:text-neutral-400">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p> */}
        <div className="w-[440px] h-80 mx-auto my-4">
          <Image
            src={image}
            alt="container-image"
            className="group-hover:scale-90 transition block h-full mx-auto"
          />
        </div>
        <Link
          className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dar:text-blue-500 dar:hover:text-blue-600 dar:focus:text-blue-600"
          href={urlLink}
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </Link>
      </div>
    </Link>
  );
};

export default function Page() {
  const [pieceSize, setPieceSize] = useState(100);
  const [width, setWidth] = useState(1600);
  const [height, setHeight] = useState(960);

  function handleClick(
    f: Dispatch<SetStateAction<number>>
  ): ChangeEventHandler<HTMLInputElement> {
    return (e) => f(Number(e.target.value));
  }

  return (
    <>
      <main className="">
        <div className="flex flex-row justify-center items-center mt-20 mb-12">
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-bold rounded-full border border-transparent bg-yellow-400 text-black hover:bg-yellow-400/80 focus:outline-none focus:bg-yellow-400 disabled:opacity-50 disabled:pointer-events-none"
          >
            Choose type
          </button>
        </div>

        <section className="max-w-5xl mx-auto flex flex-row justify-between gap-x-8">
          <PuzzleTypeContainer
            title="Featured Puzzle"
            subtitle="Play the puzzle using our generated images"
            urlLink="game/levels"
            image={featuredTypeImage}
          />

          <PuzzleTypeContainer
            title="Customize Your Puzzle"
            subtitle="Play the puzzle using your uploaded images"
            image={customTypeImage}
          />
        </section>
      </main>
    </>
  );
}
