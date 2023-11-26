"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteModal from "./components/DeleteModal";
import { getPlatesFS, plates } from "@/firestore/plates";
import { PlateInterface } from "@/models/plateModel";
import { PlateCard } from "./components/PlateCard";
import { Button } from "./components/Button";

const AdminCafeteria = () => {
  const router = useRouter();

  useEffect(() => {
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
  }, [router]);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorFinded, setErrorFinded] = useState<boolean>(false);
  const [plates, setPlates] = useState<PlateInterface[]>([]);

  const getDataFromDB = async () => {
    try {
      setLoading(true);
      const data = await getPlatesFS();
      if (data !== null) {
        setPlates(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
        setErrorFinded(true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorFinded(true);
    }
  };

  const [plateToDelete, setPlateToDelete] = useState(null);

  const promptToDelete = (event: any) => {
    setPlateToDelete(event);
  };

  useEffect(() => {
    getDataFromDB();
  }, []);

  return (
    <>
      {loading && <p>Loading</p>}
      {errorFinded && <p>Error</p>}
      {!loading && !errorFinded && (
        <div className="flex absolute inset-0">
          <div className="flex flex-1 flex-col">
            <div className="flex h-[10%] bg-[#2B2BB2] items-center max-[541px]:justify-center px-7">
              <h1 className="text-white min-[541px]:text-4xl max-[541px]:text-3xl font-bold">
                Actualizar Menú
              </h1>
            </div>
            <div className="flex h-[10%] items-center max-[541px]:justify-center min-[541px]:justify-between px-7 shadow-lg">
              <h1 className="text-[#384293] min-[541px]:text-3xl max-[541px]:text-2xl font-bold">
                Lista de Platillos
              </h1>
              <div className="space-x-4">
                <Button
                  action={() => {}}
                  color="bg-[#2A9247]"
                  buttonText="+ Añadir Plato"
                />
                <Button
                  action={() => {}}
                  color="bg-[#D67952]"
                  buttonText="Publicar Menú"
                />
              </div>
            </div>
            <div className="flex flex-col items-center overflow-y-auto h-[80%]">
              {plates.map((plate: PlateInterface) => (
                <PlateCard plate={plate} />
              ))}
            </div>

            <DeleteModal
              isOpen={!!plateToDelete}
              event={
                plateToDelete || {
                  id: "",
                  name: "",
                  description: "",
                  date: "",
                  hour: "",
                  img: "",
                  linkForm: "",
                  hasLink: true,
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
