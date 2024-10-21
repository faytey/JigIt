import Navbar from "@/app/components/navbar";
import { WalletProvider } from "../context";

function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default GameLayout;
