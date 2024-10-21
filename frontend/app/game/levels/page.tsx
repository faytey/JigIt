import Image from "next/image";
import lockIcon from "@/assets/icons/lock.svg";
import Link from "next/link";

function GameLevels() {
  return (
    <section>
      <div className="flex flex-row justify-center items-center mt-20 mb-12">
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-bold rounded-full border border-transparent bg-yellow-400 text-black hover:bg-yellow-400/80 focus:outline-none focus:bg-yellow-400 disabled:opacity-50 disabled:pointer-events-none"
        >
          Levels
        </button>
      </div>
      <section className="max-w-5xl mx-auto flex flex-row justify-start flex-wrap gap-8">
        {Array.from({ length: 10 }).map((eachLevel, index) => (
          <Link key={index} href={"/game/play"}>
            <div className="relative min-w-24 w-24 h-24 leading-[96px] rounded-md bg-black text-white text-center font-bold text-2xl shadow-yellow-400 shadow-[-10px_-10px_0px_-1px_yellow]">
              {index + 1}
              {index > 0 && (
                <Image
                  src={lockIcon}
                  width={12}
                  height={12}
                  alt="Lock icon"
                  className="absolute bottom-2 right-2"
                />
              )}
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
}

export default GameLevels;
