// --- File: src/components/admin/template/Header.tsx ---
"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onCreateTemplate: () => void;
}

export function Header({ onCreateTemplate }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Quản Lý Giáo Án</h1>
      <Button onClick={onCreateTemplate}>
        <Plus className="mr-2 h-4 w-4" />
        Tạo Giáo Án Mới
      </Button>
    </div>
  );
}