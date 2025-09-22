import { createRoute, Outlet } from "@tanstack/react-router"
import { Route as rootRoute } from "../_root"

// Auth Layout Component - Không sử dụng Header/Footer từ root
function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">      
      {/* Header - Auth specific */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Literature Instructional Plan
            </h1>
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Hệ thống quản lý kế hoạch giảng dạy văn học hiện đại
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Footer - Auth specific */}
 
    </div>
  )
}

// Export separate auth routes that bypass root layout
export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthLayout,
})