import { z } from "zod";

const DifficultyEnum = z.enum(["1", "2", "3", "4"]); // 1: dễ, 2: trung bình, 3: khó, 4: rất khó
const QuestionTypeEnum = z.enum(["1", "2", "3"]);  // 1: nhiều đáp án, 2: một đáp án, 3: tự luận

const AnswerItemSchema = z.object({
  label: z.string().optional(),
  text: z.string().min(1, "Answer.text phải là chuỗi không rỗng"),
});

export const questionSchema = z.object({
  content: z.string().min(1, "Content không được rỗng"),
  questionType: QuestionTypeEnum,
  difficulty: DifficultyEnum,
  answer: z.array(AnswerItemSchema),
  correctAnswer: z.array(AnswerItemSchema),
  gradeLevelId: z.number().int().positive(),
  createdByUserId: z.number().int().positive(),
}).superRefine((data, ctx) => {
  if (data.questionType === "3") {
    // Tự luận: answer có thể trống
    return;
  }

  // Các loại khác: phải có ít nhất 1 phần tử
  if (data.answer.length === 0) {
    ctx.addIssue({
      path: ["answer"],
      message: "Answer phải có ít nhất một phần tử",
      code: z.ZodIssueCode.custom,
    });
  }

  if (data.correctAnswer.length === 0) {
    ctx.addIssue({
      path: ["correctAnswer"],
      message: "CorrectAnswer phải có ít nhất một phần tử",
      code: z.ZodIssueCode.custom,
    });
  }

  // correctAnswer.text phải trùng với answer.text
  const answerTexts = new Set(data.answer.map((a) => a.text));
  for (const c of data.correctAnswer) {
    if (!answerTexts.has(c.text)) {
      ctx.addIssue({
        path: ["correctAnswer"],
        message: "Mọi correctAnswer.text phải trùng với một text trong answer",
        code: z.ZodIssueCode.custom,
      });
      break;
    }
  }
});

export type QuestionInput = z.infer<typeof questionSchema>;
