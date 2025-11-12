import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, AlertTriangle, User } from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { useExam } from "@/hooks/useExam";
import { useSessionStore } from "@/stores/sessionStore";

export const ExamHeader = () => {
  const { examId } = useParams({ from: "/exam/$examId" });
  const { useGetExamById } = useExam()
  const { data } = useGetExamById(Number(examId))
  const user = useSessionStore()
  const exam = data?.data

  return (
    <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Navigation & Title */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Trang chủ</span>
            </Link>
            <div className="w-px h-6 bg-border hidden sm:block"></div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-foreground">
                {exam?.title || `Đề thi số ${examId}`}
              </h1>
              <Badge variant="secondary" className="w-fit">
                {exam?.examType.examTypeId === 1 ? "Trắc nghiệm" : "Tự luận"}
              </Badge>
            </div>
          </div>

          {/* Right side - Timer & User info */}
          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="font-mono font-medium text-sm">{exam?.durationMinutes} phút</span>
            </div>

            
            {/* User avatar/login */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <User className="w-4 h-4 mr-2" />
                 {user.user?.FullName}
              </Button>
              {/* <Button size="sm" variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Trợ giúp</span>
              </Button> */}
            </div>
          </div>
        </div>

        {/* Mobile progress bar */}
        
      </div>
    </header>
  );
};