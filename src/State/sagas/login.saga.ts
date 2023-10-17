import { gql } from "@apollo/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { client } from "../../config/ApolloClient";
import { userSlice } from "./user.saga";

type LoginState = {
  status: "LOADING" | "ERROR" | "SUCCESS";
  error: unknown;
  data: unknown;
};

const initLoginState: LoginState = {
  status: "LOADING",
  error: undefined,
  data: undefined,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initLoginState,
  reducers: {
    resetAllState: () => ({ ...initLoginState }),
    login: (state, action) => {
      state.status = "LOADING";
      state.error = "";
    },
    loginSuccess: (state, action) => {
      state.status = "SUCCESS";
      state.data = action.payload;
    },
    loginError: (state, action) => {
      state.status = "ERROR";
      state.error = action.payload;
    },
    logout: (state) => {
      state.data = undefined;
    },
  },
});

const LOGIN = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(input: { username: $username, password: $password }) {
      isVerified
      token
      user {
        id
        username
        firstName
        lastName
        email
        lastLogin
        groups {
          edges {
            node {
              id
              name
            }
          }
        }
        staff {
          id
          firstname
          lastname
        }
        students {
          id
          firstname
          lastname
          parentFirstname
          parentLastname
        }
      }
    }
  }
`;

type LoginPayload = {
  username: string;
  password: string;
};

function* loginSaga(action: PayloadAction<LoginPayload>) {
  try {
    const response = yield call(client.mutate, {
      mutation: LOGIN,
      variables: {
        username: action.payload.username,
        password: action.payload.password,
      },
    });
    console.log(response);
    if (response) {
      const token = response?.data?.tokenAuth?.token ?? "";
      if (token) {
        // Store token for future calls
        localStorage.setItem("token", token);
      }
    } else {
      throw new Error("Auth Response Empty");
    }
    // Update Login state with success
    yield put(
      loginSlice.actions.loginSuccess({
        ...response.data.tokenAuth.user,
      })
    );
    // Update User state with data
    yield put(
      userSlice.actions.setUser({
        ...response.data.tokenAuth.user,
      })
    );
  } catch (error) {
    yield put(
      loginSlice.actions.loginError({
        error: error || "Error during login",
      })
    );
  }
}

function* logoutSaga() {
  try {
    localStorage.removeItem("token");
    yield put(userSlice.actions.resetAllState());
  } catch (error) {
    yield put(
      loginSlice.actions.loginError({
        error: error || "Error during logout",
      })
    );
  }
}

export function* loginWatcher() {
  yield takeLatest(loginSlice.actions.login, loginSaga);
  yield takeLatest(loginSlice.actions.logout, logoutSaga);
}
