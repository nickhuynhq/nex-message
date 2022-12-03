import { gql } from "@apollo/client";

const UserOperations = {
  Queries: {},
  Mutations: {
    createUsername: gql`
      mutation CreateUsername($username: String!) {
        createUsername(username: $username) {
          sucess
          error
        }
      }
    `,
  },
  Subscriptions: {},
};

export default UserOperations;
