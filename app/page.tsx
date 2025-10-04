import Image from "next/image";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col p-6">
        <p className={`text-[30px] font-bold`}>Welcome to Royale Stats! Get started by search for a player or clan</p>
      </div>
    </>
  );
}
