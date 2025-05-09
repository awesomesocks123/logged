import { getServerSession } from "next-auth";

import { authOptions } from "./lib/authOption";
import LoginView from "./components/views/LoginView";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Boards from "./components/Boards";

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
      <Boards/>
      <div className="mt-4">
      <div>
        <Link
          className="btn primary inline-flex gap-2 items-center"
          href={'/new-board'}>Create new board <FontAwesomeIcon className="h-6" icon={faArrowRight} />
          
        </Link>
      </div>
      </div>
    {/* <Board/> */}

    </div>
  );
}
