import { getServerSession } from "next-auth"
import { authOptions } from "../lib/authOption";
import LogOutButton from "./LogoutButton";
import LogInButton from "./LoginButton";

export default async function Header() {
    const session = await getServerSession(authOptions);
    return(
        <header className="bg-gray-300 p-4 px-8">
            <div className="flex justify-between items-center">
                <a href="" className="logo">Loggd</a>
                <div>
                    {session && (
                        <>
                        Hello, {session?.user?.name}
                        <LogOutButton/>
                        </>
                    )}
                    {!session && (
                        <>Not Logged In
                        <LogInButton/>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}