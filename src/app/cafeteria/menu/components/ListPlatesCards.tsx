import React from "react";
import { platesData } from "../data/platesData";
import { PlateCard } from "./PlateCard";

export const ListPlatesCards = () => {
  // const context: any = useContext(StoreContext);

  return (
    <section className="flex flex-row flex-wrap overflow-y-auto">
      {platesData.map((item) => (
        <PlateCard key={item.id} plate={item} />
      ))}
    </section>
  );
};
