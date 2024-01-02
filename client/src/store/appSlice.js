import { createSlice } from "@reduxjs/toolkit";
import { inputs } from "../configs/inputs";

const initialState = {
  isOpenModal: { label: "", tracker: false },
  isFeedbackFormOpen: false,
  showSubmitLoanFormPaymentModal: false,
  formData: inputs,
  userProfileDetails: null,
  initialPopup: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFormData: (state, { payload }) => {
      state.formData = payload;
      console.log(state.formData);
    },
    setIsOpenModal: (state, { payload }) => {
      state.isOpenModal = payload;
    },
    setIsOpenFeedbackForm: (state, { payload }) => {
      state.isFeedbackFormOpen = payload;
    },
    setShowSubmitLoanFormPaymentModal: (state, { payload }) => {
      state.showSubmitLoanFormPaymentModal = payload;
    },
    setUserProfileDetails: (state, { payload }) => {
      state.userProfileDetails = payload;
    },
    setInitialPopup: (state, { payload }) => {
      state.initialPopup = payload;
    },
  },
});

export default appSlice.reducer;
export const {
  setFormData,
  setIsOpenModal,
  setIsOpenFeedbackForm,
  setShowSubmitLoanFormPaymentModal,
  setUserProfileDetails,
  setInitialPopup,
} = appSlice.actions;
