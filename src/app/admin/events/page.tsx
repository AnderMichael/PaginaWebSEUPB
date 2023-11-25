"use client";
import { useRouter } from "next/navigation";
import EventCard from "./components/EventCard";
import useAxios from "axios-hooks";
import EventUPB from "../../types/EventUPB";
import { useEffect, useState } from "react";
import DeleteModal from "./components/DeleteModal";
import { EventInterface } from "@/models/eventModel";
import { getEventsFS } from "@/firestore/events";

const AdminEvents = () => {
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has("added")) {
      queryParams.delete("added");
      window.history.replaceState(
        {},
        document.title,
        `${window.location.pathname}${queryParams}`
      );
      sessionStorage.setItem("notification", "added");
      router.back();
      window.location.reload();
    } else if (queryParams.has("deleted")) {
      queryParams.delete("deleted");
      window.history.replaceState(
        {},
        document.title,
        `${window.location.pathname}${queryParams}`
      );
      router.back();
      window.location.reload();
    } else {
      if (queryParams.has("error")) {
        queryParams.delete("error");
        window.history.replaceState(
          {},
          document.title,
          `${window.location.pathname}${queryParams}`
        );
        alert("Hubo un error en el proceso");
      }
    }

    window.onload = () => {
      let notification = sessionStorage.getItem("notification");
      if (notification != null) {
        if (notification === "added") {
          alert("Evento aniadido exitosamente");
        } else if (notification === "deleted") {
          alert("Evento eliminado exitosamente");
        } else if (notification === "edited") {
          alert("Evento actualizado exitosamente");
        }
        sessionStorage.removeItem("notification");
      }
    };
  }, [router]);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorFinded, setErrorFinded] = useState<boolean>(false);
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
        setErrorFinded(true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorFinded(true);
    }
  };

  const [eventToDelete, setEventToDelete] = useState(null);

  const promptToDelete = (event: any) => {
    setEventToDelete(event);
  };

  const createEvent = () => {
    router.push("/events_admin/add_event");
  };

  useEffect(() => {
    getDataFromDB();
  }, []);

  return (
    <>
      {loading && <p>Loading</p>}
      {errorFinded && <p>Error</p>}
      {!loading && !errorFinded && (
        <div className="flex absolute inset-0">
          <div className="flex flex-1 flex-col">
            <div className="flex h-[10%] bg-[#2B2BB2] items-center max-[541px]:justify-center px-7">
              <h1 className="text-white min-[541px]:text-4xl max-[541px]:text-3xl font-bold">
                Eventos UPB - SEUPB
              </h1>
            </div>
            <div className="flex h-[10%] items-center max-[541px]:justify-center px-7 shadow-lg">
              <button
                className="flex bg-[#3636C5] hover:opacity-50 text-white text-xl font-bold rounded h-[50%] w-auto items-center justify-center px-5 shadow-lg"
                onClick={createEvent}
              >
                Crear Evento
              </button>
            </div>
            <div className="flex-col overflow-y-auto h-[80%]">
              {events.map((ev: EventInterface) => (
                <EventCard
                  eventData={ev}
                  key={ev.id}
                  deleteMethod={promptToDelete}
                />
              ))}
            </div>
            <DeleteModal
              isOpen={!!eventToDelete}
              event={
                eventToDelete || {
                  id: "",
                  name: "",
                  description: "",
                  date: "",
                  hour: "",
                  img: "",
                  linkForm: "",
                  hasLink: true,
                }
              }
              onClose={() => setEventToDelete(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminEvents;
