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
  const [selectedAffiliation, setSelectedAffiliation] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
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
      <div className="w-full relative flex justify-end">
        <Image src="/Soul-Eater-Medusa-Banner.png" alt="Banner" width={1000} height={300} className="w-[60%] h-auto relative" priority></Image>
        <div className="absolute inset-y-0 left-0 w-[85%] bg-gradient-to-r from-black via-black/100 to-transparent pointer-events-none" />

        <div className="absolute 2xl:top-[5%] xl:top-[5%] sm:top-[5%] md:top-[5%] left-[2%]">
          <p className="font-semibold text-[#f89c0a] text-[15px] md:text-[20px] lg:text-[30px] 2xl:text-[40px]">WELCOME TO THE</p>
          <p className="font-banner text-[60px] md:text-[80px] lg:text-[150px] 2xl:text-[200px] leading-[0.8] mt-3">SOUL EATER</p>
          <p className="font-banner text-[60px] md:text-[80px] lg:text-[150px] 2xl:text-[200px] leading-[0.8] text-[#f89c0a] mt-2 mb-2">API</p>
          <p className="font-semibold mb-5 max-w-[500px] text-[15px] md:text-[18px] lg:text-[20px] 2xl:text-[23px]">A comprehensive REST API for Soul Eater, providing structured data on characters, weapons, abilities, organizations, and story arcs.</p>
          <div className="flex gap-3 md:gap-8">
            <button className="font-semibold cursor-pointer text-black p-3 2xl:p-8 2xl:text-[20px] border-2 border-black rounded-sm bg-[#f89c0a] hover:bg-black hover:border-[#f89c0a] hover:text-[#f89c0a]">EXPLORE DATABASE</button>
            <button className="font-semibold cursor-pointer text-[#f89c0a] p-3 2xl:p-8 2xl:text-[20px] border border-[#f89c0a] rounded-sm hover:bg-[#f89c0a] hover:border-black hover:text-black">LEARN MORE</button>
          </div>
        </div>
      </div>


      <div className="h-40 xl:h-50 border rounded-lg bg-black/70 border-zinc-800 border-3 flex bg-black gap-2 md:gap-8 lg:gap-15 mx-5">
        <div className="flex m-auto">
          <User className="w-15 h-15 lg:w-20 lg:h-20 xl:w-25 xl:h-25" fill="#f89c0a" stroke="#000000" strokeWidth={1.5} />

          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">60+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">CHARACTERS</p>
          </div>
        </div>

        <div className="w-[2px] h-[60%] bg-zinc-800 my-auto" />

        <div className="flex m-auto">
          <Swords className="w-15 h-15 lg:w-20 lg:h-20 xl:w-25 xl:h-25" fill="#000000" stroke="#f89c0a" strokeWidth={1.5} />

          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">20+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">WEAPONS</p>
          </div>
        </div>

        <div className="w-[2px] h-[60%] bg-zinc-800 my-auto" />
        <div className="flex m-auto">
          <Flame className="w-15 h-15 lg:w-20 lg:h-20 xl:w-25 xl:h-25" fill="#f89c0a" stroke="#000000" strokeWidth={1.5} />
          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">190+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">ABILITIES</p>
          </div>
        </div>

        <div className="w-[2px] h-[60%] bg-zinc-800 my-auto" />

        <div className="flex m-auto">
          <BrickWallShield className="w-15 h-15 lg:w-20 lg:h-20 xl:w-25 xl:h-25" fill="#f89c0a" stroke="#000000" strokeWidth={1.5} />
          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">5+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">ORGANIZATIONS</p>
          </div>
        </div>

        <div className="w-[2px] h-[60%] bg-zinc-800 my-auto" />

        <div className="flex m-auto">
          <MoonStar className="w-15 h-15 lg:w-20 lg:h-20 xl:w-25 xl:h-25" fill="#f89c0a" stroke="#000000" strokeWidth={1.5} />
          <div>
            <p className="text-[#f89c0a] text-[30px] xl:text-[40px] font-bold">20+</p>
            <p className="font-semibold text-[14px] lg:text-[18px]">ARCS</p>
          </div>
        </div>


      </div>


      <div className='flex flex-col gap-16 mx-6 mt-10'>
        <div className="sticky top-0 z-50 bg-black p-3 border border-zinc-900 rounded-md tracking-wide">

          <p className="text-[#f89c0a] text-[18px] font-bold tracking-widest px-3 mb-3 font-sans">BROWSE THE SECTIONS</p>
          <div className='grid w-full grid-cols-5 gap-5'>

            <div className='border border-[#f89c0a66] relative'>
              <Image className='brightness-[0.3] w-full h-50 xl:h-85 object-cover' src={"/browse-section/characters-card.png"} alt='Character Browse Section Image' width={220} height={220}></Image>
              <div className="absolute top-0 left-0 w-full h-50 xl:h-85 bg-gradient-to-b from-transparent to-zinc-950" />
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
              <Image className='brightness-[0.3] w-full h-50 xl:h-85 object-cover' src={"/browse-section/weapons-card.png"} alt='Weapon Browse Section Image' width={220} height={220}></Image>
              <div className="absolute top-0 left-0 w-full h-50 xl:h-85 bg-gradient-to-b from-transparent to-zinc-950" />

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
              <Image className='brightness-[0.3] w-full h-50 xl:h-85 object-cover' src={"/browse-section/abilities-card.png"} alt='Ability Browse Section Image' width={220} height={220}></Image>
              <div className="absolute top-0 left-0 w-full h-50 xl:h-85 bg-gradient-to-b from-transparent to-zinc-950" />
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
              <Image className='brightness-[0.3] w-full h-50 xl:h-85 object-cover' src={"/browse-section/organization-card.png"} alt='Ability Browse Section Image' width={220} height={220}></Image>
              <div className="absolute top-0 left-0 w-full h-50 xl:h-85 bg-gradient-to-b from-transparent to-zinc-950" />
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
              <Image className='brightness-[0.3] w-full h-50 xl:h-85 object-cover' src={"/browse-section/arcs-card.png"} alt='Ability Browse Section Image' width={220} height={220}></Image>
              <div className="absolute top-0 left-0 w-full h-50 xl:h-85 bg-gradient-to-b from-transparent to-zinc-950" />
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
          <div className="mx-6 mt-10 bg-zinc-950 p-10 border-zinc-900 border-3" id="character-section">

            <div className='flex items-center justify-center gap-4 w-full'>
              <button onClick={showPrevious} className='p-2 translate-x-[40px] translate-y-[50px] z-40 rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2'><ChevronLeft className='cursor-pointer' size={40} /></button>

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
                    <p className="text-md font-semibold">Role:</p>
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
                    <p className="text-md font-semibold">Affiliation:</p>
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
                    <p className="text-md font-semibold">Species:</p>
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
                    <p className="text-md font-semibold">Status:</p>
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
                          <p className="text-zinc-400 text-xs font-semibold">{character.role}</p>
                          <a target="_blank" href={`http://127.0.0.1:8000/characters/${character.id}`} className="flex justify-between mt-auto pt-3 text-[#f89c0a] text-sm font-bold cursor-pointer gap-2 hover:text-[#ffb33b]">VIEW PROFILE<MoveRight className="-translate-y-1" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}


              </div>
              <button onClick={showNext} className='p-2 translate-x-[-30px] translate-y-[50px] rounded-full text-[#f89c0a] hover:text-white bg-zinc-900 border-zinc-800 border-2'><ChevronRight className='cursor-pointer' size={40} /></button>
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
              example={[characterExamples[0], characterExamples[2], characterExamples[3]]}
            />

            <EndpointCard
              method='GET'
              path='/characters?affiliation=DWMA'
              description='Filters characters by affiliation.'
              parameter={{ location: "Query parameter", name: "affiliation", type: "string", }}
              example={[characterExamples[0], characterExamples[1], characterExamples[2]]}
            />

            <EndpointCard
              method='GET'
              path='/characters?species=Human'
              description='Filters characters by species.'
              parameter={{ location: "Query parameter", name: "species", type: "string", }}
              example={[characterExamples[0], characterExamples[3]]}
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
                  <div className="flex border-zinc-800 border-2 p-1 mb-5 w-[15%] rounded-md hover:border-[#f89c0a] transition duration-300 ease-in-out">
                    <Search className="text-zinc-300 mr-2 ml-1 mt-[3px]" size={18} />
                    <input value={searchWeapon} onChange={(event) => setSearchWeapon(event.target.value)} className="w-full mt-[1px] outline-none border-none bg-transparent" type="text" placeholder="Search weapons..." />
                  </div>

                  <div className="flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                    <p className="text-md font-semibold">Type:</p>
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
                    <p className="text-md font-semibold">Category:</p>

                    <select value={selectedWeaponCategory} onChange={(event) => setSelectedWeaponCategory(event.target.value)} className="p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none">
                      <option className="bg-zinc-950 text-zinc-400" value="">All</option>
                      <option className="bg-zinc-950 text-zinc-400" value="Demon Weapon">Demon Weapon</option>
                      <option className="bg-zinc-950 text-zinc-400" value="Death Scythe">Death Scythe</option>
                      <option className="bg-zinc-950 text-zinc-400" value="Shadow Weapon">Shadow Weapon</option>
                    </select>
                  </div>


                  <div className="flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                    <p className="text-md font-semibold">Affiliation:</p>

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
                    <p className="text-md font-semibold">Status:</p>

                    <select value={selectedWeaponStatus} onChange={(event) => setSelectedWeaponStatus(event.target.value)} className="p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none">
                      <option className="bg-zinc-950 text-zinc-400" value="">All</option>
                      <option className="bg-zinc-950 text-zinc-400" value="Alive">Alive</option>
                      <option className="bg-zinc-950 text-zinc-400" value="Deceased">Deceased</option>
                      <option className="bg-zinc-950 text-zinc-400" value="Unknown">Unknown</option>
                      <option className="bg-zinc-950 text-zinc-400" value="Destroyed">Destroyed</option>
                    </select>
                  </div>

                  <div className="hover:text-white ml-auto">
                    <button onClick={clearWeaponFilters} className="group text-sm flex gap-2 rounded-md p-2 px-3 cursor-pointer border-[#f89c0a] hover:bg-[#f89c0a] text-[#f89c0a] hover:text-white border-1 transition duration-200 ease-in-out" >
                      <FunnelX className="group-hover:text-white text-[#f89c0a]" size={20} />Clear Filters</button>
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
                    <p className="text-md font-semibold">Type:</p>

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
                    <p className="text-md font-semibold">User:</p>

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
                    <p className="text-md font-semibold">Type:</p>

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
                    <p className="text-md font-semibold">Leader:</p>
                    <select value={selectedOrganizationLeader} onChange={(event) => setSelectedOrganizationLeader(event.target.value)} className="p-2 pr-8 border border-zinc-800 bg-black text-white text-sm font-medium w-40 rounded-lg cursor-pointer transition-colors hover:border-[#f89c0a] outline-none">
                      <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="">All</option>
                      <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Lord Death">Lord Death</option>
                      <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Medusa">Medusa Gorgon</option>
                      <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Arachne">Arachne Gorgon</option>
                      <option className="bg-zinc-950 text-zinc-400 py-2 cursor-pointer" value="Noah">Noah</option>
                    </select>
                  </div>

                  <div className="flex items-center rounded-md mb-5 bg-black text-zinc-400 gap-2">
                    <p className="text-md font-semibold">Status:</p>
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
                    <p className="text-md font-semibold">Character:</p>

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
      </div>



      <Footer />
    </div >
  );
}