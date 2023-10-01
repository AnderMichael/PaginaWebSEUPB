import React, { useContext } from "react";
import { platesData } from "../data/platesData";
import { PlateCard } from "./PlateCard";
import { StoreContext } from "@/store/StoreProvider";

export const ListPlatesCards = () => {
  const context: any = useContext(StoreContext);

  return (
    <section
      className={`flex flex-row flex-wrap overflow-y-auto h-[90%] w-[${context.widthScreen}px] justify-center items-start`}
    >
      {platesData.map((item) => (
        <PlateCard key={item.id} plate={item} />
      ))}
    </section>
  );
};
