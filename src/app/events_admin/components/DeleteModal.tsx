"use client";

import React from "react";
import useAxios from "axios-hooks";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const [{ loading }, executeDelete] = useAxios(
    {
      url: `${process.env.NEXT_PUBLIC_LOCAL_API}/events/${event?.id}`,
      method: "DELETE",
    },
    { manual: true }
  );

  const handleDelete = async () => {
    try {
      await executeDelete();
      onClose();
      sessionStorage.setItem("notification", "deleted");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
          onClick={onClose}
        />
        <div className="bg-white p-6 rounded-lg shadow-md z-10">
          <h2 className="text-xl font-semibold mb-4">Confirmar Elimación</h2>
          <p className="mb-4">¿Estás seguro de borrar este evento?</p>

          <div className="mb-4">
            <strong>Nombre:</strong> {event.name}
          </div>
          <div className="mb-4">
            <strong>Fecha:</strong> {event.date}
          </div>
          <div className="mb-4">
            <strong>Hora:</strong> {event.hour}
          </div>

          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded mr-4"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
