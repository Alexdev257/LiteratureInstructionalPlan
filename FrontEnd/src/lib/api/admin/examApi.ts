import type {
  GetAllExamResponseDTO,
  GetExamResponseDTO,
  ExamCreateManualFromMatrixResponseDTO,
  ExamUpdateFromMatrixResponseDTO,
  ExamDeleteResponseDTO,
  ExamRestoreResponseDTO,
  GetAllExamQuery,
  AdminCreateExamInput,
  AdminUpdateExamInput,
  ResponseData,
  PaginationResponse,
} from "@/utils/type";
import { BaseApi } from "../baseFetch";
import { ADMIN_ENDPOINT } from "../endpoint";

class ExamAdminApi extends BaseApi {
  // Lấy danh sách đề thi (Read)
  async getExams(
    params: GetAllExamQuery
  ): Promise<ResponseData<PaginationResponse<GetAllExamResponseDTO>>> {
    const url = this.createUrl(ADMIN_ENDPOINT.GET_EXAMS, params as Record<string, string | number | boolean>);
    return this.getData<PaginationResponse<GetAllExamResponseDTO>>(url);
  }

  // Lấy 1 đề thi (Read)
  async getExamById(id: number): Promise<ResponseData<GetExamResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.GET_EXAM_BY_ID(id));
    return this.getData<GetExamResponseDTO>(url);
  }

  // Tạo đề thi (Create)
  async createExam(
    data: AdminCreateExamInput
  ): Promise<ResponseData<ExamCreateManualFromMatrixResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.CREATE_EXAM);
    // Map DTO của FE sang DTO của BE
    const apiData = { ...data, createdByUserId: data.createdByNavigationUserId };
    return this.postData<ExamCreateManualFromMatrixResponseDTO>(url, apiData);
  }

  // Cập nhật đề thi (Update)
  async updateExam(
    data: AdminUpdateExamInput
  ): Promise<ResponseData<ExamUpdateFromMatrixResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.UPDATE_EXAM(data.examId));
    // Map DTO của FE sang DTO của BE
    const apiData = { ...data, createdByUserId: data.createdByNavigationUserId };
    return this.putData<ExamUpdateFromMatrixResponseDTO>(url, apiData);
  }

  // Xóa đề thi (Delete)
  async deleteExam(id: number): Promise<ResponseData<ExamDeleteResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.DELETE_EXAM(id));
    return this.patchData<ExamDeleteResponseDTO>(url, {});
  }

  // Khôi phục đề thi
  async restoreExam(id: number): Promise<ResponseData<ExamRestoreResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.RESTORE_EXAM(id));
    return this.patchData<ExamRestoreResponseDTO>(url, {});
  }
}

export const examAdminApi = new ExamAdminApi();