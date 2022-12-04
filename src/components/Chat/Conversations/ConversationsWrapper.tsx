import { Session } from "next-auth"

interface ConversationWrapperProps {
    session: Session;
}

const ConversationsWrapper: React.FC<ConversationWrapperProps> = ({session}) => {
  return (
    <div>ConversationsWrapper</div>
  )
}

export default ConversationsWrapper