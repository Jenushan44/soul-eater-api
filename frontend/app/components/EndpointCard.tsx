"use client"
import { useState } from "react";
import { ChevronRight } from 'lucide-react';

type Parameter = {
  name: string;
  type: string;
  location: "Path parameter" | "Query parameter";
};

type Character = {
  id: number;
  name: string;
  role: string;
  species: string;
  affiliation: string;
  weapon_partner: string;
  abilities: string[];
  description: string;
  status: string;
  first_appearance: { anime: string; manga: string; };
  voice_actor: { japanese: string; english: string; };
  image_url: string;
};



type EndpointCardProps = {
  method: string;
  path: string;
  description: string;
  parameter?: Parameter;
  example: unknown;
};

export default function EndpointCard({ method, path, description, parameter, example }: EndpointCardProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="mx-auto mt-5 w-[90%] rounded-md border-2 border-[#101010] bg-[#0b0c0b]">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="ml-6 mt-5 flex items-center gap-2">
            <p className="flex w-[50px] justify-center border border-green-700 bg-[#043610] py-0.5 font-semibold text-[#3fc778]">{method}</p>
            <p className="font-semibold">{path}</p>
          </div>

          <p className="ml-6">{description}</p>
        </div>

        {parameter ? (
          <div className="mr-6 mt-5 min-w-[190px] rounded-md border-2 border-[#222224] px-3 py-2">
            <p className="text-xs text-gray-500">{parameter.location}</p>

            <div className="mt-1 flex items-center gap-2">
              <p className="text-sm text-gray-200">{parameter.name}</p>

              <p className="rounded bg-[#182433] px-2 py-0.5 text-xs text-blue-300">{parameter.type}</p>
            </div>
          </div>
        ) : (
          <div className="mr-6 mt-5 flex min-w-[190px] items-center rounded-md border-2 border-[#222224] px-3 py-2">
            <p className="text-gray-500 text-sm">No parameters</p>
          </div>
        )}
      </div>

      <div className="mx-6 mb-5 mt-5 flex flex-col rounded-sm bg-[#1a1a1a] py-2">
        <button className="ml-2 flex cursor-pointer gap-1" onClick={() => setOpen((current) => !current)}><ChevronRight className={`transition-transform ${isOpen ? "rotate-90" : ""}`} />Example response</button>

        {isOpen && (
          <div className="mx-5 my-2">
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-black p-4 text-sm text-gray-300">{JSON.stringify(example, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>

  )
}