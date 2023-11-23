import Image from "next/image";
import { Navbar } from "./components/Navbar";
import ChatRoom from "./components/Chatroom";
import Landing from "./components/Landing";

export default function Home() {
  return (
    <div className="h-screen text-black ">
      {/* <Landing /> */}
      <div className="flex h-full flex-col justify-between ">
        <ChatRoom />
      </div>
    </div>
  );
}
