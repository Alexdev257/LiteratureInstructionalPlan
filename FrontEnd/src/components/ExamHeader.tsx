import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, AlertTriangle, User } from "lucide-react";
import { Link, useParams } from "@tanstack/react-router";
import { mockExamData } from "@/utils/mockAPi";

export const ExamHeader = () => {
  const { examId } = useParams({ from: "/exam/$examId" });
  const exam = mockExamData.find(e => e.examId === Number(examId));
  
  // Mock data for exam session
  const timeRemaining = "142:35";
  const currentProgress = 30;

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
                {exam?.examTypeId === 1 ? "Trắc nghiệm" : "Tự luận"}
              </Badge>
            </div>
          </div>

          {/* Right side - Timer & User info */}
          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="font-mono font-medium text-sm">{timeRemaining}</span>
            </div>

            {/* Progress indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
              <div className="text-sm font-medium text-primary">{currentProgress}%</div>
            </div>

            {/* User avatar/login */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <User className="w-4 h-4 mr-2" />
                Học sinh
              </Button>
              <Button size="sm" variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Trợ giúp</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile progress bar */}
        <div className="mt-3 md:hidden">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Tiến độ: {currentProgress}%</span>
            <span>{exam?.examTypeId === 1 ? "Câu 15/50" : "Câu 2/3"}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${currentProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};