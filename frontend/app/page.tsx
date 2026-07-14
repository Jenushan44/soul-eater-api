"use client"
import { useEffect, useState } from 'react';
import Image from "next/image";
import EndpointCard from "./components/EndpointCard"
import Navbar from "./components/Navbar"
import { Skull, Swords, Flame, MoonStar, BrickWallShield, MoveRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { characterExamples, weaponExamples, abilityExamples, organizationExamples, arcExamples, } from "./data/apiExamples";

type Character = {
  id: number;
  name: string;
  role: string;
  affiliation: string;
  description: string;
  image_url: string;
};

export default function Home() {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/characters")
      .then((result) => result.json())
      .then((data) => {
        const randomizedCharacters = [...data].sort(() => Math.random() - 0.5);
        setCharacters(randomizedCharacters);
      });
  }, []);

  return (
    <div className="bg-black">
      <Navbar />
      <div className="w-full relative">
        <Image src="/Soul-Eater-Medusa-Banner.png" alt="Banner" width={1200} height={400} className="w-full h-auto relative" priority></Image>
        <div className="absolute 2xl:top-[45%] xl:top-[38%] sm:top-[40%] md:top-[35%] left-[2%]">
          <p className="font-semibold text-[#f89c0a] text-[15px] md:text-[20px] lg:text-[30px] 2xl:text-[40px]">WELCOME TO THE</p>
          <p className="font-banner text-[60px] md:text-[80px] lg:text-[150px] 2xl:text-[200px] leading-[0.8] mt-3">SOUL EATER</p>
          <p className="font-banner text-[60px] md:text-[80px] lg:text-[150px] 2xl:text-[200px] leading-[0.8] text-[#f89c0a] mt-2 mb-2">DATABASE</p>
          <p className="font-semibold mb-5 max-w-[500px] text-[15px] md:text-[18px] lg:text-[20px] 2xl:text-[23px]">Explore the world of Soul Eater. Characters, Weapons, Abilities, Organizations and Arcs.</p>
          <div className="flex gap-3 md:gap-8">
            <button className="font-semibold cursor-pointer text-black p-3 2xl:p-8 2xl:text-[20px] border-2 border-black rounded-sm bg-[#f89c0a] hover:bg-black hover:border-[#f89c0a] hover:text-[#f89c0a]">EXPLORE DATABASE</button>
            <button className="font-semibold cursor-pointer text-[#f89c0a] p-3 2xl:p-8 2xl:text-[20px] border border-[#f89c0a] rounded-sm hover:bg-[#f89c0a] hover:border-black hover:text-black">LEARN MORE</button>
          </div>
        </div>

      </div>

      <div className="h-40 xl:h-50 border rounded-lg border-zinc-800 border-3 flex bg-black gap-2 md:gap-8 lg:gap-15 mx-5">
        <div className="flex m-auto">
          <Image className="w-30 h-auto lg:w-40 xl:w-50" src="/characters-stats-logo.png" alt="Weapon Logo" width={220} height={220}></Image>

          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">100+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">CHARACTERS</p>
          </div>
        </div>

        <div className="w-[2px] h-[60%] bg-zinc-800 my-auto" />

        <div className="flex m-auto">
          <Image className="w-30 h-auto lg:w-40 xl:w-50" src="/weapons-statistics-logo.png" alt="Weapon Logo" width={220} height={220}></Image>

          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">70+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">WEAPONS</p>
          </div>
        </div>

        <div className="w-[2px] h-[60%] bg-zinc-800 my-auto" />
        <div className="flex m-auto">
          <Flame className="w-15 h-15 lg:w-20 lg:h-20 xl:w-25 xl:h-25" fill="#f89c0a" stroke="#000000" strokeWidth={1.5} />
          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">50+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">ABILITIES</p>
          </div>
        </div>

        <div className="w-[2px] h-[60%] bg-zinc-800 my-auto" />

        <div className="flex m-auto">
          <BrickWallShield className="w-15 h-15 lg:w-20 lg:h-20 xl:w-25 xl:h-25" fill="#f89c0a" stroke="#000000" strokeWidth={1.5} />
          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">20+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">ORGANIZATIONS</p>
          </div>
        </div>

        <div className="w-[2px] h-[60%] bg-zinc-800 my-auto" />

        <div className="flex m-auto">
          <MoonStar className="w-15 h-15 lg:w-20 lg:h-20 xl:w-25 xl:h-25" fill="#f89c0a" stroke="#000000" strokeWidth={1.5} />
          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">30+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">ARCS</p>
          </div>
        </div>


      </div>

      <div className="flex items-center gap-3 h-12 ml-6 mt-10">
        <div className="w-[3px] h-[80%] bg-[#f89c0a]" />
        <div>
          <p className="text-white font-semibold text-[24px]">BROWSE THE DATABASE</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-8 mx-6 mt-10'>
        <div className="flex flex-col min-w-[400px] h-fit lg:sticky lg:top-6 bg-zinc-950/40 backdrop-blur-md p-3 border border-zinc-900 rounded-md tracking-wide">

          <p className="text-[#f89c0a] text-[18px] font-bold tracking-widest px-3 mb-3 uppercase font-sans">DATABASE SECTIONS</p>

          <a href="#character-section" className="flex items-center justify-between text-zinc-400 hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
            <div className="flex items-center gap-3">
              <Skull className="w-8 h-8 text-zinc-500 group-hover:text-[#f89c0a] transition-colors" />
              <span className='text-[17px]'>Characters</span>
            </div>
          </a>

          <a href="#weapon-section" className="flex items-center justify-between text-zinc-400 hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
            <div className="flex items-center gap-3">
              <Swords className="w-8 h-8 text-zinc-500 group-hover:text-[#f89c0a] transition-colors" />
              <span className='text-[17px]'>Weapons</span>
            </div>
          </a>

          <a href="#ability-section" className="flex items-center justify-between text-zinc-400 hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-zinc-500 group-hover:text-[#f89c0a] transition-colors" />
              <span className='text-[17px]'>Abilities</span>
            </div>
          </a>

          <a href="#organization-section" className="flex items-center justify-between text-zinc-400 hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
            <div className="flex items-center gap-3">
              <BrickWallShield className="w-8 h-8 text-zinc-500 group-hover:text-[#f89c0a] transition-colors" />
              <span className='text-[17px]'>Organizations</span>
            </div>
          </a>

          <a href="#arc-section" className="flex items-center justify-between text-zinc-400 hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
            <div className="flex items-center gap-3">
              <MoonStar className="w-8 h-8 text-zinc-500 group-hover:text-[#f89c0a] transition-colors" />
              <span className='text-[17px]'>Arcs</span>
            </div>
          </a>

        </div>

        <div className="flex-1 flex flex-col gap-16">
          <div className="mx-6 mt-10" id="character-section">
            <div className="flex items-center gap-3 mb-6">
              <div className='mx-auto'>
                <p className="text-white text-5xl font-banner">CHARACTERS</p>
                <div className="w-full h-1 bg-[#f89c0a] mx-auto" />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              {characters.slice(0, 6).map((character) => (
                <div key={character.id} className="w-64 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                  <div className="relative w-full h-64 bg-zinc-950">
                    <Image src={character.image_url || "/characters/characters-placeholder.png"} alt="Character Image" fill className="object-cover object-top" />
                  </div>

                  <div className="p-4 border-t border-zinc-800">
                    <h2 className="font-banner text-white text-2xl">{character.name}</h2>
                    <p className="text-zinc-400 text-xs font-semibold">{character.role}</p>
                    <a target="_blank" href={`http://127.0.0.1:8000/characters/${character.id}`} className="flex mt-3 text-[#f89c0a] text-xs font-bold cursor-pointer gap-2">VIEW <MoveRight className="-translate-y-1" />
                    </a>
                  </div>
                </div>
              ))}

            </div>


            <EndpointCard
              method='GET'
              path='/characters'
              description='Returns all characters.'
              parameters='No parameters'
              example={characterExamples}
            />

            <EndpointCard
              method='GET'
              path='/characters/{character_id}'
              description='Returns character by id.'
              parameters='No parameters'
              example={characterExamples[0]}
            />

            <EndpointCard
              method='GET'
              path='/characters?name=Soul'
              description='Filters characters by name.'
              parameters='No parameters'
              example={characterExamples[1]}
            />

            <EndpointCard
              method='GET'
              path='/characters?role=Meister'
              description='Filters characters by role.'
              parameters='No parameters'
              example={[characterExamples[0], characterExamples[2], characterExamples[3]]}
            />

            <EndpointCard
              method='GET'
              path='/characters?name=DWMA'
              description='Filters characters by affiliation.'
              parameters='No parameters'
              example={[characterExamples[0], characterExamples[1], characterExamples[2]]}
            />

            <EndpointCard
              method='GET'
              path='/characters?species=Human'
              description='Filters characters by species.'
              parameters='No parameters'
              example={[characterExamples[0], characterExamples[3]]}
            />

          </div>
          <div className="mx-6 mt-10" id="weapon-section">
            <p className="text-white text-5xl font-banner">Weapons</p>
            <div className="w-full h-1 bg-[#f89c0a] mx-auto" />



            <EndpointCard
              method='GET'
              path='/weapons'
              description='Returns a list of all weapons'
              parameters='No parameters'
              example={abilityExamples}
            />

            <EndpointCard
              method='GET'
              path='/abilities/{id}'
              description='Returns a specific weapon by ID'
              parameters='No parameters'
              example={abilityExamples[0]}
            />

            <EndpointCard
              method='GET'
              path='/abilities?name=Black Blood Manipulation'
              description='Returns weapons matching the provided name'
              parameters='No parameters'
              example={abilityExamples[3]}
            />

            <EndpointCard
              method='GET'
              path='/abilities?ability_type=Offensive'
              description='Returns weapons filtered by weapon type'
              parameters='No parameters'
              example={[abilityExamples[2], abilityExamples[3]]}
            />

            <EndpointCard
              method='GET'
              path='/abilities?user=Franken'
              description='Returns weapons filtered by weapon category'
              parameters='No parameters'
              example={[abilityExamples[0], abilityExamples[2]]}
            />

            <EndpointCard
              method='GET'
              path='/abilities?ability_type=Offensive'
              description='Returns weapons used by a specific meister'
              parameters='No parameters'
              example={[abilityExamples[2], abilityExamples[3]]}
            />

            <EndpointCard
              method='GET'
              path='/abilities?user=Franken'
              description='Returns weapons filtered by affiliation'
              parameters='No parameters'
              example={[abilityExamples[0], abilityExamples[2]]}
            />
          </div>

          <div className="mx-6 mt-10" id="ability-section">
            <p className="text-white text-5xl font-banner">Abilities</p>
            <div className="w-full h-1 bg-[#f89c0a] mx-auto" />

            <EndpointCard
              method='GET'
              path='/abilities'
              description='Returns a list of all abilities'
              parameters='No parameters'
              example={abilityExamples}
            />

            <EndpointCard
              method='GET'
              path='/abilities/{id}'
              description='Returns a specific ability by ID'
              parameters='No parameters'
              example={abilityExamples[0]}
            />

            <EndpointCard
              method='GET'
              path='/abilities?name=Black Blood Manipulation'
              description='Returns abilities matching the provided name'
              parameters='No parameters'
              example={abilityExamples[3]}
            />

            <EndpointCard
              method='GET'
              path='/abilities?ability_type=Offensive'
              description='Returns abilities filtered by ability type'
              parameters='No parameters'
              example={[abilityExamples[2], abilityExamples[3]]}
            />

            <EndpointCard
              method='GET'
              path='/abilities?user=Franken'
              description='Returns abilities used by a specific character'
              parameters='No parameters'
              example={[abilityExamples[0], abilityExamples[2]]}
            />
          </div >




          <div className="h-[1000px]" id="organization-section">
            <p className="text-white text-5xl font-banner">Organizations</p>
            <div className="w-full h-1 bg-[#f89c0a] mx-auto" />
          </div>
          <div className="h-[1000px]" id="arc-section">
            <p className="text-white text-5xl font-banner">Arcs</p>
            <div className="w-full h-1 bg-[#f89c0a] mx-auto" />

          </div>

        </div>
      </div>




    </div>
  );
}