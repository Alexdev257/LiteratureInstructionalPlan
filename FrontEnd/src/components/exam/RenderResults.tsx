"use client";
import type { ExamData } from "@/utils/type";
import { ArrowRight, BookOpen, Clock, FileText, GraduationCap, Star, Target, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { mockGradeLevels, mockExamTypes } from "@/utils/mockAPi";
import { Button } from "../ui/button";

type Props = {
    filteredExams: ExamData[];
    clearFilters: () => void;
}
const RenderResults = ({ filteredExams, clearFilters }: Props) => {
    const getDifficultyColor = (difficulty?: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800 border-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'hard': return 'bg-red-100 text-red-800 border-red-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getDifficultyText = (difficulty?: string) => {
        switch (difficulty) {
            case 'easy': return 'Dễ';
            case 'medium': return 'Trung bình';
            case 'hard': return 'Khó';
            default: return 'Chưa xác định';
        }
    };

    return (
        <section className="py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-semibold">
                            Kết quả ({filteredExams.length} đề thi)
                        </h2>
                    </div>
                </div>

                {/* Exam Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExams.map((exam) => {
                        const gradeLevel = mockGradeLevels.find(g => g.gradeLevelId === exam.gradeLevelId);
                        const examType = mockExamTypes.find(t => t.examTypeId === exam.examTypeId);

                        return (
                            <Card key={exam.examId} className="group hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-secondary/30 overflow-hidden bg-gradient-to-br from-background to-secondary/5">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                                            <GraduationCap className="w-3 h-3 mr-1" />
                                            {gradeLevel?.gradeName}
                                        </Badge>
                                        <Badge className={`${getDifficultyColor(exam.difficulty)} border`}>
                                            <Target className="w-3 h-3 mr-1" />
                                            {getDifficultyText(exam.difficulty)}
                                        </Badge>
                                    </div>

                                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                        {exam.title}
                                    </CardTitle>

                                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                                        {exam.description}
                                    </CardDescription>

                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge variant="outline" className="text-xs border-secondary/30 text-secondary">
                                            <FileText className="w-3 h-3 mr-1" />
                                            {examType?.typeName}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-6 p-3 bg-muted/30 rounded-lg">
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2 text-primary" />
                                            <span className="font-medium">{exam.durationMinutes} phút</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-2 text-secondary" />
                                            <span className="font-medium">{exam.attempts} lượt thi</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FileText className="h-4 w-4 mr-2 text-accent" />
                                            <span className="font-medium">{exam.totalQuestions} câu hỏi</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                                            <span className="font-medium">{exam.averageScore}/10</span>
                                        </div>
                                    </div>

                                    <Button className="w-full group-hover:shadow-lg transition-all duration-300 bg-primary hover:bg-primary/90">
                                        Làm bài thi
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* No Results */}
                {filteredExams.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Không tìm thấy đề thi</h3>
                        <p className="text-muted-foreground mb-4">
                            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                        </p>
                        <Button onClick={clearFilters} variant="outline">
                            Xóa bộ lọc
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default RenderResults;
