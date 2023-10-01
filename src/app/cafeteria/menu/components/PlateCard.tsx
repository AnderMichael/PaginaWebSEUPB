import { StoreContext } from "@/store/StoreProvider";
import React, { useContext, useEffect } from "react";

interface Props {}

export const PlateCard = () => {
  const context: any = useContext(StoreContext);

  return (
    <div
      className={`flex flex-row bg-[#E2F7ED] rounded-lg
    ${context.width >= 800 ? "w-[350px]" : "w-[250px]"} h-[260px]`}
    >
      PlateCard
    </div>
  );
};
