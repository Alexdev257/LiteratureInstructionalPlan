// --- File: src/components/admin/users/Header.tsx ---
"use client";
import { Plus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onCreateAdmin: () => void;
  onCreateTeacher: () => void;
}

export function Header({ onCreateAdmin, onCreateTeacher }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Quản Lý Người Dùng</h1>
      <div className="flex gap-1">
        <Button variant="outline" onClick={onCreateTeacher}>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm Giáo Viên
        </Button>
        <Button onClick={onCreateAdmin}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm Admin
        </Button>
      </div>
    </div>
  );
}