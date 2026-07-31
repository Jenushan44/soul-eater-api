"use client"
import { useEffect, useState } from 'react';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import LearnMoreModal from "./components/LearnMoreModal";
import type { Character, Weapon, Ability, Organization, Arc, } from "./types/api";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import BrowseSections from "./components/BrowseSections";
import CharacterSection from "./components/sections/CharacterSection";
import WeaponSection from "./components/sections/WeaponSection";
import AbilitySection from "./components/sections/AbilitySection";
import OrganizationSection from "./components/sections/OrganizationSection";
import ArcSection from "./components/sections/ArcSection";


export default function Home() {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [arcs, setArcs] = useState<Arc[]>([]);

  const [cardsToShow, setCardsToShow] = useState(3);
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
        <CharacterSection characters={characters} cardsToShow={cardsToShow} />
        <WeaponSection weapons={weapons} cardsToShow={cardsToShow} />
        <AbilitySection abilities={abilities} cardsToShow={cardsToShow} />
        <OrganizationSection organizations={organizations} cardsToShow={cardsToShow} />
        <ArcSection arcs={arcs} cardsToShow={cardsToShow} />
      </div>

      <LearnMoreModal isOpen={isLearnMoreOpen} onClose={() => setIsLearnMoreOpen(false)} />

      <Footer />

    </div >


  );
}