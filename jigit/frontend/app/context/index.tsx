"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { connect, disconnect, StarknetWindowObject } from "get-starknet";
import { padAddress } from "@/utils";


interface WalletContextType {
  connection: StarknetWindowObject | null;
  account: string;
  address: string;
  connectWallet: () => Promise<void>;  
  disconnectWallet: () => Promise<void>;
}

// Create the context
export const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[] | null;
}) => {
  const [connection, setConnection] = useState<StarknetWindowObject | null>(null);
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const starknetConnect = async () => {
      try {
        const isDisconnected = localStorage.getItem("disconnected");

        // Prevent auto-reconnection if the user manually disconnected
        if (isDisconnected === "true") {
          console.log("User disconnected manually. Skipping auto-reconnect.");
          return;
        }

        const existingConnection = await connect({ modalMode: "neverAsk" });

        if (existingConnection && existingConnection.isConnected) {
          setConnection(existingConnection);
          setAccount(existingConnection.account);
          setAddress(existingConnection.selectedAddress);
        }
      } catch (error) {
        console.error("Error reconnecting wallet:", error);
      }
    };

    starknetConnect();
  }, []);

  console.log("address: ", address);

  const connectWallet = async () => {
    try {
      localStorage.removeItem("disconnected"); 
  
      // Let's see what wallets are available
      const available = await connect({
        modalMode: "canAsk"
      });
      
      console.log("Available wallets:", available);
  
      if (available && available.isConnected) {
        await available.enable();
        setConnection(available);
        setAccount(available.account);
        setAddress(padAddress(available.selectedAddress));
        console.log("Connected wallet type:", available.id); // This will show us which wallet was connected
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      console.log("Disconnecting wallet...");

      await disconnect(); // Clears stored wallet session

      localStorage.setItem("disconnected", "true"); // Prevent auto-reconnect

      setConnection(null);
      setAccount("");
      setAddress("");

      console.log("Wallet disconnected successfully!");

      // Redirect to the home page after disconnecting
      window.location.href = "/"; 
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <WalletContext.Provider
      value={{ connection, account, address, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useJigitContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};
