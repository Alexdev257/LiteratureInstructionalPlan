import type { BaseFilterPagination, ExamQuery, ExamTypeQuery, GradeLevelQuery, MatrixQuery, QuestionQuery } from "./type";

export const constDefault = {
    ENTITY_ERROR_STATUS: 422,
    AUTHENTICATION_ERROR_STATUS: 401,
    FORBIDDEN_ERROR_STATUS: 403,
    NOT_FOUND_ERROR_STATUS: 404,
    INTERNAL_SERVER_ERROR_STATUS: 500
};



export const QUERY_KEY = {
    examType: (param?: ExamTypeQuery) => ['examType', param],
    examTypeById: (id: number) => ['examTypeById', id],

    template: (param?: BaseFilterPagination) => ['template', param],
    templateById: (id: number) => ['templateById', id],


    gradeLevel: (param?: GradeLevelQuery) => ['gradeLevel', param],
    gradeLevelById: (id: number) => ['gradeLevelById', id],


    exam: (param?: ExamQuery) => ['exam', param],
    getExamById: (id: number) => ['examById', id],

    matrix : (param?: MatrixQuery) => ['matrix', param],
    getMatrixById: (id: number) => ['matrixById', id],

    getUserProfileById: (id: number) => ['userProfileById', id],

    question: (param?: QuestionQuery) => ['question', param],
    questionById: (id: number) => ['questionById', id],

    examAttempts: (param?: ExamQuery) => ['examAttempts', param],
    examAttemptById: (id: number) => ['examAttemptById', id],


} as const




