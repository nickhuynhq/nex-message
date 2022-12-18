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

const MessageOperations = {
  Query: {
    messages: gql`
            query Messages($conversationId: String!){
                messages(conversationId: $conversationId) {
                    ${MessageFields}
                }
            }
        `,
  },
  
  Mutation: {
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

  Subscription: {
    messageSent: gql`
        subscription MessageSent($conversationId: String!) {
            messageSent(conversationId: $conversationId) {
                ${MessageFields}
            }
        }
    `,
  },
};

export default MessageOperations;
