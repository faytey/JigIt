import { useState } from "react";
import { useJigitContext } from "@/app/context";
import { Button } from "../button";

function ConnectButton() {
  const { connection, connectWallet, disconnectWallet } = useJigitContext();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAction = () => {
    if (connection) {
      disconnectWallet();
    } else {
      connectWallet();
    }
    setModalOpen(false);
  };

  return (
    <section>
      <Button 
        text={connection ? "Disconnect" : "Connect Wallet"} 
        onClick={() => setModalOpen(true)} 
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              {connection ? "Disconnect Wallet" : "Connect Wallet"}
            </h2>
            <p className="mb-4">
              {connection
                ? "Are you sure you want to disconnect your wallet?"
                : "Would you like to connect your wallet?"}
            </p>
            <div className="flex justify-center gap-4">
              <Button text="Cancel" onClick={() => setModalOpen(false)} />
              <Button text={connection ? "Disconnect" : "Connect"} onClick={handleAction} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ConnectButton;
