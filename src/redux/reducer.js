import { createSlice } from "@reduxjs/toolkit";

const RegistrationDataSlice = createSlice({
  name: "Registration Data",
  initialState: {
    counterValue: 0,
    selectedFileData: [],
    selectedFileName: "",
  },
  reducers: {
    counterReducer: (state, action) => {
      return { ...state, counterValue: action.payload + 1 };
    },
    selectedFileData: (state, action) => {
      return { ...state, selectedFileData: action.payload };
    },
    selectedFileName: (state, action) => {
      return { ...state, selectedFileName: action.payload };
    },
  },
});

export const { counterReducer, selectedFileData, selectedFileName } =
  RegistrationDataSlice.actions;

export default RegistrationDataSlice.reducer;
