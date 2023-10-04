import { organizerMenuAPI } from './organizerInstance';

export const getMenu = async () => {
    return await organizerMenuAPI.get("");
  };

  
  export const addMenu = async (event:any) => {
    return await organizerMenuAPI.post("/", event);
  };

  
  export const getMenuById = async (id:any) => {
    return await organizerMenuAPI.get(`/${id}`);
  };