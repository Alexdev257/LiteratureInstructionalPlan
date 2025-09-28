import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../_root";
import { Outlet } from "@tanstack/react-router";

const DashboardLayoutComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>
          <nav className="mt-6">
            <div className="px-6 space-y-1">
              <a
                href="/dashboard"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                Overview
              </a>
              <a
                href="/dashboard/exams"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                Manage Exams
              </a>
              <a
                href="/dashboard/students"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                Students
              </a>
              <a
                href="/dashboard/reports"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                Reports
              </a>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardLayoutComponent,
});
