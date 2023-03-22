import { combineReducers } from "redux";
import info from "./infoRed";
import updateS from "./oneOrder";
import orders from "./orderData";
const reducers = combineReducers({
  // shipperInfor: info,
  updateStatus: updateS,
  orderInfor: orders,
});

export default (state, action) => reducers(state, action);
