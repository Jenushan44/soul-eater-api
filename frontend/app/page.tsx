import Image from "next/image";
import Navbar from "./components/Navbar"

export default function Home() {
  return (

    <div>
      <Navbar />
      <div className="w-full relative">
        <Image src="/Soul-Eater-Medusa-Banner.png" alt="Banner" width={1200} height={400} className="w-full h-auto relative" priority></Image>
        <p className="absolute top-[16%] left-[2%] font-semibold text-[#b9b761]">WELCOME TO THE</p>
        <p className="absolute top-[16%] left-[1.5%] font-bold text-[100px]">SOUL EATER</p>
        <p className="absolute top-[26%] left-[1.5%] font-bold text-[100px]">DATABASE</p>
        <p className="absolute top-[40%] left-[2%] font-semibold">Explore the world of Soul Eater. Characters, Weapons, Abilities, Organizations and Arcs.</p>
        <button className="absolute top-[44%] left-[2%] font-semibold cursor-pointer">Explore Database</button>
        <button className="absolute top-[44%] left-[14%] font-semibold cursor-pointer">LEARN MORE</button>
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
