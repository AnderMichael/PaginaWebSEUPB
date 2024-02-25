"use client";

import { useRouter } from "next/navigation";
import EventForm from "./components/EventForm";

const AddEvent = () => {
  const router = useRouter();

  return (
    <div className="flex absolute inset-0">
      <div className="flex flex-1 flex-col">
        <div className="flex h-[10%] bg-orange-1 items-center max-[541px]:justify-center min-[541px]:justify-between px-7">
          <h1 className="text-white min-[541px]:text-4xl max-[541px]:text-3xl font-bold">
            Crear Evento
          </h1>
          <button
            className="flex bg-teal-400 hover:opacity-80 text-white text-xl font-semibold rounded-full w-[125px] h-[45px] items-center justify-center max-[541px]:hidden"
            onClick={() => router.back()}
          >
            ATRÁS
          </button>
        </div>

        <div className="flex h-[90%] justify-center overflow-y-auto m-5">
          <EventForm />
        </div>
      </div>
    </div>
  );
};
export default AddEvent;
