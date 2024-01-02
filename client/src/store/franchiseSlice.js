import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  allLoans: null,
};

const franchiseSlice = createSlice({
  name: "franchise",
  initialState,
  reducers: {
    setProfileDetails: (state, { payload }) => {
      state.profile = payload;
    },
    setAllLoans: (state, { payload }) => {
      state.allLoans = payload;
    },
  },
});

export default franchiseSlice.reducer;
export const { setProfileDetails, setAllLoans } = franchiseSlice.actions;
