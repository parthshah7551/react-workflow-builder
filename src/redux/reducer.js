import { createSlice } from "@reduxjs/toolkit";

const RegistrationDataSlice = createSlice({
  name: "Registration Data",
  initialState: {
    counterValue: 0,
    counterValue2: 0,
  },
  reducers: {
    counterReducer: (state, action) => {
      console.log("state: ", state.counterValue);
      console.log("action: ", action);
      return { ...state, counterValue: action.payload + 1 };
    },
    counterReducer2: (state, action) => {
      return { ...state, counterValue2: action.payload + 20 };
    },
  },
});

export const { counterReducer, counterReducer2 } =
  RegistrationDataSlice.actions;

export default RegistrationDataSlice.reducer;
