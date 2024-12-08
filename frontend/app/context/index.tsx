"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

import { connect, disconnect, StarknetWindowObject } from "get-starknet";
import { hash, byteArray, CallData } from "starknet";
import { padAddress } from "@/utils";

console.log(
  CallData.compile(byteArray.byteArrayFromString("Mayowa")).toString(),
  typeof CallData.compile(byteArray.byteArrayFromString("Mayowa")).toString()
);

// Define types for the context
interface WalletContextType {
  connection: StarknetWindowObject | null;
  account: string;
  address: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

// Create the context with a default value of null
export const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[] | null;
}) => {
  const [connection, setConnection] = useState(null);
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const starknetConnect = async () => {
      const connection: any = await connect({
        modalMode: "neverAsk",
      });
      if (connection && connection.isConnected) {
        setConnection(connection);
        setAccount(connection.account);
        setAddress(connection.selectedAddress);
      }
    };
    starknetConnect();
  }, []);

  console.log("address: ", address);

  const connectWallet = async () => {
    const connection: any = await connect({ modalMode: "canAsk" });
    // await connection?.enable({ starknetVersion: "v4" });
    if (connection && connection.isConnected) {
      setConnection(connection);
      setAccount(connection.account);

      const cleanedAddress = padAddress(connection.selectedAddress);
      setAddress(cleanedAddress);
    }
  };

  const disconnectWallet = async () => {
    await disconnect();
    setConnection(null);
    setAccount("");
    setAddress("");
  };

  return (
    <WalletContext.Provider
      value={{ connection, account, address, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// export const useJigitContext = (): WalletContextType | null =>
//   useContext(WalletContext);

export const useJigitContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};
