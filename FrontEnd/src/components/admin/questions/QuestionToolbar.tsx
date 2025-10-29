import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select
import type { QuestionFilters, QuestionStatus } from "@/utils/type";
import type { Dispatch, SetStateAction } from "react";

type QuestionToolbarProps = {
  filters: QuestionFilters;
  setFilters: Dispatch<SetStateAction<QuestionFilters>>;
};

type StatusTab = QuestionStatus | "All";

// Mock data cho dropdown
const mockGrades = ["All", "Lớp 10", "Lớp 11", "Lớp 12"];
const mockLessons = ["All", "Bài 1: Tây Tiến", "Bài 2: Ca dao", "Bài 3: Chí Phèo", "Bài 5: Vợ Nhặt", "Bài 7: Ai đã đặt tên..."];
const mockDifficulties = ["All", "Easy", "Medium", "Hard"];

export function QuestionToolbar({ filters, setFilters }: QuestionToolbarProps) {

  const handleFilterChange = (key: keyof QuestionFilters, value: string) => {
    // Nếu giá trị là "All", đặt filter đó thành undefined (hoặc "All")
    const actualValue = value === "All" ? "All" : value;
    setFilters(prev => ({ ...prev, [key]: actualValue, page: 1 }));
  };

  const handleStatusChange = (status: StatusTab) => {
    setFilters(prev => ({ ...prev, status, page: 1 }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
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
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm câu hỏi, người tạo, bài..."
            className="pl-10"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
          {tabs.map(tab => (
            <Button
              key={tab.value}
              variant={filters.status === tab.value ? "default" : "ghost"}
              size="sm"
              onClick={() => handleStatusChange(tab.value)}
              className={`flex-1 justify-center min-w-[80px] ${ // Thêm min-width
                filters.status === tab.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-white"
              }`}
            >
              {tab.label}
              {/* Count? */}
            </Button>
          ))}
        </div>
      </div>

       {/* Hàng 2: Dropdown Filters */}
       <div className="flex flex-wrap items-center gap-4">
           {/* Grade Filter */}
            <Select
                value={filters.grade}
                onValueChange={(value) => handleFilterChange("grade", value)}
            >
                <SelectTrigger className="w-auto min-w-[120px]">
                    <SelectValue placeholder="Chọn Lớp" />
                </SelectTrigger>
                <SelectContent>
                    {mockGrades.map(grade => (
                        <SelectItem key={grade} value={grade}>{grade === "All" ? "Tất cả Lớp" : grade}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

           {/* Lesson Filter */}
            <Select
                value={filters.lesson}
                onValueChange={(value) => handleFilterChange("lesson", value)}
            >
                <SelectTrigger className="w-auto min-w-[180px]">
                    <SelectValue placeholder="Chọn Bài" />
                </SelectTrigger>
                <SelectContent>
                    {mockLessons.map(lesson => (
                        <SelectItem key={lesson} value={lesson}>{lesson === "All" ? "Tất cả Bài" : lesson}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Difficulty Filter */}
            <Select
                value={filters.difficulty}
                onValueChange={(value) => handleFilterChange("difficulty", value)}
            >
                <SelectTrigger className="w-auto min-w-[120px]">
                    <SelectValue placeholder="Độ khó" />
                </SelectTrigger>
                <SelectContent>
                    {mockDifficulties.map(level => (
                        <SelectItem key={level} value={level}>{level === "All" ? "Tất cả Độ khó" : level}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
       </div>
    </div>
  );
}