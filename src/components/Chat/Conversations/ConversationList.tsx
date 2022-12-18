import { useMutation } from "@apollo/client";
import { Box, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { ConversationPopulated } from "../../../../../backend/src/util/types";
import ConversationItem from "./ConversationItem";
import ConversationModal from "./Modal/Modal";
import ConversationOperations from "../../../graphql/operations/conversation";
import { toast } from "react-hot-toast";

interface ConversationListProps {
  session: Session;
  conversations: Array<ConversationPopulated>;
  onViewConversation: (
    conversationId: string,
    hasSeenLatestMessage: boolean | undefined
  ) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const router = useRouter();
  const {
    user: { id: userId },
  } = session;
  const sortedConversations = [...conversations].sort(
    (a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf()
  );
  const [deleteConversation] = useMutation<{
    deleteConversation: boolean;
    conversationId: string;
  }>(ConversationOperations.Mutations.deleteConversation);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onDeleteConversation = async (conversationId: string) => {
    try {
      toast.promise(
        deleteConversation({
          variables: {
            conversationId,
          },
          update: () => {
            // Once convo is deleted, remove from Query Params
            // Takes User back to home page
            router.replace(
              typeof process.env.NEXTAUTH_URL === "string"
                ? process.env.NEXTAUTH_URL
                : ""
            );
          },
        }),
        {
          loading: "Deleting Conversation.",
          success: "Conversation Deleted.",
          error: "Failed to delete Conversation.",
        }
      );
    } catch (error) {
      console.log("onDeleteConversation Error", error);
    }
  };

  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation.
        </Text>
      </Box>
      <ConversationModal session={session} isOpen={isOpen} onClose={onClose} />
      {sortedConversations.map((conversation) => {
        const participant = conversation.participants.find(
          (p: any) => p.user.id == userId
        );
        return (
          <ConversationItem
            key={conversation.id}
            userId={userId}
            conversation={conversation}
            onClick={() =>
              onViewConversation(
                conversation.id,
                participant?.hasSeenLatestMessage
              )
            }
            onDeleteConversation={onDeleteConversation}
            hasSeenLatestMessage={participant?.hasSeenLatestMessage}
            isSelected={conversation.id === router.query.conversationId}
          />
        );
      })}
    </Box>
  );
};

export default ConversationList;
