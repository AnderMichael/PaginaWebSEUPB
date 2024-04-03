"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteModal from "./components/DeleteModal";
import { PlateInterface } from "@/models/plateModel";
import { PlateCard } from "./components/PlateCard";
import { Button } from "./components/Button";
import { onValue, ref } from "@firebase/database";


import { set as firebaseSet } from "firebase/database";
import { DatabaseReference } from "firebase/database";
import { realTimeDb } from "../../../../firestore/firebaseConnection";
import ModalLoading from "../../../../modals/ModalLoading";
import ModalMessage from "../../../../modals/ModalMessage";
import ModalPage from "../../../../modals/ModalPage";

const AdminCafeteria = () => {
  const router = useRouter();
  const [refresh, setRefresh] = useState<boolean>(false);
  const updateReference:DatabaseReference = ref(realTimeDb, "plates/");

  const closedRef: DatabaseReference = ref(realTimeDb, 'closed');
  const [isCafeteriaClosed, setCafeteriaClosed] = useState<boolean>(false);

  useEffect(() => {
    if(typeof window !== undefined){
      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.has("added")) {
        queryParams.delete("added");
        window.history.replaceState(
          {},
          document.title,
          `${window.location.pathname}${queryParams}`
        );
        sessionStorage.setItem("notification", "added");
        router.back();
        window.location.reload();
      } else if (queryParams.has("deleted")) {
        queryParams.delete("deleted");
        window.history.replaceState(
          {},
          document.title,
          `${window.location.pathname}${queryParams}`
        );
        router.back();
        window.location.reload();
      } else {
        if (queryParams.has("error")) {
          queryParams.delete("error");
          window.history.replaceState(
            {},
            document.title,
            `${window.location.pathname}${queryParams}`
          );
          alert("Hubo un error en el proceso");
        }
      }

      window.onload = () => {
        let notification = sessionStorage.getItem("notification");
        if (notification != null) {
          if (notification === "added") {
            alert("Evento aniadido exitosamente");
          } else if (notification === "deleted") {
            alert("Evento eliminado exitosamente");
          } else if (notification === "edited") {
            alert("Evento actualizado exitosamente");
          }
          sessionStorage.removeItem("notification");
        }
      };
    }
  }, [router]);

  useEffect(() => {
    const unsubscribe = onValue(closedRef, (snapshot) => {
      setCafeteriaClosed(snapshot.val());
    });

    return () => unsubscribe();
  }, []);

  // Función para abrir/cerrar la cafetería
  const toggleCafeteriaStatus = () => {
    firebaseSet(closedRef, !isCafeteriaClosed);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [errorFinded, setErrorFinded] = useState<boolean>(false);
  const [plates, setPlates] = useState<PlateInterface[]>([]);

  const getDataFromDB: () => Promise<void> = async () => {
    try {
      setLoading(true);
      onValue(updateReference, async (snapshot) => {
        const data = await snapshot.val();
        const valuesArray: PlateInterface[] = Object.entries(data).map(
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
        setPlates(valuesArray);
        setLoading(false);
        }
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorFinded(true);
    }
  };

  const [plateToDelete, setPlateToDelete] = useState(null);

  const promptToDelete = (plate: any) => {
    setPlateToDelete(plate);
  };

  const goToReservedPlates = () => {
    console.log("reservar");
    router.push("/admin/cafeteria/reservations");
  };

  const goToAddDish = () => {
    console.log("añadir");
    router.push("/admin/cafeteria/add_dish");
  };

  useEffect(() => {
    setTimeout(() => {
      onValue(updateReference, async (snapshot) => {
        const data = await snapshot.val();
        const valuesArray: PlateInterface[] = Object.entries(data).map(
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
        setPlates(valuesArray);
        setRefresh(!refresh);
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    getDataFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typeBoolean:boolean = loading || errorFinded;

  return (
    <>
    {
      (typeBoolean) && (
        <ModalPage>
          <>
          {
            loading && (
              <ModalLoading/>
            )
          }
          {
            errorFinded && (
              <ModalMessage title={"Error 404!"} message={"Page not finded"}/>
            )
          }
          </>
        </ModalPage>
      )
    }
      :
      {!loading && !errorFinded && (
        <div className="flex absolute inset-0">
          <div className="flex flex-1 flex-col">
            <div className="flex h-[10%] bg-orange-1 items-center max-[541px]:justify-center px-7">
              <h1 className="text-white min-[541px]:text-4xl max-[541px]:text-3xl font-bold">
                Actualizar Menú
              </h1>
            </div>
            <div className="flex h-[15%] items-center justify-between px-7 shadow-lg">
              <h1 className="text-orange-700 min-[541px]:text-2xl max-[541px]:text-sm font-bold">
                Lista de Platillos
              </h1>
              <div className="flex min-[541px]:flex-row max-[541px]:flex-col max-[541px]:space-y-2 min-[541px]:space-x-4">
                <Button
                   action={toggleCafeteriaStatus}
                   color="bg-[#0A8D76]"
                   buttonText={isCafeteriaClosed ? "Abrir Cafetería Virtual" : "Cerrar Cafetería Virtual"}
                />
                <Button
                  action={goToReservedPlates}
                  color="bg-[#0A8D76]"
                  buttonText="Ver platos reservados"
                />
                <Button
                  action={goToAddDish}
                  color="bg-[#2A9247]"
                  buttonText="+ Añadir Plato"
                />
              </div>
            </div>
            <div className="flex flex-col items-center overflow-y-auto h-[80%]">
              {plates.length!==0 ? <>
                {
                  plates.map((plate: PlateInterface, index: number) => (
                    <PlateCard key={index} plate={plate} deleteAction={promptToDelete} />
                  ))
                }
              </> : <></>}
            </div>
            <DeleteModal
              isOpen={!!plateToDelete}
              plate={
                plateToDelete || {
                  id: "1",
                  plateName: "Spaghetti Bolognese",
                  platePrice: 12.99,
                  plateQuantity: 20,
                  plateAvailable: true,
                  plateDescription: "Classic Italian dish with meat sauce",
                  plateImage: "spaghetti_bolognese.jpg",
                }
              }
              onClose={() => setPlateToDelete(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCafeteria;
