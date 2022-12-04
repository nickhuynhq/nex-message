import { SearchedUser } from "../../../../util/types";


interface ParticipantsProps {
    participants: Array<SearchedUser>;
    removeParticipant: (userId: string) => void;
};

const Participants: React.FC<ParticipantsProps> = ({participants, removeParticipant}) => {

    console.log("HERE ARE PARTICIPANTS", participants)
  return (
    <div>Participants</div>
  )
};

export default Participants;