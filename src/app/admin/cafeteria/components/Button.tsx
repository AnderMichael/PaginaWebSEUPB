"use client";
import { StoreContext } from "@/store/StoreProvider";
import React, { useContext } from "react";

interface Props {
  buttonText: string;
  color: string;
  action: () => void;
}

export const Button = ({ buttonText, action, color }: Props) => {
  const context: any = useContext(StoreContext);

  const biggerEqualThan: boolean = context.widthScreen >= 890;
  return (
    <button
      className={`${
        biggerEqualThan
          ? "p-3 ml-3 rounded-lg w-max h-max"
          : "p-1 w-full rounded-lg"
      } ${color} hover:opacity-80 text-center
      text-white text-lg font-medium`}
      onClick={action}
    >
      {buttonText}
    </button>
  );
};
