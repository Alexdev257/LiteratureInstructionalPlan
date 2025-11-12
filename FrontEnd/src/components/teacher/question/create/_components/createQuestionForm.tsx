"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, Plus, Trash2, Save} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { questionSchema, type QuestionInput } from "@/schema/questionSchema";
import { useQuestion } from "@/hooks/useQuestion";
import { useGradeLevel } from "@/hooks/useGradeLevel";
import { useSessionStore } from "@/stores/sessionStore";
import { Checkbox } from "@/components/ui/checkbox";

interface AnswerItem {
  label: string;
  text: string;
}

export default function CreateQuestionForm() {
const router = useRouter();
  const { user } = useSessionStore();
  const { usePostQuestion } = useQuestion();
  const { useGetGradeLevels } = useGradeLevel();

  const { data: gradeLevelsData } = useGetGradeLevels({ PageSize: 100, PageNumber: 1 });
  const gradeLevels = gradeLevelsData?.data?.items || [];

  const [answers, setAnswers] = useState<AnswerItem[]>([
    { label: "", text: "" },
    { label: "", text: "" },
  ]);
  const [correctAnswerLabels, setCorrectAnswerLabels] = useState<string[]>([]);
  const [essayAnswer, setEssayAnswer] = useState("");

  const form = useForm<QuestionInput>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      content: "",
      questionType: "2",
      difficulty: "2",
      gradeLevelId: undefined,
      createdByUserId: Number(user?.UserId) || 0,
    },
  });

  const questionType = form.watch("questionType");

  // Đồng bộ answers → form.answer
  useEffect(() => {
    const validAnswers = answers
      .filter((a) => a.text.trim())
      .map((a) => ({ label: a.label, text: a.text }));
    form.setValue("answer", validAnswers);
  }, [answers, form]);

  // Đồng bộ correctAnswer → form.correctAnswer
  useEffect(() => {
    if (questionType === "3") {
      form.setValue("correctAnswer", essayAnswer.trim() ? [{ label: "", text: essayAnswer }] : []);
    } else {
      const correct = answers
        .filter((a) => correctAnswerLabels.includes(a.label) && a.text.trim())
        .map((a) => ({ label: a.label, text: a.text }));
      form.setValue("correctAnswer", correct);
    }
  }, [correctAnswerLabels, answers, essayAnswer, questionType, form]);

  // Add answer
  const handleAddAnswer = () => {
    if (answers.length < 6) {
      setAnswers([...answers, { label: "", text: "" }]);
    }
  };

  // Remove answer
  const handleRemoveAnswer = (index: number) => {
    if (answers.length > 2) {
      const removedLabel = answers[index].label;
      setAnswers(answers.filter((_, i) => i !== index));
      setCorrectAnswerLabels(correctAnswerLabels.filter((l) => l !== removedLabel));
    }
  };

  // Update answer text
  const handleAnswerTextChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = text;
    setAnswers(newAnswers);
  };

  // Toggle correct answer
  const handleToggleCorrectAnswer = (label: string) => {
    if (questionType === "1") {
      setCorrectAnswerLabels((prev) =>
        prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
      );
    } else if (questionType === "2") {
      setCorrectAnswerLabels([label]);
    }
  };

  // Submit
  const onSubmit = (data: QuestionInput) => {
    usePostQuestion.mutate(data, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Tạo câu hỏi thành công!");
          router.navigate({ to: "/teacher/questions" });
        } else {
          toast.error(res.message || "Tạo thất bại!");
        }
      },
      onError: (error) => {
        toast.error(error?.message || "Lỗi hệ thống!");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.navigate({ to: "/teacher/questions" })}
            disabled={usePostQuestion.isPending}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <Button type="submit" disabled={usePostQuestion.isPending}>
            {usePostQuestion.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Đang tạo...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Tạo câu hỏi
              </>
            )}
          </Button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Main form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Content */}
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-card-foreground">Nội dung câu hỏi</CardTitle>
                <CardDescription>Nhập nội dung câu hỏi chi tiết</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Câu hỏi *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Nhập nội dung câu hỏi..."
                          className="min-h-32"
                          rows={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Answers Section */}
            {questionType !== "3" ? (
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-card-foreground">Các đáp án</CardTitle>
                      <CardDescription>
                        {questionType === "1"
                          ? "Chọn nhiều đáp án đúng "
                          : "Chọn một đáp án đúng"}
                      </CardDescription>
                    </div>
                    {answers.length < 5 && (
                      <Button size="sm" variant="outline" onClick={handleAddAnswer} type="button">
                        <Plus className="h-4 w-4 mr-1" />
                        Thêm
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {answers.map((answer, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 transition"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex items-center">
                          {questionType === "1" ? (
                              <Checkbox
                              checked={correctAnswerLabels.includes(answer.label)}
                              onCheckedChange={() => handleToggleCorrectAnswer(answer.label)}
                              className="w-4 h-4 cursor-pointer"
                              
                        
                              />
                          ) : (
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={correctAnswerLabels.includes(answer.label)}
                              onChange={() => handleToggleCorrectAnswer(answer.label)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          )}
                          <label className="ml-2 text-sm font-medium text-card-foreground cursor-pointer">
                            Đáp án đúng
                          </label>
                        </div>
                        {answers.length > 2 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="ml-auto h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveAnswer(index)}
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold text-sm">
                          {answer.label}
                        </div>
                        <Input
                          value={answer.text}
                          onChange={(e) => handleAnswerTextChange(index, e.target.value)}
                          placeholder="Nhập nội dung đáp án..."
                          className="flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border">
                <CardHeader className="border-b border-border">
                  <CardTitle className="text-card-foreground">Đáp án tự luận</CardTitle>
                  <CardDescription>Nhập đáp án chi tiết cho câu hỏi tự luận</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Textarea
                    value={essayAnswer}
                    onChange={(e) => setEssayAnswer(e.target.value)}
                    placeholder="Nhập đáp án tự luận..."
                    className="min-h-32"
                    rows={6}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column - Settings (Gộp tất cả vào 1 card) */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-card-foreground">Cài đặt câu hỏi</CardTitle>
                <CardDescription>Chọn loại, độ khó và lớp học</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Question Type */}
                <FormField
                  control={form.control}
                  name="questionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Loại câu hỏi *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setCorrectAnswerLabels([]);
                            setEssayAnswer("");
                          }}
                          value={field.value}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1" id="type-1" />
                            <label htmlFor="type-1" className="text-sm cursor-pointer">
                              Nhiều đáp án đúng
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2" id="type-2" />
                            <label htmlFor="type-2" className="text-sm cursor-pointer">
                              Một đáp án đúng
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3" id="type-3" />
                            <label htmlFor="type-3" className="text-sm cursor-pointer">
                              Tự luận
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t border-border" />

                {/* Difficulty */}
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Độ khó *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1" id="diff-1" />
                            <label htmlFor="diff-1" className="text-sm cursor-pointer">
                              Dễ
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2" id="diff-2" />
                            <label htmlFor="diff-2" className="text-sm cursor-pointer">
                              Trung bình
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3" id="diff-3" />
                            <label htmlFor="diff-3" className="text-sm cursor-pointer">
                              Khó
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="4" id="diff-4" />
                            <label htmlFor="diff-4" className="text-sm cursor-pointer">
                              Rất khó
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t border-border" />

                {/* Grade Level */}
                <FormField
                  control={form.control}
                  name="gradeLevelId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Lớp học *</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn lớp học" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gradeLevels.map((grade) => (
                            <SelectItem
                              key={grade.gradeLevelId}
                              value={grade.gradeLevelId.toString()}
                            >
                              {grade.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
