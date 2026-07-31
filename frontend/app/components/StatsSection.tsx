import { User, Swords, Flame, BrickWallShield, MoonStar, } from "lucide-react";

export default function StatsSection() {
  return (
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
  );
}