import Image from 'next/image';
import { Search } from 'lucide-react';

export default function Navbar() {
  return (
    <div className='flex items-center justify-between bg-black sm:h-[70px] md:h-[100px] lg:h-[130px] xl:h-[150px]'>
      <div className='ml-3 mt-[-15] flex-shrink-0'>
        <Image src="/Soul-Eater-Logo.png" alt="Logo" width={220} height={220}></Image>
      </div>
      <div className='flex justify-center gap-15'>
        <a href='#character-section' className='text-white tracking-wide cursor-pointer font-semibold hover:text-yellow-500'>CHARACTERS</a>
        <a href='#weapon-section' className='text-white tracking-wide cursor-pointer font-semibold hover:text-yellow-500'>WEAPONS</a>
        <a href='#ability-section' className='text-white tracking-wide cursor-pointer font-semibold hover:text-yellow-500'>ABILITIES</a>
        <a href='#organization-section' className='text-white tracking-wide cursor-pointer font-semibold hover:text-yellow-500'>ORGANIZATIONS</a>
        <a href='#arc-section' className='text-white tracking-wide cursor-pointer font-semibold hover:text-yellow-500'>ARCS</a>
      </div>

      <div className='flex justify-end'></div>

    </div>
  )
}