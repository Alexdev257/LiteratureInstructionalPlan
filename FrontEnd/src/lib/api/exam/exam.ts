import type { ExamAttempt, ExamAttemptQuery, ExamData, ExamQuery, PaginationResponse, ResponseData, ResponseNull } from "@/utils/type";
import { BaseApi } from "../baseFetch";
import { EXAM_ATTEMPT_ENDPOINT, EXAM_ENDPOINT } from "../endpoint";
import type { CreateExamInput, SubmitAttemptInput, UpdateExamInput } from "@/schema/examSchema";



class ExamAPI extends BaseApi {
    async getExam(param?: ExamQuery): Promise<ResponseData<PaginationResponse<ExamData>>> {
        const url = this.createUrl(EXAM_ENDPOINT.GET_EXAMS, param);
        return this.getData<PaginationResponse<ExamData>>(url);
    }
    async getExamById(id: number, params?: ExamQuery): Promise<ResponseData<ExamData>> {
        const url = this.createUrl(EXAM_ENDPOINT.GET_EXAM_BY_ID(id), params);
        return this.getData<ExamData>(url);
    }
    async createExam(data: CreateExamInput): Promise<ResponseData<ExamData>> {
        const url = this.createUrl(EXAM_ENDPOINT.CREATE_EXAM);
        return this.postData<ExamData>(url, data);
    }
    async updateExam(id: number, data: UpdateExamInput): Promise<ResponseData<ExamData>> {
        const url = this.createUrl(EXAM_ENDPOINT.UPDATE_EXAM(id));
        return this.putData<ExamData>(url, data);
    }
    async deleteExam(id: number): Promise<ResponseData<ResponseNull>> {
        const url = this.createUrl(EXAM_ENDPOINT.DELETE_EXAM(id));
        return this.patchData<ResponseNull>(url, {});
    }
    async restoreExam(id: number): Promise<ResponseData<ResponseNull>> {
        const url = this.createUrl(EXAM_ENDPOINT.RESTORE_EXAM(id));
        return this.patchData<ResponseNull>(url, {});
    }

    async startExam(data: { ExamId: number; UserId: number }): Promise<ResponseData<{ attemptId: number }>> {
        const url = this.createUrl(EXAM_ENDPOINT.START_EXAM, data);
        return this.postData<{ attemptId: number }>(url, {});
    }
    async submitAttempt(data: SubmitAttemptInput): Promise<ResponseData<ResponseNull>> {
        const url = this.createUrl(EXAM_ENDPOINT.SUBMIT_EXAM); 
        return this.postData<ResponseNull>(url, data);
    }
    
    async submitFinalAttempt(data: SubmitAttemptInput): Promise<ResponseData<{score:number,feedbacks:string}>> {
        const url = this.createUrl(EXAM_ENDPOINT.SUBMIT_FINAL_EXAM);
        return this.postData<{score:number,feedbacks:string}>(url, data);
    }
    

    async getExamAttempts(param?: ExamAttemptQuery): Promise<ResponseData<PaginationResponse<ExamAttempt>>> {
        const url = this.createUrl(EXAM_ATTEMPT_ENDPOINT.GET_EXAM_ATTEMPTS, param);
        return this.getData<PaginationResponse<ExamAttempt>>(url);
    }
    async getExamAttemptById(id: number): Promise<ResponseData<ExamAttempt>> {
        const url = this.createUrl(EXAM_ATTEMPT_ENDPOINT.GET_EXAM_ATTEMPT_BY_ID(id));
        return this.getData<ExamAttempt>(url);
    }


    // async submitFinalExam (data: SubmitFinalExamInput) : Promise<ResponseData<ResponseNull>> {
    //     const url = this.createUrl(EXAM_ENDPOINT.SUBMIT_FINAL_EXAM);
    //     return this.postData<ResponseNull>(url, data);
    // }
}

export const examApi = new ExamAPI();