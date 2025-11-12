"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onCreateQuestion: () => void;
}

export function Header({ onCreateQuestion }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Quản Lý Câu Hỏi</h1>
      <Button onClick={onCreateQuestion}>
        <Plus className="mr-2 h-4 w-4" />
        Tạo Câu Hỏi
      </Button>
    </div>
  );
}