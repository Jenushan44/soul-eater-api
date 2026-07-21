import Image from "next/image";
import { BookOpen, TriangleAlert, MoveRight } from "lucide-react";

export default function Footbar() {
  return (
    <footer className="mt-10 border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-8 py-6 pb-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 lg:w-[40%]">
          <div className="flex items-center gap-3">
            <Image src="/Soul-Eater-Emblem.png" alt="Soul Eater emblem" width={75} height={75} />

            <div>
              <p className="font-banner text-3xl text-white">SOUL EATER</p>
              <p className="font-bold tracking-[0.25em] text-[#f89c0a]">API</p>
            </div>
          </div>

          <p className="max-w-md text-sm leading-6 text-zinc-400">
            A REST API for exploring characters, weapons, abilities,
            organizations, and story arcs from Soul Eater.
          </p>
        </div>

        <div className="hidden h-52 w-px bg-zinc-800 lg:block" />
        <div className="flex flex-1 flex-col">
          <a href="#character-section" className="group flex items-center justify-between border-b border-zinc-800 py-5">
            <div className="flex items-center gap-4">
              <BookOpen className="text-[#f89c0a]" size={30} />
              <div>
                <p className="font-bold text-white">DOCUMENTATION</p>
                <p className="text-sm text-zinc-400">Browse endpoints, parameters, and response examples.</p>
              </div>
            </div>

            <MoveRight className="text-[#f89c0a] transition-transform group-hover:translate-x-2" size={28} />
          </a>

          <a href="https://github.com/Jenushan44" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-zinc-800 py-5">
            <div className="flex items-center gap-4">
              <Image src={"/github-icon.png"} alt="GitHub logo" width={30} height={30} className="text-[#f89c0a]" />

              <div>
                <p className="font-bold text-white">GITHUB REPOSITORY</p>
                <p className="text-sm text-zinc-400">View the source code for the project.</p>
              </div>
            </div>

            <MoveRight className="text-[#f89c0a] transition-transform group-hover:translate-x-2" size={28} />
          </a>

          <a href="" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <TriangleAlert className="text-[#f89c0a]" size={30} />

              <div>
                <p className="font-bold text-white">REPORT AN ISSUE</p>
                <p className="text-sm text-zinc-400">Found a bug or have a suggestion?</p>
              </div>
            </div>

            <MoveRight className="text-[#f89c0a] transition-transform group-hover:translate-x-2" size={28} />
          </a>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="h-px w-full bg-[#f89c0a]" />

        <div className="absolute bg-zinc-950 px-5">
          <Image src="/Soul-Eater-Emblem.png" alt="Soul Eater Emblem" width={48} height={48} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 px-6 py-8 text-center text-sm text-zinc-500">
        <p>© 2026 Soul Eater API</p>
        <p>Soul Eater is © Atsushi Ohkubo.</p>
        <p>This is an unofficial fan project and is not affiliated with the official series.</p>
      </div>
    </footer>
  );
}