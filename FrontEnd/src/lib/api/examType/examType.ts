import type { ExamType, ExamTypeQuery, PaginationResponse, ResponseData } from "@/utils/type";
import { BaseApi } from "../baseFetch";
import { EXAM_TYPE_ENDPOINT } from "../endpoint";


class ExamTypeApi extends BaseApi {
   async getExamTypes(params?: ExamTypeQuery): Promise<ResponseData<PaginationResponse<ExamType>>> {
      const url = this.createUrl(EXAM_TYPE_ENDPOINT.GET_EXAM_TYPES, params);
      return this.getData<PaginationResponse<ExamType>>(url);
   }
   async getExamTypeById(id: number): Promise<ResponseData<ExamType>> {
      const url = this.createUrl(EXAM_TYPE_ENDPOINT.GET_EXAM_TYPE_BY_ID(id));
      return this.getData<ExamType>(url);
   }
}

export const examTypeApi = new ExamTypeApi();