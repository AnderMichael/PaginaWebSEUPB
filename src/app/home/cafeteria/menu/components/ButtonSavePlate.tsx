import { StoreContext } from "@/store/StoreProvider";
import React, { useContext } from "react";

interface Props {
  buttonText: string;
  action: () => void;
}

export const ButtonSavePlate = ({ buttonText, action }: Props) => {
  const context: any = useContext(StoreContext);

  const biggerEqualThan: boolean = context.widthScreen >= 890;
  return (
    <button
      className={`${
        biggerEqualThan
          ? "p-3 ml-3 rounded-lg w-max h-max"
          : "p-1 w-full rounded-bl-3xl rounded-br-3xl"
      } bg-[#4BAAC8] hover:bg-[#4eb2d1] active:bg-[#459eb8]  text-center
      text-white text-lg font-medium`}
      onClick={action}
    >
      {buttonText}
    </button>
  );
};
