
import { useMutation } from "@tanstack/react-query";

import type { ResponseData, ResponseLogin, ResponseNull } from "@/utils/type";
import type {  LoginInput, OtpInput, RegisterInput, ResetPasswordInput } from "@/schema/authSchema";
import { authApi } from "@/lib/api/auth/auth";

export const useAuth = () => {
  const register = useMutation<ResponseData<ResponseNull>, Error, RegisterInput>({
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
  const resetPassword = useMutation<ResponseData<ResponseNull>, Error, ResetPasswordInput>({
    mutationFn: async (data: ResetPasswordInput) => {
      return await authApi.resetPassword(data);
    },
  });
  const verifyResetPasswordCode = useMutation<ResponseData<ResponseNull>, Error, OtpInput>({
    mutationFn: async (data: OtpInput) => {
      return await authApi.verifyResetPasswordCode(data);
    },
  });

  return { register, verifyCode, login, resetPassword, verifyResetPasswordCode };
};
