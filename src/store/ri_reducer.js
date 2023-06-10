import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./constants";

const initialState = {
  isAuthenticated: false,
  authToken: null,
};

const riReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload.ok,
        authToken: action.payload.headers.map.authorization,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
        authToken: null,
      };
    default:
      return state;
  }
};

export default riReducer;
