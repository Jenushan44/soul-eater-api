"use client"
import { useEffect, useState } from 'react';
import Image from "next/image";
import EndpointCard from "./components/EndpointCard"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { FunnelX, ChevronRight, ChevronLeft, BookOpen, School, User, Shield, Skull, Sword, Swords, Flame, MoonStar, BrickWallShield, MoveRight, Search } from 'lucide-react';
import Link from 'next/link';
import { characterExamples, weaponExamples, abilityExamples, organizationExamples, arcExamples, } from "./data/apiExamples";

type Character = {
  id: number;
  name: string;
  role: string;
  affiliation: string;
  description: string;
  image_url: string | null;
  species: string;
  sex: string;
  soul_type: string;
  status: string;
  occupations: string[];
  partners: string[];
  abilities: string[];
  debut: string;
  continuity: string;
};

type Weapon = {
  id: number;
  name: string;
  weapon_type: string;
  weapon_category: string;
  meister: string[];
  affiliation: string;
  abilities: string[];
  description: string;
  status: string;
  image_url: string | null;
  continuity: string;
};

type Ability = {
  id: number;
  name: string;
  category: string;
  users: string[][];
  description: string;
  continuity: string;
  image_url?: string;
};

type Organization = {
  id: number;
  name: string;
  organization_type: string;
  display_type: string;
  leader: string;
  location: string;
  status: string;
  description: string;
  image_url?: string;
};

