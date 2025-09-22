import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";

function RootComponent() {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/auth');

  // Nếu là auth route thì chỉ render Outlet (không có Header/Footer)
  if (isAuthRoute) {
    return <Outlet />;
  }

  // Các route khác render với Header/Footer
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
