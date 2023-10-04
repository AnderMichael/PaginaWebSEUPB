import { organizerMenuAPI } from './organizerInstance';

export const getMenu = async () => {
    return await organizerMenuAPI.get("");
  };

  
  export const addMenu = async (event) => {
    return await organizerMenuAPI.post("/", event);
  };

  
  export const getMenuById = async (id) => {
    return await organizerMenuAPI.get(`/${id}`);
  };