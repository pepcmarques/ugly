import { Provider as ReduxProvider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import riReducer from "./ri_reducer";

const store = createStore(riReducer, applyMiddleware(thunk));

export default store;
