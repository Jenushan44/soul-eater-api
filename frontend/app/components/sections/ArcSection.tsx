"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, FunnelX, MoonStar, MoveRight, Search, } from "lucide-react";

import EndpointCard from "../EndpointCard";
import type { Arc } from "../../types/api";
import { arcExamples } from "../../data/apiExamples";
import { arcCharacters, arcChapterRanges, arcContinuities, arcEpisodeRanges, } from "../../data/filterOptions";

type ArcSectionProps = {
  arcs: Arc[];
  cardsToShow: number;
};

export default function ArcSection({ arcs, cardsToShow, }: ArcSectionProps) {
  const [arcStartIndex, setArcStartIndex] = useState(0);
  const [searchArc, setSearchArc] = useState("");
  const [selectedArcCharacter, setSelectedArcCharacter] = useState("");
  const [selectedArcContinuity, setSelectedArcContinuity] = useState("");
  const [selectedArcEpisodeRange, setSelectedArcEpisodeRange] = useState("");
  const [selectedArcChapterRange, setSelectedArcChapterRange] = useState("");
  const [isArcCharacterDropdownOpen, setIsArcCharacterDropdownOpen,] = useState(false);
  const [isArcContinuityDropdownOpen, setIsArcContinuityDropdownOpen,] = useState(false);
  const [isArcEpisodeDropdownOpen, setIsArcEpisodeDropdownOpen,] = useState(false);
  const [isArcChapterDropdownOpen, setIsArcChapterDropdownOpen,] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;


  const filteredArcs = arcs.filter((arc) => {
    const lowerArc = arc.name.toLowerCase();
    const lowerQuery = searchArc.toLowerCase();
    const matchesSearch = lowerArc.includes(lowerQuery);
    const matchesCharacter = selectedArcCharacter === "" || arc.main_characters.some((character) => character.toLowerCase().includes(selectedArcCharacter.toLowerCase()));

    if (matchesSearch && matchesCharacter) {
      return true;
    } else {
      return false;
    }
  });

  const showNextArc = () => {
    const maxStartIndex = filteredArcs.length - cardsToShow;

    if (arcStartIndex + cardsToShow < maxStartIndex) {
      setArcStartIndex(arcStartIndex + cardsToShow);
    } else {
      setArcStartIndex(Math.max(0, maxStartIndex));
    }
  };

  const showPreviousArc = () => {
    if (arcStartIndex - cardsToShow >= 0) {
      setArcStartIndex(arcStartIndex - cardsToShow);
    } else {
      setArcStartIndex(0);
    }
  };

  const clearArcFilters = () => {
    setSearchArc("");
    setSelectedArcCharacter("");
    setArcStartIndex(0);
  };

  useEffect(() => {
    setArcStartIndex(0);
  }, [searchArc, selectedArcCharacter]);

  return (
    <div className="scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-36 mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="arc-section">
      <div className="flex items-center justify-center gap-4 w-full">
        <div className="w-[90%] relative py-4 -my-4 px-2 -mx-2 md:flex-col 2xl:flex-row">
          <div className="relative">
            <button onClick={showPreviousArc} className="p-2 absolute -left-10 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%] z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2">
              <ChevronLeft className="cursor-pointer" size={40} />
            </button>

            <div className="overflow-hidden py-4 -my-4 px-2 -mx-2">
              <div className="flex">
                <div>
                  <MoonStar className="w-13 h-13 text-[#f89c0a]" />
                  <div className="w-[80%] mt-2 h-[2px] bg-zinc-700 mx-auto" />
                </div>

                <div className="ml-3 mb-5">
                  <p className="text-white text-5xl font-banner">ARCS</p>
                  <p className="text-zinc-400">Browse and explore all story arcs from the world of Soul Eater.</p>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-center gap-4 min-[1800px]:flex-nowrap">
                <div className="order-1 flex min-w-0 md:flex-1 border-zinc-800 border-2 p-1 rounded-md hover:border-[#f89c0a] w-full transition duration-300 ease-in-out min-[1800px]:flex-none min-[1800px]:w-[15%]">
                  <Search className="text-zinc-300 mr-2 ml-1 mt-[3px]" size={18} />
                  <input value={searchArc} onChange={(event) => setSearchArc(event.target.value)} className="w-full mt-[1px] outline-none border-none bg-transparent" type="text" placeholder="Search arcs..." />
                </div>

                <div className="order-2 min-w-0 md:flex-1 shrink-0 hover:text-white min-[1800px]:order-3 min-[1800px]:flex-none w-full min-[1800px]:w-auto">
                  <button onClick={clearArcFilters} className="group text-sm flex justify-center gap-2 rounded-md p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out w-full">
                    <FunnelX className="group-hover:text-white text-[#f89c0a]" size={20} />
                    Clear Filters
                  </button>
                </div>

                <div className="order-3 grid grid-cols-1 basis-full min-w-0 items-center gap-4 md:grid-cols-2 xl:grid-cols-4 min-[1800px]:order-2 min-[1800px]:flex min-[1800px]:basis-auto min-[1800px]:flex-1 min-[1800px]:flex-nowrap">
                  <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Character:</p>

                    <button type="button" onClick={() => setIsArcCharacterDropdownOpen((current) => !current)} className="flex flex-1 min-w-0 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedArcCharacter || "All"}</p>
                      <ChevronRight size={18} className={`shrink-0 transition-transform ${isArcCharacterDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isArcCharacterDropdownOpen && (
                      <button type="button" onClick={() => setIsArcCharacterDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" />
                    )}

                    {isArcCharacterDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-20 top-12 z-[100] max-h-64 w-full sm:w-[80%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedArcCharacter(""); setIsArcCharacterDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedArcCharacter === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                            All
                          </button>

                          {arcCharacters.map((character) => (
                            <button key={character} type="button" onClick={() => { setSelectedArcCharacter(character); setIsArcCharacterDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedArcCharacter === character ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {character}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Continuity:</p>

                    <button type="button" onClick={() => setIsArcContinuityDropdownOpen((current) => !current)} className="flex flex-1 min-w-0 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate"> {selectedArcContinuity || "All"}</p>
                      <ChevronRight size={18} className={`shrink-0 transition-transform ${isArcContinuityDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isArcContinuityDropdownOpen && (
                      <button type="button" onClick={() => setIsArcContinuityDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default"></button>
                    )}

                    {isArcContinuityDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-20 top-12 z-[100] max-h-64 w-full sm:w-[80%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedArcContinuity(""); setIsArcContinuityDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedArcContinuity === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                            All
                          </button>

                          {arcContinuities.map((continuity) => (
                            <button key={continuity} type="button" onClick={() => { setSelectedArcContinuity(continuity); setIsArcContinuityDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedArcContinuity === continuity ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {continuity}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Episodes:</p>

                    <button type="button" onClick={() => setIsArcEpisodeDropdownOpen((current) => !current)} className="flex flex-1 min-w-0 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedArcEpisodeRange || "All"}</p>
                      <ChevronRight size={18} className={`shrink-0 transition-transform ${isArcEpisodeDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isArcEpisodeDropdownOpen && (
                      <button type="button" onClick={() => setIsArcEpisodeDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" />
                    )}

                    {isArcEpisodeDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-20 top-12 z-[100] max-h-64 w-full sm:w-[80%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedArcEpisodeRange(""); setIsArcEpisodeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedArcEpisodeRange === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`} >
                            All
                          </button>

                          {arcEpisodeRanges.map((range) => (
                            <button key={range} type="button" onClick={() => { setSelectedArcEpisodeRange(range); setIsArcEpisodeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedArcEpisodeRange === range ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {range}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                    <p className="shrink-0 text-md font-semibold">Chapters:</p>
                    <button type="button" onClick={() => setIsArcChapterDropdownOpen((current) => !current)} className="flex flex-1 min-w-0 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                      <p className="truncate">{selectedArcChapterRange || "All"}</p>
                      <ChevronRight size={18} className={`shrink-0 transition-transform ${isArcChapterDropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    {isArcChapterDropdownOpen && (
                      <button type="button" onClick={() => setIsArcChapterDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" />
                    )}

                    {isArcChapterDropdownOpen && (
                      <div className="role-scrollbar absolute left-0 sm:left-20 top-12 z-[100] max-h-64 w-full sm:w-[80%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                        <div className="grid grid-cols-1 gap-1">
                          <button type="button" onClick={() => { setSelectedArcChapterRange(""); setIsArcChapterDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedArcChapterRange === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                            All
                          </button>

                          {arcChapterRanges.map((range) => (
                            <button key={range} type="button" onClick={() => { setSelectedArcChapterRange(range); setIsArcChapterDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedArcChapterRange === range ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                              {range}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {filteredArcs.length === 0 && (
                <div className="flex items-center justify-center min-h-80 border border-zinc-800 rounded-lg">
                  <p className="text-zinc-400 text-lg">No arcs match the selected filters.</p>
                </div>
              )}

              {filteredArcs.length > 0 && (
                <div className="flex gap-6 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${arcStartIndex * 324}px)`, }}>
                  {filteredArcs.map((arc) => (
                    <div key={arc.id} className="relative flex w-75 shrink-0 flex-col bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                      <div className="relative w-full h-60 bg-zinc-950">
                        <Image src={arc.image_url || "/characters/characters-placeholder.png"} alt={`${arc.name} Arc Image`} fill className="object-cover object-top" />
                      </div>

                      <div className="absolute top-0 ml-2 mt-2 px-2 border-[#f89c0a] text-[#f8b40a] text-[19px] border-1 rounded-md bg-[#f89c0a]/10">
                        {arc.episodes ? (
                          <p className="font-banner">Episodes {arc.episodes}</p>
                        ) : (
                          <p className="font-banner">Chapters {arc.manga_chapters}</p>
                        )}
                      </div>

                      <div className="p-4 border-t border-zinc-800 h-40">
                        <p className="font-banner text-white text-2xl truncate">{arc.name}</p>

                        <p className="text-zinc-400 text-xs font-semibold">Status: {arc.status}</p>

                        {arc.episodes ? (
                          <p className="text-zinc-400 text-xs font-semibold">Episodes: {arc.episodes}</p>
                        ) : (
                          <p className="text-zinc-400 text-xs font-semibold">Episodes: Manga Only</p>
                        )}

                        {arc.manga_chapters ? (
                          <p className="text-zinc-400 text-xs font-semibold">Chapters: {arc.manga_chapters}</p>
                        ) : (
                          <p className="text-zinc-400 text-xs font-semibold">Chapters: Anime Only</p>
                        )}


                        <a target="_blank" rel="noopener noreferrer" href={`${API_URL}/arcs/${arc.id}`} className="flex justify-between mt-2 pt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]">
                          VIEW PROFILE<MoveRight className="-translate-y-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={showNextArc} className="p-2 z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2 absolute -right-12 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%]">
              <ChevronRight className="cursor-pointer" size={40} />
            </button>
          </div>
        </div>
      </div>

      <EndpointCard
        method="GET"
        path="/arcs"
        description="Returns all story arcs."
        example={arcExamples}
      />

      <EndpointCard
        method="GET"
        path="/arcs/{arc_id}"
        description="Returns an arc by id."
        parameter={{ location: "Path parameter", name: "arc_id", type: "integer", }}
        example={arcExamples[0]}
      />

      <EndpointCard
        method="GET"
        path="/arcs?name=Remedial Lessons"
        description="Filters arcs by name."
        parameter={{ location: "Query parameter", name: "name", type: "string", }}
        example={[arcExamples[1]]}
      />

      <EndpointCard
        method="GET"
        path="/arcs?characters=Mifune"
        description="Filters arcs by a main character."
        parameter={{ location: "Query parameter", name: "characters", type: "string", }}
        example={[arcExamples[2]]}
      />

      <EndpointCard
        method="GET"
        path="/arcs?status=Completed"
        description="Filters arcs by status."
        parameter={{ location: "Query parameter", name: "status", type: "string", }}
        example={arcExamples}
      />

      <EndpointCard
        method="GET"
        path="/arcs?continuity=Manga Only"
        description="Filters arcs by continuity."
        parameter={{ location: "Query parameter", name: "continuity", type: "string", }}
        example={[arcExamples[3]]}
      />

      <EndpointCard
        method="GET"
        path="/arcs?episode_range=Episodes 1-12"
        description="Filters arcs by their starting anime episode."
        parameter={{ location: "Query parameter", name: "episode_range", type: "string", }}
        example={[arcExamples[0], arcExamples[1], arcExamples[2],]}
      />

      <EndpointCard
        method="GET"
        path="/arcs?chapter_range=Chapters 0-25"
        description="Filters arcs by their starting manga chapter."
        parameter={{ location: "Query parameter", name: "chapter_range", type: "string", }}
        example={[arcExamples[0], arcExamples[1], arcExamples[2],]}
      />
    </div>

  );
}