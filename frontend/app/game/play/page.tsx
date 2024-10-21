"use client";
import Navbar from "@/app/components/navbar";
// @ts-ignore
import * as headbreaker from "headbreaker";
import { default as NImage } from "next/image";
import Link from "next/link";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import gameCanvasBg from "@/assets/images/gameCanvasBg.svg";
import backButton from "@/assets/images/backButton.svg";
import reloadButton from "@/assets/images/reloadButton.svg";

const defaultImage = "https://assets.codepen.io/2574552/Mona_Lisa.jpg";

function DemoJigsaw(props: {
  id: string;
  width: number;
  height: number;
  pieceSize: number;
  horizontalPieces: number;
  verticalPieces: number;
}) {
  const puzzleRef = useRef(null);

  useEffect(() => {
    const puzzle = puzzleRef.current;
    // @ts-ignore
    // define audio source
    // let audio = new Audio("../../../../assets/audio/joinPuzzle.wav");
    let audio = new Audio(
      "https://github.com/flbulgarelli/headbreaker/blob/master/docs/static/connect.wav"
    );
    console.log(audio);
    let puzzleImage = new Image();
    puzzleImage.src = defaultImage;
    puzzleImage.onload = () => {
      const canvas = new headbreaker.Canvas(puzzle.id, {
        width: props.width,
        height: props.height,
        pieceSize: props.pieceSize,
        proximity: props.pieceSize / 5,
        borderFill: props.pieceSize / 10,
        strokeWidth: 2,
        lineSoftness: 0.18,
        painter: new headbreaker.painters.Konva(),
        image: puzzleImage,
        preventOffstageDrag: true,
        fixed: true,
      });

      canvas.adjustImagesToPuzzleHeight();
      canvas.adjustImagesToPuzzleWidth();
      canvas.autogenerate({
        horizontalPiecesCount: props.horizontalPieces,
        verticalPiecesCount: props.verticalPieces,
        // metadata: [
        //   { color: "#B83361" },
        //   { color: "#B87D32" },
        //   { color: "#A4C234" },
        //   { color: "#37AB8C" },
        // ],
      });
      canvas.shuffle(0.7);

      canvas.draw();

      canvas.onConnect((_piece, figure, _target, targetFigure) => {
        // play sound
        audio.play();

        figure.shape.stroke("yellow");
        targetFigure.shape.stroke("yellow");
        figure.shape.strokeWidth(4);
        targetFigure.shape.strokeWidth(4);
        canvas.redraw();

        setTimeout(() => {
          // restore border colors
          figure.shape.stroke("black");
          targetFigure.shape.stroke("black");
          figure.shape.strokeWidth(2);
          targetFigure.shape.strokeWidth(2);
          canvas.redraw();
        }, 200);
      });

      canvas.onDisconnect(() => {
        audio.play();
      });

      canvas.attachSolvedValidator();

      canvas.onValid(() => {
        console.log("Game Completed");
        alert("Game Completed");
        setTimeout(() => {
          // set the solved puzzle to the original image and handle other logic here.
          // document.getElementById('validated-canvas-overlay').setAttribute("class", "active");
        }, 1500);
      });
    };
  }, [
    props.height,
    props.pieceSize,
    props.width,
    props.width,
    props.horizontalPieces,
    props.verticalPieces,
  ]);

  return <div ref={puzzleRef} id={props.id} className=""></div>;
}

