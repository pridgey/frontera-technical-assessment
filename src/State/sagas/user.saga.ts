import { gql } from "@apollo/client";
import { createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { client } from "../../config/ApolloClient";

type UserState = {
  status: "LOADING" | "ERROR" | "SUCCESS";
  error: any;
  data: any;
};

const initState: UserState = {
  status: "LOADING",
  error: undefined,
  data: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),
    setUser: (state, action) => {
      state.status = "SUCCESS";
      state.data = action.payload;
      state.error = "";
    },
    retrieve: (state) => {
      state.status = "LOADING";
      state.error = "";
    },
    error: (state, action) => {
      state.status = "ERROR";
      state.error = action.payload;
    },
  },
});

const RETRIEVE_USER = gql`
  query userDetails {
    userDetails {
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
`;

function* userSaga() {
  try {
    const response = yield call(client.query, {
      query: RETRIEVE_USER,
    });

    if (response) {
      console.log("We have data!", response);
    } else {
      throw new Error("Get User Details Response Empty");
    }
    // Update user state with success
    yield put(
      userSlice.actions.setUser({
        ...response.data.userDetails,
      })
    );
  } catch (error) {
    yield put(
      userSlice.actions.error({
        error: error || "Error during fetching user",
      })
    );
  }
}

export function* userWatcher() {
  yield takeLatest(userSlice.actions.retrieve, userSaga);
}
