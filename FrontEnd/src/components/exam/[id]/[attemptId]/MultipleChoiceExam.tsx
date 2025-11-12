import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {  Clock, BookOpen, Target } from "lucide-react";
import type { ExamData } from "@/utils/type";


interface MultipleChoiceExamProps {
 exam: ExamData;
 attemptId: string;
}

export const MultipleChoiceExam = ({ exam, attemptId }: MultipleChoiceExamProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const totalQuestions = exam.questions.length;
  const timeRemaining = "142:35";
  const progress = 30;

  const currentQuestionData = exam.questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8">
        {/* Current Exam Progress */}
        <div className="mb-12">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    Mã đề thi: {exam.examId} - Mã lần thi: {attemptId}
                  </Badge>
                  <CardTitle className="text-2xl text-balance">
                    {exam.title}
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Câu {currentQuestion + 1}/{totalQuestions} • Còn lại {timeRemaining}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary mb-1">{progress}%</div>
                  <div className="text-sm text-muted-foreground">Hoàn thành</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-4" />
              <div className="flex gap-3">
                <Button size="lg" className="flex-1">
                  Tiếp tục làm bài
                </Button>
                <Button variant="outline" size="lg">
                  Tạm dừng
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Question Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Câu {currentQuestion + 1}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {timeRemaining}
                  </div>
                </div>
                <CardTitle className="text-xl">{currentQuestionData.questionType}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">
                    {currentQuestionData.content}
                  </h3>

                  <div className="space-y-3">
                    {/* Placeholder cho options - bạn cần thêm field options vào Question type */}
                    {["A. Tùy chọn 1", "B. Tùy chọn 2", "C. Tùy chọn 3", "D. Tùy chọn 4"].map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedAnswer === option
                            ? "bg-primary/10 border-primary/30 shadow-md"
                            : "border-border hover:bg-muted/30 hover:border-primary/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={selectedAnswer === option}
                          onChange={(e) => setSelectedAnswer(e.target.value)}
                          className="w-4 h-4 text-primary accent-primary"
                        />
                        <span className={selectedAnswer === option ? "font-medium" : ""}>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t border-border">
                  <Button 
                    variant="outline" 
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  >
                    Câu trước
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Target className="w-4 h-4 mr-2" />
                      Đánh dấu
                    </Button>
                    <Button 
                      disabled={currentQuestion === totalQuestions - 1}
                      onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1))}
                    >
                      Câu tiếp theo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Question Navigator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Danh sách câu hỏi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {exam.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                        index === currentQuestion
                          ? "bg-primary text-primary-foreground shadow-md"
                          : index < currentQuestion
                            ? "bg-green-500/10 text-green-600 border border-green-500/20 hover:bg-green-500/20"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500/10 border border-green-500/20 rounded"></div>
                    <span className="text-muted-foreground">Đã làm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span className="text-muted-foreground">Hiện tại</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Đã hoàn thành</span>
                  <span className="font-semibold">{currentQuestion}/{totalQuestions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Thời gian đã dùng</span>
                  <span className="font-semibold">37:25</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tốc độ trung bình</span>
                  <span className="font-semibold">2.7 phút/câu</span>
                </div>
                <Progress value={(currentQuestion / totalQuestions) * 100} className="mt-4" />
                <p className="text-sm text-muted-foreground text-center">
                  Bạn đang làm bài với tốc độ tốt!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
};