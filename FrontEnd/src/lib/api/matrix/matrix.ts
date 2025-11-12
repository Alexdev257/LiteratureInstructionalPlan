
import type {  MatrixQuery, Matrix, ResponseData, PaginationResponse } from "@/utils/type";

import type { MatrixQuery, Matrix, ResponseData, PaginationResponse, ResponseNull } from "@/utils/type";

import { BaseApi } from "../baseFetch";
import { MATRIX_ENDPOINT,} from "../endpoint";
import type { MatrixInput } from "@/schema/matrixSchema";

class MatrixApi extends BaseApi {
    async getMatrices(params?: MatrixQuery): Promise<ResponseData<PaginationResponse<Matrix>>> {
        const url = this.createUrl(MATRIX_ENDPOINT.GET_MATRICES, params);
        return this.getData<PaginationResponse<Matrix>>(url);
    }

    async getMatrixById(id: number): Promise<ResponseData<Matrix>> {
        const url = this.createUrl(MATRIX_ENDPOINT.GET_MATRIX_BY_ID(id));
        return this.getData<Matrix>(url);
    }
    async createMatrix(data: MatrixInput): Promise<ResponseData<Matrix>> {
        const url = this.createUrl(MATRIX_ENDPOINT.CREATE_MATRIX);
        return this.postData<Matrix>(url, data);

    async deleteMatrix(id: number): Promise<ResponseData<ResponseNull>> {
        const url = this.createUrl(MATRIX_ENDPOINT.DELETE_MATRIX(id));
        return this.patchData<ResponseNull>(url, {});
    }
    async restoreMatrix(id: number): Promise<ResponseData<ResponseNull>> {
        const url = this.createUrl(MATRIX_ENDPOINT.RESTORE_MATRIX(id));
        return this.patchData<ResponseNull>(url, {});
    }
    async updateMatrix(id: number, data: MatrixInput): Promise<ResponseData<Matrix>> {
        const url = this.createUrl(MATRIX_ENDPOINT.UPDATE_MATRIX(id));
        return this.putData<Matrix>(url, data);
    }

}

export const matrixApi = new MatrixApi();