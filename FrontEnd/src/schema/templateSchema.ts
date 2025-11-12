import z from "zod";



export const templateSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  gradeLevelId: z.coerce.number().int().positive("Vui lòng chọn lớp học"),
  price: z.coerce.number().min(0, "Giá không được nhỏ hơn 0"), 
  createdById: z.coerce.number().int().positive(),
  file: z.instanceof(FileList).optional(),
});

export type TemplateInput = z.infer<typeof templateSchema>;

