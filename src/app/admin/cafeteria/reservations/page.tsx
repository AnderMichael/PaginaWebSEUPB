"use client";
import { getReserverPlateFS } from "@/firestore/order";
import { ReservedModelBackend } from "@/models/reservedPlateModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReservationPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<ReservedModelBackend[]>();
  const [loading, setLoading] = useState<boolean>(false);

  
  const getDataFromDB = async () => {
    try {
      setLoading(true);
      const data = await getReserverPlateFS();
      if (data !== null) {
        setOrders(data);
        console.log(data)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
        //setErrorFinded(true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
     // setErrorFinded(true);
    }
  };

  useEffect(() => {
    getDataFromDB();
  }, []);
  return (
    <>
      
      <div className="container mx-auto p-4 w-[70%]">
        <div className="flex justify-between items-center m-5">
          <h1 className="text-[#302E46] my-5 text-left  text-4xl font-black font-jost ">
            Reservas para Hoy
          </h1>
          <button
            onClick={() => router.back()}
            className="font-bold font-jost text-lg bg-[#3d3b57] hover:bg-[#302E46]  text-white px-6 py-4 rounded-2xl shadow-black shadow-md"
          >
            ATRAS
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="bg-[#384293] text-white font-bold text-2xl">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Código
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Pedido
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Hora de Reserva
                </th>
                <th colSpan={2} className="px-6 py-3 text-center">
                    Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order: ReservedModelBackend, index: number) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? " bg-[#C3D9F2]" : "bg-[#EEF6FF]"}
                >
                    <td className="text-black text-center px-4 py-2">
                    {order.client_code}
                  </td>
                  <td className="text-black text-center px-4 py-2">
                    {order.plate_name}
                  </td>
                  <td className="text-black text-center px-4 py-2">
                    {order.plate_price}
                  </td>
                  <td className="text-black text-center px-4 py-2">
                    {order.client_schedule}
                  </td>
                  <td className="text-black text-center px-4 py-2">
                    <button onClick={() => console.log("handleEdit(client)")}>
                      <div className="h-5 w-5 text-[#1A4E1C] hover:text-[#173518]">
                        Entregado
                      </div>
                    </button>
                  </td>
                  <td className="text-black text-center px-4 py-2">
                    <button
                      onClick={() => console.log("promptToDelete(client)")}
                    >
                      <div className="h-5 w-5 text-red-500 hover:text-red-700">
                        {" "}
                        Eliminar
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReservationPage;