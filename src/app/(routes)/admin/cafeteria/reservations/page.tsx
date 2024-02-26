"use client";
import { ReservedModelBackend } from "@/models/reservedPlateModel";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { DatabaseReference, onValue, ref, remove, update } from "firebase/database";
import { PlatesTypes } from "../../../home/cafeteria/menu/types/platesType";
import { realTimeDb } from "../../../../../firestore/firebaseConnection";
import ModalLoading from "../../../../../modals/ModalLoading";
import ModalPage from "../../../../../modals/ModalPage";
import { StoreContext } from "../../../../../store/StoreProvider";
import ModalConfirmation from "../../../../../modals/ModalConfirmation";
import ModalMessage from "../../../../../modals/ModalMessage";
import ModalMessageWithButton from "../../../../../modals/ModalMessageWithButton";

const ReservationPage = () => {
  const context: any = useContext(StoreContext);
  const platesData:PlatesTypes[] = context.platesData;
  const router = useRouter();
  const [orders, setOrders] = useState<ReservedModelBackend[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const updateReference: DatabaseReference = ref(realTimeDb, "reserved_plates/");
  const platesUpdateReference: DatabaseReference = ref(realTimeDb, "plates/");

  const getDataFromDB: () => Promise<void> = async () => {
    try {
      setLoading(true);

      onValue(
        updateReference, (snapshot) => {
          const data = snapshot.val();
          const valuesArray: ReservedModelBackend[] = Object.entries(data).map(
            ([id, props]) => ({
              id,
              ...(props as {
                client_code: number;
                client_name: string;
                client_schedule: string;
                plate_id: string;
                plate_available: boolean;
                plate_description: string;
                plate_image: string;
                plate_name: string;
                plate_price: number;
                plate_quantity: number;
              }),
            })
          );
          setOrders(valuesArray);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        },
        {
          onlyOnce: true,
        }
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      onValue(updateReference, async (snapshot) => {
        const data = await snapshot.val();
        const valuesArray: ReservedModelBackend[] = Object.entries(data).map(
          ([id, props]) => ({
            id,
            ...(props as {
              client_code: number;
              client_name: string;
              client_schedule: string;
              plate_id: string;
              plate_available: boolean;
              plate_description: string;
              plate_image: string;
              plate_name: string;
              plate_price: number;
              plate_quantity: number;
            }),
          })
        );
        setOrders(valuesArray);
      });

      onValue(platesUpdateReference, async (snapshot) => {
        const data = await snapshot.val();
        const valuesArray: PlatesTypes[] = Object.entries(data).map(
          ([id, props]) => ({
            id,
            ...(props as {
              plateName: string;
              platePrice: number;
              plateAvailable: boolean;
              plateDescription: string;
              plateImage: string;
              plateQuantity: number;
            }),
          })
        );
        context.setPlatesData(valuesArray);
      });
      setRefresh(!refresh);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  useEffect(() => {
    getDataFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeMyOrder = async (itemId:string) => {
    await remove(ref(realTimeDb, 'reserved_plates/' + itemId));
  };

  const deleteOrder = async (itemId:string, plateId: string) => {
    const plateFounded:any = {...platesData.find((item: PlatesTypes) => item.id === plateId)} || {
      id: "",
      plateName: "",
      platePrice: 0,
      plateAvailable: false,
      plateDescription: "",
      plateImage: "",
      plateQuantity: 0
    };
    const updates: any = {};
    delete plateFounded.id;
    plateFounded.plateQuantity += 1;
    updates[`/plates/${plateId}`] = plateFounded;
    await update(ref(realTimeDb), updates);
    removeMyOrder(itemId);
  };

  const [entregado, setEntregado] = useState<boolean>(false);

  const [orderPlateId, setOrderPlateId] = useState<string>('');

  const [endEntregado, setEndEntregado]= useState<boolean>(false);

  return (
    <>
      {(loading || entregado || endEntregado) && (
        <ModalPage>
          <>
            {loading && <ModalLoading />}
            {entregado && <ModalConfirmation
            actionOne={() => {setEntregado(false);setLoading(true);
            removeMyOrder(orderPlateId);setLoading(false);setEndEntregado(true);}}
            actionTwo={() => setEntregado(false)} title={"Entregar plato"}
            message={"¿Desea entrega el plato?"}/>}
            {endEntregado && <ModalMessageWithButton action={() => setEndEntregado(false)}
            title={"Plato Entregado"} message={"El plato a sido entregado correctamente"}/>}
            </>
        </ModalPage>
      )}
      <div className="container mx-auto p-4 w-[70%]">
        <div className="flex justify-between items-center m-5">
          <h1 className="text-[#302E46] my-5 text-left  text-4xl font-black font-jost ">
            Reservas para Hoy
          </h1>
          <button
            onClick={() => router.back()}
            className="font-bold font-jost text-lg bg-[#454464] hover:bg-[#302E46]  text-white px-6 py-4 rounded-2xl shadow-black shadow-md"
          >
            ATRAS
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="bg-orange-1 text-white font-bold text-2xl">
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
              {orders &&
                orders.map((order: ReservedModelBackend, index: number) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? " bg-orange-100" : "bg-zinc-50"
                    }
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
                      <button onClick={() => {
                        setOrderPlateId(order.id);
                        setEntregado(true);
                      }}>
                        <div className={`h-5 w-5 ${entregado ? 'text-[#1A4E1C]' : 'text-blue-500'} hover:text-[#173518]`}>
                          {entregado ? 'Entregado' : 'Entregar'}
                        </div>
                      </button>
                    </td>
                    <td className="text-black text-center px-4 py-2">
                      <button
                        onClick={() => deleteOrder(order.id, order.plate_id)}
                      >
                        <span className="h-5 w-5 text-red-500 hover:text-red-700">
                          {" "}
                          Eliminar
                        </span>
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
