import type { TemplateInput } from "@/schema/templateSchema";
import { BaseApi } from "../baseFetch"
import { TEMPLATE_ENDPOINT } from "../endpoint";
import type { ResponseData, Template, PaginationResponse, TemplateQuery } from "@/utils/type";

class TemplateApi extends BaseApi  {
     // SỬA Ở ĐÂY: Bỏ dấu [] sau Template
     async getTemplates(params?: TemplateQuery): Promise<ResponseData<PaginationResponse<Template>>> {
          const url = this.createUrl(TEMPLATE_ENDPOINT.GET_TEMPLATES, params as Record<string, string | number>);
          // SỬA Ở ĐÂY: Bỏ dấu [] sau Template
          return this.getData<PaginationResponse<Template>>(url);
     }

     async createTemplate(data: TemplateInput) : Promise<ResponseData<Template>> {
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
     async deleteTemplate(id:number) : Promise<ResponseData<null>> {
          const url = this.createUrl(TEMPLATE_ENDPOINT.GET_TEMPLATE_BY_ID(id));
          return this.deleteData<null>(url);
     }
}

export const templateApi = new TemplateApi();