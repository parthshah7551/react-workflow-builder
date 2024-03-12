import { configureStore } from "@reduxjs/toolkit";
import RegistrationDataReducer from "./reducer.js";

export const store = configureStore({
  reducer: RegistrationDataReducer,
});
