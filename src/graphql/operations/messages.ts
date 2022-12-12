import { gql } from "@apollo/client";

export const MessageFields = `
  id
  sender {
    id
    username
  }
  body
  createdAt
`;

const MessagesOperations = {
  Query: {
    messages: gql`
      query Messages($conversationId: String!) {
        messages(conversationId: $conversationId) {
          ${MessageFields}
        }
      }
    `,
  },
  Mutations: {
    sendMessage: gql`
      mutation SendMessage(
        $id: String!
        $conversationId: String!
        $senderId: String!
        $body: String!
      ) {
        sendMessage(
          id: $id
          conversationId: $conversationId
          senderId: $senderId
          body: $body
        )
      }
    `,
  },
  Subscriptions: {
  },
};

export default MessagesOperations;