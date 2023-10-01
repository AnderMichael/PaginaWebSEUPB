"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { messageOrder } from './../data';

const OrderPage = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(false);

    const onCheckSubmit = () => {
        console.log("a wiwi");
    }
    return(
        <>
        <div className="bg-slate-100 py-20 px-40 ">
            Cafe cafe
            <form
                onSubmit={handleSubmit(onCheckSubmit)}
                className="flex flex-col space-y-4 md:space-y-6 text-lg "
              >
                <div>
                  <label className="block mb-2 font-medium text-gray-900 ">
                    Escribe tu nombre
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-[#E1E3EF] border  text-gray-900 rounded-lg block w-1/4 p-2.5 "
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
                    className="bg-[#E1E3EF] border  text-gray-900 rounded-lg block w-1/4 p-2.5 "
                    {...register("code", { required: true, minLength: 4, maxLength: 6 })}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-900 text-sm ">
                  Ingresa la hora de entrega desde 7:45 a 16:30
                  </label>
                  <input
                    type="time"
                    id="time"
                    placeholder="ej: 12:45"
                    className="bg-[#E1E3EF] border  text-gray-900 rounded-lg block w-1/4 p-2.5 "
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
                  
                    <label className="block mb-2  font-medium text-gray-500 ">
                      {messageOrder}
                    </label>
                  
                </div>
                <div>
                <input
                    type="checkbox"
                    id="acceptTerms"
                    placeholder="ej: 12:45"
                    className="bg-[#E1E3EF] border  text-gray-900 rounded-lg block w-1/4 p-2.5 "
                    {...register("acceptTerms", { required: true })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#0A8D76] hover:bg-emerald-600 focus:ring-4  font-medium rounded-lg  px-5 py-2.5 text-center mt-3 "
                >
                  ENVIAR
                </button>

                
              </form>
        </div>
        </>
    );
}

export default OrderPage;