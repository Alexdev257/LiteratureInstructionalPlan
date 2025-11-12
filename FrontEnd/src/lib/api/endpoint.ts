export const AUTH_ENDPOINT = {
  REGISTER: "Auth/register",
  LOGIN: "Auth/login",
  VERIFY_CODE: "Auth/verify-otp",
  RESET_PASSWORD: "Auth/forgot-password",
  VERIFY_FORGOT_PASSWORD: "Auth/verify-forgot-password",
  REFRESH_TOKEN: "Auth/refresh-token",
  CHANGE_PASSWORD: "Auth/change-password",
  LOGIN_GOOGLE: "Auth/login-google",
  CHANGE_PROFILE: "Auth/change-profile", //
};

export const PUBLIC_ENDPOINT = {
  LOGIN: "Auth/login",
  LOGIN_GOOGLE: "Auth/login-google",
};

export const ADMIN_ENDPOINT = {

  GET_USERS: "admin/users",
  CREATE_ADMIN: "admin/create-teacher",
  GET_QUESTIONS: "admin/questions",
  CREATE_QUESTION: "admin/questions",
};

export const TEMPLATE_ENDPOINT = {
  GET_TEMPLATES: "Template",
  GET_TEMPLATE_BY_ID: (id: number) => `Template/${id}`,
  RESTORE_TEMPLATE: (id: number) => `Template/restore/${id}`,
  DELETE_TEMPLATE: (id: number) => `Template/delete/${id}`,
};
  // User
  GET_USERS: "User/get-all", 
  GET_USER_BY_ID: (id: number) => `User/get/${id}`, 
  CREATE_USER: "User/create-user", 
  UPDATE_USER: (id: number) => `User/update-user/${id}`, 
  DELETE_USER: (id: number) => `User/delete-user/${id}`, 
  RESTORE_USER: (id: number) => `User/restore-user/${id}`, 
  // Question (PracticeQuestion)
  GET_QUESTIONS: "PracticeQuestion/get-all", 
  GET_QUESTION_BY_ID: (id: number) => `PracticeQuestion/get/${id}`, 
  CREATE_QUESTION: "PracticeQuestion/create-question", 
  UPDATE_QUESTION: (id: number) => `PracticeQuestion/update-question/${id}`, 
  DELETE_QUESTION: (id: number) => `PracticeQuestion/delete-question/${id}`, 
  RESTORE_QUESTION: (id: number) => `PracticeQuestion/restore-question/${id}`, 

  // Exam
  GET_EXAMS: "Exam/get-all", 
  GET_EXAM_BY_ID: (id: number) => `Exam/get/${id}`, 
  CREATE_EXAM: "Exam/create-exam-manual", 
  UPDATE_EXAM: (id: number) => `Exam/update-exam/${id}`, 
  DELETE_EXAM: (id: number) => `Exam/delete-exam/${id}`, 
  RESTORE_EXAM: (id: number) => `Exam/restore-exam/${id}`, 

  // Matrix
  GET_MATRICES: "ExamMatrix/get-all", 
  GET_MATRIX_BY_ID: (id: number) => `ExamMatrix/get/${id}`, 
  CREATE_MATRIX: "ExamMatrix/create-matrix",
  UPDATE_MATRIX: (id: number) => `ExamMatrix/update-matrix/${id}`,
  DELETE_MATRIX: (id: number) => `ExamMatrix/delete-matrix/${id}`, 
  RESTORE_MATRIX: (id: number) => `ExamMatrix/restore-matrix/${id}`,
  
  // Template
  GET_TEMPLATES: "Template", 
  GET_TEMPLATE_BY_ID: (id: number) => `Template/${id}`, 
  CREATE_TEMPLATE: "Template", 
  // UPDATE_TEMPLATE: (id: number) => `Template/${id}`, // Backend thiếu
  DELETE_TEMPLATE: (id: number) => `Template/${id}`, 

  // Payment
  GET_PAYMENTS: "Payment", 
  GET_PAYMENT_BY_ID: (id: number) => `Payment/${id}`,
};

export const TEMPLATE_ENDPOINT = {
    GET_TEMPLATES: "Template",
    GET_TEMPLATE_BY_ID: (id: number) => `Template/${id}`,
}

export const EXAM_TYPE_ENDPOINT = {
  GET_EXAM_TYPES: "ExamType/get-all",
  GET_EXAM_TYPE_BY_ID: (id: number) => `ExamType/get/${id}`,
};

export const GRADE_LEVEL_ENDPOINT = {
  GET_GRADE_LEVELS: "GradeLevel/get-all",
  GET_GRADE_LEVEL_BY_ID: (id: number) => `GradeLevel/get/${id}`,
};

export const EXAM_ENDPOINT = {

  GET_EXAMS: "Exam/get-all",
  GET_EXAM_BY_ID: (id: number) => `Exam/get/${id}`,
  CREATE_EXAM: "Exam/create-exam-manual",
  UPDATE_EXAM: (id: number) => `Exam/update-exam/${id}`,
  DELETE_EXAM: (id: number) => `Exam/delete-exam/${id}`,
  RESTORE_EXAM: (id: number) => `Exam/restore-exam/${id}`,

  START_EXAM: "ExamInteraction/start-exam",
  SUBMIT_EXAM: "ExamInteraction/submit-exam",
  SUBMIT_FINAL_EXAM: "ExamInteraction/last-submit-exam",
};

export const MATRIX_ENDPOINT = {
  GET_MATRICES: "ExamMatrix/get-all",
  GET_MATRIX_BY_ID: (id: number) => `ExamMatrix/get/${id}`,
  CREATE_MATRIX: "ExamMatrix/create-matrix",
  DELETE_MATRIX: (id: number) => `ExamMatrix/delete-matrix/${id}`,
  UPDATE_MATRIX: (id: number) => `ExamMatrix/update-matrix/${id}`,
  RESTORE_MATRIX: (id: number) => `ExamMatrix/restore-matrix/${id}`,
};
    GET_EXAMS: "Exam/get-all",
    GET_EXAM_BY_ID: (id: number) => `Exam/get/${id}`
}

export const MATRIX_ENDPOINT = {
    GET_MATRICES: "ExamMatrix/get-all",
    GET_MATRIX_BY_ID: (id: number) => `ExamMatrix/get/${id}`,
    CREATE_MATRIX: "ExamMatrix/create-matrix",
}


export const USER_ENDPOINT = {
  GET_USER_PROFILE: (id: number) => `User/get/${id}`,
  UPDATE_USER_PROFILE: (id: number) => `User/update-user/${id}`,
};


export const QUESTION_ENDPOINT = {
  GET_QUESTIONS: "PracticeQuestion/get-all",
  GET_QUESTION_BY_ID: (id: number) => `PracticeQuestion/get/${id}`,
  CREATE_QUESTION: "PracticeQuestion/create-question",
  UPDATE_QUESTION: (id: number) => `PracticeQuestion/update-question/${id}`,
  DELETE_QUESTION: (id: number) => `PracticeQuestion/delete-question/${id}`,
  RESTORE_QUESTION: (id: number) => `PracticeQuestion/restore-question/${id}`,
};

export const EXAM_ATTEMPT_ENDPOINT = {
  GET_EXAM_ATTEMPTS: "ExamAttempt/get-all",
  GET_EXAM_ATTEMPT_BY_ID: (id: number) => `ExamAttempt/get/${id}`,
export const PAYMENT_ENDPOINT = {
  GET_PAYMENTS: "Payment", // 
  GET_PAYMENT_BY_ID: (id: number) => `Payment/${id}`, 
};