"use client";

import { useState } from "react";
import { useJigitContext } from "@/app/context";
import { shortenAddress } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import ConnectButton from "./ConnectButton";

function Navbar() {
  const { address, connection, disconnectWallet } = useJigitContext();
  const [showDisconnect, setShowDisconnect] = useState(false);

  console.log(connection);

  return (
    <section className="flex flex-row justify-between items-center h-24 bg-yellow-400">
      <div className="font-black text-2xl px-4">
        <Link href={"/"}>Chain Puzzle</Link>
      </div>

      <div className="px-4 relative">
        {connection?.isConnected ? (
          <div className="flex items-center gap-4">
            {/* Address Button with Popup Toggle */}
            <button
              className="bg-black rounded-full p-4 shadow-sm text-white text-sm"
              onClick={() => setShowDisconnect((prev) => !prev)}
            >
              {shortenAddress(address)}
            </button>

            {/* Avatar */}
            <Image
              className="size-9 rounded-full"
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=Avery`}
              alt="Avatar"
              width={50}
              height={50}
              unoptimized
            />

            {/* Disconnect Popup */}
            {showDisconnect && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-3 border border-gray-300">
                <button
                  className="text-red-500 font-bold"
                  onClick={() => {
                    disconnectWallet();
                    setShowDisconnect(false);
                  }}
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>
    </section>
  );
}

export default Navbar;
