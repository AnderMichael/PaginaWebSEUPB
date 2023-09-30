"use client";

import events from "../data/events";
import EventCard from "./components/EventCard";

const AdminEvents = () => {
  return (
    <div className="flex absolute inset-0">
      <div className="flex flex-1 flex-col">
        <div className="flex h-[10%] bg-[#2B2BB2] items-center max-[541px]:justify-center px-7">
          <h1 className="text-white min-[541px]:text-4xl max-[541px]:text-3xl font-bold">Eventos UPB - SEUPB</h1>
        </div>
        <div className="flex h-[10%] items-center max-[541px]:justify-center px-7">
          <button className="flex bg-[#3636C5] hover:opacity-50 text-white text-xl font-bold rounded h-[50%] w-auto items-center justify-center px-5">
            Crear Evento
          </button>
        </div>
        <div className="flex-col overflow-y-auto h-[80%]">
          {events.map((ev) => (
            <EventCard eventData={ev} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
