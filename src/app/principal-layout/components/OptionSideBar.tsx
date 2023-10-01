"use client";
import Link from "next/link";
import React from "react";

interface Props {
  textOption: string;
  navigationOption: string;
}

export const OptionSideBar = ({ textOption, navigationOption }: Props) => {
  return (
    <Link href={navigationOption} className="w-full">
      <button
        className="flex items-center p-2 bg-[#6F6FC8]
        hover:bg-[#9A9AE6] active:bg-[#9A9AE6] text-white w-full"
      >
        <span className="ml-3 text-xl font-semibold">{textOption}</span>
      </button>
    </Link>
  );
};
