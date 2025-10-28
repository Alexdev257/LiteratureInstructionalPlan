import { createRoute, Outlet, Link } from "@tanstack/react-router";
import { Route as rootRoute } from "../_root";
import {
  // Import icons for the new links
  LayoutDashboard,
  Users,
  HelpCircle,      // Icon for Question
  ClipboardList,   // Icon for Exam
  Grid,            // Icon for Matrix
  Sheet,           // Icon for Template
  CreditCard,      // Icon for Payment
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Component cho 1 link ở Sidebar (giữ nguyên)
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-zinc-800 dark:hover:text-gray-50"
      activeProps={{
        className: "bg-primary/10 text-primary font-medium dark:bg-primary/20",
      }}
    >
      {children}
    </Link>
  );
}

// Component Layout chính của Admin
function AdminLayout() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      {/* --- SIDEBAR --- */}
      <aside className="hidden border-r bg-gray-50/70 lg:block dark:bg-zinc-900/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* Header Sidebar (giữ nguyên) */}
          <div className="flex h-16 items-center border-b px-6">
            <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  LH
                </AvatarFallback>
              </Avatar>
              <span>L.H Hoàng Hải</span>
              <span className="ml-auto text-xs text-muted-foreground">
                Quản trị viên
              </span>
            </Link>
          </div>

          <nav className="flex-1 overflow-auto py-2 px-4 flex flex-col gap-1 text-sm font-medium"> {/* Giảm py, đổi grid thành flex, giảm gap */}
            <NavLink to="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink to="/dashboard/users">
              <Users className="h-4 w-4" />
              User
            </NavLink>
            <NavLink to="/dashboard/questions">
              <HelpCircle className="h-4 w-4" />
              Question
            </NavLink>
            <NavLink to="/dashboard/exams">
              <ClipboardList className="h-4 w-4" />
              Exam
            </NavLink>
            <NavLink to="/dashboard/matrices">
              <Grid className="h-4 w-4" />
              Matrix
            </NavLink>
            <NavLink to="/dashboard/templates">
              <Sheet className="h-4 w-4" />
              Template
            </NavLink>
            <NavLink to="/dashboard/payments">
              <CreditCard className="h-4 w-4" />
              Payment
            </NavLink>
          </nav>
          <div className="mt-auto p-4 border-t">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <LogOut className="h-4 w-4 text-destructive" />
              <span className="text-destructive">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex flex-col bg-white dark:bg-zinc-950">
        <header className="flex h-16 items-center gap-4 border-b bg-gray-50/70 px-6 dark:bg-zinc-900/40">
          {/* Có thể thêm Breadcrumbs hoặc Mobile Menu Button ở đây */}
          <h1 className="text-lg font-semibold md:text-xl">
             {/* Tên trang sẽ hiển thị ở đây động */}
          </h1>
          {/* Thêm nút chuyển Dark Mode nếu muốn */}
        </header>

        {/* Content Area (giữ nguyên) */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50/40 dark:bg-zinc-950/60">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Tanstack Route definition (giữ nguyên)
export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: AdminLayout,
});