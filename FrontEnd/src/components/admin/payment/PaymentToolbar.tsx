"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { PaymentFilterState, PaymentStatus } from "@/utils/type";
import type { Dispatch, SetStateAction } from "react";
import { useDebouncedCallback } from 'use-debounce';

type PaymentToolbarProps = {
  filters: PaymentFilterState;
  setFilters: Dispatch<SetStateAction<PaymentFilterState>>;
};

type StatusTab = PaymentStatus | "All";

export function PaymentToolbar({ filters, setFilters }: PaymentToolbarProps) {
  const handleStatusChange = (status: StatusTab) => {
    setFilters((prev: PaymentFilterState) => ({ ...prev, status, PageNumber: 1 }));
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
     setFilters((prev: PaymentFilterState) => ({ ...prev, search: value, PageNumber: 1 }));
  }, 500);
  
  const tabs: { label: string; value: StatusTab }[] = [
    { label: "All", value: "All" },
    { label: "Success", value: "Success" },
    { label: "Pending", value: "Pending" },
    { label: "Failed", value: "Failed" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm theo email, tên, hoặc giáo án..."
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
            className={`flex-1 justify-center min-w-[90px] ${
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