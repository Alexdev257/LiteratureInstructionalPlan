import type { GetUserById, ResponseData } from "@/utils/type";
import { BaseApi } from "../baseFetch";
import { USER_ENDPOINT } from "../endpoint";
import type { UpdateProfileFormInput } from "@/schema/userSchema";


class UserApi extends BaseApi {
    async getUserProfile(userId: number): Promise<ResponseData<GetUserById>> {
        const url = this.createUrl(USER_ENDPOINT.GET_USER_PROFILE(userId));
        return this.getData<GetUserById>(url);
    }
    async updateUserProfile(userId: number, data: UpdateProfileFormInput) {
        const url = this.createUrl(USER_ENDPOINT.UPDATE_USER_PROFILE(userId));
        return this.putData<UpdateProfileFormInput>(url, data);
    }
}
export const userApi = new UserApi();