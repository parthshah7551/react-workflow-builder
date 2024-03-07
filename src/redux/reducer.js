import { createSlice } from "@reduxjs/toolkit";

const RegistrationDataSlice = createSlice({
  name: "Registration Data",
  initialState: {
    counterValue: 0,
    selectedFileData: [],
    selectedFileName: "",
    csvFileKeys: [],
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
    csvFileKeys: (state, action) => {
      return { ...state, csvFileKeys: action.payload };
    },
  },
});

export const {
  counterReducer,
  selectedFileData,
  selectedFileName,
  csvFileKeys,
} = RegistrationDataSlice.actions;

export default RegistrationDataSlice.reducer;
