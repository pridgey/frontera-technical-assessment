import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import { rootSaga } from "./sagas";

// Create the redux store
const reduxSagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxSagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

reduxSagaMiddleware.run(rootSaga);
