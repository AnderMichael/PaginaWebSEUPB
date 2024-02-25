"use client";

import EventCard from "./components/EventCard";
import { EventInterface } from "@/models/eventModel";
import { useEffect, useState } from "react";
import { getEventsFS } from "@/firestore/events";

const EventsPage = () => {
  // const [{ data: events, loading, error }, refetch] = useAxios(
  //   `${process.env.NEXT_PUBLIC_LOCAL_API}/events`
  // );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [events, setEvents] = useState<EventInterface[]>([]);

  const getDataFromDB = async () => {
    try {
      setLoading(true);
      const data = await getEventsFS();
      if (data !== null) {
        setEvents(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    getDataFromDB();
  }, []);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="flex inset-0">
      <div className="flex flex-1 flex-col">
        <div className="flex-col h-[90%]">
          {events.map((ev: EventInterface) => (
            <EventCard eventData={ev} key={ev.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
