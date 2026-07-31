"use client";

import { X } from "lucide-react";

type ReportIssueModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReportIssueModal({
  isOpen,
  onClose,
}: ReportIssueModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4" onClick={onClose}>
      <div className="relative w-full max-w-xl rounded-xl border-2 border-[#f89c0a] bg-zinc-950 p-6 sm:p-8" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute right-4 top-4 cursor-pointer text-zinc-400 transition hover:scale-110 hover:text-[#f89c0a]">
          <X size={30} />
        </button>

        <p className="font-banner text-sm tracking-[0.4em] text-[#f89c0a]">REPORT AN ISSUE</p>
        <p className="mt-3 font-banner text-3xl text-white sm:text-4xl">FOUND SOMETHING WRONG?</p>
        <div className="mt-6 h-[2px] w-24 bg-[#f89c0a]" />

        <p className="mt-6 leading-7 text-zinc-300">If you notice a bug, incorrect information, or anything missing from the API, you can report it by opening an issue on GitHub.</p>
        <p className="mt-4 leading-7 text-zinc-400">Include what you found and where it appears so I can look into it.</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="https://github.com/Jenushan44/soul-eater-api/issues/new" target="_blank" rel="noopener noreferrer" className="rounded-md bg-[#f89c0a] px-5 py-3 text-center font-bold text-black transition hover:-translate-y-1 hover:bg-white">OPEN GITHUB ISSUE</a>
          <button type="button" onClick={onClose} className="cursor-pointer rounded-md border border-zinc-700 px-5 py-3 font-bold text-white transition hover:border-[#f89c0a] hover:text-[#f89c0a]">CLOSE</button>
        </div>
      </div>
    </div>
  );
}