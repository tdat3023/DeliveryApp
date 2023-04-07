import { combineReducers } from "redux";
import inforShipper from "./inforShipper";
import updateS from "./oneOrder";
import orders from "./orderData";
import currentLocation from "./CurentLocation";
const reducers = combineReducers({
  updateStatus: updateS,
  orderInfor: orders,
  locationCurrent: currentLocation,
  shipperInfor: inforShipper,
});

export default (state, action) => reducers(state, action);
