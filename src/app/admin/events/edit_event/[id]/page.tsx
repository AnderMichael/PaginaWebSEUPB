"use client";

import { useRouter } from "next/navigation";
import EventForm from "../components/EventForm";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { getEventsFS } from "@/firestore/events";
import { EventInterface } from "@/models/eventModel";

interface TokenProps {
  params: {
    id: string;
  };
  searchParams: string;
}

const EditEvent = ({ params, searchParams }: TokenProps) => {
  const router = useRouter();
  // const [{ data: eventData, loading, error }] = useAxios(
  //   `${process.env.NEXT_PUBLIC_LOCAL_API}/events/${params.id}`
  // );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [eventData, setEventData] = useState<EventInterface>({
    id: "",
    name: "",
    description: "",
    date: "",
    hour: "",
    img: "",
    linkForm: "",
    hasLink: true,
  });

  const getDataFromDB = async () => {
    try {
      setLoading(true);
      const data = await getEventsFS();
      if (data !== null) {
        const event: EventInterface = data.find(
          (item: EventInterface) => item.id === params.id
        );
        setEventData(event);
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    getDataFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <p>Loading</p>}
      {error && <p>Error</p>}
      {!loading && !error && (
        <div className="flex absolute inset-0">
          <div className="flex flex-1 flex-col">
            <div className="flex h-[10%] bg-orange-1 items-center max-[541px]:justify-center min-[541px]:justify-between px-7">
              <h1 className="text-white min-[541px]:text-4xl max-[541px]:text-3xl font-bold">
                Editar Evento
              </h1>
              <button
                className="flex bg-teal-500 hover:opacity-80 text-white text-xl font-semibold rounded-full w-[125px] h-[45px] items-center justify-center max-[541px]:hidden"
                onClick={() => router.back()}
              >
                ATRÁS
              </button>
            </div>

            <div className="flex h-[90%] justify-center overflow-y-auto m-5">
              <EventForm eventData={eventData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EditEvent;
