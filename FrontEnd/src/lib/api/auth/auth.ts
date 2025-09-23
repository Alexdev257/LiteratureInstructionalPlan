import type {  LoginInput, OtpInput, RegisterInput, ResetPasswordInput } from "@/schema/authSchema";
import { BaseApi } from "../baseFetch";
import { AUTH_ENDPOINT } from "../endpoint";
import type { ResponseData, ResponseLogin, ResponseNull } from "@/utils/type";
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
    async resetPassword(data: ResetPasswordInput): Promise<ResponseData<ResponseNull>> {
        const url = this.createUrl(AUTH_ENDPOINT.RESET_PASSWORD);
        const body = { newPassword: data.newPassword, email: data.email };
        return this.postData<ResponseNull>(url, body);
    }
    async verifyResetPasswordCode(data: OtpInput): Promise<ResponseData<ResponseNull>> {
        const url = this.createUrl(AUTH_ENDPOINT.VERIFY_FORGOT_PASSWORD);
        return this.postData<ResponseNull>(url, data);
    }
}
export const authApi = new AuthApi();
