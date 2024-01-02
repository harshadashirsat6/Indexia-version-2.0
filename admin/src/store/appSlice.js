import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  allLoans: null,
};


const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAllLoans: (state, action) => {
      state.allLoans = action.payload;
    },
  },
})

export default appSlice.reducer
export const {setAllLoans} = appSlice.actions