import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./constants";

const initialState = {
  isAuthenticated: false,
  authToken: null,
  tokenType: null,
};

const riReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        authToken: action.payload.access_token,
        tokenType: action.payload.token_type,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
        authToken: null,
        tokenType: null,
      };
    default:
      return state;
  }
};

export default riReducer;
