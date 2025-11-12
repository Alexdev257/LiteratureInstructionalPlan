import type {
  GetAllPracticeQuestionResponseDTO, 
  GetPracticequestionResponseDTO, 
  PracticeQuestionCreateResponseDTO, 
  PracticeQuestionUpdateResponseDTO, 
  PracticeQuestionDeleteResponseDTO, 
  PracticeQuestionRestoreResponseDTO, 
  GetAllPracticequestionQuery, 
  AdminCreateQuestionInput, // Giả định type này được tạo trong schema
  AdminUpdateQuestionInput, // Giả định type này được tạo trong schema
  ResponseData,
  PaginationResponse,
} from "@/utils/type";
import { BaseApi } from "../baseFetch";
import { ADMIN_ENDPOINT } from "../endpoint";

class QuestionAdminApi extends BaseApi {
  // Lấy danh sách câu hỏi (Read)
  async getQuestions(
    params: GetAllPracticequestionQuery
  ): Promise<ResponseData<PaginationResponse<GetAllPracticeQuestionResponseDTO>>> {
    const url = this.createUrl(ADMIN_ENDPOINT.GET_QUESTIONS, params as Record<string, string | number | boolean>);
    return this.getData<PaginationResponse<GetAllPracticeQuestionResponseDTO>>(url);
  }

  // Lấy 1 câu hỏi (Read)
  async getQuestionById(id: number): Promise<ResponseData<GetPracticequestionResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.GET_QUESTION_BY_ID(id));
    return this.getData<GetPracticequestionResponseDTO>(url);
  }

  // Tạo câu hỏi (Create)
  async createQuestion(
    data: AdminCreateQuestionInput
  ): Promise<ResponseData<PracticeQuestionCreateResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.CREATE_QUESTION);
    return this.postData<PracticeQuestionCreateResponseDTO>(url, data);
  }

  // Cập nhật câu hỏi (Update)
  async updateQuestion(
    data: AdminUpdateQuestionInput
  ): Promise<ResponseData<PracticeQuestionUpdateResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.UPDATE_QUESTION(data.questionId));
    return this.putData<PracticeQuestionUpdateResponseDTO>(url, data);
  }

  // Xóa câu hỏi (Delete)
  async deleteQuestion(id: number): Promise<ResponseData<PracticeQuestionDeleteResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.DELETE_QUESTION(id));
    return this.patchData<PracticeQuestionDeleteResponseDTO>(url, {}); 
  }

  // Khôi phục câu hỏi
  async restoreQuestion(id: number): Promise<ResponseData<PracticeQuestionRestoreResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.RESTORE_QUESTION(id));
    return this.patchData<PracticeQuestionRestoreResponseDTO>(url, {}); 
}
}
export const questionAdminApi = new QuestionAdminApi();