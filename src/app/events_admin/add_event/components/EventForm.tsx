"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useAxios from "axios-hooks";
import { useRouter } from "next/navigation";

export default function EventForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [{ loading: postLoading, error: postError }, executePost] = useAxios(
    {
      url: "http://localhost:3000/events",
      method: "POST",
    },
    { manual: true }
  );

  const router = useRouter();
  const [cancel, setCancel] = useState(false);

  const onSubmit = async (data: any) => {
    if (!cancel) {
      try {
        const response = await executePost({
          data: {
            name: data.eventName,
            description: data.eventDescription,
            date: data.eventDate,
            hour: data.eventTime,
            img: "img0.porlomientras",
            linkForm: data.registrationLink ? data.linkForm : "",
            hasLink: data.registrationLink,
          },
        });
        console.log(response);
        router.replace("/events_admin?added");
      } catch (err) {
        console.error(err);
        router.replace("/events_admin?error");
      }
    }
  };

  if (postLoading) return <p>Loading...</p>;
  if (postError) return <p>Error!</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col min-[541px]:w-[70%] max-[541px]:w-full h-fit p-4 bg-gray-100 rounded-lg"
    >
      <div className="mb-4">
        <label htmlFor="eventName" className="block font-semibold">
          Nombre del Evento
        </label>
        <input
          type="text"
          id="eventName"
          placeholder="¿Cómo se llamará el evento?"
          className="w-full p-2 border rounded mt-1"
          {...register("eventName", { required: true })}
        />
        {errors.eventName && (
          <span className="text-red-500">* Este campo es obligatorio.</span>
        )}
      </div>

      <div className="flex max-[541px]:flex-col min-[541px]:space-x-2">
        <div className="flex-1 mb-4">
          <label htmlFor="eventDate" className="block font-semibold">
            Fecha del Evento
          </label>
          <input
            type="date"
            id="eventDate"
            className="w-full p-2 border rounded mt-1"
            {...register("eventDate", { required: true })}
          />
          {errors.eventDate && (
            <span className="text-red-500">* Este campo es obligatorio.</span>
          )}
        </div>

        <div className="flex-1 mb-4">
          <label htmlFor="eventTime" className="block font-semibold">
            Hora del Evento
          </label>
          <input
            type="time"
            id="eventTime"
            className="w-full p-2 border rounded mt-1"
            {...register("eventTime", { required: true })}
          />
          {errors.eventTime && (
            <span className="text-red-500">* Este campo es obligatorio.</span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="eventDescription" className="block font-semibold">
          Descripción del evento
        </label>
        <textarea
          id="eventDescription"
          placeholder="Describe el evento"
          className="w-full p-2 border rounded mt-1"
          rows={6}
          {...register("eventDescription")}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="registrationLink"
          control={control}
          render={({ field }) => (
            <>
              <div className="flex space-x-3 mb-4">
                <input type="checkbox" className="mt-1" {...field} />
                <label className="block font-semibold">
                  ¿Enlazar a formulario de registro?
                </label>
              </div>
              {field.value && (
                <>
                  <label className="block font-semibold">
                    Formulario de registro
                  </label>
                  <input
                    type="text"
                    placeholder="Ingresa el link de formulario de registro"
                    className="w-full p-2 border rounded mt-1"
                    {...register("linkForm", { required: true })}
                  />
                  {errors.linkForm && (
                    <span className="text-red-500">
                      * Este campo es obligatorio.
                    </span>
                  )}
                </>
              )}
            </>
          )}
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
  );
}
