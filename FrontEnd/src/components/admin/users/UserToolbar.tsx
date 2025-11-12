// --- File: src/components/admin/users/UserToolbar.tsx ---
"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { UserFilterState } from "@/utils/type"; // Dùng UserFilterState của UI
import type { Dispatch, SetStateAction } from "react";
import { useDebouncedCallback } from 'use-debounce';

type UserToolbarProps = {
  filters: UserFilterState;
  setFilters: Dispatch<SetStateAction<UserFilterState>>;
};

type StatusTab = "All" | "Active" | "Banned";

export function UserToolbar({ filters, setFilters }: UserToolbarProps) {

  const handleStatusChange = (status: StatusTab) => {
    // Sửa lỗi TS(7006): Thêm kiểu (prev: UserFilterState)
    setFilters((prev: UserFilterState) => ({ 
      ...prev, 
      status: status,
      PageNumber: 1,
    }));
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    // Sửa lỗi TS(7006): Thêm kiểu (prev: UserFilterState)
    setFilters((prev: UserFilterState) => ({ 
      ...prev, 
      search: value, 
      PageNumber: 1 
    }));
  }, 500);

  const tabs: { label: string; value: StatusTab }[] = [
    { label: "All", value: "All" },
    { label: "Active", value: "Active" },
    { label: "Banned", value: "Banned" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm theo email..."
          className="pl-10"
          defaultValue={filters.search}
          onChange={(e) => debouncedSearch(e.target.value)}
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
            className={`flex-1 justify-center ${
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
  );
}