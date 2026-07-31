"use client";

import { X } from "lucide-react";

type LearnMoreModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LearnMoreModal({
  isOpen,
  onClose,
}: LearnMoreModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 px-4" onClick={onClose}>
      <div className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-xl border-2 border-[#f89c0a] bg-zinc-950 p-6 sm:p-8" onClick={(event) => event.stopPropagation()}>

        <button type="button" onClick={onClose} className="absolute right-4 top-4 cursor-pointer text-zinc-400 transition hover:scale-110 hover:text-[#f89c0a]"><X size={30} /></button>
        <p className="font-banner text-sm tracking-[0.4em] text-[#f89c0a]">ABOUT THE PROJECT</p>
        <p className="mt-3 font-banner text-4xl text-white sm:text-5xl">SOUL EATER API</p>

        <div className="mt-6 h-[2px] w-24 bg-[#f89c0a]" />

        <div className="mt-8 space-y-7 text-zinc-300">
          <div>
            <p className="mb-2 font-banner text-2xl text-[#f89c0a]">OVERVIEW</p>
            <p className="leading-7">The Soul Eater API is a REST API that provides structured information about characters, weapons, abilities, organizations, and story arcs from the Soul Eater series.</p>
          </div>

          <div>
            <p className="mb-2 font-banner text-2xl text-[#f89c0a]">MOTIVATION</p>
            <p className="leading-7">I built this project to create a complete REST API for Soul Eater while improving my skills in backend development, frontend development, and API design.</p>
          </div>

          <div>
            <p className="mb-2 font-banner text-2xl text-[#f89c0a]">TECHNOLOGY STACK</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-zinc-800 bg-black p-4">
                <p className="font-semibold text-white">Frontend</p>
                <p className="mt-1 text-sm text-zinc-400">Next.js, TypeScript, Tailwind CSS</p>
              </div>

              <div className="rounded-md border border-zinc-800 bg-black p-4">
                <p className="font-semibold text-white">Backend</p>
                <p className="mt-1 text-sm text-zinc-400">FastAPI, Python and Pydantic</p>
              </div>

              <div className="rounded-md border border-zinc-800 bg-black p-4">
                <p className="font-semibold text-white">API Style</p>
                <p className="mt-1 text-sm text-zinc-400">REST endpoints with path and query parameters</p>
              </div>

              <div className="rounded-md border border-zinc-800 bg-black p-4">
                <p className="font-semibold text-white">Development Tools</p>
                <p className="mt-1 text-sm text-zinc-400">Git, GitHub and VS Code</p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 font-banner text-2xl text-[#f89c0a]">FEATURES</p>
            <p className="leading-7"> Users can browse the complete datasets, retrieve individual records by ID, and filter results using properties such as names, roles, affiliations, species, characters, continuity, episode ranges, and chapter ranges.</p>
          </div>

          <div>
            <p className="mb-2 font-banner text-2xl text-[#f89c0a]">PROJECT GOAL</p>
            <p className="leading-7">The goal of this project is to create a complete REST API for Soul Eater while improving my skills in backend development, frontend development, and API design.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="https://github.com/Jenushan44/soul-eater-api" target="_blank" rel="noopener noreferrer" className="rounded-md bg-[#f89c0a] px-5 py-3 text-center font-bold text-black transition hover:-translate-y-1 hover:bg-white">VIEW ON GITHUB</a>
          <button type="button" onClick={onClose} className="cursor-pointer rounded-md border border-zinc-700 px-5 py-3 font-bold text-white transition hover:border-[#f89c0a] hover:text-[#f89c0a]">CLOSE</button>
        </div>
      </div>
    </div>
  );
}