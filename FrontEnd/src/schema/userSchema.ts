import z from "zod"



export const updateProfileSchema = z.object({
  userName: z.string().min(3, 'Tên đăng nhập tối thiểu 3 ký tự'),
  fullName: z.string().min(2, 'Họ tên tối thiểu 2 ký tự'),
})
export type UpdateProfileFormInput = z.infer<typeof updateProfileSchema>