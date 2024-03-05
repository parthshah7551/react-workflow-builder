import { configureStore } from "@reduxjs/toolkit";
import RegistrationDataReducer from "./reducer";

export const store = configureStore({
  reducer: RegistrationDataReducer,
});
