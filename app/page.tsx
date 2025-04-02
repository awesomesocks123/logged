import { getServerSession } from "next-auth";
import Board from "./components/Board";
import { authOptions } from "./lib/authOption";
import LoginView from "./components/views/LoginView";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <LoginView/>
    )
  }
  return (
    <Board/>
  );
}
