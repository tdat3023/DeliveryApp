import { combineReducers } from "redux";
import inforShipper from "./inforShipper";
// import updateS from "./oneOrder";

import currentLocation from "./CurentLocation";

const reducers = combineReducers({
  // order: updateS,
  locationCurrent: currentLocation,
  shipperInfor: inforShipper,
});

export default (state, action) => reducers(state, action);
