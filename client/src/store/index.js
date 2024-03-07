import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import userReducer from "./user"
import profileReducer from "./profileSlice";
import franchiseReducer from "./franchiseSlice";
import loanFormReducer from "./loanForm";

export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    franchise: franchiseReducer,
    user: userReducer,
    loanForm: loanFormReducer
  },
});
