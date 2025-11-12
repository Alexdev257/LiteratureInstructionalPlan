import type {
  AdminQuestion,
  CreateQuestionInput,
  QuestionFilters,
  ResponseData,
  ResponseNull,
} from "@/utils/type";
import { BaseApi } from "../baseFetch";
import { ADMIN_ENDPOINT } from "../endpoint";

class QuestionAdminApi extends BaseApi {
  // Lấy danh sách câu hỏi
  async getQuestions(
    params: QuestionFilters
  ): Promise<ResponseData<AdminQuestion[]>> {
    const url = this.createUrl(ADMIN_ENDPOINT.GET_QUESTIONS, params as Record<string, string | number>);
    // khi nào có api thì dùng lại
    // return this.getData<AdminQuestion[]>(url);
    
    // Tạm thời trả về Promise rỗng để tránh lỗi khi dùng mock data
    return Promise.resolve({ data: [], isSuccess: true, message: "Mock response" });
  }

  // Tạo câu hỏi
  async createQuestion(
    data: CreateQuestionInput
  ): Promise<ResponseData<ResponseNull>> {
    const url = this.createUrl(ADMIN_ENDPOINT.CREATE_QUESTION);
    // return this.postData<ResponseNull>(url, data);
    return Promise.resolve({
      data: { 
          data: null,
          isSuccess: true,
          message: "Mock data nested",
          listErrors: []
      },
      isSuccess: true,
      message: "Mock question created successfully"
    });
  }

  // Các hàm khác: updateQuestion, approveQuestion, rejectQuestion...
}

export const questionAdminApi = new QuestionAdminApi();