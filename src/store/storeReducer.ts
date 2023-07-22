import { loginInitialValues, loginReducer, loginTypes } from "./loginReducer";

interface Action{
  type: string
};

export const types = {
  ...loginTypes,
};

export const initalValues = {
  ...loginInitialValues,
};
// hago push hugo?
// mmm messirve, entonces que carpetas elimino huguito?
export const storeReducer:any = (state:any, action:Action) => {
  switch (action.type) {
    case loginTypes.login:
      return loginReducer(state,action);
    case loginTypes.logout:
      return loginReducer(state,action);;
    default:
      return state;
  }
};