import Image from "next/image";
import Link from "next/link";
import ViewCounter from "@/components/view-counter";
import { Suspense } from "react";
import ExpandingArrow from "@/components/expanding-arrow";
import ChatBox from "@/components/chatbox";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    
      <main className="min-h-screen bg-gray-950">
        <ChatBox />
      </main>
   
  );
}
