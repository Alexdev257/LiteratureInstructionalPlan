import { z } from "zod";

// Dựa trên UserCreateRequestvà RegisterSchema 
export const adminCreateUserSchema = z.object({
  userName: z
    .string()
    .min(3, "Username phải có ít nhất 3 ký tự")
    .regex(/^[A-Za-z0-9._-]+$/, "Username không hợp lệ"),
  fullName: z.string().min(1, "Họ tên không được để trống"),
  email: z.email("Email không hợp lệ"),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(/[A-Z]/, "Phải có ít nhất 1 chữ hoa")
    .regex(/[a-z]/, "Phải có ít nhất 1 chữ thường")
    .regex(/[0-9]/, "Phải có ít nhất 1 chữ số")
    .regex(/[^A-Za-z0-9]/, "Phải có ít nhất 1 ký tự đặc biệt"),
  roleId: z.coerce.number().min(1, "Vui lòng chọn vai trò"),
});
export type AdminCreateUserInput = z.infer<typeof adminCreateUserSchema>;

// Dựa trên UserUpdateRequest 
export const adminUpdateUserSchema = z.object({
  userId: z.number(), // Thêm ID để biết update ai
  userName: z
    .string()
    .min(3, "Username phải có ít nhất 3 ký tự")
    .regex(/^[A-Za-z0-9._-]+$/, "Username không hợp lệ"),
  fullName: z.string().min(1, "Họ tên không được để trống"),
  email: z.email("Email không hợp lệ"),
  roleId: z.coerce.number().min(1, "Vui lòng chọn vai trò"),
});
export type AdminUpdateUserInput = z.infer<typeof adminUpdateUserSchema>;

const answerOptionSchema = z.object({
  label: z.string().min(1, "Nhãn không được trống"),
  text: z.string().min(1, "Nội dung không được trống"),
});

// Dựa trên PracticeQuestionCreateRequest
export const adminCreateQuestionSchema = z.object({
  content: z.string().min(1, "Nội dung câu hỏi không được để trống"),
  questionType: z.enum(["1", "2", "3"]), // Multiple, Single, Text
  difficulty: z.enum(["1", "2", "3", "4"]), // Easy, Medium, Hard, Very Hard
  gradeLevelId: z.coerce.number().min(1, "Vui lòng chọn lớp"),
  createdByUserId: z.coerce.number(),
  answer: z.array(answerOptionSchema).optional(),
  correctAnswer: z.array(answerOptionSchema).optional(),
  // 'Answer' và 'CorrectAnswer' phức tạp, xử lý riêng (JSON.stringify)
  // Tạm thời không validate ở đây
});
export type AdminCreateQuestionInput = z.infer<typeof adminCreateQuestionSchema>;
export const adminUpdateQuestionSchema = adminCreateQuestionSchema.extend({
  questionId: z.number(),
});
export type AdminUpdateQuestionInput = z.infer<typeof adminUpdateQuestionSchema>;

