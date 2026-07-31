"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  FunnelX,
  MoveRight,
  Search,
  Swords,
} from "lucide-react";

import EndpointCard from "../EndpointCard";
import type { Weapon } from "../../types/api";
import { weaponExamples } from "../../data/apiExamples";
import {
  weaponAffiliations,
  weaponCategories,
  weaponStatuses,
  weaponTypes,
} from "../../data/filterOptions";

type WeaponSectionProps = {
  weapons: Weapon[];
  cardsToShow: number;
};

export default function WeaponSection({ weapons, cardsToShow, }: WeaponSectionProps) {

  const [weaponStartIndex, setWeaponStartIndex] = useState(0);
  const [searchWeapon, setSearchWeapon] = useState("");
  const [selectedWeaponType, setSelectedWeaponType] = useState("");
  const [selectedWeaponCategory, setSelectedWeaponCategory] = useState("");
  const [selectedWeaponAffiliation, setSelectedWeaponAffiliation] = useState("");
  const [selectedWeaponStatus, setSelectedWeaponStatus] = useState("");
  const [isWeaponTypeDropdownOpen, setIsWeaponTypeDropdownOpen] = useState(false);
  const [isWeaponCategoryDropdownOpen, setIsWeaponCategoryDropdownOpen] = useState(false);
  const [isWeaponAffiliationDropdownOpen, setIsWeaponAffiliationDropdownOpen,] = useState(false);
  const [isWeaponStatusDropdownOpen, setIsWeaponStatusDropdownOpen] = useState(false);

  const filteredWeapons = weapons.filter((weapon) => {
    const matchesSearch = weapon.name.toLowerCase().includes(searchWeapon.toLowerCase());
    const matchesWeaponType = selectedWeaponType === "" || weapon.weapon_type.toLowerCase().includes(selectedWeaponType.toLowerCase());
    const matchesWeaponCategory = selectedWeaponCategory === "" || weapon.weapon_category.toLowerCase().includes(selectedWeaponCategory.toLowerCase());
    const matchesAffiliation = selectedWeaponAffiliation === "" || weapon.affiliation.toLowerCase().includes(selectedWeaponAffiliation.toLowerCase());
    const matchesStatus = selectedWeaponStatus === "" || weapon.status.toLowerCase().includes(selectedWeaponStatus.toLowerCase());
    return (matchesSearch && matchesWeaponType && matchesWeaponCategory && matchesAffiliation && matchesStatus);
  });

  const showNextWeapon = () => {
    const maxStartIndex = Math.max(0, filteredWeapons.length - cardsToShow);
    setWeaponStartIndex((currentIndex) => Math.min(currentIndex + cardsToShow, maxStartIndex));
  };

  const showPreviousWeapon = () => {
    setWeaponStartIndex((currentIndex) => Math.max(0, currentIndex - cardsToShow));
  };

  const clearWeaponFilters = () => {
    setSearchWeapon("");
    setSelectedWeaponType("");
    setSelectedWeaponCategory("");
    setSelectedWeaponAffiliation("");
    setSelectedWeaponStatus("");
    setWeaponStartIndex(0);

    setIsWeaponTypeDropdownOpen(false);
    setIsWeaponCategoryDropdownOpen(false);
    setIsWeaponAffiliationDropdownOpen(false);
    setIsWeaponStatusDropdownOpen(false);
  };

  useEffect(() => {
    setWeaponStartIndex(0);
  }, [searchWeapon, selectedWeaponType, selectedWeaponCategory, selectedWeaponAffiliation, selectedWeaponStatus]);


  return (
    <div className="scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-36 mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="weapon-section">

      <div className="flex items-center justify-center gap-4 w-full">
        <div className="w-[90%] relative py-4 -my-4 px-2 -mx-2 md:flex-col 2xl:flex-row">
          <div className="relative">
            <button onClick={showPreviousWeapon} className="p-2 absolute -left-10 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%] z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2"><ChevronLeft className="cursor-pointer" size={40} /></button>

            <div className="overflow-hidden py-4 -my-4 px-2 -mx-2">
              <div className="flex">
                <div>
                  <Swords className="w-13 h-13 text-[#f89c0a]" />
                  <div className="w-[80%] mt-2 h-[2px] bg-zinc-700 mx-auto" />
                </div>

                <div className="ml-3 mb-5">
                  <p className="text-white text-5xl font-banner">WEAPONS</p>
                  <p className="text-zinc-400">Browse and explore all Demon Weapons from the world of Soul Eater.</p>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-center gap-4 min-[1800px]:flex-nowrap">
                <div className="order-1 flex min-w-0 md:flex-1 border-zinc-800 border-2 p-1 rounded-md hover:border-[#f89c0a] w-full transition duration-300 ease-in-out min-[1800px]:flex-none min-[1800px]:w-[15%]">
                  <Search className="text-zinc-300 mr-2 ml-1 mt-[3px]" size={18} />
                  <input value={searchWeapon} onChange={(event) => setSearchWeapon(event.target.value)} className="w-full mt-[1px] outline-none border-none bg-transparent" type="text" placeholder="Search weapons..."></input>
                </div>

                <div className="order-2 min-w-0 md:flex-1 shrink-0 hover:text-white min-[1800px]:order-3 min-[1800px]:flex-none w-full min-[1800px]:w-auto">
                  <button onClick={clearWeaponFilters} className="group text-sm flex justify-center gap-2 rounded-md p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out w-full"><FunnelX className="group-hover:text-white text-[#f89c0a]" size={20} />Clear Filters</button>
                </div>

                <div className="order-3 grid grid-cols-1 basis-full min-w-0 items-center gap-4 md:grid-cols-2 xl:grid-cols-4 min-[1800px]:order-2 min-[1800px]:flex min-[1800px]:basis-auto min-[1800px]:flex-1 min-[1800px]:flex-nowrap">
                  <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Type:</p>

                    <button type="button" onClick={() => setIsWeaponTypeDropdownOpen((current) => !current)} className="flex flex-1 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedWeaponType || "All"}</p>
                      <ChevronRight size={18} className={`transition-transform ${isWeaponTypeDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isWeaponTypeDropdownOpen && (<button type="button" onClick={() => setIsWeaponTypeDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default"></button>)}

                    {isWeaponTypeDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 top-12 z-[100] max-h-64 w-full sm:w-[85%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedWeaponType(""); setIsWeaponTypeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedWeaponType === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>All</button>

                          {weaponTypes.map((type) => (
                            <button key={type} type="button" onClick={() => { setSelectedWeaponType(type); setIsWeaponTypeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedWeaponType === type ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Category:</p>

                    <button type="button" onClick={() => setIsWeaponCategoryDropdownOpen((current) => !current)} className="flex flex-1 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedWeaponCategory || "All"}</p>
                      <ChevronRight size={18} className={`transition-transform ${isWeaponCategoryDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isWeaponCategoryDropdownOpen && (
                      <button type="button" onClick={() => setIsWeaponCategoryDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default"></button>
                    )}

                    {isWeaponCategoryDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 top-12 z-[100] max-h-64 w-full sm:w-[85%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedWeaponCategory(""); setIsWeaponCategoryDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedWeaponCategory === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                            All
                          </button>


                          {weaponCategories.map((category) => (
                            <button key={category} type="button" onClick={() => { setSelectedWeaponCategory(category); setIsWeaponCategoryDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedWeaponCategory === category ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex min-w-0 flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Affiliation:</p>

                    <button type="button" onClick={() => setIsWeaponAffiliationDropdownOpen((current) => !current)} className="flex flex-1 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedWeaponAffiliation || "All"}</p>
                      <ChevronRight size={18} className={`transition-transform ${isWeaponAffiliationDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isWeaponAffiliationDropdownOpen && (
                      <button type="button" onClick={() => setIsWeaponAffiliationDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" ></button>
                    )}

                    {isWeaponAffiliationDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 top-12 z-[100] max-h-64 w-full sm:w-[85%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedWeaponAffiliation(""); setIsWeaponAffiliationDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedWeaponAffiliation === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                            All
                          </button>

                          {weaponAffiliations.map((affiliation) => (
                            <button key={affiliation} type="button" onClick={() => { setSelectedWeaponAffiliation(affiliation); setIsWeaponAffiliationDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedWeaponAffiliation === affiliation ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {affiliation}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex min-w-0 flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Status:</p>

                    <button type="button" onClick={() => setIsWeaponStatusDropdownOpen((current) => !current)} className="flex flex-1 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedWeaponStatus || "All"}</p>
                      <ChevronRight size={18} className={`transition-transform ${isWeaponStatusDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isWeaponStatusDropdownOpen && (
                      <button type="button" onClick={() => setIsWeaponStatusDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default"></button>
                    )}

                    {isWeaponStatusDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 top-12 z-[100] max-h-64 w-full sm:w-[85%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">

                          <button type="button" onClick={() => { setSelectedWeaponStatus(""); setIsWeaponStatusDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedWeaponStatus === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`} >
                            All
                          </button>

                          {weaponStatuses.map((weaponStatus) => (
                            <button key={weaponStatus} type="button" onClick={() => { setSelectedWeaponStatus(weaponStatus); setIsWeaponStatusDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedWeaponStatus === weaponStatus ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {weaponStatus}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {filteredWeapons.length === 0 && (
                <div className="flex items-center justify-center min-h-80 border border-zinc-800 rounded-lg">
                  <p className="text-zinc-400 text-lg">No weapons match the selected filters.</p>
                </div>
              )}

              {filteredWeapons.length > 0 && (
                <div className="flex gap-6 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${weaponStartIndex * 324}px)`, }}>
                  {filteredWeapons.map((weapon) => (
                    <div key={weapon.id} className="relative w-75 shrink-0 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                      <div className="relative w-full h-60 bg-zinc-950">
                        <Image src={weapon.image_url || "/characters/characters-placeholder.png"} alt={`${weapon.name} image`} fill className="object-cover" />
                      </div>

                      <div className="absolute top-0 ml-2 mt-2 px-2 border-[#f89c0a] text-[#f8b40a] text-[19px] border-1 rounded-md bg-[#f89c0a]/10">
                        <p className="font-banner">{weapon.weapon_category}</p>
                      </div>

                      <div className="p-4 border-t border-zinc-800">
                        <h2 className="font-banner text-white text-2xl">{weapon.name}</h2>
                        <p className="text-zinc-400 text-xs font-semibold">Type: {weapon.weapon_type}</p>
                        <p className="text-zinc-400 text-xs font-semibold">Affiliation: {weapon.affiliation}</p>
                        <p className="text-zinc-400 text-xs font-semibold">Status: {weapon.status}</p>

                        <a target="_blank" rel="noopener noreferrer" href={`http://127.0.0.1:8000/weapons/${weapon.id}`} className="flex justify-between mt-auto pt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]" >VIEW PROFILE <MoveRight className="-translate-y-1" /></a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={showNextWeapon} className="p-2 z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2 absolute -right-12 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%]">
              <ChevronRight className="cursor-pointer" size={40} />
            </button>
          </div>
        </div>
      </div>

      <EndpointCard
        method="GET"
        path="/weapons"
        description="Returns all weapons."
        example={weaponExamples}
      />

      <EndpointCard
        method="GET"
        path="/weapons/{weapon_id}"
        description="Returns a weapon by ID."
        parameter={{ location: "Path parameter", name: "weapon_id", type: "integer", }}
        example={weaponExamples[0]}
      />

      <EndpointCard
        method="GET"
        path="/weapons?name=Nakatsukasa"
        description="Filters weapons by name."
        parameter={{ location: "Query parameter", name: "name", type: "string", }}
        example={[weaponExamples[1]]}
      />

      <EndpointCard
        method="GET"
        path="/weapons?weapon_type=Demon Scythe"
        description="Filters weapons by weapon type."
        parameter={{ location: "Query parameter", name: "weapon_type", type: "string", }}
        example={[weaponExamples[0]]}
      />

      <EndpointCard
        method="GET"
        path="/weapons?weapon_category=Death Scythe"
        description="Filters weapons by weapon category."
        parameter={{ location: "Query parameter", name: "weapon_category", type: "string", }}
        example={[weaponExamples[0]]}
      />

      <EndpointCard
        method="GET"
        path="/weapons?meister=Maka Albarn"
        description="Filters weapons by Meister."
        parameter={{ location: "Query parameter", name: "meister", type: "string", }}
        example={[weaponExamples[0]]}
      />

      <EndpointCard
        method="GET"
        path="/weapons?affiliation=Death Weapon Meister Academy"
        description="Filters weapons by affiliation."
        parameter={{ location: "Query parameter", name: "affiliation", type: "string", }}
        example={weaponExamples}
      />

      <EndpointCard
        method="GET"
        path="/weapons?status=Alive"
        description="Filters weapons by status."
        parameter={{ location: "Query parameter", name: "status", type: "string", }}
        example={weaponExamples}
      />

      <EndpointCard
        method="GET"
        path="/weapons?continuity=Manga & Anime"
        description="Filters weapons by continuity."
        parameter={{ location: "Query parameter", name: "continuity", type: "string", }}
        example={[weaponExamples[0], weaponExamples[2], weaponExamples[3],]}
      />

      <EndpointCard
        method="GET"
        path="/weapons?ability=Soul Resonance"
        description="Filters weapons by ability."
        parameter={{ location: "Query parameter", name: "ability", type: "string", }}
        example={[weaponExamples[0], weaponExamples[1], weaponExamples[2], weaponExamples[3],]}
      />
    </div>
  );

}