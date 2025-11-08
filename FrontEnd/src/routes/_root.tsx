import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";

function RootComponent() {
  const location = useLocation();
  
  // Các routes có layout riêng, không cần Header/Footer của root
  const isAuthRoute = location.pathname.startsWith('/auth');
  const isTeacherRoute = location.pathname.startsWith('/teacher');
  const isExamAttemptRoute = /^\/exam\/[^\/]+\/[^\/]+/.test(location.pathname); // Matching /exam/[id]/[attemptId]
  const isAdminRoute = location.pathname.startsWith('/dashboard');
  // Nếu là route có layout riêng, chỉ render Outlet
  if (isAuthRoute || isTeacherRoute || isExamAttemptRoute || isAdminRoute) {
    return <Outlet />;
  }
  
  // Các route khác render với Header/Footer
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
