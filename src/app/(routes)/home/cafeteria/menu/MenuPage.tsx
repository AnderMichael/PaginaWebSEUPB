"use client";
import React, { useContext, useEffect, useState } from "react";
import { ListPlatesCards } from "./components/ListPlatesCards";
import { StoreContext } from "@/store/StoreProvider";
import { DatabaseReference, onValue, ref } from "firebase/database";
import { realTimeDb } from "../../../../../firestore/firebaseConnection";

export const MenuPage = () => {
  const context: any = useContext(StoreContext);
  const [isCafeteriaClosed, setCafeteriaClosed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      context.setWidthScreen(window.innerWidth);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      context.setHeightScreen(window.innerHeight);
      context.setMenuPageHeight(window.innerHeight - 80 || 400);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps

    // Referencia al atributo 'closed' en Firebase
    const closedRef: DatabaseReference = ref(realTimeDb, 'closed');
    const unsubscribe = onValue(closedRef, (snapshot) => {
      const closed = snapshot.val();
      setCafeteriaClosed(closed);
    });

    // Desuscribirse de la referencia al desmontar el componente
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={`flex absolute inset-0`}>
      <section className="w-full flex flex-col justify-center items-center">
        <div
          className="flex h-[60px] mb-[24px] bg-transparent items-center max-[541px]:justify-center
        sticky px-7 top-0"
        >
          <h1 className="text-transparent text-4xl font-bold">Cafeteria</h1>
        </div>
        {isCafeteriaClosed ? (
          <p className="text-4xl font-bold">Las reservas en la cafetería ya cerraron.</p>
        ) : (
          <ListPlatesCards />
        )}
      </section>
    </main>
  );
};
