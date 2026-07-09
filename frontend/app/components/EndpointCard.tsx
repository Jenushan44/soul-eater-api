"use client"
import { useState } from "react";
import { ChevronRight } from 'lucide-react';

export default function EndpointCard(props: { method: string; path: string; description: string; parameters: string; example: Record<string, any>; }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className='border-2 border-[#101010] rounded-md bg-[#0b0c0b] mt-5 w-[90%] mx-auto'>
      <div>
        <div className='flex w-full h-full justify-between items-center'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center mt-5 ml-6'>
              <p className='text-[#3fc778] flex justify-center font-semibold border border-[green] py-0.5 bg-[#043610] w-[50px]'>{props.method}</p>
              <p className='font-semibold flex items-center justify-center'>{props.path}</p>
            </div>

            <div className='flex'>
              <p className='ml-6'>{props.description}</p>
            </div>

          </div>

          <div className='border-2 border-[#222224] rounded-md flex justify-end items-center mr-6 w-[150px] h-[40px]'>
            <p className='text-gray-300 mr-auto ml-2'>{props.parameters}</p>
          </div>



        </div>
      </div>
      <div className='flex flex-col mx-6 bg-[#1a1a1a] mb-5 mt-5 py-2 rounded-sm'>
        <button className='flex cursor-pointer gap-1 ml-2' onClick={() => setOpen(!isOpen)}><ChevronRight className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} /> Example response</button>

        {isOpen &&
          <div className='mx-5 my-2'>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-black p-4 text-sm text-gray-300">
              {JSON.stringify(props.example, null, 2)}
            </pre>
          </div>
        }
      </div>
    </div>

  )
}