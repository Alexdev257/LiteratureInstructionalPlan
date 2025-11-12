import { z } from "zod";

export const registerSchema = z.object({
  userName: z
    .string()
    .min(3, "Username phải có ít nhất 3 ký tự")
    .max(30, "Username tối đa 30 ký tự")
    .regex(
      /^[A-Za-z0-9._-]+$/,
      "Username chỉ được chứa chữ, số, '.', '_' hoặc '-'"
    ),
  fullName: z.string().min(1, "Full name không được để trống"),
  email: z.email("Email không hợp lệ"),
  password: z.string().superRefine((val, ctx) => {
    if (val.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 8 ký tự!",
        path: ["Password"],
      });
    }
    if (!/[A-Z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa!",
        path: ["Password"],
      });
    }
    if (!/[0-9]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải chứa ít nhất 1 chữ số!",
      });
    }
    if (!/[a-z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết thường!",
        path: ["Password"],
      });
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!",
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

export const forgotPasswordEmailSchema = z.object({
  email: z.email("Email không hợp lệ"),
});

export const resetPasswordSchema = z
  .object({
    email: z.email("Email không hợp lệ"),
    newPassword: z.string().superRefine((val, ctx) => {
      if (val.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mật khẩu phải có ít nhất 8 ký tự!",
        });
      }
      if (!/[0-9]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mật khẩu phải chứa ít nhất 1 chữ số!",
        });
      }
      if (!/[A-Z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa!",
        });
      }
      if (!/[a-z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết thường!",
        });
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!",
        });
      }
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

// --- THÊM MỚI ---
export const updateProfileSchema = z.object({
  userName: z
    .string()
    .min(1, "Username không được để trống")
    // Regex dựa theo UpdateProfileCommand.cs: @"([a-zA-Z\d]+)"
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Username không được chứa ký tự đặc biệt hoặc khoảng trắng"
    ),
  fullName: z
    .string()
    .min(1, "Họ và tên không được để trống")
    // Regex dựa theo UpdateProfileCommand.cs: @"([a-zA-Z\s]+)"
    .regex(/^[a-zA-Z\s]+$/, "Họ và tên chỉ được chứa chữ cái và khoảng trắng"),
});

export const changePasswordSchema = z
  .object({
    email: z.string().email(), // Sẽ được disable, chỉ để gửi đi
    password: z.string().min(1, "Mật khẩu cũ không được để trống"),
    newPassword: z
      .string()
      // Các quy tắc giống hệt ChangePasswordCommand.cs
      .superRefine((val, ctx) => {
        if (val.length < 8) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mật khẩu phải có ít nhất 8 ký tự!",
          });
        }
        if (!/[A-Z]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa!",
          });
        }
        if (!/[0-9]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mật khẩu phải chứa ít nhất 1 chữ số!",
          });
        }
        if (!/[a-z]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mật khẩu phải chứa ít nhất 1 chữ cái viết thường!",
          });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!",
          });
        }
      }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmNewPassword"], // Lỗi sẽ hiển thị ở ô confirm
  });
// --- KẾT THÚC THÊM MỚI ---

export type OtpInput = z.infer<typeof otpSchema>;
export type ForgotPasswordEmailInput = z.infer<
  typeof forgotPasswordEmailSchema
>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
