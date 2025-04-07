import { getServerSession } from "next-auth";
import Board from "./components/Board";
import { authOptions } from "./lib/authOption";
import LoginView from "./components/views/LoginView";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <LoginView/>
    )
  }
  return (
    <div>
    <h1 className="text-4xl mb-4">Your boards</h1>
      boards go here
      <div>
        <Link
          className="btn primary inline-flex gap-2"
          href={'/new-board'}>Create new board <FontAwesomeIcon className="h-6" icon={faArrowRight} />
          
        </Link>
      </div>
    {/* <Board/> */}

    </div>
  );
}
