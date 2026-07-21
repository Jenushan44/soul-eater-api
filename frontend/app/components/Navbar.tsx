import Image from 'next/image';
import { Search } from 'lucide-react';
import { BookOpen, TriangleAlert, MoveRight } from "lucide-react";

export default function Navbar() {
  return (
    <div className='flex items-center justify-between bg-black sm:h-[70px] md:h-[100px] lg:h-[130px] xl:h-[150px]'>
      <div className='ml-5 mt-[-15] flex-shrink-0'>
        <Image src="/Soul-Eater-Logo.png" alt="Logo" width={250} height={250}></Image>
      </div>
      <div className='flex justify-center gap-15'>
        <div className="flex items-center mr-10 gap-15">
          <a href="#character-section" className="group flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <button className='hover:text-[#f89c0a] transition duration-200 ease-in-out cursor-pointer'>
                <p className='font-bold'>API Docs</p>
              </button>
              <div className="h-10 w-[2px] ml-10 bg-zinc-700" />
            </div>
          </a>

          <a href="https://github.com/Jenushan44/soul-eater-api" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <button className='hover:text-[#f89c0a] transition duration-200 ease-in-out cursor-pointer'>
                <p className='font-bold'>About</p>
              </button>
              <div className="h-10 w-[2px] ml-10 bg-zinc-700" />
            </div>
          </a>

          <button className="group flex items-center justify-between px-4 py-2 my-0 border-2 border-[#f89c0a] rounded-md gap-2 hover:bg-[#f89c0a] hover:text-white transition duration-200 ease-in-out cursor-pointer">
            <p className='m-0 font-bold'>Report an Issue</p>
          </button>
        </div>
      </div>
    </div>
  )
}