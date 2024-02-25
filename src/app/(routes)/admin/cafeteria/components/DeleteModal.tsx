"use client";
import React, { useState } from "react";
import { PlateInterface } from "@/models/plateModel";
import { ref, remove } from "firebase/database";
import { realTimeDb } from "../../../../../firestore/firebaseConnection";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  plate: PlateInterface;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  plate,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await remove(ref(realTimeDb, "plates/" + plate.id));
      setLoading(false);
      onClose();
      sessionStorage.setItem("notification", "deleted");
      window.location.reload();
    } catch (error) {
      setLoading(false);
      onClose();
      sessionStorage.setItem("notification", "deleted");
      window.location.reload();
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
            <p><strong>Nombre:</strong> {plate.plateName}</p>
          </div>
          <div className="mb-4">
            <p>
            <strong>Precio:</strong> {plate.platePrice}
            </p>
          </div>
          <div className="mb-4">
            <p>
            <strong>Cantidad:</strong> {plate.plateQuantity}
            </p>
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
