"use client";
import { ArrowRight, Clock, Star, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import type { Exam } from "@/utils/type";

type FeatureExamsSectionProps = {
    featuredExams: Exam[];
};

const FeatureExamsSection = ({ featuredExams }: FeatureExamsSectionProps) => {
    return (
        <section className="py-24 px-4 ">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-accent/30 text-accent bg-accent/5">
                        🔥 Đề thi hot
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                        Đề thi nổi bật
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Những đề thi được lựa chọn và làm nhiều nhất
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {featuredExams.map((exam) => (
                        <Card key={exam.id} className="group hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-secondary/30 overflow-hidden bg-gradient-to-br from-background to-secondary/5">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between mb-3">
                                    <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20">
                                        Lớp {exam.grade}
                                    </Badge>
                                    <div className="flex items-center text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                                        <Users className="h-4 w-4 mr-1" />
                                        {exam.attempts}
                                    </div>
                                </div>
                                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {exam.title}
                                </CardTitle>
                                <CardDescription className="text-sm leading-relaxed line-clamp-1">
                                    {exam.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6 p-3 bg-muted/30 rounded-lg">
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2 text-primary" />
                                        <span className="font-medium">{exam.duration} phút</span>
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
                    ))}
                </div>
                <div className="text-center">
                    <Button size="lg" variant="outline" className="px-8 py-4 h-auto text-base border-2 border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                        Xem tất cả đề thi
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default FeatureExamsSection;
