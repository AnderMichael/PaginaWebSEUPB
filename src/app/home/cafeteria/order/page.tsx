"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { messageOrder } from "./../data";
import { useRouter } from "next/navigation";

const OrderPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);

  const onCheckSubmit = () => {
    console.log("guardar nota");
  };
  return (
    <>
      <div className="lg:py-20 md:py-10 lg:px-40 md:px-40 sm:p-10 left-0 right-0 top-0 bottom-0">
        <form
          onSubmit={handleSubmit(onCheckSubmit)}
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
              type="number"
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
          <div className="flex flex-row">
            <label
              htmlFor="acceptTerms"
              className="flex align-middle text-center mx-5"
            >
              Sí, entiendo y acepto
            </label>
            <input
              type="checkbox"
              id="acceptTerms"
              className="bg-[#E1E3EF] text-[#0A8D76] rounded-lg   w-5 p-2.5 "
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
                router.push("/home/cafeteria");
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
