"use client";
import { useForm, Controller } from "react-hook-form";
import useAxios from "axios-hooks";
import { useRouter } from "next/navigation";
import EventUPB from "@/app/types/EventUPB";
import { useState } from "react";
import { EventInterface } from "@/models/eventModel";
import { updateEventFS } from "@/firestore/events";

interface EventFormProps {
  eventData: EventInterface;
}

const EventForm = ({ eventData }: EventFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [putLoading, setPutLoading] = useState<boolean>(false);
  const [putError, setPutError] = useState<boolean>(false);

  // const [{ loading: putLoading, error: putError }, executePut] = useAxios(
  //   {
  //     url: `${process.env.NEXT_PUBLIC_LOCAL_API}/events/${eventData.id}`,
  //     method: "PUT",
  //   },
  //   { manual: true }
  // );

  const router = useRouter();
  const [cancel, setCancel] = useState(false);
  const onSubmit = async (data: any) => {
    if (!cancel) {
      try {
        setPutLoading(true);
        const response = await updateEventFS({
          id: eventData.id,
          name: data.eventName,
          description: data.eventDescription,
          date: data.eventDate,
          hour: data.eventTime,
          img: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          linkForm: data.registrationLink ? data.linkForm : "",
          hasLink: data.registrationLink,
        });
        setPutLoading(false);
        if (!response) {
          router.replace("/events_admin?added");
        } else {
          setPutError(true);
          router.replace("/events_admin?error");
        }
      } catch (err) {
        setPutLoading(false);
        console.error(err);
        setPutError(true);
        router.replace("/events_admin?error");
      }
    }
  };

  if (putLoading) return <p>Loading...</p>;
  if (putError) return <p>Error!</p>;

  const cancelled = () => {
    setCancel(true);
    router.back();
  };

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
          {...register("eventName", { required: true, value: eventData.name })}
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
            {...register("eventDate", {
              required: true,
              value: eventData.date,
            })}
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
            {...register("eventTime", {
              required: true,
              value: eventData.hour,
            })}
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
          {...register("eventDescription", { value: eventData.description })}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="registrationLink"
          control={control}
          defaultValue={eventData.hasLink}
          render={({ field }) => (
            <>
              <div className="flex space-x-3 mb-4">
                <input
                  type="checkbox"
                  className="mt-1"
                  defaultChecked={eventData.hasLink}
                  {...field}
                />
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
                    {...register("linkForm", {
                      required: true,
                      value: eventData.linkForm,
                    })}
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
        className="bg-teal-400 text-white py-2 px-4 rounded hover:opacity-80 max-[541px]:mb-4 font-bold"
      >
        Actualizar
      </button>
      <input
        type="button"
        className="bg-[#3636C5] text-white py-2 px-4 rounded hover:opacity-50 min-[541px]:hidden font-bold"
        onClick={() => router.back()}
        value="Atrás"
      />
    </form>
  );
};

export default EventForm;
