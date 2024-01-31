"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const { isLogged, login } = useAuth();

  const [incorrect, setIncorrect] = useState(false);

  const checkUser = (data: any) => {
    if (
      data.email === "cafe@upb.com" &&
      data.password === "cafe1234"
    ) {
      router.push("/admin/cafeteria");
     // login();
    } else if(
      data.email === "evento@upb.com" &&
      data.password === "evento123"
    ){
      router.push("/admin/events");
    }else{
      setIncorrect(true);
    }
  };
  const click = () => {
    router.push("/home/cafeteria");
  }

  return (
    <div className="flex bg-white p-10 rounded-lg">
      <form
        className="flex flex-col space-y-4 md:space-y-6 h-[50%] w-[270px]"
        onSubmit={handleSubmit(checkUser)}
      >
        <div className="flex flex-1 flex-col">
          <div className="mb-2 block">
            <label className="text-[#302E46] font-semibold text-xl font-jost">
              Correo Electrónico
            </label>
          </div>
          <input
            className="flex-1 bg-white text-gray-800 rounded-lg font-josefin font-light"
            placeholder="usuario@email.com"
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-700 mt-2 font-normal font-jost">
              * Debes introducir un correo
            </p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-red-700 mt-2 font-normal font-jost">
              * Introduce un correo válido
            </p>
          )}
        </div>
        <div className="flex flex-1 flex-col">
          <div className="mb-2 block">
            <label className="text-[#302E46] font-semibold font-jost text-xl">
              Contraseña
            </label>
          </div>
          <input
            className="flex-1 bg-white text-gray-800 rounded-lg font-josefin"
            placeholder="°°°°°°°°"
            type="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-700 mt-2 font-normal leading-relaxed font-jost ">
              * Debes introducir una contraseña
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-700 mt-2 font-normal leading-relaxed font-jost">
              * Una contraseña debe tener al menos 8 caracteres
            </p>
          )}
        </div>
        {incorrect && (
          <p className="text-red-700 mt-2 font-normal leading-relaxed font-jost">
            * El correo y la contraseña son incorrectos, introdúcelos de nuevo
          </p>
        )}
        <button type="submit" className="flex-1 bg-[#0A8D76] hover:bg-green-700 p-2 rounded-xl text-white font-medium">Ingresar</button> 
        <button onClick={click} className="flex-1 bg-[#0A8D76] hover:bg-green-500 p-2 rounded-xl text-white font-medium">Ingresar como usuario</button> 

      </form>

    </div>
  );
};

export default LoginForm;