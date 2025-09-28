import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";

function RootComponent() {
  const location = useLocation();
  
  // Các routes có layout riêng, không cần Header/Footer của root
  const isAuthRoute = location.pathname.startsWith('/auth');
  const isExamAttemptRoute = /^\/exam\/[^\/]+\/[^\/]+/.test(location.pathname); // Matching /exam/[id]/[attemptId]
  
  // Nếu là route có layout riêng, chỉ render Outlet
  if (isAuthRoute || isExamAttemptRoute) {
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
