import { gql } from "@apollo/client";

const ConversationFields = `
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
`;

const ConversationOperations = {
  Queries: {
    conversations: gql`
      query Conversations {
        conversations{
          ${ConversationFields}
        }
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

  Subscriptions: {
    conversationCreated: gql`
      subscription ConversationCreated {
        conversationCreated {
          ${ConversationFields}
        }
      }
    `,
  },
};

export default ConversationOperations;
