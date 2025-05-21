import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div className="h-20 fixed inset-0 border-b border-border w-full z-50 bg-inherit">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-primary">Contesto</div>
          <ul className="flex items-center space-x-4 ml-8">
            <li><Link href={"/#contests"}>Contests</Link></li>
            <li><Link href={"/#features"}>Features</Link></li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link href={"/signin"}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
