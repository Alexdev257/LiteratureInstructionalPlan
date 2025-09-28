import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {  Clock, FileText, Save, Eye } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";


interface EssayExamProps {
    examId: string;
    attemptId: string;
}

export const EssayExam = ({ examId, attemptId }: EssayExamProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(2);
    const [essayContent, setEssayContent] = useState(`Câu nói "Học, học nữa, học mãi" của Chủ tịch Hồ Chí Minh không chỉ là một lời khuyên mà còn là một triết lý sống sâu sắc, đặc biệt có ý nghĩa trong bối cảnh xã hội hiện đại.

Trước hết, câu nói này thể hiện tầm quan trọng của việc học tập suốt đời. Trong thời đại công nghệ 4.0, kiến thức và kỹ năng cần được cập nhật liên tục. Những gì chúng ta học hôm nay có thể sẽ lỗi thời vào ngày mai. Chính vì vậy, việc "học mãi" trở thành một yêu cầu tất yếu để không bị tụt hậu.

Thứ hai, học tập không chỉ giới hạn trong nhà trường mà còn diễn ra trong mọi hoàn cảnh của cuộc sống...`);

    const totalQuestions = 3;
    const timeRemaining = "85:42";
    const progress = 67;
    const wordCount = essayContent.trim().split(/\s+/).length;
    const targetWords = 600;

    const essayQuestions = [
        { num: 1, type: "Tự luận", status: "completed", title: "Phân tích tác phẩm" },
        { num: 2, type: "Tự luận", status: "current", title: "Nghị luận xã hội" },
        { num: 3, type: "Tự luận", status: "pending", title: "Cảm nhận văn học" },
    ];

    const currentQuestionData = {
        title: "Nghị luận xã hội",
        prompt: {
            quote: '"Học, học nữa, học mãi" - Hồ Chí Minh',
            instructions: `Anh/chị hãy viết một bài văn nghị luận (khoảng 600 từ) về ý nghĩa của câu nói trên trong bối cảnh xã hội hiện đại. Trong bài văn, anh/chị cần:`,
            requirements: [
                "Làm rõ ý nghĩa của câu nói",
                "Phân tích tầm quan trọng của việc học tập suốt đời",
                "Đưa ra những ví dụ cụ thể từ thực tế",
                "Nêu quan điểm cá nhân về vấn đề này"
            ]
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Current Essay Exam */}
            <div className="mb-12">
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <Badge variant="secondary" className="mb-2">
                                   Mã đề thi: {examId} - Lần làm: {attemptId}
                                </Badge>
                                <CardTitle className="text-2xl text-balance">
                                    Đề thi thử THPT Quốc gia 2024 - Phần tự luận (Đề {examId})
                                </CardTitle>
                                <CardDescription className="text-lg mt-2">
                                    Câu {currentQuestion}/{totalQuestions} • Còn lại {timeRemaining}
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
                                <Badge variant="outline">Câu {currentQuestion} - Tự luận</Badge>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    {timeRemaining}
                                </div>
                            </div>
                            <CardTitle className="text-xl">{currentQuestionData.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Question Prompt */}
                            <div className="p-6 bg-muted/30 rounded-lg">
                                <h3 className="font-semibold mb-4 text-primary">Đề bài:</h3>
                                <div className="prose prose-sm max-w-none text-foreground">
                                    <p className="leading-relaxed text-lg font-medium mb-4">
                                        {currentQuestionData.prompt.quote}
                                    </p>
                                    <p className="leading-relaxed mb-4">
                                        {currentQuestionData.prompt.instructions}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2">
                                        {currentQuestionData.prompt.requirements.map((req, index) => (
                                            <li key={index} className="leading-relaxed">{req}</li>
                                        ))}
                                    </ul>
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
                                    disabled={currentQuestion === 1}
                                    onClick={() => setCurrentQuestion(prev => Math.max(1, prev - 1))}
                                >
                                    Câu trước
                                </Button>
                                <div className="flex gap-2">
                                    <Button variant="outline">
                                        <Save className="w-4 h-4 mr-2" />
                                        Lưu nháp
                                    </Button>
                                    <Button
                                        disabled={currentQuestion === totalQuestions}
                                        onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions, prev + 1))}
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
                                {essayQuestions.map((question) => (
                                    <button
                                        key={question.num}
                                        onClick={() => setCurrentQuestion(question.num)}
                                        className={`w-full p-4 rounded-lg text-left transition-all duration-200 border ${question.status === "current"
                                                ? "bg-primary/10 border-primary/20 text-primary shadow-md"
                                                : question.status === "completed"
                                                    ? "bg-green-500/10 border-green-500/20 text-green-600 hover:bg-green-500/15"
                                                    : "bg-muted/30 border-border hover:bg-muted/50"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge
                                                variant={question.status === "current" ? "default" : "secondary"}
                                                className="text-xs"
                                            >
                                                Câu {question.num}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">{question.type}</span>
                                        </div>
                                        <div className="text-sm font-medium">{question.title}</div>
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
                                <h4 className="font-medium text-blue-600 mb-2">Cấu trúc bài nghị luận</h4>
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

                    {/* Quick Actions */}
                    {/* <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Thao tác nhanh</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Xem dàn ý mẫu
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Target className="w-4 h-4 mr-2" />
                                Kiểm tra ngữ pháp
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Trophy className="w-4 h-4 mr-2" />
                                Nộp bài
                            </Button>
                        </CardContent>
                    </Card> */}
                </div>
            </div>
        </div>
    );
};