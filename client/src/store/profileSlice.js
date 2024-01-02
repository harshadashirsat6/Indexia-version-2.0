import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    insert_category(state, action) {
      state.category = action.payload;
    },
    insert_contact(state, action) {
      state.contact = action.payload;
    },
    insert_loandetails(state, action) {
      state.loandetails = action.payload;
    },
    show_profile_data(state, action) {
      return state;
    },
  },
});

export default profileSlice.reducer;
export const {
  insert_category,
  show_profile_data,
  insert_contact,
  insert_loandetails,
} = profileSlice.actions;
