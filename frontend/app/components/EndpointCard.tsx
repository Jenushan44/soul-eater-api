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
    <div className="mx-auto mt-5 w-[90%] overflow-hidden rounded-md border-2 border-[#101010] bg-[#0b0c0b]">
      <div className="flex w-full flex-col gap-4 px-6 pt-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-start gap-2">
            <p className="flex w-[50px] shrink-0 justify-center border border-green-700 bg-[#043610] py-0.5 font-semibold text-[#3fc778]">{method}</p>
            <p className="min-w-0 break-all font-semibold sm:break-words">{path}</p>
          </div>
          <p className="mt-2">{description}</p>
        </div>

        {parameter ? (
          <div className="w-full shrink-0 rounded-md border-2 border-[#222224] px-3 py-2 sm:w-auto sm:min-w-[190px]">
            <p className="text-xs text-gray-500">{parameter.location}</p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-sm text-gray-200">{parameter.name}</p>
              <p className="rounded bg-[#182433] px-2 py-0.5 text-xs text-blue-300">{parameter.type}</p>
            </div>
          </div>
        ) : (
          <div className="flex w-full shrink-0 items-center rounded-md border-2 border-[#222224] px-3 py-2 sm:w-auto sm:min-w-[190px]">
            <p className="text-sm text-gray-500">No parameters</p>
          </div>
        )}
      </div>

      <div className="mx-6 mb-5 mt-5 flex flex-col rounded-sm bg-[#1a1a1a] py-2">
        <button className="ml-2 flex cursor-pointer items-center gap-1 text-left" onClick={() => setOpen((current) => !current)}> <ChevronRight className={`shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />Example response</button>

        {isOpen && (
          <div className="mx-2 my-2 sm:mx-5">
            <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-black p-4 text-sm text-gray-300">{JSON.stringify(example, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}