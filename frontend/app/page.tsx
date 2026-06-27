import Image from "next/image";
import Navbar from "./components/Navbar"

export default function Home() {
  return (

    <div>
      <Navbar />
      <div className="w-full relative">
        <Image src="/Soul-Eater-Banner.png" alt="Banner" width={1200} height={400} className="w-full h-auto relative" priority></Image>
        <p className="absolute top-[15%] left-[10%]">Welcome to the Soul Eater API</p>
      </div>

      <div className="h-[1000px]" id="character-section">
        <h1 className="text-black">Characters</h1>
      </div>
      <div className="h-[1000px]" id="weapon-section">
        <h1 className="text-black">Weapons</h1>
      </div >
      <div className="h-[1000px]" id="ability-section">
        <h1 className="text-black">Abilities</h1>
      </div>
      <div className="h-[1000px]" id="organization-section">
        <h1 className="text-black">Oraganizations</h1>
      </div>
      <div className="h-[1000px]" id="arc-section">
        <h1 className="text-black">Arcs</h1>
      </div>
    </div >
  );
}
