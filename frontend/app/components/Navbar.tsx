import Image from 'next/image';
import { Search } from 'lucide-react';
import { BookOpen, TriangleAlert, MoveRight } from "lucide-react";

export default function Navbar() {
  return (
    <div className='flex items-center justify-between bg-black sm:h-[70px] md:h-[100px] lg:h-[130px] xl:h-[150px] border-zinc-900 border-b-2'>


      <div className='ml-5 mt-[-15] flex-shrink-0'>
        <Image src="/Soul-Eater-Logo.png" alt="Logo" width={300} height={300}></Image>
      </div>


      <div className='flex justify-between gap-15'>


        <div className="flex items-center mr-10 gap-15">
          <a href="#home-section" className="group flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <button className='hover:text-[#f89c0a] transition duration-200 ease-in-out cursor-pointer'>
                <p className='font-semibold text-lg cursor-pointer transition-all duration-300 hover:-translate-y-[0.2px] hover:scale-110 hover:text-xl 2xl:text-2xl 2xl:hover:text-2xl hover:underline underline-offset-8'>Home</p>
              </button>
              <div className="h-10 w-[2px] ml-10 bg-zinc-700" />
            </div>
          </a>


          <a href="#character-section" className="group flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <button className='hover:text-[#f89c0a] transition duration-200 ease-in-out cursor-pointer'>
                <p className='font-semibold text-lg cursor-pointer transition-all duration-300 hover:-translate-y-[0.2] hover:scale-110 hover:text-xl hover:underline underline-offset-8 2xl:text-2xl 2xl:hover:text-2xl'>API Docs</p>
              </button>
              <div className="h-10 w-[2px] ml-10 bg-zinc-700" />
            </div>
          </a>

          <a href="#character-section" className="group flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <button className='hover:text-[#f89c0a] transition duration-200 ease-in-out cursor-pointer'>
                <p className='font-semibold text-lg cursor-pointer transition-all duration-300 hover:-translate-y-[0.2] hover:scale-110 hover:text-xl hover:underline underline-offset-8 2xl:text-2xl 2xl:hover:text-2xl'>Endpoints</p>
              </button>
              <div className="h-10 w-[2px] ml-10 bg-zinc-700" />
            </div>
          </a>


          <a href="https://github.com/Jenushan44/soul-eater-api" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <button className='hover:text-[#f89c0a] transition duration-200 ease-in-out cursor-pointer'>
                <p className='font-semibold text-lg cursor-pointer transition-all duration-300 hover:-translate-y-[0.2] hover:scale-110 hover:text-xl hover:underline underline-offset-8 2xl:text-2xl 2xl:hover:text-2xl'>About</p>
              </button>
            </div>
          </a>
        </div>
      </div>


      <div className='flex gap-5'>
        <button className="group flex items-center justify-between py-2 my-0 rounded-md cursor-pointer">
          <Image src="/github-icon.png" alt="Github Logo" width={50} height={50} className='cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110'></Image>
        </button>


        <button className="group flex items-center justify-between px-4 py-2 my-0 gap-2 hover:text-white transition duration-200 ease-in-out cursor-pointer mr-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110">
          <p className='m-0 font-bold 2xl:text-xl'><TriangleAlert className='text-[#f89c0a]' width={50} height={50} /></p>
        </button>
      </div>


    </div>
  )
}