"use client";

import EventUPB from "../types/EventUPB";
import EventCard from "./components/EventCard";
import useAxios from "axios-hooks";

const EventsPage = () => {
  const [{ data: events, loading, error }, refetch] = useAxios(
    "http://localhost:3000/events"
  );
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  
  return (
    <div className="flex absolute inset-0">
      <div className="flex flex-1 flex-col">
        <div className="flex h-[10%] bg-[#4752B7] items-center max-[541px]:justify-center px-7">
          <h1 className="text-white text-4xl font-bold">Eventos</h1>
        </div>
        <div className="flex-col overflow-y-auto h-[90%]">
          {events.map((ev: EventUPB) => (
            <EventCard eventData={ev} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
