import type { TemplateInput } from "@/schema/templateSchema";
import { BaseApi } from "../baseFetch"
import { TEMPLATE_ENDPOINT } from "../endpoint";
import type { PaginationResponse, ResponseData, ResponseNull, Template, TemplateQuery } from "@/utils/type";

class TemplateApi extends BaseApi {
     async getTemplates(params?: TemplateQuery): Promise<ResponseData<PaginationResponse<Template>>> {
          const url = this.createUrl(TEMPLATE_ENDPOINT.GET_TEMPLATES, params);
          return this.getData<PaginationResponse<Template>>(url);
     }
     async createTemplate(data: TemplateInput): Promise<ResponseData<Template>> {
          const url = this.createUrl(TEMPLATE_ENDPOINT.GET_TEMPLATES);

          // Tạo FormData
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

          return this.postData<Template>(url, formData);
     }
     async updateTemplate(id: number, data: TemplateInput): Promise<ResponseData<Template>> {
          const url = this.createUrl(TEMPLATE_ENDPOINT.GET_TEMPLATE_BY_ID(id));

          const formData = new FormData();
          formData.append("Title", data.title);
          formData.append("GradeLevelId", data.gradeLevelId?.toString() || "");
          formData.append("Price", data.price?.toString() || "");
          if (data.createdById) {
               formData.append("CreatedById", data.createdById.toString());
          }
          if (data.file?.length) {
               formData.append("File", data.file[0]);
          }

          return this.putData<Template>(url, formData);
     }


     async deleteTemplate(id: number): Promise<ResponseData<ResponseNull>> {
          const url = this.createUrl(TEMPLATE_ENDPOINT.DELETE_TEMPLATE(id));
          return this.patchData<ResponseNull>(url, {});
     }
     async getTemplateById(id: number): Promise<ResponseData<Template>> {
          const url = this.createUrl(TEMPLATE_ENDPOINT.GET_TEMPLATE_BY_ID(id));
          return this.getData<Template>(url);
     }
     async restoreTemplate(id: number): Promise<ResponseData<ResponseNull>> {
          const url = this.createUrl(TEMPLATE_ENDPOINT.RESTORE_TEMPLATE(id));
          return this.patchData<ResponseNull>(url, {});
     }
}

export const templateApi = new TemplateApi();