import { NextPage, NextPageContext } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data } = useSession();
  console.log(data);

  return (
    <div>
      {data?.user ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn("google")}>Sign In</button>
      )}

      {data?.user?.name}
    </div>
  );
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