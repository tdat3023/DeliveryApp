import { combineReducers } from "redux";
import info from "./infoRed";
import orders from "./orderData";
const reducers = combineReducers({
  // shipperInfor: info,
  orderInfor: orders,
});

export default (state, action) => reducers(state, action);
