import type { LoginInput, OtpInput, RegisterInput } from "@/schema/authSchema"; 
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
}
export const authApi = new AuthApi();
 