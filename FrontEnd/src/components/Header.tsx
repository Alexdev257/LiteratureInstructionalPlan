"use client";

import { useAuthContext } from "@/context/authContext";
import { userSession } from "@/lib/session";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "@tanstack/react-router";

export default function Header() {
  const { logout } = useAuthContext();
  const router = useRouter();
  const user = userSession.value;

  const handleLogout = () => {
    logout();
    router.navigate({ to: "auth/login" });
  };

  const handleNavigate = (path: string) => {
    router.navigate({ to: path });
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <h1
          className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer"
          onClick={() => router.navigate({ to: "/" })}
        >
          MyApp
        </h1>

        {/* Right controls */}
        <div className="flex items-center space-x-4">
          <ModeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback>{user.Username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                 
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={() => handleNavigate("/auth/login")} variant="default">
                Login
              </Button>
              <Button onClick={() => handleNavigate("/auth/register")} variant="secondary">
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
