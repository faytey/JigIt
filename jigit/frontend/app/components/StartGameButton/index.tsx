import { useJigitContext } from "@/app/context";
import Link from "next/link";
import { Button } from "../button";
import ConnectButton from "../ConnectButton";

function StartGameButton() {
  const { connection } = useJigitContext();

  return (
    <>
      {connection?.isConnected ? (
        <Link href="/game">
          <Button text="Start Game" />
        </Link>
      ) : (
        <ConnectButton />
      )}
    </>
  );
}

export default StartGameButton;
