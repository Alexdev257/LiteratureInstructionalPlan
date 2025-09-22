import { z } from "zod";


export const registerSchema = z.object({
  userName: z
    .string()
    .min(3, "Username phải có ít nhất 3 ký tự")
    .max(30, "Username tối đa 30 ký tự")
    .regex(/^[A-Za-z0-9._-]+$/, "Username chỉ được chứa chữ, số, '.', '_' hoặc '-'"),
  fullName: z.string().min(1, "Full name không được để trống"),
  email: z.email("Email không hợp lệ"),
  password: z
    .string()
    .superRefine((val, ctx) => {
      if (val.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters!",
          path: ["Password"],
        });
      }
      if (!/[A-Z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least 1 Upper character!",
          path: ["Password"],
        });
      }
      if (!/[a-z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least 1 Lower character!",
          path: ["Password"],
        });
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least 1 special character(!@#$%^&*(),.?\":{}|<>)!",
          path: ["Password"],
        });
      }
    }),
});



export const loginSchema = z.object({
    email: z.email("Email không hợp lệ"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});


export const otpSchema = z.object({
  email: z.email("Email không hợp lệ"),
  otp: z
    .string()
    .length(6, "OTP phải có đúng 6 ký tự số")
    .regex(/^\d+$/, "OTP chỉ được chứa chữ số"),
});

export type OtpInput = z.infer<typeof otpSchema>;

export type RegisterInput = z.infer<typeof registerSchema>;



export type LoginInput = z.infer<typeof loginSchema>;

