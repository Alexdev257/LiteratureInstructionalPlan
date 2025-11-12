import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AdminQuestion, CreateQuestionInput, QuestionFilters, ResponseData, ResponseNull } from "@/utils/type";
import { questionAdminApi } from "@/lib/api/admin/question";

export const useQuestionAdmin = () => {
  const queryClient = useQueryClient();

  // Query: Lấy danh sách câu hỏi
  const useGetQuestions = (filters: QuestionFilters) => {
    return useQuery<ResponseData<AdminQuestion[]>, Error>({
      queryKey: ["admin", "questions", filters],
      queryFn: () => questionAdminApi.getQuestions(filters),
      placeholderData: (previousData) => previousData,
      // enabled: false để tạm thời không gọi API khi dùng mock data
      enabled: false,
    });
  };

  // Mutation: Tạo câu hỏi
  const useCreateQuestion = () => {
    return useMutation<ResponseData<ResponseNull>, Error, CreateQuestionInput>({
      mutationFn: (data: CreateQuestionInput) => questionAdminApi.createQuestion(data),
      onSuccess: () => {
        // Làm mới lại danh sách câu hỏi sau khi tạo thành công
        queryClient.invalidateQueries({ queryKey: ["admin", "questions"] });
      },
    });
  };

  return { useGetQuestions, useCreateQuestion };
};