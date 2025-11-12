import type { PaginationResponse, Question, QuestionQuery, ResponseData, ResponseNull } from "@/utils/type";
import { BaseApi } from "../baseFetch";
import { QUESTION_ENDPOINT } from "../endpoint";
import type { QuestionInput } from "@/schema/questionSchema";



class QuestionAPI  extends BaseApi {
      async getQuestions(params: QuestionQuery) :Promise<ResponseData<PaginationResponse<Question>>> {
        const url = this.createUrl(QUESTION_ENDPOINT.GET_QUESTIONS, params);  
        return this.getData<PaginationResponse<Question>>(url);
      }
      async getQuestionById(id: number,params: QuestionQuery) :Promise<ResponseData<Question>> {
        const url = this.createUrl(QUESTION_ENDPOINT.GET_QUESTION_BY_ID(id) , params);
        return this.getData<Question>(url);
      }
      async createQuestion(data:QuestionInput ) :Promise<ResponseData<Question>> {
        const url = this.createUrl(QUESTION_ENDPOINT.CREATE_QUESTION);
        return this.postData<Question>(url, data);
      }
      async updateQuestion(id: number, data:QuestionInput ) :Promise<ResponseData<Question>> {
        const url = this.createUrl(QUESTION_ENDPOINT.UPDATE_QUESTION(id));
        return this.putData<Question>(url, data);
      }
      async deleteQuestion(id: number) :Promise<ResponseData<ResponseNull>> {
        const url = this.createUrl(QUESTION_ENDPOINT.DELETE_QUESTION(id));
        return this.patchData<ResponseNull>(url,{});
      }
      async restoreQuestion(id: number) :Promise<ResponseData<ResponseNull>> {
        const url = this.createUrl(QUESTION_ENDPOINT.RESTORE_QUESTION(id));
        return this.patchData<ResponseNull>(url,{});
      }
}

export const questionAPI = new QuestionAPI();