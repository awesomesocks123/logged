import { getServerSession } from "next-auth"
import { authOptions } from "../lib/authOption"
import LogOutButton from "./LogoutButton"
import LogInButton from "./LoginButton"
import Link from "next/link"
import NavStack from "./NavStack"

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className="bg-gray-300 p-4 px-8 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <NavStack />
          <Link href="/" className="text-xl ">
            Loggd
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="hidden sm:inline">Hello, {session.user?.name}</span>
              <LogOutButton />
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Not Logged In</span>
              <LogInButton />
            </>
          )}
        </div>
      </div>
    </header>
  )
}