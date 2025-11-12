import type { GradeLevelQuery, ResponseData, PaginationResponse, GradeLevel } from "@/utils/type";
import { BaseApi } from "../baseFetch";
import { GRADE_LEVEL_ENDPOINT } from "../endpoint";



class GradeLevelApi extends BaseApi {
    async getGradeLevels(params?: GradeLevelQuery): Promise<ResponseData<PaginationResponse<GradeLevel>>> {
        const url = this.createUrl(GRADE_LEVEL_ENDPOINT.GET_GRADE_LEVELS, params);
        return this.getData<PaginationResponse<GradeLevel>>(url);
    }
    async getGradeLevelById(id: number): Promise<ResponseData<GradeLevel>> {
        const url = this.createUrl(GRADE_LEVEL_ENDPOINT.GET_GRADE_LEVEL_BY_ID(id));
        return this.getData<GradeLevel>(url);
    }
}
export const gradeLevelApi = new GradeLevelApi();