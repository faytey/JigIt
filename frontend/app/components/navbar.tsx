"use client";

import { useJigitContext } from "@/app/context";
import { shortenAddress } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import ConnectButton from "./ConnectButton";

function Navbar() {
  const { address, connection } = useJigitContext();
  console.log(connection);

  return (
    <section className="flex flex-row justify-between items-center h-24 bg-yellow-400">
      <div className="font-black text-2xl px-4">
        <Link href={"/"}>Chain Puzzle</Link>
      </div>
      <div className="px-4">
        {connection?.isConnected ? (
          <div>
            <div className="inline-block bg-black rounded-full p-4 shadow-sm">
              <p className="text-sm text-white">{shortenAddress(address)}</p>
            </div>
            <Image
              className="inline-block size-9 rounded-full"
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=Avery"
              alt="Avatar"
              width={50}
              height={50}
            />
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>
    </section>
  );
}

export default Navbar;
