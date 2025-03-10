import { Link } from "react-router-dom";
import { Button } from "./button";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b bg-background sticky top-0 z-50 w-full">
      <div className="flex h-16 items-center px-4 container mx-auto flex-wrap justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl font-semibold">Bewerbungsassistent</span>
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0 flex-shrink-0">
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/sign-in">
                <Button variant="ghost">Anmelden</Button>
              </Link>
              <Link to="/sign-up">
                <Button>Jetzt starten</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost">Übersicht</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0">
                    <Avatar>
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
