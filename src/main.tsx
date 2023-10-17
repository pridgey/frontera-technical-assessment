import { ApolloProvider } from "@apollo/client/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Routes/Routes";
import { store } from "./State/store";
import { client } from "./config/ApolloClient";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
