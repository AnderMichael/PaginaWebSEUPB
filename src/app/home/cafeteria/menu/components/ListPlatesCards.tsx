"use client";
import React, { useContext, useEffect, useState } from "react";
import { PlateCard } from "./PlateCard";
import { StoreContext } from "@/store/StoreProvider";
import { PlatesTypes } from "../types/platesType";
import { onValue, ref } from "firebase/database";
import { realTimeDb } from "../../../../../firestore/firebaseConnection";
import ModalPage from "../../../../../modals/ModalPage";
import ModalLoading from "../../../../../modals/ModalLoading";
import ModalMessage from "../../../../../modals/ModalMessage";

export const ListPlatesCards = () => {
  const context: any = useContext(StoreContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [platesData, setPlatesData] = useState<PlatesTypes[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const getDataFromDB = async () => {
    try {
      setLoading(true);
      const updateReference = ref(realTimeDb, "plates/");
      onValue(
        updateReference,
        async (snapshot) => {
          const data = await snapshot.val();
          const valuesArray: PlatesTypes[] = Object.entries(data).map(
            ([id, props]) => ({
              id,
              ...(props as {
                plateName: string;
                platePrice: number;
                plateAvailable: boolean;
                plateDescription: string;
                plateImage: string;
                plateQuantity: number;
              }),
            })
          );
          setPlatesData(valuesArray);
          setTimeout(() => {
            setLoading(false);
          }, 100);
        },
        {
          onlyOnce: true,
        }
      );
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const updateReference = ref(realTimeDb, "plates/");
  useEffect(() => {
    setTimeout(() => {
      onValue(updateReference, async (snapshot) => {
        const data = await snapshot.val();
        const valuesArray: PlatesTypes[] = Object.entries(data).map(
          ([id, props]) => ({
            id,
            ...(props as {
              plateName: string;
              platePrice: number;
              plateAvailable: boolean;
              plateDescription: string;
              plateImage: string;
              plateQuantity: number;
            }),
          })
        );
        setPlatesData(valuesArray);
      });
      setRefresh(!refresh);
    }, 30000);
  }, [refresh]);

  useEffect(() => {
    context.setOrderMade(false);
  }, []);

  useEffect(() => {
    getDataFromDB();
  }, [context.orderMade]);

  return (
    <>
      {(loading || error) && (
        <ModalPage>
          <>
            {loading && <ModalLoading />}
            {error && (
              <ModalMessage title={"Error 404"} message={"Vuelva mas tarde"} />
            )}
          </>
        </ModalPage>
      )}
      {!loading && !error && (
        <section
          className={`flex flex-row flex-wrap overflow-y-auto h-[90%] w-[${context.widthScreen}px] justify-center items-start`}
        >
          {platesData.length !== 0 &&
            platesData.map((item: PlatesTypes) => (
              <PlateCard key={item.id} plate={item} />
            ))}
        </section>
      )}
    </>
  );
};
