import { all } from "redux-saga/effects";
import { loginWatcher } from "./sagas/login.saga";
import { registerWatcher } from "./sagas/register.saga";
import { userWatcher } from "./sagas/user.saga";

// Root saga collection of other sagas
export function* rootSaga() {
  yield all([loginWatcher(), userWatcher(), registerWatcher()]);
}
