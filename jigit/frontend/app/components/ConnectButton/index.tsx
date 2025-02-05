import { useState } from "react";
import { useJigitContext } from "@/app/context";
import { Button } from "../button";
import { connect } from "get-starknet";

function ConnectButton() {
  const { connection, connectWallet, disconnectWallet } = useJigitContext();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletSelect = async () => {
    try {
      setIsConnecting(true);
      await connectWallet();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <section className="relative">
      {connection ? (
        <Button 
          text="Disconnect" 
          onClick={disconnectWallet}
        />
      ) : (
        <Button 
          text={isConnecting ? "Connecting..." : "Connect Wallet"} 
          onClick={handleWalletSelect}
        />
      )}
    </section>
  );
}

export default ConnectButton;