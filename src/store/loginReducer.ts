export const loginTypes = {
  login: "Login",
  logout: "Logout"
};

export const loginInitialValues = {
  auth: false
};

interface Action{
  type: string
};

export const loginReducer = (state:any, action:Action) => {
  switch (action.type) {
    case loginTypes.login:
      return {
        ...state,
        auth: true,
      };
    case loginTypes.logout:
      return {
        ...state,
        auth: false,
      };
    default:
      return state;
  }
};