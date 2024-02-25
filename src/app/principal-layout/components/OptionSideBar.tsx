"use client";
import { StoreContext } from "@/store/StoreProvider";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
interface Props {
  textOption: string;
  navigationOption: string;
}

export const OptionSideBar = ({ textOption, navigationOption }: Props) => {
  const context: any = useContext(StoreContext);
  const router = useRouter();
  return (
    <button
      onClick={() => {
        context.setTextHeader(textOption);
        localStorage.setItem(
          "headerTitle",
          JSON.stringify({ headerTitle: textOption })
        );
        router.push(`/home/${navigationOption}`);
      }}
      className="flex items-center p-2 bg-[#fdd095]
      hover:bg-[#e6b89a] text-white w-full"
    >
      <span className="ml-3 text-2xl font-bold">{textOption}</span>
    </button>
  );
};
