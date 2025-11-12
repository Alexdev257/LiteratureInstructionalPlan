import { createRoute, Outlet, useRouter } from '@tanstack/react-router';
import { Route as rootRoute } from '../_root';
import { BaseSidebar } from '@/components/layout/base/sidebar';
import { BarChart3, BookOpen, ClipboardList, FileText, Home, PenTool, Users } from 'lucide-react';
import { useSessionStore } from '@/stores/sessionStore';



export function TeacherLayout() {
  const teacherMenuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      href: '/teacher',
    },
    {
      title: 'Giáo án',
      icon: PenTool,
      href: '/teacher/templates',
    },
    {
      title: 'Ma trận',
      icon: BookOpen,
      href: '/teacher/matrix',
    },
    {
      title: 'Đề thi',
      icon: FileText,
      href: '/teacher/exams',
    },
    {
      title: 'Câu hỏi & Ôn tập',
      icon: ClipboardList,
      href: '/teacher/questions',
    },
    // {
    //   title: 'Học sinh',
    //   icon: Users,
    //   href: '/teacher/students',
    // },
    // {
    //   title: 'Thống kê',
    //   icon: BarChart3,
    //   href: '/teacher/statistics',
    // },
  ];
  const router = useRouter();
  const { user, logout } = useSessionStore();
  const handleLogout = () => {
    logout();
    router.navigate({ to: "/auth/login" });
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <BaseSidebar
        logoTitle="Văn Học Việt Nam"
        logoSubtitle="Vững vàng kiến thức"
        menuItems={teacherMenuItems}
        userInfo={{
          name: user?.FullName || 'Giáo viên',
          email: user?.Email || 'teacher@litplan.edu',
          role: 'teacher',
        }}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher",
  component: TeacherLayout,
})