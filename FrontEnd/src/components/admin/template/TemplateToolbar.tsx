"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TemplateFilterState, GradeLevel } from "@/utils/type";
import type { Dispatch, SetStateAction } from "react";
import { useDebouncedCallback } from 'use-debounce';

type TemplateToolbarProps = {
  filters: TemplateFilterState;
  setFilters: Dispatch<SetStateAction<TemplateFilterState>>;
  gradeLevels: GradeLevel[];
};

type StatusTab = "All" | "Active" | "Banned";

// Dữ liệu mock (API không hỗ trợ)
const priceRanges = [
  { id: "all", label: "Tất cả giá" },
  { id: "free", label: "Miễn phí" },
  { id: "under-20k", label: "Dưới 20.000đ" },
  { id: "20k-30k", label: "20-30k" },
  { id: "above-30k", label: "Trên 30.000đ" },
];

export function TemplateToolbar({ filters, setFilters, gradeLevels }: TemplateToolbarProps) {

  const handleFilterChange = (key: keyof TemplateFilterState, value: string) => {
    setFilters((prev: TemplateFilterState) => ({ ...prev, [key]: value, PageNumber: 1 }));
  };

  const handleStatusChange = (status: StatusTab) => {
    setFilters((prev: TemplateFilterState) => ({ ...prev, status, PageNumber: 1 }));
  };
  
  const debouncedSearch = useDebouncedCallback((value: string) => {
     setFilters((prev: TemplateFilterState) => ({ ...prev, Search: value, PageNumber: 1 }));
  }, 500);

  const tabs: { label: string; value: StatusTab }[] = [
    { label: "All", value: "All" },
    { label: "Active", value: "Active" },
    { label: "Banned", value: "Banned" }, // Map sang IsDeleted
  ];

  return (
    <div className="space-y-4">
      {/* Hàng 1: Search và Tabs */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm giáo án..."
            className="pl-10"
            defaultValue={filters.Search}
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
                filters.status === tab.value ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Hàng 2: Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Select 
          value={filters.gradeLevel ?? "all"} 
          onValueChange={(v) => handleFilterChange("gradeLevel", v)}
        >
          <SelectTrigger className="w-auto min-w-[120px]"><SelectValue placeholder="Lớp" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả Lớp</SelectItem>
            {gradeLevels.map(g => <SelectItem key={g.gradeLevelId} value={g.gradeLevelId.toString()}>{g.name}</SelectItem>)}
          </SelectContent>
        </Select>
        
        <Select 
          value={filters.priceRange ?? "all"} 
          onValueChange={(v) => handleFilterChange("priceRange", v)}
        >
          <SelectTrigger className="w-auto min-w-[160px]"><SelectValue placeholder="Mức giá" /></SelectTrigger>
          <SelectContent>
            {priceRanges.map(r => <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}