"use client";
import React, { useContext } from "react";
import { PlateCard } from "./PlateCard";
import { StoreContext } from "@/store/StoreProvider";
import useAxios from "axios-hooks";
import { PlatesTypes } from "../types/platesType";

export const ListPlatesCards = () => {
  const context: any = useContext(StoreContext);

  const [{ data: platesData, loading, error }, refetch] = useAxios(
    `${process.env.NEXT_PUBLIC_LOCAL_API}/plates`
  );
  if (loading)
    return <p className="flex justify-start w-full h-[90%] mt-5">Loading</p>;
  if (error)
    return <p className="flex justify-start w-full h-[90%] mt-5">Error</p>;
  // console.log(platesData);
  // if (loading) {
  //   context.setGeneralLoading(true);
  //   return <div>loading</div>;
  // } else {
  //   context.setGeneralLoading(false);
  // }
  // if (error) {
  //   context.setGeneralError(true);
  //   return <div>error</div>;
  // } else {
  //   context.setGeneralError(false);
  // }

  return (
    <>
      <section
        className={`flex flex-row flex-wrap overflow-y-auto h-[90%] w-[${context.widthScreen}px] justify-center items-start`}
      >
        {platesData.map((item: PlatesTypes) => (
          <PlateCard key={item.id} plate={item} />
        ))}
      </section>
    </>
  );
};
