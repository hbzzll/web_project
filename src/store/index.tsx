import { legacy_createStore } from "redux";
import reducer from "./reducer.tsx";

const store = legacy_createStore(reducer);

export default store;
