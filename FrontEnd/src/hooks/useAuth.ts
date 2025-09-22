
import { useMutation } from "@tanstack/react-query";

import type { ResponseData, ResponseLogin, ResponseNull } from "@/utils/type";
import type { LoginInput, OtpInput, RegisterInput } from "@/schema/authSchema";
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

  return { register, verifyCode, login };
};
