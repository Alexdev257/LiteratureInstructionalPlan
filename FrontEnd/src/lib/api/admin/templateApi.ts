import type {
  GetAllTemplateQuery,
  TemplateGetDTO,
  TemplateCreateResponseDTO,
  TemplateDeleteResponseDTO,
  TemplateRestoreResponseDTO, // Type giả định
  ResponseData,
  PaginationResponse,
} from "@/utils/type";
import type { TemplateInput } from "@/schema/templateSchema"; // Import từ schema
import { BaseApi } from "../baseFetch";
import { TEMPLATE_ENDPOINT, ADMIN_ENDPOINT } from "../endpoint";

// Giả định type cho Update (vì BE thiếu)
type TemplateUpdateResponseDTO = TemplateGetDTO;

class TemplateAdminApi extends BaseApi {
  // Lấy danh sách (Read)
  async getTemplates(
    params: GetAllTemplateQuery
  ): Promise<ResponseData<PaginationResponse<TemplateGetDTO>>> {
    const url = this.createUrl(TEMPLATE_ENDPOINT.GET_TEMPLATES, params as Record<string, string | number | boolean>);
    return this.getData<PaginationResponse<TemplateGetDTO>>(url); 
  }

  // Lấy 1 (Read)
  async getTemplateById(id: number): Promise<ResponseData<TemplateGetDTO>> {
    const url = this.createUrl(TEMPLATE_ENDPOINT.GET_TEMPLATE_BY_ID(id));
    return this.getData<TemplateGetDTO>(url); 
  }

  // Tạo (Create)
  async createTemplate(data: TemplateInput): Promise<ResponseData<TemplateCreateResponseDTO>> {
    const url = this.createUrl(TEMPLATE_ENDPOINT.GET_TEMPLATES);
    
    const formData = new FormData();
    formData.append('Title', data.title);
    formData.append('GradeLevelId', data.gradeLevelId?.toString() || '');
    formData.append('Price', data.price?.toString() || '');
    if (data.createdById) {
      formData.append('CreatedById', data.createdById.toString());
    }
    if (data.file && data.file.length > 0) {
      formData.append('File', data.file[0]);
    }

    return this.postData<TemplateCreateResponseDTO>(url, formData); 
  }

  // Xóa (Delete)
  async deleteTemplate(id: number): Promise<ResponseData<TemplateDeleteResponseDTO>> {
    const url = this.createUrl(TEMPLATE_ENDPOINT.GET_TEMPLATE_BY_ID(id));
    return this.deleteData<TemplateDeleteResponseDTO>(url); 
  }
  
  // --- Giả định các API Admin còn thiếu ---

  // Cập nhật (Update)
  async updateTemplate(id: number, data: FormData): Promise<ResponseData<TemplateUpdateResponseDTO>> {
    // const url = this.createUrl(ADMIN_ENDPOINT.UPDATE_TEMPLATE(id)); 
    // return this.putData<TemplateUpdateResponseDTO>(url, data);
    console.warn("API for UpdateTemplate is missing.");
    return Promise.resolve({ data: {} as TemplateGetDTO, isSuccess: true, message: "Mock Update" });
  }

  // Khôi phục (Restore)
  async restoreTemplate(id: number): Promise<ResponseData<TemplateRestoreResponseDTO>> {
    // const url = this.createUrl(ADMIN_ENDPOINT.RESTORE_TEMPLATE(id)); 
    // return this.patchData<TemplateRestoreResponseDTO>(url, {});
    console.warn("API for RestoreTemplate is missing.");
    return Promise.resolve({ data: {}, isSuccess: true, message: "Mock Restore" });
  }
}

export const templateAdminApi = new TemplateAdminApi();