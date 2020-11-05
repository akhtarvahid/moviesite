import { combineReducers } from "redux";
import crudReducer from "./crudReducer";
export default combineReducers({
  lists: crudReducer
});
