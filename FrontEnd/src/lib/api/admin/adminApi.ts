import type {
  GetAllUserResponseDTO,
  GetAllUserQuery, // Sửa từ UserFilters sang GetAllUserQuery
  AdminUserCreateInput,
  AdminUserUpdateInput,
  ResponseData,
  PaginationResponse,
  GetUserResponseDTO,    
  UserCreateResponseDTO, 
  UserUpdateResponseDTO, 
  UserDeleteResponseDTO, 
  UserRestoreResponseDTO,
} from "@/utils/type";
import { BaseApi } from "../baseFetch";
import { ADMIN_ENDPOINT } from "../endpoint";

class AdminApi extends BaseApi {
  // Lấy danh sách người dùng (Read)
  async getUsers(params: GetAllUserQuery): Promise<ResponseData<PaginationResponse<GetAllUserResponseDTO>>> { // Sửa ở đây
    const url = this.createUrl(ADMIN_ENDPOINT.GET_USERS, params as Record<string, string | number | boolean>);
    return this.getData<PaginationResponse<GetAllUserResponseDTO>>(url);
  }
  
  // Lấy 1 người dùng (Read)
  async getUserById(id: number): Promise<ResponseData<GetUserResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.GET_USER_BY_ID(id));
    return this.getData<GetUserResponseDTO>(url);
  }

  // Tạo người dùng (Create)
  async createUser(data: AdminUserCreateInput): Promise<ResponseData<UserCreateResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.CREATE_USER);
    return this.postData<UserCreateResponseDTO>(url, data);
  }

  // Cập nhật người dùng (Update)
  async updateUser(data: AdminUserUpdateInput): Promise<ResponseData<UserUpdateResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.UPDATE_USER(data.userId));
    return this.putData<UserUpdateResponseDTO>(url, data);
  }

  // Xóa người dùng (Delete)
  async deleteUser(id: number): Promise<ResponseData<UserDeleteResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.DELETE_USER(id));
    return this.patchData<UserDeleteResponseDTO>(url, {});
  }
  
  // Khôi phục người dùng
  async restoreUser(id: number): Promise<ResponseData<UserRestoreResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.RESTORE_USER(id));
    return this.patchData<UserRestoreResponseDTO>(url, {});
  }
}

export const adminApi = new AdminApi();