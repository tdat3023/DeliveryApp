import { combineReducers } from "redux";
import info from "./infoRed";
const reducers = combineReducers({
  shipperInfor: info,
});

export default (state, action) => reducers(state, action);
