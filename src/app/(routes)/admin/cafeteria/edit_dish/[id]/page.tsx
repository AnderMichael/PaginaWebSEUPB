"use client";

import { useRouter } from "next/navigation";
import DishForm from "../components/DishForm";
import { useEffect, useState } from "react";
import { PlateInterface } from "@/models/plateModel";
import { getPlatesFS } from "@/firestore/plates";
import { DatabaseReference, onValue, ref } from "firebase/database";
import { realTimeDb } from "@/firestore/firebaseConnection";

interface TokenProps {
  params: {
    id: string;
  };
  searchParams: string;
}

const EditDish = ({ params, searchParams }: TokenProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [dishData, setdishData] = useState<PlateInterface>({
    id: "",
    plateName: "",
    platePrice: 0,
    plateQuantity: 0,
    plateAvailable: false,
    plateDescription: "",
    plateImage: "",
  });
  const updateReference:DatabaseReference = ref(realTimeDb, "plates/");

  const getDataFromDB = async () => {
    try {
      setLoading(true);
      const data = await getPlatesFS();
      console.log("🚀 ~ getDataFromDB ~ data:", data)
      if (data !== null) {
        onValue(updateReference, async (snapshot) => {
          const data = await snapshot.val();
          const platesType: PlateInterface[] = Object.entries(data).map(
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
          const plate : PlateInterface = platesType.find((item: PlateInterface) => item.id === params.id) as PlateInterface;
          setdishData(plate);
          setLoading(false);
          }
        );
      } else {
        setError(true);
      }
      setLoading(false);
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
      {loading && <p>Loading</p>}
      {error && <p>Error</p>}
      {!loading && !error && (
        <div className="flex absolute inset-0">
          <div className="flex flex-1 flex-col">
            <div className="flex h-[10%] bg-orange-1 items-center max-[541px]:justify-center min-[541px]:justify-between px-7">
              <h1 className="text-white min-[541px]:text-4xl max-[541px]:text-3xl font-bold">
                Editar Platillo
              </h1>
              <button
                className="flex bg-[#4752B7] hover:opacity-50 text-white text-xl font-semibold rounded-full w-[125px] h-[45px] items-center justify-center max-[541px]:hidden"
                onClick={() => router.back()}
              >
                ATRÁS
              </button>
            </div>

            <div className="flex h-[90%] justify-center overflow-y-auto m-5">
              <DishForm plateData={dishData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EditDish;
