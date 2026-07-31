"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Flame, FunnelX, MoveRight, Search, } from "lucide-react";

import EndpointCard from "../EndpointCard";
import type { Ability } from "../../types/api";
import { abilityExamples } from "../../data/apiExamples";
import { abilityTypes, abilityUsers, } from "../../data/filterOptions";

type AbilitySectionProps = {
  abilities: Ability[];
  cardsToShow: number;
};

export default function AbilitySection({ abilities, cardsToShow, }: AbilitySectionProps) {
  const [abilityStartIndex, setAbilityStartIndex] = useState(0);
  const [searchAbility, setSearchAbility] = useState("");
  const [selectedAbilityType, setSelectedAbilityType] = useState("");
  const [selectedAbilityUser, setSelectedAbilityUser] = useState("");
  const [isAbilityTypeDropdownOpen, setIsAbilityTypeDropdownOpen] = useState(false);
  const [isAbilityUserDropdownOpen, setIsAbilityUserDropdownOpen] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const filteredAbilities = abilities.filter((ability) => {
    const lowerAbility = ability.name.toLowerCase();
    const lowerQuery = searchAbility.toLowerCase();
    const matchesSearch = lowerAbility.includes(lowerQuery);
    const matchesAbilityType = selectedAbilityType === "" || ability.category.toLowerCase().includes(selectedAbilityType.toLowerCase());
    const matchesUser = selectedAbilityUser === "" || ability.users.some((group) => group.some((user) => user.toLowerCase().includes(selectedAbilityUser.toLowerCase())));
    if (matchesSearch && matchesAbilityType && matchesUser) {
      return true;
    } else {
      return false;
    }
  });

  const showNextAbility = () => {
    const maxStartIndex = filteredAbilities.length - cardsToShow;

    if (abilityStartIndex + cardsToShow < maxStartIndex) {
      setAbilityStartIndex(abilityStartIndex + cardsToShow);
    } else {
      setAbilityStartIndex(Math.max(0, maxStartIndex));
    }
  };

  const showPreviousAbility = () => {
    if (abilityStartIndex - cardsToShow >= 0) {
      setAbilityStartIndex(abilityStartIndex - cardsToShow);
    } else {
      setAbilityStartIndex(0);
    }
  };

  const clearAbilityFilters = () => {
    setSearchAbility("");
    setSelectedAbilityType("");
    setSelectedAbilityUser("");
    setAbilityStartIndex(0);
    setIsAbilityTypeDropdownOpen(false);
    setIsAbilityUserDropdownOpen(false);
  };

  useEffect(() => {
    setAbilityStartIndex(0);
  }, [searchAbility, selectedAbilityType, selectedAbilityUser]);


  return (
    <div className="scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-36 mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="ability-section">
      <div className="flex items-center justify-center gap-4 w-full">
        <div className="w-[90%] relative py-4 -my-4 px-2 -mx-2 md:flex-col 2xl:flex-row">
          <div className="relative">
            <button onClick={showPreviousAbility} className="p-2 absolute -left-10 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%] z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2">
              <ChevronLeft className="cursor-pointer" size={40} />
            </button>

            <div className="overflow-hidden py-4 -my-4 px-2 -mx-2">
              <div className="flex">
                <div>
                  <Flame className="w-13 h-13 text-[#f89c0a]" />
                  <div className="w-[80%] mt-2 h-[2px] bg-zinc-700 mx-auto" />
                </div>

                <div className="ml-3 mb-5">
                  <p className="text-white text-5xl font-banner">ABILITIES</p>
                  <p className="text-zinc-400">Browse and explore all abilities from the world of Soul Eater.</p>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-center gap-4 min-[1800px]:flex-nowrap">
                <div className="order-1 flex min-w-0 md:flex-1 border-zinc-800 border-2 p-1 rounded-md hover:border-[#f89c0a] w-full transition duration-300 ease-in-out min-[1800px]:flex-none min-[1800px]:w-[15%]">
                  <Search className="text-zinc-300 mr-2 ml-1 mt-[3px]" size={18} />
                  <input value={searchAbility} onChange={(event) => setSearchAbility(event.target.value)} className="w-full mt-[1px] outline-none border-none bg-transparent" type="text" placeholder="Search abilities..." />
                </div>

                <div className="order-2 min-w-0 md:flex-1 shrink-0 hover:text-white min-[1800px]:order-3 min-[1800px]:flex-none w-full min-[1800px]:w-auto">
                  <button onClick={clearAbilityFilters} className="group text-sm flex justify-center gap-2 rounded-md p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out w-full">
                    <FunnelX className="group-hover:text-white text-[#f89c0a]" size={20} />
                    Clear Filters
                  </button>
                </div>

                <div className="order-3 grid grid-cols-1 basis-full min-w-0 items-center gap-4 md:grid-cols-2 min-[1800px]:order-2 min-[1800px]:flex min-[1800px]:basis-auto min-[1800px]:flex-1 min-[1800px]:flex-nowrap">
                  <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Type:</p>

                    <button type="button" onClick={() => setIsAbilityTypeDropdownOpen((current) => !current)} className="flex flex-1 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedAbilityType || "All"}</p>
                      <ChevronRight size={18} className={`transition-transform ${isAbilityTypeDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isAbilityTypeDropdownOpen && (
                      <button type="button" onClick={() => setIsAbilityTypeDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" ></button>
                    )}


                    {isAbilityTypeDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 top-12 z-[100] max-h-64 w-full sm:w-[85%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedAbilityType(""); setIsAbilityTypeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedAbilityType === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                            All
                          </button>

                          {abilityTypes.map((type) => (
                            <button key={type} type="button" onClick={() => { setSelectedAbilityType(type); setIsAbilityTypeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedAbilityType === type ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">User:</p>

                    <button type="button" onClick={() => setIsAbilityUserDropdownOpen((current) => !current)} className="flex flex-1 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedAbilityUser || "All"}</p>
                      <ChevronRight size={18} className={`transition-transform ${isAbilityUserDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isAbilityUserDropdownOpen && (
                      <button type="button" onClick={() => setIsAbilityUserDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" ></button>
                    )}

                    {isAbilityUserDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 top-12 z-[100] max-h-64 w-full sm:w-[85%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedAbilityUser(""); setIsAbilityUserDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedAbilityUser === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                            All
                          </button>

                          {abilityUsers.map((user) => (
                            <button key={user} type="button" onClick={() => { setSelectedAbilityUser(user); setIsAbilityUserDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedAbilityUser === user ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {user}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {filteredAbilities.length === 0 && (
                <div className="flex items-center justify-center min-h-80 border border-zinc-800 rounded-lg">
                  <p className="text-zinc-400 text-lg">No abilities match the selected filters.</p>
                </div>
              )}

              {filteredAbilities.length > 0 && (
                <div className="flex gap-6 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${abilityStartIndex * 324}px)`, }}>
                  {filteredAbilities.map((ability) => (
                    <div key={ability.id} className="relative w-75 shrink-0 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                      <div className="relative w-full h-60 bg-zinc-950">
                        <Image src={ability.image_url || "/characters/characters-placeholder.png"} alt={`${ability.name} image`} fill className="object-cover object-top" />
                      </div>

                      <div className="absolute top-0 ml-2 mt-2 px-2 border-[#f89c0a] text-[#f8b40a] text-[19px] border-1 rounded-md bg-[#f89c0a]/10">
                        <p className="font-banner">{ability.category}</p>
                      </div>

                      <div className="p-4 border-t border-zinc-800 h-36">
                        <h2 className="font-banner text-white text-2xl truncate">{ability.name}</h2>

                        <p className="text-zinc-400 text-xs font-semibold truncate">
                          Users:{" "}
                          {ability.users.map((group) => group.join(" + ")).join(", ")}
                        </p>
                        <p className="text-zinc-400 text-xs font-semibold truncate">Category: {ability.category}</p>

                        <a target="_blank" rel="noopener noreferrer" href={`${API_URL}/abilities/${ability.id}`} className="flex justify-between mt-auto pt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]" >
                          VIEW PROFILE<MoveRight className="-translate-y-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={showNextAbility} className="p-2 z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2 absolute -right-12 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%]">
              <ChevronRight className="cursor-pointer" size={40} />
            </button>
          </div>
        </div>
      </div>

      <EndpointCard
        method="GET"
        path="/abilities"
        description="Returns all abilities."
        example={abilityExamples}
      />

      <EndpointCard
        method="GET"
        path="/abilities/{ability_id}"
        description="Returns ability by id."
        parameter={{ location: "Path parameter", name: "ability_id", type: "integer", }}
        example={abilityExamples[0]}
      />

      <EndpointCard
        method="GET"
        path="/abilities?name=Black Blood"
        description="Filters abilities by name."
        parameter={{ location: "Query parameter", name: "name", type: "string", }}
        example={abilityExamples[3]}
      />

      <EndpointCard
        method="GET"
        path="/abilities?category=Soul Ability"
        description="Filters abilities by category."
        parameter={{ location: "Query parameter", name: "category", type: "string", }}
        example={[abilityExamples[0], abilityExamples[2]]}
      />

      <EndpointCard
        method="GET"
        path="/abilities?user=Franken Stein"
        description="Filters abilities by user."
        parameter={{ location: "Query parameter", name: "user", type: "string", }}
        example={[abilityExamples[0], abilityExamples[2]]}
      />

      <EndpointCard
        method="GET"
        path="/abilities?continuity=Manga and Anime"
        description="Filters abilities by continuity."
        parameter={{ location: "Query parameter", name: "continuity", type: "string", }}
        example={[abilityExamples[0], abilityExamples[1]]}
      />
    </div>
  );
}