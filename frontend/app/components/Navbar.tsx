import Image from 'next/image';
import { Search } from 'lucide-react';

export default function Navbar() {
  return (
    <div className='grid grid-cols-3 items-center bg-black'>
      <div className='ml-3 mt-[-15] flex justify-start'>
        <Image src="/Soul-Eater-Logo.png" alt="Logo" width={220} height={220}></Image>
      </div>
      <div className='flex justify-center gap-15'>
        <button className='text-white tracking-wide cursor-pointer'>CHARACTERS</button>
        <button className='text-white tracking-wide cursor-pointer'>WEAPONS</button>
        <button className='text-white tracking-wide cursor-pointer'>ABILITIES</button>
        <button className='text-white tracking-wide cursor-pointer'>ORGANIZATIONS</button>
        <button className='text-white tracking-wide cursor-pointer'>ARCS</button>
      </div>

      <div className='flex justify-end gap-2 items-center'>
        <input className='border border-gray-200 p-1' placeholder='Search characters, weapons, arcs ....'></input>
        <Search className='mr-2 cursor-pointer' />
      </div>

    </div>
  )
}