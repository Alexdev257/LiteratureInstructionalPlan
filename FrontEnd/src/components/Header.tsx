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
import { Link, useRouter } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

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
    <header className="w-full bg-background dark:bg-card shadow-sm border-b border-border/40 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Văn Học Việt Nam</h1>
            <p className="text-sm text-muted-foreground">Vững vàng kiến thức</p>
          </div>
        </div>
          <nav className="hidden md:flex items-center gap-6">
          <Link to="/exams" className="text-foreground hover:text-primary transition-colors">
            Đề thi
          </Link>
          <Link to="/practice" className="text-foreground hover:text-primary transition-colors">
            Luyện tập
          </Link>
          <Link to="/results" className="text-foreground hover:text-primary transition-colors">
            Kết quả
          </Link>
          <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
            Hồ sơ
          </Link>
        </nav>
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
