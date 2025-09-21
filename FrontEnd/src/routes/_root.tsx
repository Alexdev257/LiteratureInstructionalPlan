import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="app-layout">
      <Header />

      <main>
        <Outlet /> 
      </main>

      <Footer />
    </div>
  ),
});
