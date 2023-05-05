import { combineReducers } from "redux";
import inforShipper from "./inforShipper";
import inforOrder from "./oneOrder";

import currentLocation from "./CurentLocation";

const reducers = combineReducers({
  order: inforOrder,
  locationCurrent: currentLocation,
  shipperInfor: inforShipper,
});

export default (state, action) => reducers(state, action);
