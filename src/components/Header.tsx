import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import SignoutButton from "./SignoutButton";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
    <div className="h-20 fixed inset-0 border-b border-border w-full z-50 bg-inherit">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-primary">
            <Link href={"/"}>Contesto</Link>
          </div>
          {session?.user ? (
            <ul className="flex items-center space-x-4 ml-8">
              <li>
                <Link href={"/dashboard/contests"}>Contests</Link>
              </li>
              <li>
                <Link href={"/dashboard/bookmarks"}>Bookmarks</Link>
              </li>
              <li>
                <Link href={"/dashboard/calendar"}>Calendar</Link>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center space-x-4 ml-8">
              <li>
                <Link href={"/#contests"}>Contests</Link>
              </li>
              <li>
                <Link href={"/#features"}>Features</Link>
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {session?.user ? (
            <SignoutButton />
          ) : (
            <Link href={"/auth"}>Sign in</Link>
          )}
        </div>
      </div>
    </div>
  );
}
