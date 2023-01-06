import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { getSession } from "next-auth/react";

const httpLink = new HttpLink({
  uri: `http://${process.env.BACKEND_URL}/graphql`,
  credentials: "include",
});

// Check we are in web browser and not in Next.js server
// This is due to Next SSR
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: `ws://${process.env.BACKEND_URL}/graphql/subscriptions`,
          connectionParams: async () => ({
            session: await getSession(),
          })
        })
      )
    : null;

const link = typeof window !== 'undefined' && wsLink != null ? split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  ) : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