type Arc = {
  id: number;
  name: string;
  episodes: string;
  manga_chapters: string;
  main_characters: string[];
  description: string;
  image_url?: string;
}

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
  const [selectedArcCharacter, setSelectedArcCharacter] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState(true);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const [selectedAffiliation, setSelectedAffiliation] = useState("");
  const [isAffiliationDropdownOpen, setIsAffiliationDropdownOpen] = useState(false);

  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [isSpeciesDropdownOpen, setIsSpeciesDropdownOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

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

  const mainCharacterRoles = [
    "Meister",
    "Demon Weapon",
    "Death Scythe",
    "Witch",
    "Grim Reaper",
    "Kishin",
    "Sorcerer",
    "Werewolf",
    "Demon",
  ]

  const characterRoles = [...mainCharacterRoles, "Other"];

  const mainAffiliations = [
    "Death Weapon Meister Academy",
    "Arachnophobia",
    "Witch Order",
    "Book of Eibon",
    "Medusa's Faction",
    "Eight Reaper Legions",
  ];

  const affiliations = [...mainAffiliations, "Other"];

  const mainCharacterSpecies = [
    "Human",
    "Demon Weapon",
    "Witch",
    "Grim Reaper",
    "Werewolf",
    "Sorcerer",
    "Demon",
  ];

  const characterStatuses = [
    "Active",
    "Alive",
    "Deceased",
    "Inactive",
    "Unknown",
    "Fused with Crona",
  ];

  const characterSpecies = [...mainCharacterSpecies, "Other"];

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

  const abilityUsers = [
    "Akane Hoshi",
    "Alexandre",
    "Alone",
    "Arachne Gorgon",
    "Asura",
    "Azusa Yumi",
    "Black☆Star",
    "Blair",
    "Boris Factory Clown",
    "Crona",
    "Death the Kid",
    "Dengu Dinga",
    "Eibon",
    "Eruka Frog",
    "Excalibur",
    "Feodor",
    "Fire",
    "Flying Dutchman",
    "Franken Stein",
    "Free",
    "Gigant",
    "Giriko",
    "Gopher",
    "Grand Witch",
    "Gravestone",
    "Great Old One of Power",
    "Harvar D. Éclair",
    "Hellworm",
    "Hero",
    "House Hoshi",
    "Inca Kasugatani",
    "Jacqueline O'Lantern Dupré",
    "Jester Clown",
    "Jinn Galland",
    "Joe Buttataki",
    "Justin Law",
    "Kaguya",
    "Kim Diehl",
    "Kimial Diehl",
    "Kirikou Rung",
    "Little Ogre",
    "Liz Thompson",
    "Lord Death",
    "Maba",
    "Maka Albarn",
    "Marie Mjolnir",
    "Masamune Nakatsukasa",
    "Medusa Gorgon",
    "Meme Tatane",
    "Mifune",
    "Mizune Family",
    "Moonlight",
    "Mosquito",
    "Nakatsukasa Clan",
    "Nals Garner",
    "Noah (Greed)",
    "Noah (Wrath)",
    "Ox Ford",
    "Patty Thompson",
    "Ponera",
    "Ragnarok",
    "Ryūku (Possessed)",
    "Shaula Gorgon",
    "Sid Barrett",
    "Sky Whale",
    "Sofia Ressa Valk",
    "Sofia Ressa Valk II",
    "Soul Eater Evans",
    "Spirit Albarn",
    "Tabatha Butterfly",
    "Tanuki Witches",
    "Taruho Firefly",
    "Tezca Tlipoca",
    "Thunder",
    "Tsar Pushka",
    "Tsubaki Nakatsukasa",
    "Tsumigi Harudori",
    "White Rabbit",
    "Witch Judge",
    "Zubaidah",
  ];

  const abilityTypes = [
    "Weapon Ability",
    "Soul Ability",
    "Soul Resonance",
    "Magic",
    "Reaper Power",
    "Book of Eibon Ability",
    "Black Blood",
    "Martial Art",
    "Sensory Ability",
    "Support Ability",
    "Defense Ability",
    "Sword Technique",
    "Madness",
  ];

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
      <div className="relative flex h-[680px] xl:h-[760px] 2xl:h-[850px] w-full justify-end overflow-hidden">
        <Image src="/Soul-Eater-Medusa-Banner.png" alt="Banner" width={1000} height={300} className="w-[60%] h-full object-cover object-right" priority></Image>
        <div className="absolute inset-y-0 left-0 w-[85%] bg-gradient-to-r from-black via-black/100 to-transparent pointer-events-none" />
        <div className="absolute left-[2%] top-1/2 z-10 -translate-y-1/2">
          <p className="font-banner tracking-[0.5em] text-[#f89c0a] text-[15px] md:text-[20px] lg:text-[30px] xl:text-[50px] 2xl:text-[50px]">WELCOME TO THE</p>
          <p className="font-banner text-[60px] md:text-[80px] lg:text-[150px] xl:text-[180px] 2xl:text-[220px] leading-[0.8] mt-3">SOUL EATER</p>
          <p className="font-banner text-[60px] md:text-[80px] lg:text-[150px] xl:text-[180px] 2xl:text-[220px] leading-[0.8] text-[#f89c0a] mt-2 mb-2">API</p>
          <p className="font-semibold mb-5 max-w-[650px] text-[15px] md:text-[18px] lg:text-[20px] xl:text-[23px] 2xl:text-[25px]">A comprehensive REST API for Soul Eater, providing structured data on characters, weapons, abilities, organizations, and story arcs.</p>
          <div className="flex items-center md:gap-8">
            <button className="w-[275px] font-semibold cursor-pointer text-black p-3 2xl:py-5 2xl:text-[25px] xl:text-[20px] flex items-center justify-between border-2 border-black rounded-xl rounded-sm bg-[#f89c0a] hover:bg-black hover:border-[#f89c0a] hover:text-[#f89c0a] pl-5 transition-all duration-300 hover:-translate-y-1 hover:scale-110">EXPLORE API <ChevronRight width={30} height={30} className='font-bold stroke-[3]' /></button>
            <button className="w-[275px] font-semibold flex items-center justify-between cursor-pointer text-[#f89c0a] p-3 2xl:py-5 2xl:text-[25px] xl:text-[20px] border border-[#f89c0a] rounded-xl hover:bg-[#f89c0a] hover:border-black hover:text-black pl-5 transition-all duration-300 hover:-translate-y-1 hover:scale-110">LEARN MORE <ChevronRight width={30} height={30} className='font-bold stroke-[3]' /></button>
          </div>
        </div>
      </div>


      <div className="mx-5 grid grid-cols-2 gap-4 rounded-lg border-3 border-zinc-800 bg-black/70 p-4 md:grid-cols-3 xl:grid-cols-5 xl:gap-0">
        <div className="flex items-center justify-center gap-3 rounded-lg border border-zinc-800 py-4 xl:rounded-none xl:border-y-0 xl:border-l-0 xl:border-r">
          <User className="h-12 w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" fill="#f89c0a" stroke="#000000" strokeWidth={1.5} />

          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">60+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">CHARACTERS</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 rounded-lg border border-zinc-800 py-4 xl:rounded-none xl:border-y-0 xl:border-l-0 xl:border-r">
          <Swords className="h-12 w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" fill="#000000" stroke="#f89c0a" strokeWidth={1.5} />

          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">20+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">WEAPONS</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 rounded-lg border border-zinc-800 py-4 xl:rounded-none xl:border-y-0 xl:border-l-0 xl:border-r">
          <Flame className="h-12 w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" fill="#f89c0a" stroke="#000000" strokeWidth={1.5} />
          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">190+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">ABILITIES</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 rounded-lg border border-zinc-800 py-4 xl:rounded-none xl:border-y-0 xl:border-l-0 xl:border-r">
          <BrickWallShield className="h-12 w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" fill="#f89c0a" stroke="#000000" strokeWidth={1.5} />
          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">5+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">ORGANIZATIONS</p>
          </div>
        </div>


        <div className="col-span-2 flex items-center justify-center gap-3 rounded-lg border border-zinc-800 py-4 md:col-span-1 xl:rounded-none xl:border-0">
          <MoonStar className="h-12 w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16" fill="#f89c0a" stroke="#000000" strokeWidth={1.5} />
          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">20+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">ARCS</p>
          </div>
        </div>
      </div>

      <div className="sticky top-0 mt-5 z-200 w-full rounded-md border border-zinc-900 bg-black p-3 tracking-wide">
        <div className="flex items-center justify-between">
          <p className="text-[#f89c0a] text-[18px] font-bold tracking-widest px-3 mb-3 font-sans ml-5">BROWSE THE SECTIONS</p>
          <button type="button" onClick={() => setIsBrowseOpen((current) => !current)} aria-expanded={isBrowseOpen} aria-label={isBrowseOpen ? "Hide browse section" : "Show browse section"} className="flex mb-5 cursor-pointer items-center gap-2 rounded-md border border-zinc-800 mr-5 px-3 py-1.5 text-sm font-semibold text-zinc-400 transition-colors hover:border-[#f89c0a] hover:text-[#f89c0a]">{isBrowseOpen ? "Hide" : "Show"}
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

      <div className="flex-1 flex flex-col gap-16">
        <div className="mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="character-section">

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
                          <button type="button" onClick={() => setIsRoleDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" aria-label="Close role dropdown" />
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
                          <button type="button" onClick={() => setIsAffiliationDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" aria-label="Close role dropdown" />
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
                          <button type="button" onClick={() => setIsSpeciesDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" aria-label="Close role dropdown" />
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
                          <button type="button" onClick={() => setIsStatusDropdownOpen(false)} className="fixed inset-0 z-[90] cursor-default" aria-label="Close role dropdown" />
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
            path="/characters?continuity=Manga %26 Anime"
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
        <div className="mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="weapon-section">
          <div className="flex items-center justify-center gap-4 w-full">
            <button onClick={showPreviousWeapon} className="p-2 translate-x-[40px] translate-y-[50px] z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2 disabled:opacity-40 disabled:cursor-not-allowed"><ChevronLeft className="cursor-pointer" size={40} /></button>

            <div className="overflow-hidden w-[90%] py-4 -my-4 px-2 -mx-2">
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

              <div className="flex gap-4">
                <div className="flex border-zinc-800 border-2 p-1 mb-5 md:w-full w-[15%] rounded-md hover:border-[#f89c0a] transition duration-300 ease-in-out">
                  <Search className="text-zinc-300 mr-2 ml-1 mt-[3px]" size={18} />
                  <input value={searchWeapon} onChange={(event) => setSearchWeapon(event.target.value)} className="w-full mt-[1px] outline-none border-none bg-transparent" type="text" placeholder="Search weapons..." />
                </div>

                <div className="flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                  <p className="shrink-0 text-md font-semibold">Type:</p>
                  <select value={selectedWeaponType} onChange={(event) => setSelectedWeaponType(event.target.value)} className="p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none">
                    <option className="bg-zinc-950 text-zinc-400" value="">All</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Scythe">Scythe</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Pistol">Pistol</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Sword">Sword</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Spear">Spear</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Hammer">Hammer</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Guillotine">Guillotine</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Multi-Form">Multi-Form</option>
                  </select>
                </div>

                <div className="flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                  <p className="shrink-0 text-md font-semibold">Category:</p>

                  <select value={selectedWeaponCategory} onChange={(event) => setSelectedWeaponCategory(event.target.value)} className="p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none">
                    <option className="bg-zinc-950 text-zinc-400" value="">All</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Demon Weapon">Demon Weapon</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Death Scythe">Death Scythe</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Shadow Weapon">Shadow Weapon</option>
                  </select>
                </div>


                <div className="flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                  <p className="shrink-0 text-md font-semibold">Affiliation:</p>

                  <select value={selectedWeaponAffiliation} onChange={(event) => setSelectedWeaponAffiliation(event.target.value)} className="p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none">
                    <option className="bg-zinc-950 text-zinc-400" value="">All</option>
                    <option className="bg-zinc-950 text-zinc-400" value="DWMA">DWMA</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Spartoi">Spartoi</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Arachnophobia">Arachnophobia</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Independent">Independent</option>
                    <option className="bg-zinc-950 text-zinc-400" value="None">No Affiliation</option>
                  </select>
                </div>


                <div className="flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                  <p className="shrink-0 text-md font-semibold">Status:</p>

                  <select value={selectedWeaponStatus} onChange={(event) => setSelectedWeaponStatus(event.target.value)} className="p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none">
                    <option className="bg-zinc-950 text-zinc-400" value="">All</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Alive">Alive</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Deceased">Deceased</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Unknown">Unknown</option>
                    <option className="bg-zinc-950 text-zinc-400" value="Destroyed">Destroyed</option>
                  </select>
                </div>

                <div className="hover:text-white ml-auto md:w-full">
                  <button onClick={clearWeaponFilters} className="group text-sm flex gap-2 rounded-md p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out" >
                    <FunnelX className="group-hover:text-white text-[#f89c0a]" size={20} />Clear Filters
                  </button>
                </div>
              </div>


              {filteredWeapons.length === 0 && (
                <div className="flex items-center justify-center min-h-80 border border-zinc-800 rounded-lg">
                  <p className="text-zinc-400 text-lg">No weapons match the selected filters.</p>
                </div>
              )}


              {filteredWeapons.length > 0 && (
                <div className="flex gap-6 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${weaponStartIndex * 324}px)` }} >
                  {filteredWeapons.map((weapon) => (
                    <div key={weapon.id} className="relative w-75 shrink-0 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                      <div className="relative w-full h-60 bg-zinc-950">
                        <Image src={weapon.image_url || "/characters/characters-placeholder.png"} alt={`${weapon.name} image`} fill className="object-cover" />
                      </div>

                      <div className="absolute top-0 ml-2 mt-2 px-2 border-[#f89c0a] text-[#f8b40a] text-[19px] border-1 rounded-md bg-[#f89c0a]/10">
                        <p className="font-banner">{weapon.weapon_category}</p>
                      </div>

                      <div className="p-4 border-t border-zinc-800">
                        <p className="font-banner text-white text-2xl">{weapon.name}</p>
                        <p className="text-zinc-400 text-xs font-semibold">{weapon.weapon_type}</p>

                        <a target="_blank" rel="noopener noreferrer" href={`http://127.0.0.1:8000/weapons/${weapon.id}`} className="flex justify-between mt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]" >VIEW PROFILE<MoveRight className="-translate-y-1" /></a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={showNextWeapon} className="p-2 translate-x-[-30px] translate-y-[50px] rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2 disabled:opacity-40 disabled:cursor-not-allowed"><ChevronRight className="cursor-pointer" size={40} /></button>
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
            parameter={{ location: "Path parameter", name: "weapon_id", type: "integer" }}
            example={weaponExamples[0]}
          />

          <EndpointCard
            method="GET"
            path="/weapons?name=Nakatsukasa"
            description="Filters weapons by name."
            parameter={{ location: "Query parameter", name: "name", type: "string" }}
            example={weaponExamples[1]}
          />

          <EndpointCard
            method="GET"
            path="/weapons?weapon_type=Scythe"
            description="Filters weapons by weapon type."
            parameter={{ location: "Query parameter", name: "weapon_type", type: "string" }}
            example={[weaponExamples[0], weaponExamples[1]]}
          />

          <EndpointCard
            method="GET"
            path="/weapons?weapon_category=Death Scythe"
            description="Filters weapons by weapon category."
            parameter={{ location: "Query parameter", name: "weapon_category", type: "string" }}
            example={[weaponExamples[0], weaponExamples[1]]}
          />

          <EndpointCard
            method="GET"
            path="/weapons?meister=Franken"
            description="Filters weapons by Meister."
            parameter={{ location: "Query parameter", name: "meister", type: "string" }}
            example={[weaponExamples[0]]}
          />

          <EndpointCard
            method="GET"
            path="/weapons?affiliation=DWMA"
            description="Filters weapons by affiliation."
            parameter={{ location: "Query parameter", name: "affiliation", type: "string" }}
            example={weaponExamples}
          />
        </div>

        <div className="mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="ability-section">
          <div className="flex items-center justify-center gap-4 w-full">
            <button onClick={showPreviousAbility} className="p-2 translate-x-[40px] translate-y-[50px] z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2"><ChevronLeft className="cursor-pointer" size={40} /></button>

            <div className="overflow-hidden w-[90%] py-4 -my-4 px-2 -mx-2">
              <div className="flex">
                <div>
                  <p><Flame className="w-13 h-13 text-[#f89c0a]" /></p>
                  <div className="w-[80%] mt-2 h-[2px] bg-zinc-700 mx-auto" />
                </div>

                <div className="ml-3 mb-5">
                  <p className="text-white text-5xl font-banner">ABILITIES</p>
                  <p className="text-zinc-400">Browse and explore all abilities from the world of Soul Eater.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex border-zinc-800 cursor-pointer border-2 p-1 mb-5 w-[15%] rounded-md hover:border-[#f89c0a] hover:border-1 transition duration-300 ease-in-out">
                  <Search className="text-zinc-300 mr-2 ml-1 mt-[3px]" size={18} />
                  <input value={searchAbility} onChange={(event) => setSearchAbility(event.target.value)} className="w-full mt-[1px] outline-none cursor-pointer border-none" type="text" placeholder="Search abilities..." />
                </div>

                <div className="relative flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                  <p className="shrink-0 text-md font-semibold">Type:</p>

                  <button type="button" onClick={() => setIsTypeDropdownOpen((current) => !current)} className="flex w-48 items-center justify-between rounded-lg cursor-pointer border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                    <p className="truncate">{selectedAbilityType || "All"}</p>
                    <ChevronRight size={18} className={`transition-transform ${isTypeDropdownOpen ? "rotate-90" : ""}`} />
                  </button>

                  {isTypeDropdownOpen && (
                    <div className="absolute left-12 top-12 z-[100] w-[520px] rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                      <div className="grid grid-cols-3 gap-1">
                        <button type="button" onClick={() => { setSelectedAbilityType(""); setIsTypeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedAbilityType === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>All</button>

                        {abilityTypes.map((type) => (
                          <button key={type} type="button" onClick={() => { setSelectedAbilityType(type); setIsTypeDropdownOpen(false); }} className={`rounded-md px-3 py-2 text-left cursor-pointer text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedAbilityType === type ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>{type}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative mb-5 flex cursor-pointer items-center gap-2 rounded-md bg-black text-zinc-400">
                  <p className="shrink-0 text-md font-semibold">User:</p>

                  <button type="button" onClick={() => setIsUserDropdownOpen((current) => !current)} className="flex w-48 items-center cursor-pointer justify-between rounded-lg border border-zinc-800 bg-black p-2 text-sm font-medium text-white transition-colors hover:border-[#f89c0a]">
                    <p className="truncate">{selectedAbilityUser || "All"}</p>
                    <ChevronRight size={18} className={`transition-transform ${isUserDropdownOpen ? "rotate-90" : ""}`} />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute left-14 top-12 z-[100] max-h-[430px] w-[760px] overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
                      <div className="grid grid-cols-4 gap-1">
                        <button type="button" onClick={() => { setSelectedAbilityUser(""); setIsUserDropdownOpen(false); }} className={`rounded-md px-3 cursor-pointer py-2 text-left text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedAbilityUser === "" ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>All</button>

                        {abilityUsers.map((user) => (
                          <button key={user} type="button" onClick={() => { setSelectedAbilityUser(user); setIsUserDropdownOpen(false); }} className={`rounded-md px-3 py-2 cursor-pointer text-left text-sm transition-colors hover:bg-zinc-900 hover:text-[#f89c0a] ${selectedAbilityUser === user ? "bg-[#f89c0a]/10 text-[#f89c0a]" : "text-zinc-400"}`}>{user}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="hover:text-white ml-auto">
                  <button onClick={clearAbilityFilters} className="group text-sm flex gap-2 rounded-md cursor-pointer p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out"><FunnelX className="group-hover:text-white text-[#f89c0a]" size={20} />Clear Filters</button>
                </div>
              </div>

              {filteredAbilities.length === 0 && (
                <div className="flex items-center justify-center min-h-80 border border-zinc-800 rounded-lg">
                  <p className="text-zinc-400 text-lg">No abilities match the selected filters.</p>
                </div>
              )}

              {filteredAbilities.length > 0 && (
                <div className="flex gap-6 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${abilityStartIndex * 324}px)` }}>
                  {filteredAbilities.map((ability) => (
                    <div key={ability.id} className="relative w-75 shrink-0 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                      <div className="relative w-full h-60 bg-zinc-950">
                        <Image src={ability.image_url || "/characters/characters-placeholder.png"} alt="Ability Image" fill className="object-cover object-top" />
                      </div>

                      <div className="absolute top-0 ml-2 mt-2 px-2 border-[#f89c0a] text-[#f8b40a] text-[19px] border-1 rounded-md bg-[#f89c0a]/10">
                        <p className="font-banner">{ability.category}</p>
                      </div>

                      <div className="p-4 border-t border-zinc-800">
                        <h2 className="font-banner text-white text-2xl">{ability.name}</h2>
                        <p className="text-zinc-400 text-xs font-semibold">{ability.users.map((group) => group.join(" + ")).join(", ")}</p>
                        <a target="_blank" href={`http://127.0.0.1:8000/abilities/${ability.id}`} className="flex justify-between mt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]">VIEW PROFILE<MoveRight className="-translate-y-1" /></a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={showNextAbility} className="p-2 translate-x-[-30px] translate-y-[50px] rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2"><ChevronRight className="cursor-pointer" size={40} /></button>
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
            parameter={{ location: "Path parameter", name: "ability_id", type: "integer" }}
            example={abilityExamples[0]}
          />

          <EndpointCard
            method="GET"
            path="/abilities?name=Black Blood Manipulation"
            description="Filters abilities by name."
            parameter={{ location: "Query parameter", name: "name", type: "string" }}
            example={abilityExamples[3]}
          />

          <EndpointCard
            method="GET"
            path="/abilities?ability_type=Offensive"
            description="Filters abilities by ability type."
            parameter={{ location: "Query parameter", name: "ability_type", type: "string" }}
            example={[abilityExamples[2], abilityExamples[3]]}
          />

          <EndpointCard
            method="GET"
            path="/abilities?user=Franken"
            description="Filters abilities by user."
            parameter={{ location: "Query parameter", name: "user", type: "string" }}
            example={[abilityExamples[0], abilityExamples[2]]}
          />
        </div>


        <div className="mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="organization-section">
          <div className="flex items-center justify-center gap-4 w-full">
            <button onClick={showPreviousOrganization} className="p-2 translate-x-[40px] translate-y-[50px] z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2"><ChevronLeft className="cursor-pointer" size={40} /></button>

            <div className="overflow-hidden w-[90%] py-4 -my-4 px-2 -mx-2">
              <div className="flex">
                <div>
                  <p><School className="w-13 h-13 text-[#f89c0a]" /></p>
                  <div className="w-[80%] mt-2 h-[2px] bg-zinc-700 mx-auto" />
                </div>

                <div className="ml-3 mb-5">
                  <p className="text-white text-5xl font-banner">ORGANIZATIONS</p>
                  <p className="text-zinc-400">Browse and explore all organizations from the world of Soul Eater.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex border-zinc-800 border-2 p-1 mb-5 w-[15%] rounded-md hover:border-[#f89c0a] hover:border-1 transition duration-300 ease-in-out">
                  <Search className="text-zinc-300 mr-2 ml-1 mt-[3px]" size={18} />
                  <input value={searchOrganization} onChange={(event) => setSearchOrganization(event.target.value)} className="w-full mt-[1px] outline-none border-none" type="text" placeholder="Search organizations..." />
                </div>

                <div className="flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                  <p className="shrink-0 text-md font-semibold">Type:</p>

                  <select value={selectedOrganizationType}
                    onChange={(event) => setSelectedOrganizationType(event.target.value)} className="p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none">
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="">All</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Academy">Academy</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Faction">Faction</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Task Force">Task Force</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Clan">Clan</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Government">Government</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Other">Other</option>
                  </select>
                </div>

                <div className="flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                  <p className="shrink-0 text-md font-semibold">Leader:</p>
                  <select value={selectedOrganizationLeader} onChange={(event) => setSelectedOrganizationLeader(event.target.value)} className="p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none">
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="">All</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Lord Death">Lord Death</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Medusa">Medusa Gorgon</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Arachne">Arachne Gorgon</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Noah">Noah</option>
                  </select>
                </div>

                <div className="flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                  <p className="shrink-0 text-md font-semibold">Status:</p>
                  <select value={selectedOrganizationStatus} onChange={(event) => setSelectedOrganizationStatus(event.target.value)} className="p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none">
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="">All</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Active">Active</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Disbanded">Disbanded</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Destroyed">Destroyed</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Unknown">Unknown</option>
                  </select>
                </div>

                <div className="hover:text-white ml-auto">
                  <button onClick={clearOrganizationFilters} className="group text-sm flex gap-2 rounded-md p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out"><FunnelX className="group-hover:text-white text-[#f89c0a]" size={20} />Clear Filters</button>
                </div>
              </div>

              {filteredOrganizations.length === 0 && (
                <div className="flex items-center justify-center min-h-80 border border-zinc-800 rounded-lg">
                  <p className="text-zinc-400 text-lg">No organizations match the selected filters.</p>
                </div>
              )}

              {filteredOrganizations.length > 0 && (
                <div className="flex gap-6 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${organizationStartIndex * 324}px)` }}>
                  {filteredOrganizations.map((organization) => (
                    <div key={organization.id} className="relative w-75 shrink-0 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                      <div className="relative w-full h-60 bg-zinc-950">
                        <Image src={organization.image_url || "/characters/characters-placeholder.png"} alt="Organization Image" fill className="object-cover object-top" />
                      </div>

                      <div className="absolute top-0 ml-2 mt-2 px-2 border-[#f89c0a] text-[#f8b40a] text-[19px] border-1 rounded-md bg-[#f89c0a]/10">
                        <p className="font-banner">{organization.display_type}</p>
                      </div>

                      <div className="p-4 border-t border-zinc-800">
                        <p className="font-banner text-white text-2xl">{organization.name}</p>
                        <p className="text-zinc-400 text-xs font-semibold">Leader: {organization.leader}</p>
                        <p className="text-zinc-400 text-xs font-semibold">Location: {organization.location}</p>
                        <a target="_blank" href={`http://127.0.0.1:8000/organizations/${organization.id}`} className="flex justify-between mt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]">VIEW PROFILE<MoveRight className="-translate-y-1" /></a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={showNextOrganization} className="p-2 translate-x-[-30px] translate-y-[50px] rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2"><ChevronRight className="cursor-pointer" size={40} /></button>
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
            parameter={{ location: "Path parameter", name: "organization_id", type: "integer" }}
            example={organizationExamples[0]}
          />

          <EndpointCard
            method="GET"
            path="/organizations?name=Faction"
            description="Filters organizations by name."
            parameter={{ location: "Query parameter", name: "name", type: "string" }}
            example={organizationExamples[3]}
          />

          <EndpointCard
            method="GET"
            path="/organizations?organization_type=Task Force"
            description="Filters organizations by organization type."
            parameter={{ location: "Query parameter", name: "organization_type", type: "string" }}
            example={organizationExamples[1]}
          />

          <EndpointCard
            method="GET"
            path="/organizations?leader=Gorgon"
            description="Filters organizations by leader."
            parameter={{ location: "Query parameter", name: "leader", type: "string" }}
            example={[organizationExamples[2], organizationExamples[3]]}
          />

          <EndpointCard
            method="GET"
            path="/organizations?status=Active"
            description="Filters organizations by status."
            parameter={{ location: "Query parameter", name: "status", type: "string" }}
            example={[organizationExamples[0], organizationExamples[1]]}
          />
        </div>


        <div className="mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="arc-section">
          <div className="flex items-center justify-center gap-4 w-full">
            <button onClick={showPreviousArc} className="p-2 translate-x-[40px] translate-y-[50px] z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2"><ChevronLeft className="cursor-pointer" size={40} /></button>

            <div className="overflow-hidden w-[90%] py-4 -my-4 px-2 -mx-2">
              <div className="flex">
                <div>
                  <p><MoonStar className="w-13 h-13 text-[#f89c0a]" /></p>
                  <div className="w-[80%] mt-2 h-[2px] bg-zinc-700 mx-auto" />
                </div>

                <div className="ml-3 mb-5">
                  <p className="text-white text-5xl font-banner">ARCS</p>
                  <p className="text-zinc-400">Browse and explore all story arcs from the world of Soul Eater.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex border-zinc-800 border-2 p-1 mb-5 w-[15%] rounded-md hover:border-[#f89c0a] hover:border-1 transition duration-300 ease-in-out">
                  <Search className="text-zinc-300 mr-2 ml-1 mt-[3px]" size={18} />
                  <input value={searchArc} onChange={(event) => setSearchArc(event.target.value)} className="w-full mt-[1px] outline-none border-none" type="text" placeholder="Search arcs..." />
                </div>

                <div className="flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                  <p className="shrink-0 text-md font-semibold">Character:</p>

                  <select value={selectedArcCharacter} onChange={(event) => setSelectedArcCharacter(event.target.value)} className="p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none">
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="">All</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Maka Albarn">Maka Albarn</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Soul Evans">Soul Evans</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Black Star">Black Star</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Death the Kid">Death the Kid</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Franken Stein">Franken Stein</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Medusa Gorgon">Medusa Gorgon</option>
                    <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Mifune">Mifune</option>
                  </select>
                </div>

                <div className="hover:text-white ml-auto">
                  <button onClick={clearArcFilters} className="group text-sm flex gap-2 rounded-md p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out"><FunnelX className="group-hover:text-white text-[#f89c0a]" size={20} />Clear Filters</button>
                </div>
              </div>

              {filteredArcs.length === 0 && (
                <div className="flex items-center justify-center min-h-80 border border-zinc-800 rounded-lg">
                  <p className="text-zinc-400 text-lg">No arcs match the selected filters.</p>
                </div>
              )}

              {filteredArcs.length > 0 && (
                <div className="flex gap-6 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${arcStartIndex * 324}px)` }}>
                  {filteredArcs.map((arc) => (
                    <div key={arc.id} className="relative flex w-75 shrink-0 flex-col bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#f89c0a]">
                      <div className="relative w-full h-60 bg-zinc-950">
                        <Image src={arc.image_url || "/characters/characters-placeholder.png"} alt="Arc Image" fill className="object-cover object-top" />
                      </div>

                      <div className="absolute top-0 ml-2 mt-2 px-2 border-[#f89c0a] text-[#f8b40a] text-[19px] border-1 rounded-md bg-[#f89c0a]/10">

                        {arc.episodes ? <p className="font-banner">Episodes {arc.episodes}</p> : <p className='font-banner'>Chapters {arc.manga_chapters}</p>}
                      </div>

                      <div className="flex flex-1 flex-col p-4 border-t border-zinc-800">
                        <p className="font-banner text-white text-2xl">{arc.name}</p>

                        {arc.episodes ? <p className="text-zinc-400 text-xs font-semibold">Episodes: {arc.episodes}</p> : <p className="text-zinc-400 text-xs font-semibold">Episodes: Manga Only</p>}
                        {arc.manga_chapters ? <p className="text-zinc-400 text-xs font-semibold">Chapters: {arc.manga_chapters}</p> : <p className="text-zinc-400 text-xs font-semibold">Chapters: Anime Only</p>}
                        <a target="_blank" href={`http://127.0.0.1:8000/arcs/${arc.id}`} className="flex justify-between mt-auto pt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]">VIEW PROFILE<MoveRight className="-translate-y-1" /></a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={showNextArc} className="p-2 translate-x-[-30px] translate-y-[50px] rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2"><ChevronRight className="cursor-pointer" size={40} /></button>
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
            description="Returns arc by id."
            parameter={{ location: "Path parameter", name: "arc_id", type: "integer" }}
            example={arcExamples[0]}
          />

          <EndpointCard
            method="GET"
            path="/arcs?name=Lesson"
            description="Filters arcs by name."
            parameter={{ location: "Query parameter", name: "name", type: "string" }}
            example={arcExamples[1]}
          />

          <EndpointCard
            method="GET"
            path="/arcs?characters=Mifune"
            description="Filters arcs by character."
            parameter={{ location: "Query parameter", name: "characters", type: "string" }}
            example={arcExamples[2]}
          />
        </div>

      </div>



      <Footer />
    </div >
  );
}