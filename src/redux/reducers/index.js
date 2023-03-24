import { combineReducers } from "redux";
import info from "./infoRed";
import updateS from "./oneOrder";
import orders from "./orderData";
import currentLocation from "./CurentLocation";
const reducers = combineReducers({
  // shipperInfor: info,
  updateStatus: updateS,
  orderInfor: orders,
  locationCurrent: currentLocation,
});

export default (state, action) => reducers(state, action);
