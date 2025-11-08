import { createRoute, Outlet } from "@tanstack/react-router"
import { Route as rootRoute } from "../_root"
import { BookOpen } from 'lucide-react';

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="pt-6 pb-2">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Literature Instructional Plan
            </h1>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            {/* Hệ thống quản lý kế hoạch giảng dạy văn học hiện đại */}
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthLayout,
})