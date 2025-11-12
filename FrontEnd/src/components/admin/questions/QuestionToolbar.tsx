"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { QuestionFilters, QuestionStatus, GradeLevel } from "@/utils/type"; 
import type { Dispatch, SetStateAction } from "react";
import { useDebouncedCallback } from 'use-debounce';

type QuestionToolbarProps = {
  filters: QuestionFilters; // Sửa type
  setFilters: Dispatch<SetStateAction<QuestionFilters>>; // Sửa type
  gradeLevels: GradeLevel[]; 
};

type StatusTab = QuestionStatus | "All";

const mockExamTypes = [
  { value: "All", label: "Tất cả Loại" },
  { value: "1", label: "Nhiều đáp án" },
  { value: "2", label: "Một đáp án" },
  { value: "3", label: "Tự luận" },
];
const mockDifficulties = [
  { value: "All", label: "Tất cả Độ khó" },
  { value: "1", label: "Dễ" },
  { value: "2", label: "Trung bình" },
  { value: "3", label: "Khó" },
  { value: "4", label: "Rất khó" },
];

export function QuestionToolbar({ filters, setFilters, gradeLevels }: QuestionToolbarProps) {

  // Handler chung cho các filter
  const handleFilterChange = (key: keyof QuestionFilters, value: string) => {
    // Sửa lỗi 'prev' any
    setFilters((prev: QuestionFilters) => ({ ...prev, [key]: value, PageNumber: 1 }));
  };
  
  const debouncedSearch = useDebouncedCallback((value: string) => {
    // Sửa lỗi 'prev' any
     setFilters((prev: QuestionFilters) => ({ ...prev, search: value, PageNumber: 1 }));
  }, 500);

  // Handler cho tabs
  const handleStatusChange = (status: StatusTab) => {
    // Sửa lỗi 'prev' any
    setFilters((prev: QuestionFilters) => ({ ...prev, status, PageNumber: 1 }));
  };

  const tabs: { label: string; value: StatusTab }[] = [
    { label: "All", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Active", value: "Active" },
    { label: "Rejected", value: "Rejected" },
  ];

  return (
    <div className="space-y-4">
       {/* Hàng 1: Search và Tabs */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm câu hỏi, người tạo..."
            className="pl-10"
            defaultValue={filters.search}
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
        {/* <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
          {tabs.map(tab => (
            <Button
              key={tab.value}
              variant={filters.status === tab.value ? "default" : "ghost"}
              size="sm"
              onClick={() => handleStatusChange(tab.value)}
              className={`flex-1 justify-center min-w-[80px] ${
                filters.status === tab.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-white"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div> */}
      </div>

       {/* Hàng 2: Dropdown Filters */}
       {/* <div className="flex flex-wrap items-center gap-4">
            <Select
                value={filters.grade} // Dùng 'grade' từ state UI
                onValueChange={(value) => handleFilterChange("grade", value)}
            >
                <SelectTrigger className="w-auto min-w-[120px]">
                    <SelectValue placeholder="Chọn Lớp" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">Tất cả Lớp</SelectItem>
                    {gradeLevels.map(grade => (
                        <SelectItem key={grade.gradeLevelId} value={grade.gradeLevelId.toString()}>
                          {grade.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.QuestionType}
                onValueChange={(value) => handleFilterChange("QuestionType", value)}
            >
                <SelectTrigger className="w-auto min-w-[180px]">
                    <SelectValue placeholder="Loại câu hỏi" />
                </SelectTrigger>
                <SelectContent>
                    {mockExamTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.difficulty}
                onValueChange={(value) => handleFilterChange("difficulty", value)}
            >
                <SelectTrigger className="w-auto min-w-[120px]">
                    <SelectValue placeholder="Độ khó" />
                </SelectTrigger>
                <SelectContent>
                    {mockDifficulties.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
       </div> */}
    </div>
  );
}