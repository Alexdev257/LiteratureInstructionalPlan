import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, FileText, Save, Eye } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import type { ExamData } from "@/utils/type";


interface EssayExamProps {
    exam: ExamData;
    attemptId: string;
}

export const EssayExam = ({ exam, attemptId }: EssayExamProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [essayContent, setEssayContent] = useState("");
    const totalQuestions = exam.questions.length;
    const timeRemaining = "85:42";
    const progress = 67;
    const wordCount = essayContent.trim().split(/\s+/).filter(word => word.length > 0).length;
    const targetWords = 600;

    const currentQuestionData = exam.questions[currentQuestion];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Current Essay Exam */}
            <div className="mb-12">
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <Badge variant="secondary" className="mb-2">
                                    Mã đề thi: {exam.examId} - Lần làm: {attemptId}
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

            {/* Essay Practice Interface */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Essay Question */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-md">Câu {currentQuestion + 1}</Badge>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    {timeRemaining}
                                </div>
                            </div>
                            <CardTitle className="text-xl">{exam.matrix.lessonName}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Question Prompt */}
                            <div className="p-6 bg-muted/30 rounded-lg">
                                <h3 className="font-semibold mb-4 text-xl">Đề bài:</h3>
                                <div className="prose prose-sm max-w-none text-foreground">
                                    <p className="leading-relaxed text-lg">
                                        {currentQuestionData.content}
                                    </p>
                                </div>
                            </div>

                            {/* Writing Area */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">Bài làm của bạn:</h3>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>
                                            Số từ: <strong className="text-foreground">{wordCount}</strong>
                                        </span>
                                        <span>
                                            Mục tiêu: <strong className="text-foreground">{targetWords}</strong>
                                        </span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <Textarea
                                        placeholder="Bắt đầu viết bài của bạn tại đây..."
                                        className="min-h-[400px] text-base leading-relaxed resize-none"
                                        value={essayContent}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEssayContent(e.target.value)}
                                    />
                                    <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                                        Tự động lưu: 2 phút trước
                                    </div>
                                </div>

                                {/* Writing Tools */}
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
                                    <div className="ml-auto text-sm text-muted-foreground">
                                        Còn lại: <strong>{Math.max(0, targetWords - wordCount)} từ</strong>
                                    </div>
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
                                        <Save className="w-4 h-4 mr-2" />
                                        Lưu nháp
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
                                <FileText className="w-5 h-5" />
                                Danh sách câu hỏi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {exam.questions.map((question, index) => (
                                    <button
                                        key={question.questionId}
                                        onClick={() => setCurrentQuestion(index)}
                                        className={`w-full p-4 rounded-lg text-left transition-all duration-200 border ${index === currentQuestion
                                            ? "bg-primary/10 border-primary/20 text-primary shadow-md"
                                            : index < currentQuestion
                                                ? "bg-green-500/10 border-green-500/20 text-green-600 hover:bg-green-500/15"
                                                : "bg-muted/30 border-border hover:bg-muted/50"
                                            }`}
                                    >
                                        <div className="mb-2">
                                            <Badge
                                                variant={index === currentQuestion ? "default" : "secondary"}
                                                className="text-xs"
                                            >
                                                Câu {index + 1}
                                            </Badge>
                                        </div>
                                        <div className="text-sm font-medium line-clamp-2">{question.content}</div>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Writing Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Tiến độ viết</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Số từ hiện tại</span>
                                <span className="font-semibold">{wordCount}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Mục tiêu</span>
                                <span className="font-semibold">{targetWords}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Thời gian viết</span>
                                <span className="font-semibold">34:18</span>
                            </div>
                            <Progress value={(wordCount / targetWords) * 100} className="mt-4" />
                            <p className="text-sm text-muted-foreground text-center">
                                Bạn đã hoàn thành {Math.round((wordCount / targetWords) * 100)}% bài viết
                            </p>
                        </CardContent>
                    </Card>

                    {/* Writing Tips */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Gợi ý viết bài</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <h4 className="font-medium text-blue-600 mb-2">Cấu trúc bài {currentQuestionData.questionType}</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• Mở bài: Đặt vấn đề</li>
                                    <li>• Thân bài: Phân tích, lập luận</li>
                                    <li>• Kết bài: Khẳng định quan điểm</li>
                                </ul>
                            </div>
                            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <h4 className="font-medium text-green-600 mb-2">Lưu ý quan trọng</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• Sử dụng ví dụ cụ thể</li>
                                    <li>• Trình bày logic, mạch lạc</li>
                                    <li>• Ngôn ngữ trong sáng, chính xác</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};