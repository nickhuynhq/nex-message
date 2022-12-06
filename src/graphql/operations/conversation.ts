import { gql } from "@apollo/client";

const ConversationFields = `
  conversations {
    id
    updatedAt
    participants {
      user {
        id
        username
      }
      hasSeenLatestMessage
    }
    latestMessage {
      id
      sender {
        id
        username
      }
      body
      createdAt
    }
  }
`;

const ConversationOperations = {
  
  Queries: {
    conversations: gql`
      query Conversations {
        ${ConversationFields}
      }
    `,
  },

  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },

  Subscriptions: {},
};

export default ConversationOperations;
