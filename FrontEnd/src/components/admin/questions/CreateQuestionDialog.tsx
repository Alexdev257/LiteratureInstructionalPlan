"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminCreateQuestionSchema, type AdminCreateQuestionInput } from "@/schema/adminSchema";
import { useQuestionAdmin } from "@/hooks/useQuestionAdmin";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import type { GradeLevel } from "@/utils/type";
import { useSessionStore } from "@/stores/sessionStore";

interface CreateQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gradeLevels: GradeLevel[];
}

// Data cho dropdowns
const questionTypes = [
  { value: "1", label: "Nhiều đáp án (Multiple)" }, 
  { value: "2", label: "Một đáp án (Single)" }, 
  { value: "3", label: "Tự luận (Essay)" }, 
];
const difficulties = [
  { value: "1", label: "Dễ" }, 
  { value: "2", label: "Trung bình" }, 
  { value: "3", label: "Khó" }, 
  { value: "4", label: "Rất khó" },
];

export function CreateQuestionDialog({ open, onOpenChange, gradeLevels }: CreateQuestionDialogProps) {
  const { useCreateQuestion } = useQuestionAdmin();
  const createMutation = useCreateQuestion();
  const { user } = useSessionStore();

  const form = useForm<AdminCreateQuestionInput>({
    resolver: zodResolver(adminCreateQuestionSchema) as unknown as Resolver<AdminCreateQuestionInput>, // Sửa lỗi Zod
    defaultValues: {
      content: "",
      questionType: "2",
      difficulty: "2",
      gradeLevelId: undefined,
      createdByUserId: Number(user?.UserId) || 0,
      answer: [],
      correctAnswer: [],
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        content: "",
        questionType: "2",
        difficulty: "2",
        gradeLevelId: undefined,
        createdByUserId: Number(user?.UserId) || 0,
        answer: [],
        correctAnswer: [],
      });
    }
  }, [open, form, user]);

  const onSubmit = (data: AdminCreateQuestionInput) => {
    // [GỌI API TẠO CÂU HỎI]
    // Backend yêu cầu Answer và CorrectAnswer phải là JSON string
    const apiData = {
      ...data,
      answer: JSON.stringify(data.answer),
      correctAnswer: JSON.stringify(data.correctAnswer),
    };
    
    createMutation.mutate(apiData, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          onOpenChange(false);
        }
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Tạo câu hỏi mới</DialogTitle>
          <DialogDescription>
            Điền thông tin chi tiết cho câu hỏi.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Nội dung */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung câu hỏi</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập nội dung câu hỏi..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-3 gap-4">
              {/* Lớp */}
              <FormField
                control={form.control}
                name="gradeLevelId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lớp</FormLabel>
                    <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn lớp" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gradeLevels.map((g) => (
                          <SelectItem key={g.gradeLevelId} value={g.gradeLevelId.toString()}>
                            {g.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Loại câu hỏi */}
              <FormField
                control={form.control}
                name="questionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại câu hỏi</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {questionTypes.map((t) => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Độ khó */}
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Độ khó</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn độ khó" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {difficulties.map((d) => (
                          <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* [TODO: Thêm logic nhập Answer/CorrectAnswer cho trắc nghiệm] */}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={createMutation.isPending}>
                Hủy
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Tạo
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}