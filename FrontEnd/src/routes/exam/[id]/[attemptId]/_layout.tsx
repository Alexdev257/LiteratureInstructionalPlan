import { createRoute } from "@tanstack/react-router";
import { Route as examIdRoute } from "../index";
import { Outlet } from "@tanstack/react-router";
import { ExamHeader } from "@/components/ExamHeader";
import ExamFooter from "@/components/ExamFooter";

const TakeExamLayoutComponent = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ExamHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <ExamFooter />
    </div>
  );
};

export const Route = createRoute({
  getParentRoute: () => examIdRoute,
  path: "/$attemptId",
  component: TakeExamLayoutComponent,
});