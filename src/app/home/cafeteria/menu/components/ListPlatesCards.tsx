"use client";
import React, { useContext, useEffect, useState } from "react";
import { PlateCard } from "./PlateCard";
import { StoreContext } from "@/store/StoreProvider";
import useAxios from "axios-hooks";
import { PlatesTypes } from "../types/platesType";
import { getPlatesFS } from "@/firestore/plates";

export const ListPlatesCards = () => {
  const context: any = useContext(StoreContext);

  // const [{ data: platesData, loading, error }, refetch] = useAxios(
  //   `${process.env.NEXT_PUBLIC_LOCAL_API}/plates`
  // );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [platesData, setPlatesData] = useState<PlatesTypes[]>([]);

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

  const getDataFromDB = async () => {
    try {
      setLoading(true);
      const data = await getPlatesFS();
      if (data !== null) {
        setPlatesData(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    getDataFromDB();
  }, []);

  return (
    <>
      {loading && (
        <p className="flex justify-start w-full h-[90%] mt-5">Loading</p>
      )}
      {error && <p className="flex justify-start w-full h-[90%] mt-5">Error</p>}
      {!loading && !error && (
        <section
          className={`flex flex-row flex-wrap overflow-y-auto h-[90%] w-[${context.widthScreen}px] justify-center items-start`}
        >
          {platesData.map((item: PlatesTypes) => (
            <PlateCard key={item.id} plate={item} />
          ))}
        </section>
      )}
    </>
  );
};
