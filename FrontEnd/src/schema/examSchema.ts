import { z } from "zod";

// Schema for exam creation (Step 3 - Review page)
export const examReviewSchema = z.object({
  title: z
    .string()
    .min(1, "Vui lòng nhập tên đề thi")
    .max(200, "Tên đề thi không được quá 200 ký tự"),
  description: z
    .string()
    .min(1, "Vui lòng nhập mô tả đề thi")
    .max(1000, "Mô tả không được quá 1000 ký tự"),
  durationMinutes: z
    .number()
    .min(1, "Thời gian phải lớn hơn 0")
    .max(300, "Thời gian không được quá 300 phút"),
  examTypeId: z
    .number()
    .min(1, "Vui lòng chọn loại đề thi"),
});

// Schema for complete exam creation (including matrix and questions)
export const createExamSchema = examReviewSchema.extend({
  createdByUserId: z.number().min(1, "Thông tin người tạo không hợp lệ"),
  matrixId: z.number().min(1, "Vui lòng chọn ma trận đề"),
  questionIds: z
    .array(z.number())
    .min(1, "Vui lòng chọn ít nhất 1 câu hỏi")
    .max(100, "Không được chọn quá 100 câu hỏi"),
});

// Schema for exam update - matrixId is fixed, only update questions and review info
export const updateExamSchema = z.object({
  title: z
    .string()
    .min(1, "Vui lòng nhập tên đề thi")
    .max(200, "Tên đề thi không được quá 200 ký tự"),
  description: z
    .string()
    .min(1, "Vui lòng nhập mô tả đề thi")
    .max(1000, "Mô tả không được quá 1000 ký tự"),
  durationMinutes: z
    .number()
    .min(1, "Thời gian phải lớn hơn 0")
    .max(300, "Thời gian không được quá 300 phút"),
  examTypeId: z
    .number()
    .min(1, "Vui lòng chọn loại đề thi"),
  matrixId: z
    .number()
    .min(1, "Ma trận đề không hợp lệ"), // Fixed, sent from exam data
  questionIds: z
    .array(z.number())
    .min(1, "Vui lòng chọn ít nhất 1 câu hỏi")
    .max(100, "Không được chọn quá 100 câu hỏi"),
});

// Type exports
export type ExamReviewInput = z.infer<typeof examReviewSchema>;
export type CreateExamInput = z.infer<typeof createExamSchema>;
export type UpdateExamInput = z.infer<typeof updateExamSchema>;

// Schema for matrix selection (Step 1)
export const selectMatrixSchema = z.object({
  matrixId: z.number().min(1, "Vui lòng chọn ma trận đề"),
});

export type SelectMatrixInput = z.infer<typeof selectMatrixSchema>;

// Schema for question selection (Step 2)
export const selectQuestionsSchema = z.object({
  questionIds: z
    .array(z.number())
    .min(1, "Vui lòng chọn ít nhất 1 câu hỏi")
    .max(100, "Không được chọn quá 100 câu hỏi"),
});

export type SelectQuestionsInput = z.infer<typeof selectQuestionsSchema>;