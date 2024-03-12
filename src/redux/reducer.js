import { createSlice } from "@reduxjs/toolkit";

const RegistrationDataSlice = createSlice({
  name: "Registration Data",
  initialState: {
    counterValue: 0,
    initialFileData: [],
    selectedFileName: "",
    csvFileKeys: [],
    currentOutputData: [],
  },
  reducers: {
    counterReducer: (state, action) => {
      return { ...state, counterValue: action.payload + 1 };
    },
    initialFileData: (state, action) => {
      return { ...state, initialFileData: action.payload };
    },
    currentOutputData: (state, action) => {
      return { ...state, currentOutputData: action.payload };
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
  initialFileData,
  selectedFileName,
  csvFileKeys,
  currentOutputData,
} = RegistrationDataSlice.actions;

export default RegistrationDataSlice.reducer;
