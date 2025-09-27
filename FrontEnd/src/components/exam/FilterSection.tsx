
"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { ExamData, ExamFilters, ExamType, GradeLevel } from "@/utils/type";
import { useMemo, useState } from "react";

import RenderResults from "./RenderResults";


type Props ={
    examData: ExamData[];
    mockGradeLevels: GradeLevel[];
    mockExamTypes: ExamType[];
}
const FilterSection = ({ examData, mockGradeLevels, mockExamTypes }: Props) => {
    const [filters, setFilters] = useState<ExamFilters>({});
    const [searchTerm, setSearchTerm] = useState("");

    // Filtered exams based on current filters
    const filteredExams = useMemo(() => {
        // Start with all exams, then apply filters
        let result = examData;
        
        if (filters.gradeLevel) {
            result = result.filter(exam => exam.gradeLevelId === filters.gradeLevel);
        }
        
        if (filters.difficulty) {
            result = result.filter(exam => exam.difficulty === filters.difficulty);
        }
        
        if (filters.examType) {
            result = result.filter(exam => exam.examTypeId === filters.examType);
        }
        
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(exam => 
                exam.title.toLowerCase().includes(searchLower) ||
                exam.description.toLowerCase().includes(searchLower)
            );
        }
        
        return result;
    }, [examData, filters, searchTerm]);

    const handleFilterChange = (key: keyof ExamFilters, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value === "all" ? undefined : value
        }));
    };

    const clearFilters = () => {
        setFilters({});
        setSearchTerm("");
    };


    return (
        <>
            <section className="py-8 px-4  border-border/40 bg-background/80 backdrop-blur-sm">
                <div className="container mx-auto max-w-7xl p-5 rounded-lg shadow-sm ">
                    <div className="flex flex-col gap-4">
                        {/* Header: Tiêu đề + nút Xóa */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5 text-muted-foreground" />
                                <h2 className="text-lg font-semibold">Bộ lọc</h2>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearFilters}
                                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                            >
                                Xóa bộ lọc
                            </Button>
                        </div>

                        {/* Hàng filter */}
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Search */}
                            <div className="relative flex-1 min-w-[250px]">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Tìm kiếm đề thi..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-primary/20 focus:border-primary"
                                />
                            </div>

                            {/* Grade */}
                            <Select
                                value={filters.gradeLevel?.toString() || "all"}
                                onValueChange={(value: string) =>
                                    handleFilterChange("gradeLevel", value === "all" ? undefined : parseInt(value))
                                }
                            >
                                <SelectTrigger className="border-primary/20 focus:border-primary w-[160px]">
                                    <SelectValue placeholder="Chọn lớp" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả lớp</SelectItem>
                                    {mockGradeLevels.map((grade) => (
                                        <SelectItem key={grade.gradeLevelId} value={grade.gradeLevelId.toString()}>
                                            {grade.gradeName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Difficulty */}
                            <Select
                                value={filters.difficulty || "all"}
                                onValueChange={(value: string) => handleFilterChange("difficulty", value)}
                            >
                                <SelectTrigger className="border-primary/20 focus:border-primary w-[160px]">
                                    <SelectValue placeholder="Độ khó" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả mức độ</SelectItem>
                                    <SelectItem value="easy">Dễ</SelectItem>
                                    <SelectItem value="medium">Trung bình</SelectItem>
                                    <SelectItem value="hard">Khó</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Exam Type */}
                            <Select
                                value={filters.examType?.toString() || "all"}
                                onValueChange={(value: string) =>
                                    handleFilterChange("examType", value === "all" ? undefined : parseInt(value))
                                }
                            >
                                <SelectTrigger className="border-primary/20 focus:border-primary w-[160px]">
                                    <SelectValue placeholder="Loại đề thi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả loại</SelectItem>
                                    {mockExamTypes.map((type) => (
                                        <SelectItem key={type.examTypeId} value={type.examTypeId.toString()}>
                                            {type.typeName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>
            <RenderResults filteredExams={filteredExams} clearFilters={clearFilters} />

        </>
    );
}

export default FilterSection;
