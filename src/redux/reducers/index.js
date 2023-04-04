import { combineReducers } from "redux";
import infoShipper from "./infoShipper";
import updateS from "./oneOrder";
import orders from "./orderData";
import currentLocation from "./CurentLocation";
const reducers = combineReducers({
  shipperInfor: infoShipper,
  updateStatus: updateS,
  orderInfor: orders,
  locationCurrent: currentLocation,
});

export default (state, action) => reducers(state, action);
