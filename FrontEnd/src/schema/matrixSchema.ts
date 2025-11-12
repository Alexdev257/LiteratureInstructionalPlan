

import { z } from "zod";

const DifficultyEnum = z.enum(["1", "2", "3", "4"]);
const QuestionTypeEnum = z.enum(["1", "2", "3"]);

const matrixDetailSchema = z.object({
    lessonName: z.string('Tên bài học là bắt buộc').min(1),
    questionType: QuestionTypeEnum,
    difficulty: DifficultyEnum,
    quantity: z.number().nonnegative(),
    scorePerQuestion: z.number().nonnegative(),
});


export const matrixSchema = z.object({
    title: z.string( 'Tiêu đề là bắt buộc').min(1),
    description: z.string('Mô tả là bắt buộc').min(1),
    gradeLevelId: z.number().int().nonnegative(),
    createdByUserId: z.number().int().nonnegative(),
    createdAt: z.string(),
    status: z.string('Trạng thái là bắt buộc').min(1),
    notes: z.string('Ghi chú là bắt buộc').min(1),
    details: z.array(matrixDetailSchema).nonempty(),
});


export type MatrixInput = z.infer<typeof matrixSchema>;
export type MatrixDetail = z.infer<typeof matrixDetailSchema>;
