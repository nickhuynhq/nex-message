import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
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
