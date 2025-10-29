import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import type { UserFilters } from "@/utils/type";
import type { Dispatch, SetStateAction } from "react";

type UserToolbarProps = {
  filters: UserFilters;
  setFilters: Dispatch<SetStateAction<UserFilters>>;
};

type StatusTab = "All" | "Active" |  "Banned";

export function UserToolbar({ filters, setFilters }: UserToolbarProps) {
  
  const handleStatusChange = (status: StatusTab) => {
    setFilters(prev => ({ ...prev, status, page: 1 }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };
  
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
          placeholder="Tìm kiếm theo tên, email..."
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
            className={`flex-1 justify-center ${
              filters.status === tab.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-white"
            }`}
          >
            {tab.label}
            {/* Thêm count ở đây, ví dụ: (3) */}
          </Button>
        ))}
      </div>
    </div>
  );
}