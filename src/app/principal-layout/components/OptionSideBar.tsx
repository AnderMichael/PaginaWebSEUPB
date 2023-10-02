"use client";
import { StoreContext } from "@/store/StoreProvider";
import Link from "next/link";
import React, { useContext } from "react";

interface Props {
  textOption: string;
  navigationOption: string;
}

export const OptionSideBar = ({ textOption, navigationOption }: Props) => {
  const context: any = useContext(StoreContext);

  return (
    <Link href={navigationOption} className="w-full">
      <button
        onClick={() => {
          context.setTextHeader(textOption);
          localStorage.setItem(
            "headerTitle",
            JSON.stringify({ headerTitle: textOption })
          );
        }}
        className="flex items-center p-2 bg-[#6F6FC8]
        hover:bg-[#9A9AE6] active:bg-[#9A9AE6] text-white w-full"
      >
        <span className="ml-3 text-xl font-semibold">{textOption}</span>
      </button>
    </Link>
  );
};
