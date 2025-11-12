import type {
  LoginInput,
  OtpInput,
  RegisterInput,
  ResetPasswordInput,
  // --- THÊM MỚI ---
  UpdateProfileInput,
  ChangePasswordInput,
} from "@/schema/authSchema";
import { BaseApi } from "../baseFetch";
import { AUTH_ENDPOINT } from "../endpoint";
import type { ResponseData, ResponseLogin, ResponseNull } from "@/utils/type";
import type { CredentialResponse } from "@react-oauth/google";

class AuthApi extends BaseApi {
  async register(data: RegisterInput): Promise<ResponseData<ResponseNull>> {
    const url = this.createUrl(AUTH_ENDPOINT.REGISTER);
    return this.postData<ResponseNull>(url, data);
  }
  async verifyCode(data: OtpInput): Promise<ResponseData<ResponseNull>> {
    const url = this.createUrl(AUTH_ENDPOINT.VERIFY_CODE);
    return this.postData<ResponseNull>(url, data);
  }
  async login(data: LoginInput): Promise<ResponseData<ResponseLogin>> {
    const url = this.createUrl(AUTH_ENDPOINT.LOGIN);
    return this.postData<ResponseLogin>(url, data);
  }
  async resetPassword(
    data: ResetPasswordInput
  ): Promise<ResponseData<ResponseNull>> {
    const url = this.createUrl(AUTH_ENDPOINT.RESET_PASSWORD);
    const body = { newPassword: data.newPassword, email: data.email };
    return this.postData<ResponseNull>(url, body);
  }
  async verifyResetPasswordCode(
    data: OtpInput
  ): Promise<ResponseData<ResponseNull>> {
    const url = this.createUrl(AUTH_ENDPOINT.VERIFY_FORGOT_PASSWORD);
    return this.postData<ResponseNull>(url, data);
  }
  async loginGoogle(
    credentialResponse: CredentialResponse
  ): Promise<ResponseData<ResponseLogin>> {
    const id_token = credentialResponse.credential;
    const url = this.createUrl(AUTH_ENDPOINT.LOGIN_GOOGLE);
    return this.postData<ResponseLogin>(url, { googleToken: id_token });
  }

  // --- THÊM MỚI ---
  // Backend dùng [HttpPut("change-profile/{id}")]
  async updateProfile(
    id: number,
    data: UpdateProfileInput
  ): Promise<ResponseData<ResponseNull>> {
    // Giả sử AUTH_ENDPOINT.CHANGE_PROFILE = "/Auth/change-profile"
    const url = this.createUrl(`${AUTH_ENDPOINT.CHANGE_PROFILE}/${id}`);
    return this.putData<ResponseNull>(url, data);
  }

  // Backend dùng [HttpPost("change-password")]
  async changePassword(
    data: Omit<ChangePasswordInput, "confirmNewPassword">
  ): Promise<ResponseData<ResponseNull>> {
    // Giả sử AUTH_ENDPOINT.CHANGE_PASSWORD = "/Auth/change-password"
    const url = this.createUrl(AUTH_ENDPOINT.CHANGE_PASSWORD);
    return this.postData<ResponseNull>(url, data);
  }
  // --- KẾT THÚC THÊM MỚI ---
}
export const authApi = new AuthApi();