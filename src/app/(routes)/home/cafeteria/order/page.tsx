"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { messageOrder } from "./../data";
import { useRouter } from "next/navigation";
import { StoreContext } from "@/store/StoreProvider";
import { OrderForm } from "@/models/orderModel";
import ModalPage from "@/modals/ModalPage";
import ModalConfirmation from "@/modals/ModalConfirmation";
import { ref, set, update } from "firebase/database";
import { v4 } from "uuid";
import { realTimeDb } from "../../../../../firestore/firebaseConnection";

const OrderPage = () => {
  const context: any = useContext(StoreContext);
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<OrderForm>();
  const [dataForm, setDataForm] = useState<OrderForm>();
  const [error, setError] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const onCheckSubmit = async (data: OrderForm) => {
    setDataForm(data);
    setModal(true);
  };

  const proccedSubmit = async () => {
    if (dataForm !== undefined) {
      await submitForm(dataForm);
    } else {
      alert("Los datos no fueron llenados correctamente");
    }
    setDataForm({
      username: "",
      code: "",
      time: TimeRanges.prototype,
      acceptTerms: false,
    });
    setModal(false);
  };

  const submitForm = async (data: OrderForm) => {
    const { username, code, time, acceptTerms } = data;
    if (username && code && time && acceptTerms) {
      setError(false);

      const {
        id,
        plateName,
        platePrice,
        plateAvailable,
        plateDescription,
        plateImage,
        plateQuantity,
      } = context.dataPlateToReserve;

      const plateGottenData = {
        plateAvailable: plateQuantity - 1 > 0,
        plateDescription: plateDescription,
        plateImage: plateImage,
        plateName: plateName,
        platePrice: platePrice,
        plateQuantity: plateQuantity - 1,
      };

      const newOrderPlate = {
        clientCode: Number(code),
        clientName: username,
        clientSchedule: String(time.start) + ":" + String(time.end),
        plateId: id,
        ...plateGottenData,
      };

      // await setReservedPlateFS(newOrderPlate);

      const updates: any = {};

      updates[`/plates/${id}`] = { ...plateGottenData };

      update(ref(realTimeDb), updates);

      set(ref(realTimeDb, "reserved_plates/" + v4()), {
        client_code: Number(code),
        client_name: username,
        client_schedule: String(time),
        plate_id: id,
        plate_available: plateQuantity - 1 > 0,
        plate_description: plateDescription,
        plate_image: plateImage,
        plate_name: plateName,
        plate_price: platePrice,
        plate_quantity: plateQuantity - 1,
      });

      alert("Platillo pedido exitosamente");
      context.setOrderMade(true);
      router.back();
    } else {
      setError(true);
    }
  };

  const username: string = watch("username");
  const code: string = watch("code");
  const time: TimeRanges = watch("time");
  const acceptTerms: boolean = watch("acceptTerms");

  useEffect(() => {
    if (!username || !code || !time || !acceptTerms) {
      setError(true);
    } else {
      setError(false);
    }
  }, [acceptTerms, code, time, username]);

  return (
    <>
      {modal && (
        <ModalPage>
          <ModalConfirmation
            actionOne={proccedSubmit}
            actionTwo={() => setModal(false)}
            title={"Confirmar Envio?"}
            message={`Se reservará el plato ${context.dataPlateToReserve.plateName}`}
          />
        </ModalPage>
      )}
      <div className="lg:py-20 md:py-10 lg:px-40 md:px-40 sm:p-10 left-0 right-0 top-0 bottom-0">
        <form
          onSubmit={handleSubmit((data) => onCheckSubmit(data))}
          className="flex flex-col space-y-4 md:space-y-6 text-lg  mx-10 sm:ml-10"
        >
          <div>
            <label className="block mb-2 font-medium text-gray-900">
              Escribe tu nombre
            </label>
            <input
              type="text"
              id="username"
              className="bg-[#E1E3EF] border  text-gray-900 rounded-lg block w-3/4 p-2.5 "
              placeholder="ej: Juan Perez"
              {...register("username", { required: true, maxLength: 30 })}
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 ">
              Escribe tu código
            </label>
            <input
              type="string"
              id="code"
              placeholder="ej: 12345"
              className="bg-[#E1E3EF] text-gray-900 rounded-lg w-3/4 p-2.5 "
              {...register("code", {
                required: true,
                minLength: 4,
                maxLength: 6,
              })}
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900">
              Ingresa la hora de entrega desde 7:45 a 16:30
            </label>
            <input
              type="time"
              id="time"
              placeholder="ej: 12:45"
              className="bg-[#E1E3EF]  text-gray-900 rounded-lg w-3/4 p-2.5 "
              {...register("time", { required: true })}
            />
          </div>
          <div className="flex items-center justify-between">
            {error && (
              <label className="block mb-2 text-sm font-medium text-red-500 ">
                Datos inválidos
              </label>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label className="block mb-2  font-medium text-gray-900 ">
              {messageOrder}
            </label>
          </div>
          <div className="flex flex-row items-center">
            <label
              htmlFor="acceptTerms"
              className="flex align-middle text-center mx-5"
            >
              Sí, entiendo y acepto
            </label>
            <input
              type="checkbox"
              id="acceptTerms"
              className="bg-[#E1E3EF] text-[#0A8D76] rounded-lg mt-1 w-5 p-2.5 cursor-pointer outline-none"
              {...register("acceptTerms", { required: true })}
            />
          </div>
          <div className="flex flex-row">
            <button
              type="submit"
              className="w-1/4 text-white bg-[#0A8D76] hover:bg-emerald-600 m-5  font-medium rounded-lg  px-5 py-2.5 text-center mt-3"
            >
              ENVIAR
            </button>

            <button
              type="button"
              className="w-1/4 text-white bg-red-500 hover:bg-red-400 active:bg-red-600 m-5
              font-medium rounded-lg  px-5 py-2.5 text-center mt-3"
              onClick={() => {
                router.back();
              }}
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrderPage;
