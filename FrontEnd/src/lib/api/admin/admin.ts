// import type {
//   AdminUser,
//   CreateAdminInput,
//   ResponseData,
//   ResponseNull,
//   UserFilters,
// } from "@/utils/type";
// import { BaseApi } from "../baseFetch"; 
// import { ADMIN_ENDPOINT } from "../endpoint";

// class AdminApi extends BaseApi {
//   // Lấy danh sách người dùng với filter
//   async getUsers(
//     params: UserFilters
//   ): Promise<ResponseData<AdminUser[]>> {
//     // Ép kiểu params thành Record<string, string | number> để phù hợp với createUrl
//     const url = this.createUrl(ADMIN_ENDPOINT.GET_USERS, params as Record<string, string | number>);
//     return this.getData<AdminUser[]>(url); 
//   }

//   // Tạo tài khoản (Giáo viên/Admin)
//   async createAdmin(
//     data: CreateAdminInput
//   ): Promise<ResponseData<ResponseNull>> {
//     const url = this.createUrl(ADMIN_ENDPOINT.CREATE_ADMIN);
//     return this.postData<ResponseNull>(url, data); 
//   }
// }

// export const adminApi = new AdminApi();
