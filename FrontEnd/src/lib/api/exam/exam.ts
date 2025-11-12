import type { ExamData, ExamQuery, PaginationResponse, ResponseData } from "@/utils/type";
import { BaseApi } from "../baseFetch";
import { EXAM_ENDPOINT } from "../endpoint";



class ExamAPI  extends BaseApi {
    async getExam (param?:ExamQuery) : Promise<ResponseData<PaginationResponse<ExamData>>> {
        const url = this.createUrl(EXAM_ENDPOINT.GET_EXAMS, param);
        return this.getData<PaginationResponse<ExamData>>(url);
    }
    async getExamById (id:number) : Promise<ResponseData<ExamData>> {
        const url = this.createUrl(EXAM_ENDPOINT.GET_EXAM_BY_ID(id));
        return this.getData<ExamData>(url);
    }
}

export const examApi = new ExamAPI();