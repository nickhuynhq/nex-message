import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import React, { useState } from "react";
import { ObjectID } from "bson";
import { toast } from "react-hot-toast";
import { SendMessageArguments } from "../../../../../../backend/src/util/types";
import MessageOperations from "../../../../graphql/operations/message";
import { MessagesData } from "../../../../util/types";

type MessageInputProps = {
  session: Session;
  conversationId: string;
};

const MessageInput: React.FC<MessageInputProps> = ({
  session,
  conversationId,
}) => {
  const [messageBody, setMessageBody] = useState("");
  const [inputError, setInputError] = useState(false);
  const [sendMessage] = useMutation<
    { sendMessage: boolean },
    SendMessageArguments
  >(MessageOperations.Mutation.sendMessage);

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    setInputError(false);

    if (!messageBody) {
      setInputError(true);
      toast.error("Invalid message.");
      return;
    }

    try {
      // call sendMessage mutation
      const { id: senderId } = session.user;
      const messageId = new ObjectID().toString();
      const newMessage: SendMessageArguments = {
        id: messageId,
        senderId,
        conversationId,
        body: messageBody,
      };

      // Clear input state after sending message
      setMessageBody("");

      const { data, errors } = await sendMessage({
        variables: {
          ...newMessage,
        },
        // Optimistic rendering to tell Apollo to cache and give data
        // Before getting successfull response from server
        optimisticResponse: {
          sendMessage: true,
        },
        // Cache is basically a state in Apollo
        // Prevents redundant requests
        // Checks cache first before requesting to server
        update: (cache) => {
          // Read cache
          const exisiting = cache.readQuery<MessagesData>({
            query: MessageOperations.Query.messages,
            variables: { conversationId },
          }) as MessagesData;

          // Write to cache
          cache.writeQuery<MessagesData, { conversationId: string }>({
            query: MessageOperations.Query.messages,
            variables: { conversationId },
            data: {
              ...exisiting,
              messages: [
                {
                  id: messageId,
                  body: messageBody,
                  senderId: session.user.id,
                  conversationId,
                  sender: {
                    id: session.user.id,
                    username: session.user.username,
                  },
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                },
                ...exisiting.messages,
              ],
            },
          });
        },
      });

      if (!data?.sendMessage || errors) {
        throw new Error("Failed to send message");
      }
    } catch (error: any) {
      console.log("onSendMessage error", error);
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={6} width="100%">
      <form onSubmit={onSendMessage}>
        <InputGroup>
          <Input
            value={messageBody}
            size="md"
            isInvalid={inputError}
            errorBorderColor="red.700"
            placeholder="New Message"
            onChange={(event) => setMessageBody(event.target.value)}
            resize="none"
            _focus={{
              boxShadow: "none",
              border: "1px solid",
              borderColor: "whiteAlpha.400",
            }}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              bg="brand.100"
              onClick={onSendMessage}
            >
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
};

export default MessageInput;
