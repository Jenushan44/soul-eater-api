"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, TriangleAlert, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative bg-black border-zinc-900 border-b-2">
      <div className="flex items-center justify-between h-[75px] sm:h-[90px] md:h-[110px] lg:h-[130px] xl:h-[150px] px-3 sm:px-5">
        <div className="flex-shrink-0">
          <a href="#home-section">
            <Image src="/Soul-Eater-Logo.png" alt="Logo" width={300} height={300} className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] xl:w-[300px] h-auto" />
          </a>
        </div>

        <div className="hidden lg:flex justify-between gap-8 xl:gap-15">
          <div className="flex items-center mr-4 xl:mr-10 gap-8 xl:gap-15">

            <a href="http://127.0.0.1:8000/docs" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-5">
              <div className="flex items-center gap-4">
                <p className="font-semibold text-lg cursor-pointer transition-all duration-300 hover:-translate-y-[0.2px] hover:scale-110 hover:text-xl hover:text-[#f89c0a] hover:underline underline-offset-8 2xl:text-2xl 2xl:hover:text-2xl">API Docs</p>
                <div className="h-10 w-[2px] ml-4 xl:ml-10 bg-zinc-700" />
              </div>
            </a>

            <a href="#character-section" className="group flex items-center justify-between py-5">
              <div className="flex items-center gap-4">
                <p className="font-semibold text-lg cursor-pointer transition-all duration-300 hover:-translate-y-[0.2px] hover:scale-110 hover:text-xl hover:text-[#f89c0a] hover:underline underline-offset-8 2xl:text-2xl 2xl:hover:text-2xl">Endpoints</p>
                <div className="h-10 w-[2px] ml-4 xl:ml-10 bg-zinc-700" />
              </div>
            </a>

            <a href="https://github.com/Jenushan44/soul-eater-api" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-5">
              <div className="flex items-center gap-4">
                <p className="font-semibold text-lg cursor-pointer transition-all duration-300 hover:-translate-y-[0.2px] hover:scale-110 hover:text-xl hover:text-[#f89c0a] hover:underline underline-offset-8 2xl:text-2xl 2xl:hover:text-2xl">About</p>
              </div>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-5">
          <a href="https://github.com/Jenushan44/soul-eater-api" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-2 rounded-md">
            <Image src="/github-icon.png" alt="Github Logo" width={50} height={50} className="w-[35px] sm:w-[42px] lg:w-[50px] h-auto cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110" />
          </a>

          <button type="button" className="group flex items-center justify-between px-1 sm:px-4 py-2 gap-2 hover:text-white cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110">
            <TriangleAlert className="text-[#f89c0a] w-[35px] h-[35px] sm:w-[42px] sm:h-[42px] lg:w-[50px] lg:h-[50px]" />
          </button>

          <button type="button" onClick={() => setIsMenuOpen((current) => !current)} className="lg:hidden text-[#f89c0a] border border-zinc-800 rounded-md p-2 cursor-pointer transition duration-200 hover:border-[#f89c0a] hover:text-white">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 z-50 w-full bg-black border-b-2 border-zinc-900 px-5 py-4">
          <div className="flex flex-col">
            <a href="http://127.0.0.1:8000/docs" onClick={() => setIsMenuOpen(false)} className="py-3 font-semibold text-lg border-b border-zinc-900 transition duration-200 hover:text-[#f89c0a]">API Docs</a>
            <a href="#character-section" onClick={() => setIsMenuOpen(false)} className="py-3 font-semibold text-lg border-b border-zinc-900 transition duration-200 hover:text-[#f89c0a]">Endpoints</a>
            <a href="https://github.com/Jenushan44/soul-eater-api" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="py-3 font-semibold text-lg transition duration-200 hover:text-[#f89c0a]">About</a>
          </div>
        </div>
      )}
    </div>
  );
}