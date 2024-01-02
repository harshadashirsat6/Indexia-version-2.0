import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import profileReducer from "./profileSlice";
import franchiseReducer from "./franchiseSlice";
export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    franchise: franchiseReducer,
  },
});
