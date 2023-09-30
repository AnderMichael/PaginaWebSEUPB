"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const OrderPage = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(false);

    const onCheckSubmit = () => {

    }
    return(
        <>
        <div className="bg-slate-100 top-0 bottom-0 left-0 right-0 h-full w-full">
            Cafe cafe
            <form
                onSubmit={handleSubmit(onCheckSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="ej: amy313"
                    {...register("username", { required: true, maxLength: 20 })}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    {...register("password", { required: true, minLength: 4 })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  {error && (
                    <label className="block mb-2 text-sm font-medium text-red-500 ">
                      El usuario y la contraseña no coinciden O_o
                    </label>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 "
                >
                  Iniciar sesión
                </button>

                <p className="text-sm font-light text-gray-500 ">
                  ¿No tienes una cuenta?{" "}
                  
                </p>
              </form>
        </div>
        </>
    );
}

export default OrderPage;