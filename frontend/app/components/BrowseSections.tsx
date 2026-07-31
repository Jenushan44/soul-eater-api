"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, ChevronRight, Flame, MoonStar, MoveRight, School, Shield, Skull, Swords, User, } from "lucide-react";

export default function BrowseSections() {
  const [isBrowseOpen, setIsBrowseOpen] = useState(true);

  return (
    <div className="sticky top-0 mt-5 z-200 w-full rounded-md border border-zinc-900 bg-black p-3 tracking-wide">
      <div className="flex items-center justify-between">
        <p className="text-[#f89c0a] text-[18px] font-bold tracking-widest px-3 mb-3 font-sans ml-5">BROWSE THE SECTIONS</p>
        <button type="button" onClick={() => setIsBrowseOpen((current) => !current)} aria-expanded={isBrowseOpen} className="flex mb-5 cursor-pointer items-center gap-2 rounded-md border border-zinc-800 mr-5 px-3 py-1.5 text-sm font-semibold text-zinc-400 transition-colors hover:border-[#f89c0a] hover:text-[#f89c0a]">{isBrowseOpen ? "Hide" : "Show"}
          <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isBrowseOpen ? "-rotate-90" : "rotate-90"}`} />
        </button>
      </div>


      <div className={`overflow-hidden transition-all duration-300 ${isBrowseOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:hidden">
            <a href="#character-section" className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 transition hover:border-[#f89c0a] hover:bg-zinc-900">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#f89c0a]/10">
                <Skull className="h-6 w-6 text-[#f89c0a]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-banner text-lg font-semibold text-white">CHARACTERS</p>
                <p className="text-xs text-zinc-500">60+ records</p>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-[#f89c0a]" />
            </a>

            <a href="#weapon-section" className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 transition hover:border-[#f89c0a] hover:bg-zinc-900">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#f89c0a]/10">
                <Swords className="h-6 w-6 text-[#f89c0a]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-banner text-lg font-semibold text-white">WEAPONS</p>
                <p className="text-xs text-zinc-500">20+ records</p>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-[#f89c0a]" />
            </a>

            <a href="#ability-section" className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 transition hover:border-[#f89c0a] hover:bg-zinc-900">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#f89c0a]/10">
                <Flame className="h-6 w-6 text-[#f89c0a]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-banner text-lg font-semibold text-white">ABILITIES</p>
                <p className="text-xs text-zinc-500">190+ records</p>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-[#f89c0a]" />
            </a>

            <a href="#organization-section" className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 transition hover:border-[#f89c0a] hover:bg-zinc-900">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#f89c0a]/10">
                <School className="h-6 w-6 text-[#f89c0a]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-banner text-lg font-semibold text-white">ORGANIZATIONS</p>
                <p className="text-xs text-zinc-500">5+ records</p>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-[#f89c0a]" />
            </a>

            <a href="#arc-section" className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 transition hover:border-[#f89c0a] hover:bg-zinc-900">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#f89c0a]/10">
                <MoonStar className="h-6 w-6 text-[#f89c0a]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-banner text-lg font-semibold text-white">ARCS</p>
                <p className="text-xs text-zinc-500">20+ records</p>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-[#f89c0a]" />
            </a>

          </div>

          <div className='hidden grid-cols-5 gap-3 2xl:grid ml-5'>

            <div className='border border-[#f89c0a66] relative'>
              <Image className='h-56 w-full object-cover brightness-[0.3] 2xl:h-85' src={"/browse-section/characters-card.png"} alt='Character Browse Section Image' width={220} height={220}></Image>
              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-transparent to-zinc-950 2xl:h-85" />
              <div className="absolute inset-0 gap-3">
                <Skull className="w-12 h-12 2xl:w-18 2xl:h-18 text-[#f89c0a] group-hover:text-[#f89c0a] transition-colors absolute top-22 left-2" />
                <p className='text-3xl 2xl:text-[40px] absolute top-40 left-5 font-semibold font-banner'>CHARACTERS</p>
                <div className="w-[20%] ml-5 h-1 bg-[#f89c0a] mx-auto absolute top-53" />


                <div className="absolute top-58 left-5 right-5 flex h-[95px] flex-col">
                  <p className="hidden 2xl:block text-zinc-400">Browse meisters, Demon Weapons, witches, villains, and supporting characters</p>
                  <div className="mt-auto flex items-center pt-2 gap-1">
                    <User className="h-5 w-5 text-[#f89c0a]" />
                    <p className="font-bold">60+</p>
                    <p>Records</p>
                  </div>
                </div>



              </div>
              <a href="#character-section" className="text-[#f89c0a] border-zinc-800 flex items-center justify-between font-semibold hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
                View Characters <MoveRight className="-translate-y-0" />
              </a>
            </div>

            <div className='border border-[#f89c0a66] relative'>
              <Image className='h-56 w-full object-cover brightness-[0.3] 2xl:h-85' src={"/browse-section/weapons-card.png"} alt='Weapon Browse Section Image' width={220} height={220}></Image>
              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-transparent to-zinc-950 2xl:h-85" />

              <div className="absolute inset-0 gap-3">
                <Swords className="h-10 w-10 2xl:h-18 2xl:w-18 text-[#f89c0a] group-hover:text-[#f89c0a] transition-colors absolute top-22 left-3" />
                <p className='text-2xl 2xl:text-[40px] absolute top-40 left-5 font-semibold font-banner'>Weapons</p>
                <div className="w-[20%] ml-5 h-1 bg-[#f89c0a] mx-auto absolute top-53" />
                <div className="absolute top-58 left-5 right-5 flex h-[95px] flex-col">
                  <p className="hidden 2xl:block text-zinc-400">Explore Demon Weapons, Death Scythes, weapon forms, and their meisters.</p>
                  <div className="mt-auto flex items-center pt-2 gap-1">
                    <Swords className="h-5 w-5 text-[#f89c0a]" />
                    <p className="font-bold">20+</p>
                    <p>Records</p>
                  </div>
                </div>
              </div>
              <a href="#weapon-section" className="text-[#f89c0a] border-zinc-800 flex items-center justify-between font-semibold hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
                View Weapons <MoveRight className="-translate-y-0" />
              </a>
            </div>

            <div className='border border-[#f89c0a66] relative'>
              <Image className='h-56 w-full object-cover brightness-[0.3] 2xl:h-85' src={"/browse-section/abilities-card.png"} alt='Ability Browse Section Image' width={220} height={220}></Image>
              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-transparent to-zinc-950 2xl:h-85" />
              <div className="absolute inset-0 gap-3">
                <Flame className="w-18 h-18 text-[#f89c0a] group-hover:text-[#f89c0a] transition-colors absolute top-22 left-2" />
                <p className='text-[40px] absolute top-40 left-5 font-semibold font-banner'>ABILITIES</p>
                <div className="w-[20%] ml-5 h-1 bg-[#f89c0a] mx-auto absolute top-53" />

                <div className="absolute top-58 left-5 right-5 flex h-[95px] flex-col">
                  <p className="hidden 2xl:block text-zinc-400">Explore soul wavelengths, resonance techniques, magic, and combat abilities.</p>
                  <div className="mt-auto flex items-center pt-2 gap-1">
                    <Flame className="h-5 w-5 text-[#f89c0a]" />
                    <p className="font-bold">190+</p>
                    <p>Records</p>
                  </div>
                </div>
              </div>

              <a href="#ability-section" className="text-[#f89c0a] border-zinc-800 flex items-center justify-between font-semibold hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
                View Abilities <MoveRight className="-translate-y-0" />
              </a>
            </div>

            <div className='border border-[#f89c0a66] relative'>
              <Image className='h-56 w-full object-cover brightness-[0.3] 2xl:h-85' src={"/browse-section/organization-card.png"} alt='Ability Browse Section Image' width={220} height={220}></Image>
              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-transparent to-zinc-950 2xl:h-85" />
              <div className="absolute inset-0 gap-3">
                <School className="w-18 h-18 text-[#f89c0a] group-hover:text-[#f89c0a] transition-colors absolute top-22 left-4" />
                <p className='text-[40px] absolute top-40 left-5 font-semibold font-banner'>ORGANIZATIONS</p>
                <div className="w-[20%] ml-5 h-1 bg-[#f89c0a] mx-auto absolute top-53" />

                <div className="absolute top-58 left-5 right-5 flex h-[95px] flex-col">
                  <p className="hidden 2xl:block text-zinc-400">Discover the academies, factions, clans, and groups that shape the Soul Eater world.</p>
                  <div className="mt-auto flex items-center pt-2 gap-1">
                    <Shield className="h-5 w-5 text-[#f89c0a]" />
                    <p className="font-bold">5+</p>
                    <p>Records</p>
                  </div>
                </div>
              </div>

              <a href="#organization-section" className="text-[#f89c0a] border-zinc-800 flex items-center justify-between font-semibold hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
                View Organizations <MoveRight className="-translate-y-0" />
              </a>
            </div>

            <div className='border border-[#f89c0a66] relative'>
              <Image className='h-56 w-full object-cover brightness-[0.3] 2xl:h-85' src={"/browse-section/arcs-card.png"} alt='Ability Browse Section Image' width={220} height={220}></Image>
              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-transparent to-zinc-950 2xl:h-85" />
              <div className="absolute inset-0 gap-3">
                <MoonStar className="w-18 h-18 text-[#f89c0a] group-hover:text-[#f89c0a] transition-colors absolute top-22 left-4" />
                <p className='text-[40px] absolute top-40 left-5 font-semibold font-banner'>ARCS</p>
                <div className="w-[20%] ml-5 h-1 bg-[#f89c0a] mx-auto absolute top-53" />


                <div className="absolute top-58 left-5 right-5 flex h-[95px] flex-col">
                  <p className="hidden 2xl:block text-zinc-400">Follow the story from the opening missions through the final battles.</p>
                  <div className="mt-auto flex items-center pt-2 gap-1">
                    <BookOpen className="h-5 w-5 text-[#f89c0a]" />
                    <p className="font-bold">20+</p>
                    <p>Records</p>
                  </div>
                </div>
              </div>
              <a href="#arc-section" className="text-[#f89c0a] border-zinc-800 flex items-center justify-between font-semibold hover:text-white hover:bg-red-950/30 px-3 py-2 rounded text-sm font-medium transition-all group border border-transparent hover:border-red-900/30">
                View Arcs <MoveRight className="-translate-y-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}