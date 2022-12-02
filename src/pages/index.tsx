import { Box } from "@chakra-ui/react";
import { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Auth from "../components/Auth/Auth";
import Chat from "../components/Chat/Chat";

const Home: NextPage = () => {
  const { data } = useSession();
  console.log(data);

  return (
    <Box>
      {data?.user ? <Chat /> : <Auth />}
    </Box>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  return {
    props: {
      session,
    }
  }
};

export default Home;