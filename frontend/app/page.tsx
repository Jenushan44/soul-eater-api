"use client"
import { useEffect, useState } from 'react';
import Image from "next/image";
import EndpointCard from "./components/EndpointCard"
import Navbar from "./components/Navbar"
import { FunnelX, ChevronRight, ChevronLeft, BookOpen, School, User, Shield, Skull, Swords, Flame, MoonStar, BrickWallShield, MoveRight, Search } from 'lucide-react';
import Link from 'next/link';
import { characterExamples, weaponExamples, abilityExamples, organizationExamples, arcExamples, } from "./data/apiExamples";

type Character = {
  id: number;
  name: string;
  role: string;
  affiliation: string;
  description: string;
  image_url: string;
  species: string;
  status: string;
};

type Weapon = {
  id: number;
  name: string;
  weapon_type: string;
  weapon_category: string;
  meister: string;
  affiliation: string;
  abilities: string[];
  description: string;
  status: string;
  image_url?: string;
}

type Arc = {
  id: number;
  name: string;
  episodes: string;
  main_characters: string[];
  description: string;
  image_url?: string;
}

export default function Home() {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [arcs, setArcs] = useState<Arc[]>([]);

  const [isOpen, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [searchCharacter, setSearchCharacter] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedAffiliation, setSelectedAffiliation] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsToShow(1);
      } else if (width < 1024) {
        setCardsToShow(2);
      } else if (width < 1280) {
        setCardsToShow(2);
      } else if (width < 1536) {
        setCardsToShow(3);
      } else if (width < 1920) {
        setCardsToShow(3);
      } else {
        setCardsToShow(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showNext = () => {
    const maxStartIndex = filteredCharacters.length - cardsToShow;

    if (startIndex + cardsToShow < maxStartIndex) {
      setStartIndex(startIndex + cardsToShow);
    } else {
      setStartIndex(Math.max(0, maxStartIndex));
    }
  };

  const showPrevious = () => {
    if (startIndex - cardsToShow >= 0) {
      setStartIndex(startIndex - cardsToShow);
    } else {
      setStartIndex(0);
    }
  };

  const filteredCharacters = characters.filter((character) => {
    let lowerCharacter = character.name.toLowerCase();
    let lowerQuery = searchCharacter.toLowerCase();

    const matchesSearch = lowerCharacter.includes(lowerQuery);
    const matchesRole = selectedRole === "" || character.role.toLowerCase().includes(selectedRole.toLowerCase());
    const matchesAffiliation = selectedAffiliation === "" || character.affiliation.toLowerCase().includes(selectedAffiliation.toLowerCase());
    const matchesSpecies = selectedSpecies === "" || character.species.toLowerCase().includes(selectedSpecies.toLowerCase());
    const matchesStatus = selectedStatus === "" || character.status.toLowerCase().includes(selectedStatus.toLowerCase());

    if (matchesSearch && matchesRole && matchesAffiliation && matchesSpecies && matchesStatus) {
      return true;
    } else {
      return false;
    }
  })

  const clearFilter = () => {
    setSelectedRole("");
    setSelectedAffiliation("");
    setSelectedSpecies("");
    setSelectedStatus("");
  }



  useEffect(() => {
    fetch("http://127.0.0.1:8000/characters")
      .then((result) => result.json())
      .then((data) => {
        const randomizedCharacters = [...data].sort(() => Math.random() - 0.5);
        setCharacters(randomizedCharacters);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/weapons")
      .then((result) => result.json())
      .then((data) => {
        const randomizedWeapons = [...data].sort(() => Math.random() - 0.5);
        setWeapons(randomizedWeapons);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/arcs")
      .then((result) => result.json())
      .then((data) => {
        const randomizedArcs = [...data].sort(() => Math.random() - 0.5);
        setArcs(randomizedArcs);
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

      <div className='flex flex-col gap-16 mx-6 mt-10'>
        <div className="sticky top-0 z-50 bg-black p-3 border border-zinc-900 rounded-md tracking-wide">

          <p className="text-[#f89c0a] text-[18px] font-bold tracking-widest px-3 mb-3 uppercase font-sans">BROWSE THE SECTIONS</p>
          <div className='flex flex-col grid grid-cols-5 gap-5 w-full'>

            <div className='border border-[#f89c0a66] relative'>
              <Image className='brightness-[0.3] w-full h-50 lg:h-85 object-cover' src={"/browse-section/characters-card.png"} alt='Character Browse Section Image' width={220} height={220}></Image>
              <div className="absolute top-0 left-0 w-full h-50 lg:h-85 bg-gradient-to-b from-transparent to-zinc-950" />
              <div className="absolute inset-0 gap-3">
                <Skull className="w-18 h-18 text-[#f89c0a] group-hover:text-[#f89c0a] transition-colors absolute top-25 left-2" />
                <p className='text-[40px] absolute top-43 left-5 font-semibold font-banner'>CHARACTERS</p>
                <div className="w-[20%] ml-5 h-1 bg-[#f89c0a] mx-auto absolute top-56" />
                <div className="absolute top-60 left-5 flex flex-col gap-2">
                  <p className='text-zinc-400'>Browse all characters, meisters, weapons, witches and more.</p>
                </div>
                <div className='flex gap-1 items-center absolute top-75 left-5'>
                  <p><User className='text-[#f89c0a]' /></p>
                  <p className='font-bold'>100+</p>
                  <p>Records</p>
                </div>
              </div>
              <a href="#character-section" className="text-[#f89c0a] border-zinc-800 flex items-center justify-between font-semibold hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
                View Characters <MoveRight className="-translate-y-0" />
              </a>
            </div>

            <div className='border border-[#f89c0a66] relative'>
              <Image className='brightness-[0.3] w-full h-50 lg:h-85 object-cover' src={"/browse-section/weapons-card.png"} alt='Weapon Browse Section Image' width={220} height={220}></Image>
              <div className="absolute top-0 left-0 w-full h-50 lg:h-85 bg-gradient-to-b from-transparent to-zinc-950" />

              <div className="absolute inset-0 gap-3">
                <Swords className="w-18 h-18 text-[#f89c0a] group-hover:text-[#f89c0a] transition-colors absolute top-25 left-3" />
                <p className='text-[40px] absolute top-43 left-5 font-semibold font-banner'>Weapons</p>
                <div className="w-[20%] ml-5 h-1 bg-[#f89c0a] mx-auto absolute top-56" />
                <div className="absolute top-60 left-5">
                  <p className='text-zinc-400'>Explore every weapon, death scythe and demon weapon.</p>
                </div>
                <div className='flex gap-1 items-center absolute top-75 left-5'>
                  <p><Swords className='text-[#f89c0a]' /></p>
                  <p className='font-bold'>70+</p>
                  <p>Records</p>
                </div>
              </div>
              <a href="#weapon-section" className="text-[#f89c0a] border-zinc-800 flex items-center justify-between font-semibold hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
                View Weapons <MoveRight className="-translate-y-0" />
              </a>
            </div>

            <div className='border border-[#f89c0a66] relative'>
              <Image className='brightness-[0.3] w-full h-50 lg:h-85 object-cover' src={"/browse-section/abilities-card.png"} alt='Ability Browse Section Image' width={220} height={220}></Image>
              <div className="absolute top-0 left-0 w-full h-50 lg:h-85 bg-gradient-to-b from-transparent to-zinc-950" />
              <div className="absolute inset-0 gap-3">
                <Flame className="w-18 h-18 text-[#f89c0a] group-hover:text-[#f89c0a] transition-colors absolute top-25 left-2" />
                <p className='text-[40px] absolute top-43 left-5 font-semibold font-banner'>ABILITIES</p>
                <div className="w-[20%] ml-5 h-1 bg-[#f89c0a] mx-auto absolute top-56" />
                <div className="absolute top-60 left-5 flex flex-col gap-2">
                  <p className='text-zinc-400'>View soul wavelengths, resonances and special techniques.</p>
                </div>
                <div className='flex gap-1 items-center absolute top-75 left-5'>
                  <p><Flame className='text-[#f89c0a]' /></p>
                  <p className='font-bold'>50+</p>
                  <p>Records</p>
                </div>
              </div>
              <a href="#ability-section" className="text-[#f89c0a] border-zinc-800 flex items-center justify-between font-semibold hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
                View Abilities <MoveRight className="-translate-y-0" />
              </a>
            </div>

            <div className='border border-[#f89c0a66] relative'>
              <Image className='brightness-[0.3] w-full h-50 lg:h-85 object-cover' src={"/browse-section/organization-card.png"} alt='Ability Browse Section Image' width={220} height={220}></Image>
              <div className="absolute top-0 left-0 w-full h-50 lg:h-85 bg-gradient-to-b from-transparent to-zinc-950" />
              <div className="absolute inset-0 gap-3">
                <School className="w-18 h-18 text-[#f89c0a] group-hover:text-[#f89c0a] transition-colors absolute top-25 left-4" />
                <p className='text-[40px] absolute top-43 left-5 font-semibold font-banner'>ORGANIZATIONS</p>
                <div className="w-[20%] ml-5 h-1 bg-[#f89c0a] mx-auto absolute top-56" />
                <div className="absolute top-60 left-5 flex flex-col gap-2">
                  <p className='text-zinc-400'>View soul wavelengths, resonances and special techniques.</p>
                </div>
                <div className='flex gap-1 items-center absolute top-75 left-5'>
                  <p><Shield className='text-[#f89c0a]' /></p>
                  <p className='font-bold'>20+</p>
                  <p>Records</p>
                </div>
              </div>
              <a href="#organization-section" className="text-[#f89c0a] border-zinc-800 flex items-center justify-between font-semibold hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
                View Organizations <MoveRight className="-translate-y-0" />
              </a>
            </div>

            <div className='border border-[#f89c0a66] relative'>
              <Image className='brightness-[0.3] w-full h-50 lg:h-85 object-cover' src={"/browse-section/arcs-card.png"} alt='Ability Browse Section Image' width={220} height={220}></Image>
              <div className="absolute top-0 left-0 w-full h-50 lg:h-85 bg-gradient-to-b from-transparent to-zinc-950" />
              <div className="absolute inset-0 gap-3">
                <MoonStar className="w-18 h-18 text-[#f89c0a] group-hover:text-[#f89c0a] transition-colors absolute top-25 left-4" />
                <p className='text-[40px] absolute top-43 left-5 font-semibold font-banner'>ARCS</p>
                <div className="w-[20%] ml-5 h-1 bg-[#f89c0a] mx-auto absolute top-56" />
                <div className="absolute top-60 left-5 flex flex-col gap-2">
                  <p className='text-zinc-400'>Follow the story from the Prologue to the Final Battle.</p>
                </div>
                <div className='flex gap-1 items-center absolute top-75 left-5'>
                  <p><BookOpen className='text-[#f89c0a]' /></p>
                  <p className='font-bold'>30+</p>
                  <p>Records</p>
                </div>
              </div>
              <a href="#arc-section" className="text-[#f89c0a] border-zinc-800 flex items-center justify-between font-semibold hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
                View Arcs <MoveRight className="-translate-y-0" />
              </a>
            </div>

          </div>
        </div>
        <div className="flex-1 flex flex-col gap-16">
          <div className="mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="weapon-section">

            <div className='flex items-center justify-center gap-4 w-full'>
              <button onClick={showPrevious} className='p-2 translate-x-[40px] translate-y-[50px] z-50 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2'><ChevronLeft className='cursor-pointer' size={40} /></button>

              <div className='overflow-hidden w-[90%] py-4 -my-4 px-2 -mx-2'>

                <div className='flex'>
                  <div>
                    <p><Skull className='w-13 h-13 text-[#f89c0a]' /></p>
                    <div className="w-[80%] mt-2 h-[2px] bg-zinc-700 mx-auto" />
                  </div>
                  <div className='ml-3 mb-5'>
                    <p className="text-white text-5xl font-banner">CHARACTERS</p>
                    <p className='text-zinc-400'>Browse and explore all characters from the world of Soul Eater.</p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='flex border-zinc-800 border-2 p-1 mb-5 w-[15%] rounded-md hover:border-[#f89c0a] hover:border-1 transition duration-300 ease-in-out'>
                    <Search className='text-zinc-300 mr-2 ml-1 mt-[3px]' size={18} />
                    <input value={searchCharacter} onChange={(event) => setSearchCharacter(event.target.value)} className='w-full mt-[1px] outline-none border-none' type='text' placeholder='Search characters...' />
                  </div>
                  <div className='flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2'>
                    <p className="text-md font-semibold select-none whitespace-nowrap">Role:</p>
                    <select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)} className='p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none'>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="">All</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Meister">Meister</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer hover:bg-[#f89c0ac]' value="Demon Weapon">Demon Weapon</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Witch">Witch</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Death Scythe">Death Scythe</option>
                      <option className='bg-zinc-950 hover:bg-[#f89c0a] text-zinc-400 py-2 cursor-pointer' value="Grim Reaper">Grim Reaper</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Teacher">Teacher</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Staff">Staff</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Student">Student</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Kishin">Kishin</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Other">Other</option>
                    </select>
                  </div>
                  <div className='flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2'>
                    <p className="text-md font-semibold select-none whitespace-nowrap">Affiliation:</p>
                    <select value={selectedAffiliation} onChange={(event) => setSelectedAffiliation(event.target.value)} className='p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none'>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="">All</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="DWMA">DWMA</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Spartoi">Spartoi</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Medusa">Medusa's Faction</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Arachnophobia">Arachnophobia</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Witch">Witch Council / Witches Realm</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Noah">Noah's Faction</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Death City">Death City</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Independent">Independent</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="None">No Affiliation</option>
                    </select>
                  </div>
                  <div className='flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2'>
                    <p className="text-md font-semibold select-none whitespace-nowrap">Species:</p>
                    <select value={selectedSpecies} onChange={(event) => setSelectedSpecies(event.target.value)} className='p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none'>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="">All</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Human">Human</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Demon Weapon">Demon Weapon</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Witch">Witch</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Grim Reaper">Grim Reaper</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="God">God / Great Old One</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Monster">Monster</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Animal">Animal</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Werewolf">Werewolf</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Undead">Undead / Spirit</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Construct">Construct</option>
                    </select>
                  </div>
                  <div className='flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2'>
                    <p className="text-md font-semibold select-none whitespace-nowrap">Status:</p>
                    <select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)} className='p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none'>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="">All</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Alive">Alive</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Deceased">Deceased</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Unknown">Unknown</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Sealed">Sealed</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Undead">Undead</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Destroyed">Destroyed</option>
                      <option className='bg-zinc-950 text-zinc-400 py-2 cursor-pointer' value="Unconfirmed">Unconfirmed</option>
                    </select>
                  </div>
                  <div className='hover:text-white ml-auto'>
                    <button onClick={clearFilter} className='group text-sm flex gap-2 rounded-md p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out'><FunnelX className='group-hover:text-white text-[#f89c0a]' size={20} /> Clear Filters</button>
                  </div>
                </div>

                <div className='flex gap-6 transition-transform duration-500 ease-in-out' style={{ transform: `translateX(-${startIndex * 324}px)` }}>


                  {filteredCharacters.map((character) => (
                    <div key={character.id} className="relative w-75 shrink-0 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                      <div className="relative w-full h-60 bg-zinc-950">
                        <Image src={character.image_url || "/characters/characters-placeholder.png"} alt="Character Image" fill className="object-cover object-top" />
                      </div>
                      <div className='absolute top-0 ml-2 mt-2 px-2 border-[#f89c0a] text-[#f8b40a] text-[19px] border-1 rounded-md bg-[#f89c0a]/10'>
                        <p className='font-banner'>{character.role}</p>
                      </div>

                      <div className="p-4 border-t border-zinc-800">
                        <h2 className="font-banner text-white text-2xl">{character.name}</h2>
                        <p className="text-zinc-400 text-xs font-semibold">{character.role}</p>
                        <a target="_blank" href={`http://127.0.0.1:8000/characters/${character.id}`} className="flex justify-between mt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]">VIEW PROFILE<MoveRight className="-translate-y-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>


              </div>
              <button onClick={showNext} className='p-2 translate-x-[-30px] translate-y-[50px] rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2'><ChevronRight className='cursor-pointer' size={40} /></button>
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

            <div className="flex flex-wrap gap-6 justify-center mt-6">
              {weapons.slice(0, 6).map((weapon) => (
                <div key={weapon.id} className="w-64 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                  <div className="relative w-full h-64 bg-zinc-950">
                    <Image src={weapon.image_url || "/characters/characters-placeholder.png"} alt="Character Image" fill className="object-cover object-top" />
                  </div>

                  <div className="p-4 border-t border-zinc-800">
                    <h2 className="font-banner text-white text-2xl">{weapon.name}</h2>
                    <p className="text-zinc-400 text-xs font-semibold">{weapon.weapon_type}</p>
                    <a target="_blank" href={`http://127.0.0.1:8000/weapons/${weapon.id}`} className="flex mt-3 text-[#f89c0a] text-xs font-bold cursor-pointer gap-2">VIEW <MoveRight className="-translate-y-1" />
                    </a>
                  </div>
                </div>
              ))}

            </div>
            {/*Fix weapon endpoint cards*/}
            <EndpointCard
              method='GET'
              path='/weapons'
              description='Returns a list of all weapons'
              parameters='No parameters'
              example={weaponExamples}
            />

            <EndpointCard
              method='GET'
              path='/weapons/{id}'
              description='Returns a specific weapon by ID'
              parameters='No parameters'
              example={weaponExamples[0]}
            />

            <EndpointCard
              method='GET'
              path='/weapons?name=Nakatsukasa'
              description='Returns weapons matching the provided name'
              parameters='No parameters'
              example={weaponExamples[1]}
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
              path='/weapons?category=Franken'
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




          <div className="mx-6 mt-10" id="organization-section">
            <p className="text-white text-5xl font-banner">Organizations</p>
            <div className="w-full h-1 bg-[#f89c0a] mx-auto" />

            <EndpointCard
              method='GET'
              path='/organizations'
              description='Returns a list of all organizations'
              parameters='No parameters'
              example={organizationExamples}
            />

            <EndpointCard
              method='GET'
              path='/organizations/{id}'
              description='Returns a specific organization by ID'
              parameters='No parameters'
              example={organizationExamples[0]}
            />

            <EndpointCard
              method='GET'
              path='/organizations?name=Faction'
              description='Returns organizations matching the provided name'
              parameters='No parameters'
              example={organizationExamples[3]}
            />

            <EndpointCard
              method='GET'
              path='/organizations?organization_type=task'
              description='Returns organizations filtered by organization type'
              parameters='No parameters'
              example={organizationExamples[1]}
            />

            <EndpointCard
              method='GET'
              path='/organizations?leader=Gorgon'
              description='Returns organizations led by a specific leader'
              parameters='No parameters'
              example={[organizationExamples[2], organizationExamples[3]]}
            />

            <EndpointCard
              method='GET'
              path='organizations?status=Active'
              description='Returns organizations filtered by status'
              parameters='No parameters'
              example={[organizationExamples[0], organizationExamples[1]]}
            />

          </div >


          <div className="mx-6 mt-10" id="arc-section">
            <p className="text-white text-5xl font-banner">Arcs</p>
            <div className="w-full h-1 bg-[#f89c0a] mx-auto" />

            <div className="flex flex-wrap gap-6 justify-center mt-6">
              {arcs.slice(0, 6).map((arc) => (
                <div key={arc.id} className="w-64 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                  <div className="relative w-full h-64 bg-zinc-950">
                    <Image src={arc.image_url || "/characters/characters-placeholder.png"} alt="Character Image" fill className="object-cover object-top" />
                  </div>

                  <div className="p-4 border-t border-zinc-800">
                    <h2 className="font-banner text-white text-2xl">{arc.name}</h2>
                    <p className="text-zinc-400 text-xs font-semibold">{`Episodes ${arc.episodes}`}</p>
                    <a target="_blank" href={`http://127.0.0.1:8000/arcs/${arc.id}`} className="flex mt-3 text-[#f89c0a] text-xs font-bold cursor-pointer gap-2">VIEW <MoveRight className="-translate-y-1" />
                    </a>
                  </div>
                </div>
              ))}

            </div>

            <EndpointCard
              method='GET'
              path='/arcs'
              description='Returns a list of all story arcs'
              parameters='No parameters'
              example={arcExamples}
            />

            <EndpointCard
              method='GET'
              path='/arcs/{id}'
              description='Returns a specific story arc by ID'
              parameters='No parameters'
              example={arcExamples[0]}
            />

            <EndpointCard
              method='GET'
              path='/arcs?name=Lesson'
              description='Returns arcs matching the provided name'
              parameters='No parameters'
              example={arcExamples[1]}
            />

            <EndpointCard
              method='GET'
              path='/arcs?characters=Mifune'
              description='Returns arcs containing a specific character'
              parameters='No parameters'
              example={organizationExamples[2]}
            />

            <EndpointCard
              method='GET'
              path='/organizations?leader=Gorgon'
              description='Returns arcs filtered by completion status'
              parameters='No parameters'
              example={[organizationExamples[2], organizationExamples[3]]}
            />
          </div>

        </div>
      </div>




    </div >
  );
}