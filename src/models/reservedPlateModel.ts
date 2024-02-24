export interface ReservedModelBackend {
  id: string;
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
}

export interface ReservedModelFrontend {
  id: string;
  clientCode: number;
  clientName: string;
  clientSchedule: string;
  plateId: string;
  plateAvailable: boolean;
  plateDescription: string;
  plateImage: string;
  plateName: string;
  platePrice: number;
  plateQuantity: number;
}
