import Image from "next/image";
import Navbar from "./components/Navbar"

export default function Home() {
  return (

    <div>
      <Navbar />
      <div className="w-full relative">
        <Image src="/Soul-Eater-Medusa-Banner.png" alt="Banner" width={1200} height={400} className="w-full h-auto relative" priority></Image>
        <div className="absolute top-[50%] left-[2%]">
          <p className="font-semibold text-[#f89c0a]">WELCOME TO THE</p>
          <p className="font-banner text-[100px] leading-[0.8] mt-3">SOUL EATER</p>
          <p className="font-banner text-[100px] leading-[0.8] text-[#f89c0a] mt-2 mb-2">DATABASE</p>
          <p className="font-semibold mb-5">Explore the world of Soul Eater. Characters, Weapons, Abilities, Organizations and Arcs.</p>
          <div className="flex gap-8">
            <button className="font-semibold cursor-pointer text-black p-3 border-2 border-black rounded-sm bg-[#f89c0a]">EXPLORE DATABASE</button>
            <button className="font-semibold cursor-pointer text-[#f89c0a] p-3 border border-[#f89c0a] rounded-sm">LEARN MORE</button>
          </div>
        </div>

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
