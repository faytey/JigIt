import { useJigitContext } from "@/app/context";
import { Button } from "../button";

function ConnectButton() {
  const { connection, connectWallet, disconnectWallet } = useJigitContext();

  return (
    <section>
      {connection ? (
        // <button
        //   type="button"
        //   className="border rounded-lg shadow-md border-black bg-white text-purple-950 py-2 px-4 mb-2"
        //   onClick={disconnectWallet}
        // >
        //   Disconnect
        // </button>
        <Button text="Disconnect" onClick={disconnectWallet} />
      ) : (
        // <button
        //   type="button"
        //   className="border rounded-lg shadow-md border-black bg-white text-purple-950 py-2 px-4 mb-2"
        //   onClick={connectWallet}
        // >
        //   Connect Wallet
        // </button>
        <Button text="Connect Wallet" onClick={connectWallet} />
      )}
    </section>
  );
}
export default ConnectButton;
