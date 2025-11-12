import { useMutation } from "@tanstack/react-query";

import type { ResponseData, ResponseLogin, ResponseNull } from "@/utils/type";
import type {
  LoginInput,
  OtpInput,
  RegisterInput,
  ResetPasswordInput,
  // --- THÊM MỚI ---
  UpdateProfileInput,
  ChangePasswordInput,
} from "@/schema/authSchema";
import { authApi } from "@/lib/api/auth/auth";
import type { CredentialResponse } from "@react-oauth/google";

// --- THÊM MỚI ---
// Dữ liệu truyền vào cho mutation updateProfile
type UpdateProfilePayload = {
  id: number;
  data: UpdateProfileInput;
};
// --- KẾT THÚC THÊM MỚI ---

export const useAuth = () => {
  const register = useMutation<
    ResponseData<ResponseNull>,
    Error,
    RegisterInput
  >({
    mutationFn: async (data: RegisterInput) => {
      return await authApi.register(data);
    },
  });

  const verifyCode = useMutation<ResponseData<ResponseNull>, Error, OtpInput>({
    mutationFn: async (data: OtpInput) => {
      return await authApi.verifyCode(data);
    },
  });

  const login = useMutation<ResponseData<ResponseLogin>, Error, LoginInput>({
    mutationFn: async (data: LoginInput) => {
      return await authApi.login(data);
    },
  });
  const resetPassword = useMutation<
    ResponseData<ResponseNull>,
    Error,
    ResetPasswordInput
  >({
    mutationFn: async (data: ResetPasswordInput) => {
      return await authApi.resetPassword(data);
    },
  });
  const verifyResetPasswordCode = useMutation<
    ResponseData<ResponseNull>,
    Error,
    OtpInput
  >({
    mutationFn: async (data: OtpInput) => {
      return await authApi.verifyResetPasswordCode(data);
    },
  });
  const loginGoogle = useMutation<
    ResponseData<ResponseLogin>,
    Error,
    CredentialResponse
  >({
    mutationFn: async (credentialResponse: CredentialResponse) => {
      return await authApi.loginGoogle(credentialResponse);
    },
  });

  // --- THÊM MỚI ---
  // MUTATION MỚI: Cập nhật profile
  const updateProfile = useMutation<
    ResponseData<ResponseNull>,
    Error,
    UpdateProfilePayload
  >({
    mutationFn: async ({ id, data }: UpdateProfilePayload) => {
      return await authApi.updateProfile(id, data);
    },
  });

  // MUTATION MỚI: Thay đổi mật khẩu
  const changePassword = useMutation<
    ResponseData<ResponseNull>,
    Error,
    // Bỏ qua confirmNewPassword khi gửi đi
    Omit<ChangePasswordInput, "confirmNewPassword">
  >({
    mutationFn: async (data) => {
      return await authApi.changePassword(data);
    },
  });
  // --- KẾT THÚC THÊM MỚI ---

  return {
    register,
    verifyCode,
    login,
    resetPassword,
    verifyResetPasswordCode,
    loginGoogle,
    // --- THÊM MỚI ---
    updateProfile,
    changePassword,
    // --- KẾT THÚC THÊM MỚI ---
  };
};