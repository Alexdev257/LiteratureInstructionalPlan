"use client";

import { ModeToggle } from "../mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link, useRouter } from "@tanstack/react-router";
import { BookOpen, Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/stores/cardStore";
import { useSessionStore } from "@/stores/sessionStore";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useSessionStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);

  const handleLogout = () => {
    logout?.();
    try {
      router?.navigate?.({ to: "/auth/login" });
    } catch {
      if (typeof window !== "undefined") window.location.href = "/auth/login";
    }
  };

  const handleNavigate = (path: string) => {
    setIsMobileMenuOpen(false);
    // Try client router first, fallback to full page load
    try {
      router?.navigate?.({ to: path });
    } catch {
      if (typeof window !== "undefined") window.location.href = path;
    }
  };

  const initial = user?.FullName
    ? user.FullName.charAt(0).toUpperCase()
    : user?.Username
    ? user.Username.charAt(0).toUpperCase()
    : "U";

  return (
    <header className="w-full bg-background border-b border-border/40 shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={"/"}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-sm flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-foreground leading-tight">
                  Văn Học Việt Nam
                </h1>
                <p className="text-xs text-muted-foreground leading-none">
                  Vững vàng kiến thức
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/10"
            >
              Trang chủ
            </Link>
            <Link
              to="/exam"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/10"
            >
              Đề thi
            </Link>
            <Link
              to="/templates"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/10"
            >
              Giáo án
            </Link>

            {user ? (
              Number(user.RoleId) !== 1 ? (
                <Link
                  to="/templates"
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/10"
                >
                  Giáo án
                </Link>
              ) : (
                <Link
                  to="/results"
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/10"
                >
                  Kết quả
                </Link>
              )
            ) : null}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Shopping Cart - Only show when user is logged in */}
            {user && (
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-primary/10 hover:text-primary p-2"
                onClick={() => handleNavigate("/cart")}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            )}

            {/* Mode toggle - hidden on mobile */}
            <div className="hidden sm:block">
              <ModeToggle />
            </div>

            {/* User section */}
            {user && (user.FullName || user.Username) ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 hover:bg-muted px-3 py-2 rounded-md"
                  >
                    <Avatar className="w-7 h-7">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                        {initial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium text-foreground">
                      {user.FullName || user.Username}
                    </span>
                  </Button>
                </DropdownMenuTrigger>

                   <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                   onClick={() => handleNavigate(`/userProfile/${user.UserId}`)} 
                    className="text-sm"
                      >
                    Hồ sơ cá nhân
                   </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleNavigate("/cart")}
                    className="text-sm md:hidden"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Giỏ hàng
                    {cartItems.length > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {cartItems.length}
                      </Badge>
                    )}
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-sm text-destructive"
                  >
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleNavigate("/auth/login")}
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => handleNavigate("/auth/register")}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Đăng ký
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="px-4 py-4 space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/10"
              >
                Trang chủ
              </Link>
              <Link
                to="/exam"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/10"
              >
                Đề thi
              </Link>
              <Link
                to="/templates"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-primary/10"
              >
                Giáo án
              </Link>
              <div className="pt-2 border-t border-border">
                <div className="px-3 py-2">
                  <ModeToggle />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}