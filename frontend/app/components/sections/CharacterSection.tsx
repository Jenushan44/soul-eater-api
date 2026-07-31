"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, FunnelX, MoveRight, Search, Skull, } from "lucide-react";
import EndpointCard from "../EndpointCard";
import type { Character } from "../../types/api";
import { characterExamples } from "../../data/apiExamples";
import { affiliations, characterRoles, characterSpecies, characterStatuses, mainAffiliations, mainCharacterRoles, mainCharacterSpecies, } from "../../data/filterOptions";

type CharacterSectionProps = {
  characters: Character[];
  cardsToShow: number;
};

export default function CharacterSection({ characters, cardsToShow, }: CharacterSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [searchCharacter, setSearchCharacter] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedAffiliation, setSelectedAffiliation] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isAffiliationDropdownOpen, setIsAffiliationDropdownOpen] = useState(false);
  const [isSpeciesDropdownOpen, setIsSpeciesDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const filteredCharacters = characters.filter((character) => {
    let lowerCharacter = character.name.toLowerCase();
    let lowerQuery = searchCharacter.toLowerCase();

    let matchesRole;

    if (selectedRole === "") {
      matchesRole = true;
    } else if (selectedRole === "Other") {
      matchesRole = !mainCharacterRoles.includes(character.role);
    } else {
      matchesRole = character.role === selectedRole;
    }

    let matchesAffiliation;

    if (selectedAffiliation === "") {
      matchesAffiliation = true;
    } else if (selectedAffiliation === "Other") {
      matchesAffiliation = !mainAffiliations.includes(character.affiliation);
    } else {
      matchesAffiliation = character.affiliation === selectedAffiliation;
    }

    let matchesSpecies = false;

    if (selectedSpecies === "") {
      matchesSpecies = true;
    } else if (selectedSpecies === "Other") {
      matchesSpecies = !mainCharacterSpecies.includes(character.species);
    } else {
      matchesSpecies = character.species === selectedSpecies;
    }

    let matchesStatus = false;

    if (selectedStatus === "") {
      matchesStatus = true;
    } else {
      matchesStatus = character.status === selectedStatus;
    }

    const matchesSearch = lowerCharacter.includes(lowerQuery);

    if (matchesSearch && matchesRole && matchesAffiliation && matchesSpecies && matchesStatus) {
      return true;
    } else {
      return false;
    }
  })

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

  useEffect(() => {
    setStartIndex(0);
  }, [searchCharacter, selectedRole, selectedAffiliation, selectedSpecies, selectedStatus]);

  const clearFilter = () => {
    setSelectedRole("");
    setSearchCharacter("");
    setSelectedAffiliation("");
    setSelectedSpecies("");
    setSelectedStatus("");
    setStartIndex(0);
  }


  return (
    <div className="scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-36 mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="character-section">


      <div className='flex items-center justify-center gap-4 w-full'>

        <div className='w-[90%] relative py-4 -my-4 px-2 -mx-2 md:flex-col 2xl:flex-row'>
          <div className='relative'>



            <button onClick={showPrevious} className='p-2 absolute -left-10 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%] z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2'><ChevronLeft className='cursor-pointer' size={40} /></button>
            <div className="overflow-hidden py-4 -my-4 px-2 -mx-2">
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

              <div className='mb-5 flex flex-wrap items-center gap-4 min-[1800px]:flex-nowrap'>

                <div className='order-1 flex min-w-0 md:flex-1 border-zinc-800 border-2 p-1 rounded-md hover:border-[#f89c0a] w-full transition duration-300 ease-in-out min-[1800px]:flex-none min-[1800px]:w-[15%]'>
                  <Search className='text-zinc-300 mr-2 ml-1 mt-[3px]' size={18} />
                  <input value={searchCharacter} onChange={(event) => setSearchCharacter(event.target.value)} className='w-full mt-[1px] outline-none border-none' type='text' placeholder='Search characters...' />
                </div>

                <div className='order-2 min-w-0 md:flex-1 shrink-0 hover:text-white min-[1800px]:order-3 min-[1800px]:flex-none w-full min-[1800px]:w-auto'>
                  <button onClick={clearFilter} className='group text-sm flex justify-center gap-2 rounded-md p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out w-full'><FunnelX className='group-hover:text-white text-[#f89c0a]' size={20} /> Clear Filters</button>
                </div>


                <div className='order-3 grid grid-cols-1 basis-full min-w-0 items-center gap-4 md:grid-cols-2 xl:grid-cols-4 min-[1800px]:order-2 min-[1800px]:flex min-[1800px]:basis-auto min-[1800px]:flex-1 min-[1800px]:flex-nowrap'>
                  <div className='relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2'>
                    <p className="shrink-0 text-md font-semibold">Role:</p>
                    <button type="button" onClick={() => setIsRoleDropdownOpen((current) => !current)} className="flex flex-1 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedRole || "All"}</p>
                      <ChevronRight size={18} className={`transition-transform ${isRoleDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isRoleDropdownOpen && (
                      <button type="button" onClick={() => setIsRoleDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" />
                    )}

                    {isRoleDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 top-12 z-[100] max-h-64 w-full sm:w-[85%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedRole(""); setIsRoleDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedRole === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>All</button>

                          {characterRoles.map((type) => (
                            <button key={type} type="button" onClick={() => { setSelectedRole(type); setIsRoleDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedRole === type ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>{type}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2'>
                    <p className="shrink-0 text-md font-semibold">Affiliation:</p>
                    <button type="button" onClick={() => setIsAffiliationDropdownOpen((current) => !current)} className="flex flex-1 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedAffiliation || "All"}</p>
                      <ChevronRight size={18} className={`transition-transform ${isAffiliationDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isAffiliationDropdownOpen && (
                      <button type="button" onClick={() => setIsAffiliationDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" />
                    )}

                    {isAffiliationDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 md:left-22 top-12 z-[100] w-full sm:w-[85%] md:w-[70%] lg:w-[80%] max-h-64 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedAffiliation(""); setIsAffiliationDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedAffiliation === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>All</button>

                          {affiliations.map((type) => (
                            <button key={type} type="button" onClick={() => { setSelectedAffiliation(type); setIsAffiliationDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedAffiliation === type ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>{type}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='relative flex min-w-0 flex-1 items-center rounded-md bg-black text-zinc-400 gap-2'>
                    <p className="shrink-0 text-md font-semibold">Species:</p>
                    <button type="button" onClick={() => setIsSpeciesDropdownOpen((current) => !current)} className="flex flex-1 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedSpecies || "All"}</p>
                      <ChevronRight size={18} className={`transition-transform ${isSpeciesDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isSpeciesDropdownOpen && (
                      <button type="button" onClick={() => setIsSpeciesDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" />
                    )}

                    {isSpeciesDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 md:left-18 top-12 z-[100] w-full sm:w-[85%] md:w-[70%] lg:w-[80%] max-h-64 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedSpecies(""); setIsSpeciesDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedSpecies === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>All</button>

                          {characterSpecies.map((type) => (
                            <button key={type} type="button" onClick={() => { setSelectedSpecies(type); setIsSpeciesDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedSpecies === type ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>{type}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>



                  <div className='relative flex min-w-0 flex-1 items-center rounded-md bg-black text-zinc-400 gap-2'>
                    <p className="shrink-0 text-md font-semibold">Status:</p>
                    <button type="button" onClick={() => setIsStatusDropdownOpen((current) => !current)} className="flex flex-1 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedStatus || "All"}</p>
                      <ChevronRight size={18} className={`transition-transform ${isStatusDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isStatusDropdownOpen && (
                      <button type="button" onClick={() => setIsStatusDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" />
                    )}

                    {isStatusDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-12 md:left-18 top-12 z-[100] w-full sm:w-[85%] md:w-[70%] lg:w-[80%] max-h-64 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedStatus(""); setIsStatusDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedStatus === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>All</button>

                          {characterStatuses.map((type) => (
                            <button key={type} type="button" onClick={() => { setSelectedStatus(type); setIsStatusDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedStatus === type ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>{type}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {filteredCharacters.length === 0 && (
                <div className='flex items-center justify-center min-h-80 border border-zinc-800 rounded-lg'>
                  <p className='text-zinc-400 text-lg'>No characters match the selected filters.</p>
                </div>
              )}

              {filteredCharacters.length > 0 && (
                <div className='flex gap-6 transition-transform duration-500 ease-in-out' style={{ transform: `translateX(-${startIndex * 324}px)` }}>
                  {filteredCharacters.map((character) => (
                    <div key={character.id} className="relative w-75 shrink-0 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                      <div className="relative w-full h-60 bg-zinc-950">
                        <Image src={character.image_url || "/characters/characters-placeholder.png"} alt="Character Image" fill className="object-cover" />
                      </div>
                      <div className='absolute top-0 ml-2 mt-2 px-2 border-[#f89c0a] text-[#f8b40a] text-[19px] border-1 rounded-md bg-[#f89c0a]/10'>
                        <p className='font-banner'>{character.role}</p>
                      </div>

                      <div className="p-4 border-t border-zinc-800">
                        <h2 className="font-banner text-white text-2xl">{character.name}</h2>
                        <p className="text-zinc-400 text-xs font-semibold">Role: {character.role}</p>
                        <p className='text-zinc-400 text-xs font-semibold'>Affiliation: {character.affiliation}</p>
                        <p className='text-zinc-400 text-xs font-semibold'>Status: {character.status}</p>

                        <a target="_blank" href={`${API_URL}/characters/${character.id}`} className="flex justify-between mt-auto pt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]">VIEW PROFILE<MoveRight className="-translate-y-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={showNext} className='p-2 z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2 absolute -right-12 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%]'><ChevronRight className='cursor-pointer' size={40} /></button>
          </div>
        </div>
      </div>

      <EndpointCard
        method='GET'
        path='/characters'
        description='Returns all characters.'
        example={characterExamples}
      />

      <EndpointCard
        method='GET'
        path='/characters/{character_id}'
        description='Returns character by id.'
        parameter={{ location: "Path parameter", name: "character_id", type: "integer", }}
        example={characterExamples[0]}
      />

      <EndpointCard
        method='GET'
        path='/characters?name=Soul'
        description='Filters characters by name.'
        parameter={{ location: "Query parameter", name: "name", type: "string", }}
        example={characterExamples[1]}
      />

      <EndpointCard
        method='GET'
        path='/characters?role=Meister'
        description='Filters characters by role.'
        parameter={{ location: "Query parameter", name: "role", type: "string", }}
        example={[characterExamples[0], characterExamples[2]]}
      />

      <EndpointCard
        method='GET'
        path='/characters?affiliation=Death Weapon Meister Academy'
        description='Filters characters by affiliation.'
        parameter={{ location: "Query parameter", name: "affiliation", type: "string", }}
        example={[characterExamples[0], characterExamples[1], characterExamples[2], characterExamples[3]]}
      />

      <EndpointCard
        method='GET'
        path='/characters?species=Human'
        description='Filters characters by species.'
        parameter={{ location: "Query parameter", name: "species", type: "string", }}
        example={[characterExamples[0], characterExamples[3]]}
      />

      <EndpointCard
        method="GET"
        path="/characters?status=Alive"
        description="Filters characters by status."
        parameter={{ location: "Query parameter", name: "status", type: "string", }}
        example={[characterExamples[0], characterExamples[1], characterExamples[2], characterExamples[3],]}
      />

      <EndpointCard
        method="GET"
        path="/characters?sex=Female"
        description="Filters characters by sex."
        parameter={{ location: "Query parameter", name: "sex", type: "string", }}
        example={[characterExamples[0]]}
      />

      <EndpointCard
        method="GET"
        path="/characters?soul_type=Human Soul"
        description="Filters characters by soul type."
        parameter={{ location: "Query parameter", name: "soul_type", type: "string", }}
        example={[characterExamples[3]]}
      />

      <EndpointCard
        method="GET"
        path="/characters?continuity=Manga & Anime"
        description="Filters characters by continuity."
        parameter={{ location: "Query parameter", name: "continuity", type: "string", }}
        example={[characterExamples[0], characterExamples[1], characterExamples[2], characterExamples[3],]}
      />

      <EndpointCard
        method="GET"
        path="/characters?occupation=Weapon Meister"
        description="Filters characters by occupation."
        parameter={{ location: "Query parameter", name: "occupation", type: "string", }}
        example={[characterExamples[0], characterExamples[2],]}
      />

      <EndpointCard
        method="GET"
        path="/characters?partner=Maka Albarn"
        description="Filters characters by partner."
        parameter={{ location: "Query parameter", name: "partner", type: "string", }}
        example={[characterExamples[1]]}
      />

      <EndpointCard
        method="GET"
        path="/characters?ability=Soul Resonance"
        description="Filters characters by ability."
        parameter={{ location: "Query parameter", name: "ability", type: "string", }}
        example={[characterExamples[0], characterExamples[1], characterExamples[2], characterExamples[3],]}
      />

    </div>

  );
}