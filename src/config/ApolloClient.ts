import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Create the Apollo GraphQL Client
const graphqlUri = import.meta.env.VITE_GRAPHQL_URI ?? "";

const httpLink = createHttpLink({ uri: graphqlUri });
const token = localStorage.getItem("token");
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
