import { createSlice } from "@reduxjs/toolkit";

const RegistrationDataSlice = createSlice({
  name: "Registration Data",
  initialState: {
    counterValue: 0,
    counterValue2: 0,
    selectedFileData: [],
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
    selectedFileData: (state, action) => {
      return { ...state, selectedFileData: action.payload };
    },
  },
});

export const { counterReducer, counterReducer2, selectedFileData } =
  RegistrationDataSlice.actions;

export default RegistrationDataSlice.reducer;