export default function GamePlay() {
  const [pieceSize, setPieceSize] = useState(80);
  const [width, setWidth] = useState(1600);
  const [height, setHeight] = useState(720);
  const [pieces, setPieces] = useState(6);

  function handleClick(
    f: Dispatch<SetStateAction<number>>
  ): ChangeEventHandler<HTMLInputElement> {
    return (e) => f(Number(e.target.value));
  }

  return (
    <>
      <main className="relative flex flex-col items-center px-4 py-8">
        <NImage
          src={gameCanvasBg}
          alt="game-background"
          width={100}
          height={100}
          className="absolute top-0 left-0 w-full h-full z-0"
        />
        <div className="relative flex flex-row justify-start items-center gap-x-8 w-full">
          <Link href={"/game/levels"}>
            <NImage src={backButton} alt="" width={40} height={40} />
          </Link>
          <Link href={"/"}>
            <NImage src={reloadButton} alt="" width={40} height={40} />
          </Link>
        </div>

        <div className="hidden relative self-start p-8">
          <ol className="flex items-center whitespace-nowrap">
            <li className="inline-flex items-center">
              <Link
                className="flex items-center text-sm text-white hover:text-black focus:outline-none focus:text-black dark:text-neutral-500 dark:hover:text-black dark:focus:text-black"
                href="/"
              >
                <svg
                  className="shrink-0 me-3 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Home
              </Link>
              <svg
                className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center">
              <Link
                className="flex items-center text-sm text-white hover:text-black focus:outline-none focus:text-black dark:text-neutral-500 dark:hover:text-black dark:focus:text-black"
                href="/game"
              >
                <svg
                  className="shrink-0 me-3 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                  <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"></path>
                </svg>
                Choose Game Type
                <svg
                  className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </Link>
            </li>
            <li
              className="inline-flex items-center text-sm font-semibold text-gray-300 truncate dark:text-neutral-200"
              aria-current="page"
            >
              Game
            </li>
          </ol>
        </div>
        {/* <Link href={"/game"} className="">
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-bold rounded-full border border-transparent bg-yellow-400 text-black hover:bg-yellow-400/80 focus:outline-none focus:bg-yellow-400 disabled:opacity-50 disabled:pointer-events-none"
          >
            Choose type
          </button>
        </Link> */}
        {/* <h1>Headbreaker From React</h1> */}
        <div className="absolute flex flex-row justify-start items-center gap-x-4 w-10/12">
          {/* <label htmlFor="piece-size">Piece Size</label>{" "}
          <input
            id="piece-size"
            type="number"
            value={pieceSize}
            onChange={handleClick(setPieceSize)}
          /> */}
          {/* <label htmlFor="weight">Width</label>{" "}
          <input
            id="weight"
            type="number"
            value={width}
            onChange={handleClick(setWidth)}
          /> */}
          {/* <label htmlFor="height">Height</label>{" "}
          <input
            id="height"
            type="number"
            value={height}
            onChange={handleClick(setHeight)}
          />
          <label htmlFor="pieces">Pieces</label>{" "}
          <input
            id="pieces"
            type="number"
            value={pieces}
            onChange={handleClick(setPieces)}
          /> */}
          <div className="hidden max-w-sm">
            <label
              htmlFor="piece-size"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Piece Size
            </label>
            <input
              type="number"
              id="piece-size"
              className="py-3 px-4 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Set Piece size"
              value={pieceSize}
              onChange={handleClick(setPieceSize)}
            />
          </div>
          <div className="hidden max-w-sm">
            <label
              htmlFor="width"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Width
            </label>
            <input
              type="number"
              id="width"
              className="py-3 px-4 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Set Width"
              value={width}
              onChange={handleClick(setWidth)}
            />
          </div>
          <div className="hidden max-w-sm">
            <label
              htmlFor="height"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Height
            </label>
            <input
              type="number"
              id="height"
              className="py-3 px-4 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Set Canvas Height"
              value={height}
              onChange={handleClick(setHeight)}
            />
          </div>
          <div className="absolute top-0 right-40 max-w-sm">
            <label
              htmlFor="pieces"
              className="block text-sm font-medium mb-2 dark:text-white"
            >
              Pieces
            </label>
            <input
              type="number"
              id="pieces"
              className="py-3 px-4 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Set Game Pieces"
              value={pieces}
              onChange={handleClick(setPieces)}
            />
          </div>
        </div>
        <div className="puzzle-preview-image absolute right-8 w-60 h-60 my-8 border-8 border-zinc-900">
          <NImage
            src={defaultImage}
            alt="Current Puzzle Preview image"
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="my-8">
          <DemoJigsaw
            id="puzzle"
            pieceSize={pieceSize}
            width={width}
            height={height}
            horizontalPieces={pieces}
            verticalPieces={pieces}
          />
        </div>
      </main>
    </>
  );
}
