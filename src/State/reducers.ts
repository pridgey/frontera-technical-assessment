import { combineReducers } from "@reduxjs/toolkit";
import { loginSlice } from "./sagas/login.saga";
import { registerSlice } from "./sagas/register.saga";
import { userSlice } from "./sagas/user.saga";

const reducer = combineReducers({
  login: loginSlice.reducer,
  user: userSlice.reducer,
  register: registerSlice.reducer,
});

export default reducer;
