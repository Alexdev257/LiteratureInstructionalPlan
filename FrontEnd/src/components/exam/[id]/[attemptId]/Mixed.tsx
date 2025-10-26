import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen, Target, Save, Eye, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import type { ExamData } from "@/utils/type";

interface MixedExamProps {
    exam: ExamData;
    attemptId: string;
}

export const MixedExam = ({ exam, attemptId }: MixedExamProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [essayContent, setEssayContent] = useState("");
    const totalQuestions = exam.questions.length;
    const timeRemaining = "98:23";
    const progress = 45;
    const wordCount = essayContent.trim().split(/\s+/).filter(word => word.length > 0).length;

    const currentQuestionData = exam.questions[currentQuestion];
    const isEssay = currentQuestionData.questionType === "essay";
    const isMultipleChoice = currentQuestionData.questionType === "multiple-choice";

    // Đếm số câu đã làm theo từng loại
    const multipleChoiceCount = exam.questions.filter(q => q.questionType === "multiple-choice").length;
    const essayCount = exam.questions.filter(q => q.questionType === "essay").length;

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
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <div className="text-sm text-muted-foreground mb-1">Trắc nghiệm</div>
                                <div className="font-semibold text-blue-600">{multipleChoiceCount} câu</div>
                            </div>
                            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <div className="text-sm text-muted-foreground mb-1">Tự luận</div>
                                <div className="font-semibold text-green-600">{essayCount} câu</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button size="lg" className="flex-1">
                                <Save className="w-4 h-4 mr-2" />
                                Lưu bài làm
                            </Button>
                            <Button variant="outline" size="lg">
                                <Eye className="w-4 h-4 mr-2" />
                                Xem trước
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
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">Câu {currentQuestion + 1}</Badge>
                                    <Badge 
                                        variant={isMultipleChoice ? "default" : "secondary"}
                                        className={isEssay ? "bg-green-500 hover:bg-green-600" : ""}
                                    >
                                        {isMultipleChoice ? "Trắc nghiệm" : "Tự luận"}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    {timeRemaining}
                                </div>
                            </div>
                            <CardTitle className="text-xl">{currentQuestionData.questionType}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Question Content */}
                            <div className="p-6 bg-muted/30 rounded-lg">
                                <h3 className="font-semibold mb-4 text-lg">
                                    {currentQuestionData.content}
                                </h3>
                            </div>

                            {/* Answer Area - Multiple Choice */}
                            {isMultipleChoice && (
                                <div className="space-y-3">
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
                            )}

                            {/* Answer Area - Essay */}
                            {isEssay && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold">Bài làm của bạn:</h3>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>
                                                Số từ: <strong className="text-foreground">{wordCount}</strong>
                                            </span>
                                            <span>
                                                Gợi ý: <strong className="text-foreground">200-300 từ</strong>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <Textarea
                                            placeholder="Bắt đầu viết câu trả lời của bạn tại đây..."
                                            className="min-h-[350px] text-base leading-relaxed resize-none"
                                            value={essayContent}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEssayContent(e.target.value)}
                                        />
                                        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                                            Tự động lưu: 1 phút trước
                                        </div>
                                    </div>

                                    {/* Writing Tools for Essay */}
                                    <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
                                        <Button variant="ghost" size="sm">
                                            <FileText className="w-4 h-4 mr-2" />
                                            Dàn ý
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            Kiểm tra chính tả
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            Đếm từ
                                        </Button>
                                        <div className="ml-auto text-sm">
                                            {wordCount} từ
                                        </div>
                                    </div>
                                </div>
                            )}

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
                                    {currentQuestion === totalQuestions - 1 ? (
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            Nộp bài
                                        </Button>
                                    ) : (
                                        <Button 
                                            onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1))}
                                        >
                                            Câu tiếp theo
                                        </Button>
                                    )}
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
                            <div className="grid grid-cols-5 gap-2 mb-4">
                                {exam.questions.map((question, index) => {
                                    const isMultiple = question.questionType === "multiple-choice";
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentQuestion(index)}
                                            className={`relative w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                index === currentQuestion
                                                    ? "bg-primary text-primary-foreground shadow-md"
                                                    : index < currentQuestion
                                                        ? "bg-green-500/10 text-green-600 border border-green-500/20 hover:bg-green-500/20"
                                                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                                            }`}
                                        >
                                            {index + 1}
                                            {/* Icon nhỏ để phân biệt loại câu hỏi */}
                                            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                                                isMultiple ? "bg-blue-500" : "bg-green-500"
                                            }`} />
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex flex-col gap-2 text-sm border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span className="text-muted-foreground">Trắc nghiệm</span>
                                    </div>
                                    <span className="font-medium">{multipleChoiceCount} câu</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-muted-foreground">Tự luận</span>
                                    </div>
                                    <span className="font-medium">{essayCount} câu</span>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-green-500/10 border border-green-500/20 rounded"></div>
                                        <span className="text-muted-foreground">Đã làm</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-primary rounded"></div>
                                        <span className="text-muted-foreground">Hiện tại</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Progress Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Thống kê tiến độ</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Đã hoàn thành</span>
                                <span className="font-semibold">{currentQuestion}/{totalQuestions}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Thời gian đã dùng</span>
                                <span className="font-semibold">21:37</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tốc độ trung bình</span>
                                <span className="font-semibold">3.2 phút/câu</span>
                            </div>
                            <Progress value={(currentQuestion / totalQuestions) * 100} className="mt-4" />
                            <p className="text-sm text-muted-foreground text-center">
                                Bạn đang làm bài với tốc độ tốt!
                            </p>
                        </CardContent>
                    </Card>

                    {/* Question Type Tips */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                {isMultipleChoice ? "Mẹo làm trắc nghiệm" : "Gợi ý viết tự luận"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {isMultipleChoice ? (
                                <>
                                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <h4 className="font-medium text-blue-600 text-sm mb-1">Đọc kỹ đề bài</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Xác định từ khóa và yêu cầu của câu hỏi
                                        </p>
                                    </div>
                                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <h4 className="font-medium text-blue-600 text-sm mb-1">Loại trừ đáp án sai</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Tăng xác suất chọn đúng bằng cách loại bỏ các đáp án không hợp lý
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <h4 className="font-medium text-green-600 text-sm mb-1">Lập dàn ý</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Sắp xếp ý tưởng trước khi viết để bài làm mạch lạc
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <h4 className="font-medium text-green-600 text-sm mb-1">Trình bày rõ ràng</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Chia thành các đoạn văn, sử dụng ví dụ minh họa
                                        </p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};