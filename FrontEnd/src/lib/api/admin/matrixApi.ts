import type {
  GetAllMatrixQuery,
  ExamMatrixGetAllResponseDTO,
  GetExamMatrixResponseDTO,
  ExamMatrixCreateResponseDTO,
  ExamMatrixUpdateResponseDTO,
  ExamMatrixDeleteResponseDTO,
  ExamMatrixRestoreResponseDTO,
  ResponseData,
  PaginationResponse
} from "@/utils/type";
import { BaseApi } from "../baseFetch";
// Import cả 2 endpoint
import { MATRIX_ENDPOINT, ADMIN_ENDPOINT } from "../endpoint"; 
import type { MatrixInput } from "@/schema/matrixSchema";

class MatrixAdminApi extends BaseApi {
  // Lấy danh sách (Get All)
  async getMatrices(params: GetAllMatrixQuery): Promise<ResponseData<PaginationResponse<ExamMatrixGetAllResponseDTO>>> {
    const url = this.createUrl(MATRIX_ENDPOINT.GET_MATRICES, params as Record<string, string | number | boolean>);
    return this.getData<PaginationResponse<ExamMatrixGetAllResponseDTO>>(url);
  }

  // Lấy 1 (Get By Id)
  async getMatrixById(id: number): Promise<ResponseData<GetExamMatrixResponseDTO>> {
    const url = this.createUrl(MATRIX_ENDPOINT.GET_MATRIX_BY_ID(id));
    return this.getData<GetExamMatrixResponseDTO>(url);
  }

  // Tạo (Create)
  async createMatrix(data: MatrixInput): Promise<ResponseData<ExamMatrixCreateResponseDTO>> {
    const url = this.createUrl(MATRIX_ENDPOINT.CREATE_MATRIX);
    return this.postData<ExamMatrixCreateResponseDTO>(url, data);
  }

  // Cập nhật (Update)
  async updateMatrix(id: number, data: MatrixInput): Promise<ResponseData<ExamMatrixUpdateResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.UPDATE_MATRIX(id)); // [cite: 10879-10904]
    return this.putData<ExamMatrixUpdateResponseDTO>(url, data);
  }

  // Xóa (Delete)
  async deleteMatrix(id: number): Promise<ResponseData<ExamMatrixDeleteResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.DELETE_MATRIX(id)); // [cite: 10905-10914]
    return this.patchData<ExamMatrixDeleteResponseDTO>(url, {});
  }

  // Khôi phục (Restore)
  async restoreMatrix(id: number): Promise<ResponseData<ExamMatrixRestoreResponseDTO>> {
    const url = this.createUrl(ADMIN_ENDPOINT.RESTORE_MATRIX(id)); // [cite: 10915-10924]
    return this.patchData<ExamMatrixRestoreResponseDTO>(url, {});
  }
}
export const matrixAdminApi = new MatrixAdminApi();