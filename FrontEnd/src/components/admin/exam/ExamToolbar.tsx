"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ExamFilterState, ExamAdminStatus, GradeLevel, ExamType } from "@/utils/type";
import type { Dispatch, SetStateAction } from "react";
import { useDebouncedCallback } from 'use-debounce';

type ExamToolbarProps = {
  filters: ExamFilterState;
  setFilters: Dispatch<SetStateAction<ExamFilterState>>;
  gradeLevels: GradeLevel[];
  examTypes: ExamType[];
};

type StatusTab = "All" | "Active" | "Banned"; // Map từ IsDeleted

const mockDifficulties = [ // API không hỗ trợ filter này
  { value: "All", label: "Tất cả Độ khó" },
  { value: "medium", label: "Trung bình" },
  { value: "easy", label: "Dễ" },
  { value: "hard", label: "Khó" },
];

export function ExamToolbar({ filters, setFilters, gradeLevels, examTypes }: ExamToolbarProps) {

  const handleFilterChange = (key: keyof ExamFilterState, value: string) => {
    setFilters((prev: ExamFilterState) => ({ ...prev, [key]: value, PageNumber: 1 }));
  };

  const handleStatusChange = (status: StatusTab) => {
    setFilters((prev: ExamFilterState) => ({ ...prev, status, PageNumber: 1 }));
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
     setFilters((prev: ExamFilterState) => ({ ...prev, search: value, PageNumber: 1 }));
  }, 500);

  const tabs: { label: string; value: StatusTab }[] = [
    { label: "All", value: "All" },
    { label: "Active", value: "Active" },
    { label: "Banned", value: "Banned" }, // Ánh xạ từ IsDeleted
  ];

  return (
    <div className="space-y-4">
      {/* Hàng 1: Search và Tabs */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm đề thi, người tạo..."
            className="pl-10"
            defaultValue={filters.search}
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
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
        </div>
      </div>

      {/* Hàng 2: Dropdown Filters */}
      {/* <div className="flex flex-wrap items-center gap-4">
        <Select value={filters.grade} onValueChange={(v) => handleFilterChange("grade", v)}>
          <SelectTrigger className="w-auto min-w-[120px]"><SelectValue placeholder="Lớp" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Tất cả Lớp</SelectItem>
            {gradeLevels.map(g => <SelectItem key={g.gradeLevelId} value={g.gradeLevelId.toString()}>{g.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.examType} onValueChange={(v) => handleFilterChange("examType", v)}>
          <SelectTrigger className="w-auto min-w-[120px]"><SelectValue placeholder="Loại đề" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Tất cả Loại</SelectItem>
            {examTypes.map(t => <SelectItem key={t.examTypeId} value={t.examTypeId.toString()}>{t.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.difficulty} onValueChange={(v) => handleFilterChange("difficulty", v)}>
          <SelectTrigger className="w-auto min-w-[120px]"><SelectValue placeholder="Độ khó" /></SelectTrigger>
          <SelectContent>
            {mockDifficulties.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
}