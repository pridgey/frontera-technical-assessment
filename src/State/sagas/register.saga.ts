import { gql } from "@apollo/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { client } from "../../config/ApolloClient";

type RegisterState = {
  status: "LOADING" | "ERROR" | "SUCCESS";
  error: unknown;
  data: unknown;
};

const initState: RegisterState = {
  status: "LOADING",
  error: undefined,
  data: undefined,
};

export const registerSlice = createSlice({
  name: "register",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),
    register: (state, action) => {
      state.status = "LOADING";
      state.error = "";
    },
    registerSuccess: (state, action) => {
      state.status = "SUCCESS";
      state.data = action.payload;
    },
    registerError: (state, action) => {
      state.status = "ERROR";
      state.error = action.payload;
    },
  },
});

const REGISTER = gql`
  mutation parentSignUp(
    $email: String!
    $firstname: String!
    $lastname: String
    $dob: Date!
    $gender: String
    $country: ID!
    $parentFirstname: String
    $parentLastname: String
    $password: String
  ) {
    studentSignup(
      input: {
        studentData: {
          email: $email
          firstname: $firstname
          lastname: $lastname
          dob: $dob
          gender: $gender
          country: $country
          password: $password
          parentFirstname: $parentFirstname
          parentLastname: $parentLastname
        }
      }
    ) {
      student {
        id
        firstname
        lastname
        zipCode
        parentFirstname
        parentLastname
        email
        country {
          id
          name
        }
        parent {
          id
          username
        }
        email
      }
      message
      status
    }
  }
`;

type RegisterPayload = {
  email?: string;
  firstname?: string;
  lastname?: string;
  dob?: Date;
  gender?: string;
  country?: string;
  password?: string;
};

function* registerSaga(action: PayloadAction<RegisterPayload>) {
  try {
    const response = yield call(client.mutate, {
      mutation: REGISTER,
      variables: {
        ...action.payload,
      },
    });
    if (!response) {
      throw new Error("Register Response Empty");
    }
    console.log("Reg response:", response);
    // Update Register state with success
    yield put(
      registerSlice.actions.registerSuccess({
        successfully_registered: response.data.studentSignup.status,
      })
    );
  } catch (error) {
    yield put(
      registerSlice.actions.registerError({
        error: error || "Error during registration",
      })
    );
  }
}

export function* registerWatcher() {
  yield takeLatest(registerSlice.actions.register, registerSaga);
}
