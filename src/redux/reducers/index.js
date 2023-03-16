import { combineReducers } from "redux";
import info from "./infoRed";
import orderInfo from "./orderInf";
const reducers = combineReducers({
  // shipperInfor: info,
  orderInfor: orderInfo,
});

export default (state, action) => reducers(state, action);
