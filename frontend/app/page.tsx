"use client"
import { useEffect, useState } from 'react';
import Image from "next/image";
import EndpointCard from "./components/EndpointCard"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { X, FunnelX, ChevronRight, ChevronLeft, BookOpen, School, User, Shield, Skull, Sword, Swords, Flame, MoonStar, BrickWallShield, MoveRight, Search } from 'lucide-react';
import { characterExamples, weaponExamples, abilityExamples, organizationExamples, arcExamples, } from "./data/apiExamples";
import LearnMoreModal from "./components/LearnMoreModal";
import type { Character, Weapon, Ability, Organization, Arc, } from "./types/api";
import { mainCharacterRoles, characterRoles, mainAffiliations, affiliations, mainCharacterSpecies, characterSpecies, characterStatuses, weaponTypes, weaponCategories, weaponAffiliations, weaponStatuses, abilityUsers, abilityTypes, organizationTypes, organizationLeaders, organizationStatuses, arcCharacters, arcContinuities, arcEpisodeRanges, arcChapterRanges, } from "./data/filterOptions";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import BrowseSections from "./components/BrowseSections";

export default function Home() {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [arcs, setArcs] = useState<Arc[]>([]);

  const [isOpen, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [searchCharacter, setSearchCharacter] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [weaponStartIndex, setWeaponStartIndex] = useState(0);
  const [searchWeapon, setSearchWeapon] = useState("");
  const [selectedWeaponType, setSelectedWeaponType] = useState("");
  const [selectedWeaponCategory, setSelectedWeaponCategory] = useState("");
  const [selectedWeaponAffiliation, setSelectedWeaponAffiliation] = useState("");
  const [selectedWeaponStatus, setSelectedWeaponStatus] = useState("");
  const [abilityStartIndex, setAbilityStartIndex] = useState(0);
  const [searchAbility, setSearchAbility] = useState("");
  const [selectedAbilityType, setSelectedAbilityType] = useState("");
  const [selectedAbilityUser, setSelectedAbilityUser] = useState("");
  const [organizationStartIndex, setOrganizationStartIndex] = useState(0);
  const [searchOrganization, setSearchOrganization] = useState("");
  const [selectedOrganizationType, setSelectedOrganizationType] = useState("");
  const [selectedOrganizationLeader, setSelectedOrganizationLeader] = useState("");
  const [selectedOrganizationStatus, setSelectedOrganizationStatus] = useState("");
  const [arcStartIndex, setArcStartIndex] = useState(0);
  const [searchArc, setSearchArc] = useState("");
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const [selectedAffiliation, setSelectedAffiliation] = useState("");
  const [isAffiliationDropdownOpen, setIsAffiliationDropdownOpen] = useState(false);

  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [isSpeciesDropdownOpen, setIsSpeciesDropdownOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const [isWeaponTypeDropdownOpen, setIsWeaponTypeDropdownOpen] = useState(false);
  const [isWeaponCategoryDropdownOpen, setIsWeaponCategoryDropdownOpen] = useState(false);
  const [isWeaponAffiliationDropdownOpen, setIsWeaponAffiliationDropdownOpen,] = useState(false);
  const [isWeaponStatusDropdownOpen, setIsWeaponStatusDropdownOpen] = useState(false);

  const [isAbilityTypeDropdownOpen, setIsAbilityTypeDropdownOpen] = useState(false);
  const [isAbilityUserDropdownOpen, setIsAbilityUserDropdownOpen] = useState(false);

  const [isOrganizationStatusDropdownOpen, setIsOrganizationStatusDropdownOpen] = useState(false);
  const [isOrganizationTypeDropdownOpen, setIsOrganizationTypeDropdownOpen] = useState(false);
  const [isOrganizationLeaderDropdownOpen, setIsOrganizationLeaderDropdownOpen] = useState(false);

  const [selectedArcCharacter, setSelectedArcCharacter] = useState("");
  const [selectedArcContinuity, setSelectedArcContinuity] = useState("");
  const [selectedArcEpisodeRange, setSelectedArcEpisodeRange] = useState("");
  const [selectedArcChapterRange, setSelectedArcChapterRange] = useState("");

  const [isArcCharacterDropdownOpen, setIsArcCharacterDropdownOpen] = useState(false);
  const [isArcContinuityDropdownOpen, setIsArcContinuityDropdownOpen] = useState(false);
  const [isArcEpisodeDropdownOpen, setIsArcEpisodeDropdownOpen] = useState(false);
  const [isArcChapterDropdownOpen, setIsArcChapterDropdownOpen] = useState(false);

  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);


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

  const clearFilter = () => {
    setSelectedRole("");
    setSearchCharacter("");
    setSelectedAffiliation("");
    setSelectedSpecies("");
    setSelectedStatus("");
    setStartIndex(0);
  }

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

  const filteredOrganizations = organizations.filter((organization) => {
    const lowerOrganization = organization.name.toLowerCase();
    const lowerQuery = searchOrganization.toLowerCase();
    const matchesSearch = lowerOrganization.includes(lowerQuery);
    const matchesOrganizationType = selectedOrganizationType === "" || organization.organization_type.toLowerCase().includes(selectedOrganizationType.toLowerCase());

    const matchesLeader = selectedOrganizationLeader === "" || organization.leader.toLowerCase().includes(selectedOrganizationLeader.toLowerCase());

    const matchesStatus = selectedOrganizationStatus === "" || organization.status.toLowerCase().includes(selectedOrganizationStatus.toLowerCase());

    if (matchesSearch && matchesOrganizationType && matchesLeader && matchesStatus) {
      return true;
    } else {
      return false;
    }
  });

  const showNextOrganization = () => {
    const maxStartIndex = filteredOrganizations.length - cardsToShow;

    if (organizationStartIndex + cardsToShow < maxStartIndex) {
      setOrganizationStartIndex(organizationStartIndex + cardsToShow);
    } else {
      setOrganizationStartIndex(Math.max(0, maxStartIndex));
    }
  };

  const showPreviousOrganization = () => {
    if (organizationStartIndex - cardsToShow >= 0) {
      setOrganizationStartIndex(organizationStartIndex - cardsToShow);
    } else {
      setOrganizationStartIndex(0);
    }
  };

  const clearOrganizationFilters = () => {
    setSearchOrganization("");
    setSelectedOrganizationType("");
    setSelectedOrganizationLeader("");
    setSelectedOrganizationStatus("");
    setOrganizationStartIndex(0);
  };

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
    setStartIndex(0);
  }, [searchCharacter, selectedRole, selectedAffiliation, selectedSpecies, selectedStatus]);

  useEffect(() => {
    setWeaponStartIndex(0);
  }, [searchWeapon, selectedWeaponType, selectedWeaponCategory, selectedWeaponAffiliation, selectedWeaponStatus]);

  useEffect(() => {
    setAbilityStartIndex(0);
  }, [searchAbility, selectedAbilityType, selectedAbilityUser]);

  useEffect(() => {
    setOrganizationStartIndex(0);
  }, [searchOrganization, selectedOrganizationType, selectedOrganizationLeader, selectedOrganizationStatus]);

  useEffect(() => {
    setArcStartIndex(0);
  }, [searchArc, selectedArcCharacter]);

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
    fetch("http://127.0.0.1:8000/abilities")
      .then((result) => result.json())
      .then((data) => {
        const randomizedAbilities = [...data].sort(() => Math.random() - 0.5);
        setAbilities(randomizedAbilities);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/organizations")
      .then((result) => result.json())
      .then((data) => {
        const randomizedOrganizations = [...data].sort(() => Math.random() - 0.5);
        setOrganizations(randomizedOrganizations);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/arcs")
      .then((result) => result.json())
      .then((data) => {
        const sortedArcs = [...data].sort((a, b) => a.id - b.id);
        setArcs(sortedArcs);
      });
  }, []);



  return (
    <div className="bg-black" id="home-section">
      <Navbar />
      <HeroSection onLearnMore={() => setIsLearnMoreOpen(true)} />
      <StatsSection />
      <BrowseSections />

      <div className="flex-1 flex flex-col gap-16">
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

                            <a target="_blank" href={`http://127.0.0.1:8000/characters/${character.id}`} className="flex justify-between mt-auto pt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]">VIEW PROFILE<MoveRight className="-translate-y-1" />
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

                            <a target="_blank" rel="noopener noreferrer" href={`http://127.0.0.1:8000/abilities/${ability.id}`} className="flex justify-between mt-auto pt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]" >
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


        <div className="scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-36 mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="organization-section">
          <div className="flex items-center justify-center gap-4 w-full">
            <div className="w-[90%] relative py-4 -my-4 px-2 -mx-2 md:flex-col 2xl:flex-row">
              <div className="relative">
                <button onClick={showPreviousOrganization} className="p-2 absolute -left-10 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%] z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2">
                  <ChevronLeft className="cursor-pointer" size={40} />
                </button>

                <div className="overflow-hidden py-4 -my-4 px-2 -mx-2">
                  <div className="flex">
                    <div>
                      <School className="w-13 h-13 text-[#f89c0a]" />
                      <div className="w-[80%] mt-2 h-[2px] bg-zinc-700 mx-auto" />
                    </div>

                    <div className="ml-3 mb-5">
                      <p className="text-white text-5xl font-banner">ORGANIZATIONS</p>
                      <p className="text-zinc-400">Browse and explore all organizations from the world of SoulEater.</p>
                    </div>
                  </div>

                  <div className="mb-5 flex flex-wrap items-center gap-4 min-[1800px]:flex-nowrap">
                    <div className="order-1 flex min-w-0 md:flex-1 border-zinc-800 border-2 p-1 rounded-md hover:border-[#f89c0a] w-full transition duration-300 ease-in-out min-[1800px]:flex-none min-[1800px]:w-[15%]">
                      <Search className="text-zinc-300 mr-2 ml-1 mt-[3px]" size={18} />
                      <input value={searchOrganization} onChange={(event) => setSearchOrganization(event.target.value)} className="w-full mt-[1px] outline-none border-none bg-transparent" type="text" placeholder="Search organizations..."></input>
                    </div>

                    <div className="order-2 min-w-0 md:flex-1 shrink-0 hover:text-white min-[1800px]:order-3 min-[1800px]:flex-none w-full min-[1800px]:w-auto">
                      <button onClick={clearOrganizationFilters} className="group text-sm flex justify-center gap-2 rounded-md p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out w-full">
                        <FunnelX className="group-hover:text-white text-[#f89c0a]" size={20} />
                        Clear Filters
                      </button>
                    </div>

                    <div className="order-3 grid grid-cols-1 basis-full min-w-0 items-center gap-4 md:grid-cols-2 xl:grid-cols-3 min-[1800px]:order-2 min-[1800px]:flex min-[1800px]:basis-auto min-[1800px]:flex-1 min-[1800px]:flex-nowrap">
                      <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                        <p className="shrink-0 text-md font-semibold">Type:</p>

                        <button type="button" onClick={() => setIsOrganizationTypeDropdownOpen((current) => !current)} className="flex flex-1 min-w-0 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                          <p className="truncate">{selectedOrganizationType || "All"}</p>
                          <ChevronRight size={18} className={`shrink-0 transition-transform ${isOrganizationTypeDropdownOpen ? "rotate-90" : ""}`} />
                        </button>

                        {isOrganizationTypeDropdownOpen && (
                          <button type="button" onClick={() => setIsOrganizationTypeDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default"></button>
                        )}

                        {isOrganizationTypeDropdownOpen && (
                          <div className="role-scrollbar absolute left-0 sm:left-12 top-12 z-[100] max-h-64 w-full sm:w-[85%] md:w-full overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                            <div className="grid grid-cols-1 gap-1">
                              <button type="button" onClick={() => { setSelectedOrganizationType(""); setIsOrganizationTypeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationType === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                                All
                              </button>

                              {organizationTypes.map((type) => (
                                <button key={type} type="button" onClick={() => { setSelectedOrganizationType(type); setIsOrganizationTypeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationType === type ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                        <p className="shrink-0 text-md font-semibold">Leader:</p>
                        <button type="button" onClick={() => setIsOrganizationLeaderDropdownOpen((current) => !current)} className="flex flex-1 min-w-0 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                          <p className="truncate">{selectedOrganizationLeader || "All"}</p>
                          <ChevronRight size={18} className={`shrink-0 transition-transform ${isOrganizationLeaderDropdownOpen ? "rotate-90" : ""}`} />
                        </button>

                        {isOrganizationLeaderDropdownOpen && (
                          <button type="button" onClick={() => setIsOrganizationLeaderDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default"></button>
                        )}

                        {isOrganizationLeaderDropdownOpen && (
                          <div className="role-scrollbar absolute left-0 sm:left-12 md:left-18 top-12 z-[100] w-full sm:w-[85%] md:w-[70%] lg:w-[80%] max-h-64 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                            <div className="grid grid-cols-1 gap-1">
                              <button type="button" onClick={() => { setSelectedOrganizationLeader(""); setIsOrganizationLeaderDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationLeader === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                                All
                              </button>

                              {organizationLeaders.map((leader) => (
                                <button key={leader} type="button" onClick={() => { setSelectedOrganizationLeader(leader); setIsOrganizationLeaderDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationLeader === leader ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                                  {leader}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative flex min-w-0 md:flex-1 items-center rounded-md bg-black text-zinc-400 gap-2">
                        <p className="shrink-0 text-md font-semibold">Status:</p>

                        <button type="button" onClick={() => setIsOrganizationStatusDropdownOpen((current) => !current)} className="flex flex-1 min-w-0 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                          <p className="truncate">{selectedOrganizationStatus || "All"}</p>
                          <ChevronRight size={18} className={`shrink-0 transition-transform ${isOrganizationStatusDropdownOpen ? "rotate-90" : ""}`} />
                        </button>

                        {isOrganizationStatusDropdownOpen && (
                          <button type="button" onClick={() => setIsOrganizationStatusDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default"></button>
                        )}

                        {isOrganizationStatusDropdownOpen && (
                          <div className="role-scrollbar absolute left-0 sm:left-12 md:left-18 top-12 z-[100] w-full sm:w-[85%] md:w-[70%] lg:w-[80%] max-h-64 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                            <div className="grid grid-cols-1 gap-1">
                              <button type="button" onClick={() => { setSelectedOrganizationStatus(""); setIsOrganizationStatusDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationStatus === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                                All
                              </button>

                              {organizationStatuses.map((status) => (
                                <button key={status} type="button" onClick={() => { setSelectedOrganizationStatus(status); setIsOrganizationStatusDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedOrganizationStatus === status ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {filteredOrganizations.length === 0 && (
                    <div className="flex items-center justify-center min-h-80 border border-zinc-800 rounded-lg">
                      <p className="text-zinc-400 text-lg">No organizations match the selected filters.</p>
                    </div>
                  )}

                  {filteredOrganizations.length > 0 && (
                    <div className="flex gap-6 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${organizationStartIndex * 324}px)`, }}>
                      {filteredOrganizations.map((organization) => (
                        <div key={organization.id} className="relative flex w-75 shrink-0 flex-col bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                          <div className="relative w-full h-60 bg-zinc-950">
                            <Image src={organization.image_url || "/organizations/organizations-placeholder.png"} alt={`${organization.name} organization`} fill className="object-cover object-top" />
                          </div>

                          <div className="absolute top-0 ml-2 mt-2 px-2 border-[#f89c0a] text-[#f8b40a] text-[19px] border-1 rounded-md bg-[#f89c0a]/10">
                            <p className="font-banner">{organization.display_type}</p>
                          </div>

                          <div className="flex flex-1 flex-col p-4 border-t border-zinc-800">
                            <h2 className="font-banner text-white text-2xl">{organization.name}</h2>
                            <p className="text-zinc-400 text-xs font-semibold">Type: {organization.display_type}</p>
                            <p className="text-zinc-400 text-xs font-semibold">Leader: {organization.leader}</p>
                            <p className="text-zinc-400 text-xs font-semibold">Location: {organization.location}</p>
                            <p className="text-zinc-400 text-xs font-semibold">Status: {organization.status}</p>
                            <a target="_blank" rel="noopener noreferrer" href={`http://127.0.0.1:8000/organizations/${organization.id}`} className="flex justify-between mt-auto pt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]">
                              VIEW PROFILE <MoveRight className="-translate-y-1" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button onClick={showNextOrganization} className="p-2 z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2 absolute -right-12 top-1/2 translate-y-[275%] sm:translate-y-[250%] md:translate-y-[95%] lg:translate-y-[85%] xl:translate-y-[50%] 2xl:translate-y-[30%]">
                  <ChevronRight className="cursor-pointer" size={40} />
                </button>
              </div>
            </div>
          </div>

          <EndpointCard
            method="GET"
            path="/organizations"
            description="Returns all organizations."
            example={organizationExamples}
          />

          <EndpointCard
            method="GET"
            path="/organizations/{organization_id}"
            description="Returns organization by id."
            parameter={{
              location: "Path parameter",
              name: "organization_id",
              type: "integer",
            }}
            example={organizationExamples[0]}
          />

          <EndpointCard
            method="GET"
            path="/organizations?name=Death Weapon Meister Academy"
            description="Filters organizations by name."
            parameter={{
              location: "Query parameter",
              name: "name",
              type: "string",
            }}
            example={[organizationExamples[0]]}
          />

          <EndpointCard
            method="GET"
            path="/organizations?organization_type=Educational Institution and International Defense Organization"
            description="Filters organizations by type."
            parameter={{
              location: "Query parameter",
              name: "organization_type",
              type: "string",
            }}
            example={[organizationExamples[0]]}
          />

          <EndpointCard
            method="GET"
            path="/organizations?leader=Lord Death"
            description="Filters organizations by leader."
            parameter={{
              location: "Query parameter",
              name: "leader",
              type: "string",
            }}
            example={[organizationExamples[0]]}
          />

          <EndpointCard
            method="GET"
            path="/organizations?location=Death City"
            description="Filters organizations by location."
            parameter={{
              location: "Query parameter",
              name: "location",
              type: "string",
            }}
            example={[organizationExamples[0]]}
          />

          <EndpointCard
            method="GET"
            path="/organizations?status=Active"
            description="Filters organizations by status."
            parameter={{
              location: "Query parameter",
              name: "status",
              type: "string",
            }}
            example={[organizationExamples[0]]}
          />
        </div>

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


                            <a target="_blank" rel="noopener noreferrer" href={`http://127.0.0.1:8000/arcs/${arc.id}`} className="flex justify-between mt-2 pt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]">
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

      </div>

      <LearnMoreModal isOpen={isLearnMoreOpen} onClose={() => setIsLearnMoreOpen(false)} />

      <Footer />

    </div >


  );
}