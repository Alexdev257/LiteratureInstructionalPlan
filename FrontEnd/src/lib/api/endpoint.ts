

export const AUTH_ENDPOINT = {
    REGISTER: "Auth/register",
    LOGIN: "Auth/login",
    VERIFY_CODE: "Auth/verify-otp",
    RESET_PASSWORD: "Auth/forgot-password",
    VERIFY_FORGOT_PASSWORD: "Auth/verify-forgot-password",
    REFRESH_TOKEN: "Auth/refresh-token",
    CHANGE_PASSWORD: "Auth/change-password",
    LOGIN_GOOGLE: "Auth/login-google"
};


export const PUBLIC_ENDPOINT = {
    LOGIN: "Auth/login",
    LOGIN_GOOGLE: "Auth/login-google"
}

export const ADMIN_ENDPOINT = {
  GET_USERS: "admin/users",
  CREATE_ADMIN: "admin/create-teacher",
  GET_QUESTIONS: "admin/questions",
  CREATE_QUESTION: "admin/questions"
};

export const TEMPLATE_ENDPOINT = {
    GET_TEMPLATES: "Template",
    GET_TEMPLATE_BY_ID: (id: number) => `Template/${id}`,
}

export const EXAM_TYPE_ENDPOINT = {
    GET_EXAM_TYPES: "ExamType/get-all",
    GET_EXAM_TYPE_BY_ID: (id: number) => `ExamType/get/${id}`
}

export const GRADE_LEVEL_ENDPOINT = {
    GET_GRADE_LEVELS: "GradeLevel/get-all",
    GET_GRADE_LEVEL_BY_ID: (id: number) => `GradeLevel/get/${id}`
}

export const EXAM_ENDPOINT = {
    GET_EXAMS: "Exam/get-all",
    GET_EXAM_BY_ID: (id: number) => `Exam/get/${id}`
}

export const MATRIX_ENDPOINT = {
    GET_MATRICES: "ExamMatrix/get-all",
    GET_MATRIX_BY_ID: (id: number) => `ExamMatrix/get/${id}`,
    CREATE_MATRIX: "ExamMatrix/create-matrix",
    DELETE_MATRIX: (id: number) => `ExamMatrix/delete-matrix/${id}`,
    UPDATE_MATRIX: (id: number) => `ExamMatrix/update-matrix/${id}`,
    RESTORE_MATRIX: (id: number) => `ExamMatrix/restore-matrix/${id}`,
}

export const USER_ENDPOINT = {
    GET_USER_PROFILE: (id: number) => `User/get/${id}`,
    UPDATE_USER_PROFILE: (id: number) => `User/update-user/${id}`,
}