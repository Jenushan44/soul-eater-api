import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function HeroSection({
  onLearnMore,
}: {
  onLearnMore: () => void;
}) {
  return (
    <div className="relative flex h-[680px] w-full justify-end overflow-hidden xl:h-[760px] 2xl:h-[850px]">
      <Image src="/Soul-Eater-Medusa-Banner.png" alt="Banner" width={1000} height={300} className="h-full w-[60%] object-cover object-right" priority />

      <div className="pointer-events-none absolute inset-y-0 left-0 w-[85%] bg-gradient-to-r from-black via-black/100 to-transparent" />

      <div className="absolute left-[2%] top-[65%] z-10 -translate-y-1/2 md:top-[65%] lg:top-1/2">
        <p className="font-banner text-[20px] tracking-[0.5em] text-[#f89c0a] md:text-[25px] lg:text-[30px] xl:text-[50px] 2xl:text-[50px]">WELCOME TO THE</p>
        <p className="mt-3 font-banner text-[70px] leading-[0.8] md:text-[80px] lg:text-[150px] xl:text-[180px] 2xl:text-[220px]">SOUL EATER</p>
        <p className="mb-2 mt-2 font-banner text-[70px] leading-[0.8] text-[#f89c0a] md:text-[80px] lg:text-[150px] xl:text-[180px] 2xl:text-[220px]">API</p>
        <p className="mb-5 max-w-[650px] text-[18px] font-semibold md:text-[18px] lg:text-[20px] xl:text-[23px] 2xl:text-[25px]">A comprehensive REST API for Soul Eater, providing structured data on characters, weapons, abilities, organizations, and story arcs.</p>

        <div className="flex flex-col items-start gap-4 self-start md:flex-row md:items-center md:gap-8">
          <a href="#character-section" className="flex w-[275px] cursor-pointer items-center justify-between rounded-xl border-2 border-black bg-[#f89c0a] p-3 pl-5 font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-[#f89c0a] hover:bg-black hover:text-[#f89c0a] md:p-5 md:text-[20px] xl:text-[20px] 2xl:py-5 2xl:text-[25px]">
            EXPLORE API<ChevronRight width={30} height={30} className="font-bold stroke-[3]" />
          </a>

          <button type="button" onClick={onLearnMore} className="flex w-[275px] cursor-pointer items-center justify-between rounded-xl border border-[#f89c0a] p-3 pl-5 font-semibold text-[#f89c0a] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-black hover:bg-[#f89c0a] hover:text-black xl:text-[20px] 2xl:py-5 2xl:text-[25px]">
            LEARN MORE<ChevronRight width={30} height={30} className="font-bold stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}