"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import { set, ref } from "firebase/database";
import { realTimeDb } from "../../../../../firestore/firebaseConnection";
import ModalPage from "../../../../../modals/ModalPage";
import ModalLoading from "../../../../../modals/ModalLoading";
import ModalMessage from "../../../../../modals/ModalMessage";

export default function DishForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const router = useRouter();
  const [cancel, setCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorFinded, setErrorFinded] = useState(false);
  const [checkboxSelected, setCheckboxSelected] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    if (!cancel) {
      try {
        setLoading(true);
        const ID:string = v4();
        const response = {
          plateName: data.name,
          platePrice: data.price,
          plateQuantity: data.quantity,
          plateAvailable: true,
          plateDescription: data.description,
          plateImage:
            "https://images.pexels.com/photos/18111272/pexels-photo-18111272/free-photo-of-slogan-on-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        };
        
        await set(ref(realTimeDb, "plates/" + ID), {
          ...response
        });
        

        router.back();
      } catch (err) {
        setLoading(false);
        setErrorFinded(true);
        console.error(err);
        router.replace("/events_admin?error");
      }
    }
  };

  return (
    <>
      {
        loading || errorFinded && (
          <ModalPage>
            <>
            {loading && <ModalLoading/>}
            {errorFinded && <ModalMessage title={"Error 500"} message={`There was an error with the app,
            try again or come back later`}/>}
            </>
          </ModalPage>
        )
      }
      {!loading && !errorFinded && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col min-[541px]:w-[70%] max-[541px]:w-full h-fit p-4 bg-gray-100 rounded-lg"
        >
          <div className="mb-4">
            <label htmlFor="eventName" className="block font-semibold">
              Nombre del Platillo
            </label>
            <input
              type="text"
              id="name"
              placeholder="Ej: Almuerzo Principal"
              className="w-full p-2 border rounded mt-1"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">* Este campo es obligatorio.</span>
            )}
          </div>

          <div className="flex max-[541px]:flex-col min-[541px]:space-x-2">
            <div className="flex-1 mb-4">
              <label htmlFor="eventDate" className="block font-semibold">
                Cantidad Disponible
              </label>
              <input
                type="number"
                id="quantity"
                className="w-full p-2 border rounded mt-1"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <span className="text-red-500">
                  * Este campo es obligatorio.
                </span>
              )}
            </div>

            <div className="flex-1 mb-4">
              <label htmlFor="eventTime" className="block font-semibold">
                Precio
              </label>
              <input
                type="number"
                id="price"
                className="w-full p-2 border rounded mt-1"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-red-500">
                  * Este campo es obligatorio.
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="eventDescription" className="block font-semibold">
              Descripción del platillo
            </label>
            <textarea
              id="description"
              placeholder="Describe su contenido"
              className="w-full p-2 border rounded mt-1"
              rows={6}
              {...register("description")}
            />
          </div>

          <button
            type="submit"
            className="bg-[#3636C5] text-white py-2 px-4 rounded hover:opacity-50 max-[541px]:mb-4 font-bold"
          >
            Crear
          </button>

          <input
            type="button"
            className="bg-[#3636C5] text-white py-2 px-4 rounded hover:opacity-50 min-[541px]:hidden font-bold"
            onClick={() => router.back()}
            value="Atrás"
          />
        </form>
      )}
    </>
  );
}
