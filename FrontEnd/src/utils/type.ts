// --- File: src/utils/type.ts ---
import { z } from "zod";

// ===================================
// ===== API RESPONSE TYPES (Chung) =====
// ===================================

export type ResponseLogin = {
  accessToken: string;
  refreshToken: string;
};

export type ResponseNull = {
  data: null;
  isSuccess: boolean;
  message: string;
  listErrors: ApiError[];
};

export type ResponseData<T> = {
  data: T;
  isSuccess: boolean;
  message: string;
  listErrors?: ApiError[];
};

type ApiError = {
  field: string;
  detail: string;
};

export type ErrorEntity = {
  data: null;
  listErrors: ApiError[];
  isSuccess: boolean;
  message: string;
};

export type PaginationResponse<T> = {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

// ===================================
// ===== ENTITY & DTO TYPES (Từ BE) =====
// ===================================

// --- User & Auth ---
export type User = {
  Email: string;
  FullName: string;
  RoleId: number;
  UserId: string;
  Username: string;
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
};

export type GetUserById = {
  userId: number;
  userName: string;
  fullName: string;
  email: string;
  roleId: number;
  createdAt: string;
  isDeleted: boolean;
  deletedAt: string;
};

export type BodyRefreshToken = {
  id: number;
  accessToken: string;
  refreshToken: string;
};

export type GetAllUserResponseDTO = {
  userId: number;
  userName: string;
  fullName: string;
  email: string;
  roleId: number | null;
  createdAt: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
};

export type GetUserResponseDTO = {
  userId: number;
  userName: string;
  fullName: string;
  email: string;
  roleId: number | null;
  createdAt: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
};

export type GetUserResponse = ResponseData<GetUserResponseDTO>;

export type UserCreateResponseDTO = {
  userId: number;
  userName: string;
  fullName: string;
  email: string;
  roleId: number | null;
  createdAt: string | null;
};
export type UserCreateResponse = ResponseData<UserCreateResponseDTO>;

export type UserUpdateResponseDTO = {
  userId: number;
  userName: string;
  fullName: string;
  email: string;
  roleId: number | null;
  createdAt: string | null;
};
export type UserUpdateResponse = ResponseData<UserUpdateResponseDTO>;

export type UserDeleteResponseDTO = Record<string, never>; // Kiểu {} (đối tượng rỗng)
export type UserDeleteResponse = ResponseData<UserDeleteResponseDTO>;

export type UserRestoreResponseDTO = Record<string, never>; // Kiểu {} (đối tượng rỗng)
export type UserRestoreResponse = ResponseData<UserRestoreResponseDTO>;


// --- General Entities ---
export type GradeLevel = {
  gradeLevelId: number;
  name: string;
};

export type ExamType = {
  examTypeId: number;
  name: string;
};

export type Matrix = {
  matrixId: number;
  title: string;
  description: string;
  gradeLevelId: number;
  createdByUserId: number;
  createdAt: string;
  status: string;
  notes?: string;
  details: MatrixDetail[];
  totalQuestions?: number;
  totalPoints?: number;
};

export type MatrixDetail = {
  examMatrixDetailId: number;
  lessonName: string;
  questionType: "1" | "2" | "3";
  difficulty: "1" | "2" | "3" | "4";
  quantity: number;
  scorePerQuestion: number;
};

export type Question = {
  questionId: number;
  content: string;
  questionType: 'multiple-choice' | 'essay';
  difficulty: 'easy' | 'medium' | 'hard';
  answer: string;
  grade: GradeLevel;
  createdBy: {
    userId: string;
    username: string;
  };
};

export type Template = {
  id: number;
  title: string;
  filePath: string;
  viewPath: string;
  gradeLevelId: number;
  price: number;
  createdBy: number;
  // Các trường từ mock API
  description: string;
  urlView: string;
  urlDownload: string;
  grade: GradeLevel;
};

export type ExamData = {
  examId: number;
  title: string;
  description: string;
  duration: number;
  examType: ExamType;
  matrix: Matrix;
  questions: Question[];
  attempts: number;
  averageScore: number;
};

export type Features = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type LeaderboardEntry = {
  userId: string;
  userName: string;
  totalScore: number;
  totalExams: number;
  averageScore: number;
  rank: number;
};

export type AnswerOption = {
  label: string;
  text: string;
};



export type BaseFilterPagination = {
  PageNumber?: number;
  PageSize?: number;
};

export type ExamTypeQuery = BaseFilterPagination & {
  Name?: string;
};
export type GradeLevelQuery = BaseFilterPagination & {
  Name?: string;
};
export type ExamQuery = BaseFilterPagination & {
  GradeLevelId?: number;
  ExamTypeId?: number;
};

export type MatrixQuery = BaseFilterPagination & {
  GradeLevelId?: number;
  CreatedByUserId?: number;
  IsAdmin?: boolean;
};

export type ExamFilters = {
  gradeLevel?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  examType?: number;
  search?: string;
};

export type TemplateFilters = {
  gradeLevel?: number;
  priceRange?: string;
};

export type GetAllUserQuery = BaseFilterPagination & {
  RoleId?: number | null;
  Email?: string;
  IsAdmin?: boolean;
  IsDeleted?: boolean; // Map từ status
  status?: "All" | "Active" | "Banned"; // Dùng cho UI
};

export type GetAllPracticequestionQuery = BaseFilterPagination & {
  QuestionType?: string | "All";
  GradeLevelId?: number | "All";
  CreatedByUserId?: number;
  IsAdmin?: boolean;
};


// --- User Admin ---
export type AdminUserCreateInput = {
  userName: string;
  fullName: string;
  email: string;
  password?: string;
  roleId: number;
};

export type AdminUserUpdateInput = {
  userId: number;
  userName: string;
  fullName: string;
  email: string;
  roleId: number;
};

// --- Question Admin ---
export type QuestionStatus = "Pending" | "Active" | "Rejected";

export type GetAllPracticeQuestionResponseDTO = {
  questionId: number;
  content: string | null;
  questionType: string | null;
  difficulty: string | null;
  answer: AnswerOption[] | null;
  correctAnswer: AnswerOption[] | null;
  gradeLevel: { id: number, name: string } | null;
  createdBy: { id: number, userName: string, email: string } | null;
  createdAt: string | null;
  isDeleted: boolean; // Giả định
  deletedAt: string | null; // Giả định
};

export type GetPracticequestionResponseDTO = GetAllPracticeQuestionResponseDTO;
export type PracticeQuestionCreateResponseDTO = GetAllPracticeQuestionResponseDTO;
export type PracticeQuestionUpdateResponseDTO = GetAllPracticeQuestionResponseDTO;
export type PracticeQuestionDeleteResponseDTO = Record<string, never>;
export type PracticeQuestionRestoreResponseDTO = Record<string, never>;

// Type cho State Filter của UI
export type QuestionFilters = GetAllPracticequestionQuery & {
  search?: string;
  difficulty?: string | "All";
  grade?: string | "All";
  lesson?: string | "All";
  status?: QuestionStatus | "All";
};

// Type cho Form
export type AdminCreateQuestionInput = {
  content: string;
  questionType: string;
  difficulty: string;
  gradeLevelId: number;
  createdByUserId: number;
  answer?: string; // Sẽ là JSON string
  correctAnswer?: string; // Sẽ là JSON string
};

export type AdminUpdateQuestionInput = AdminCreateQuestionInput & {
  questionId: number;
};

// --- EXAM (Admin) ---
export type ExamAdminStatus = "Pending" | "Active" | "Rejected";

// (GetAllExamResponseDTO)
export type AdminExam = {
  examId: number;
  title: string | null;
  description: string | null;
  durationMinutes: number;
  gradeLevel: { id: number, name: string } | null;
  examType: { id: number, name: string } | null;
  matrixId: number;
  createdBy: { id: number, userName: string, email: string } | null;
  createdAt: string;
  status: ExamAdminStatus;
  updatedAt: string | null;
};

// (GetAllExamQuery)
export type ExamAdminFilters = BaseFilterPagination & {
  GradeLevelId?: number;
  ExamTypeId?: number;
  CreatedBy?: number;
  IsAdmin?: boolean;
  search?: string;
  difficulty?: string | "All";
  grade?: string | "All";
  examType?: string | "All";
  status?: ExamAdminStatus | "All";
};

// --- TEMPLATE (Admin) ---
export type AdminTemplate = Template & {
  status: "Active" | "Draft" | "Archived";
};

export type TemplateAdminFilters = BaseFilterPagination & {
  Search?: string;
  gradeLevel?: number | "All";
  priceRange?: string | "All";
  status?: string | "All";
};

// --- PAYMENT (Admin) ---
// (PaymentGetResponseDTO)
export type AdminPayment = {
  paymentId: number;
  amount: number;
  status: PaymentStatus; 
  createdAt: string;
  userEmail?: string;
  userName?: string;
  templateTitle?: string;
};

export type PaymentFilters = BaseFilterPagination & {
  search?: string;
  status?: PaymentStatus | "All";
};
export type UserFilterState = GetAllUserQuery & {
  status: "All" | "Active" | "Banned";
  search: string; // UI dùng 'search', API dùng 'Email'
};

//exam admin
export type GetAllExamResponseDTO = { // Đã sửa tên type
  examId: number;
  title: string | null;
  description: string | null;
  durationMinutes: number;
  gradeLevel: { id: number, name: string } | null;
  examType: { id: number, name: string } | null;
  matrixId: number;
  createdBy: { id: number, userName: string, email: string } | null;
  createdAt: string;
  // Giả định
  isDeleted: boolean;
  deletedAt: string | null;
};
export type GetAllExamResponse = ResponseData<PaginationResponse<GetAllExamResponseDTO>>;
export type GetExamResponseDTO = GetAllExamResponseDTO;
export type GetExamResponse = ResponseData<GetExamResponseDTO>;
export type ExamCreateManualFromMatrixResponseDTO = Record<string, never>; // {}
export type ExamCreateManualFromMatrixResponse = ResponseData<ExamCreateManualFromMatrixResponseDTO>;
export type ExamUpdateFromMatrixResponseDTO = Record<string, never>; // {}
export type ExamUpdateFromMatrixResponse = ResponseData<ExamUpdateFromMatrixResponseDTO>;
export type ExamDeleteResponseDTO = Record<string, never>; // {}
export type ExamDeleteResponse = ResponseData<ExamDeleteResponseDTO>;
export type ExamRestoreResponseDTO = Record<string, never>; // {}
export type ExamRestoreResponse = ResponseData<ExamRestoreResponseDTO>;

export type GetAllExamQuery = BaseFilterPagination & {
  GradeLevelId?: number;
  ExamTypeId?: number;
  CreatedBy?: number;
  IsAdmin?: boolean;
  IsShowCorrectAnswer?: boolean;
  IsDeleted?: boolean; // Tự thêm
};

export type ExamFilterState = GetAllExamQuery & {
  search: string;
  difficulty: string | "All";
  grade: string | "All"; // UI dùng 'grade' (string), API dùng 'GradeLevelId' (number)
  examType: string | "All"; // UI dùng 'examType' (string), API dùng 'ExamTypeId' (number)
  status: "All" | "Active" | "Banned"; // Map sang IsDeleted
};

export type AdminCreateExamInput = {
  title: string;
  description: string;
  durationMinutes: number;
  gradeLevelId: number;
  examTypeId: number;
  createdByNavigationUserId: number;
  matrixId: number;
  questionIds: number[];
};

export type AdminUpdateExamInput = AdminCreateExamInput & {
  examId: number;
};


//matrix admin
export type ExamMatrixGetAllResponseDTO = {
  matrixId: number;
  title: string | null;
  description: string | null;
  gradeLevel: { id: number, name: string } | null;
  createdBy: { id: number, userName: string, email: string } | null;
  createdAt: string | null;
  status: string | null;
  notes: string | null;
  totalQuestions: number;
  totalPoint: number;
  details: ExamMatrixDetailResponseDTO[];
  isDeleted: boolean; // Giả định
  deletedAt: string | null; // Giả định
};
export type ExamMatrixDetailResponseDTO = {
  examMatrixDetailId: number;
  lessonName: string | null;
  questionType: string | null;
  difficulty: string | null;
  quantity: number | null;
  scorePerQuestion: number | null;
};
export type GetExamMatrixResponseDTO = ExamMatrixGetAllResponseDTO;
export type ExamMatrixGetAllResponse = ResponseData<PaginationResponse<ExamMatrixGetAllResponseDTO>>;
export type ExamMatrixCreateResponseDTO = ExamMatrixGetAllResponseDTO; // [cite: 13306-13319]
export type ExamMatrixUpdateResponseDTO = ExamMatrixGetAllResponseDTO; // [cite: 13389-13402]
export type ExamMatrixDeleteResponseDTO = Record<string, never>; // [cite: 13324-13326]
export type ExamMatrixRestoreResponseDTO = Record<string, never>; // [cite: 13381-13383]

export type GetAllMatrixQuery = BaseFilterPagination & {
  GradeLevelId?: number | "all";
  CreatedByUserId?: number;
  Search?: string;
  IsAdmin?: boolean;
  Status?: string | "all";
  IsDeleted?: boolean;
};

//template admin
export type TemplateGetDTO = {
  templateId: number;
  title: string;
  filePath: string;
  viewPath: string;
  gradeLevelId: { id: number, name: string } | null;
  price: number;
  createdBy: { id: number, userName: string, email: string } | null;
  createdAt: string | null;
  totalDownload: number;
  isDeleted: boolean; // Giả định
  deletedAt: string | null; // Giả định
};

export type TemplateGetResponse = ResponseData<PaginationResponse<TemplateGetDTO>>;

export type TemplateCreateResponseDTO = {
  title: string | null;
  filePath: string | null;
  viewPath: string | null;
  gradeLevelId: number | null;
  price: number | null;
  createdBy: number | null;
};
export type TemplateCreateResponse = ResponseData<TemplateCreateResponseDTO>; // Wrapper

export type TemplateDeleteResponseDTO = boolean; 
export type TemplateDeleteResponse = ResponseData<TemplateDeleteResponseDTO>; // Wrapper

export type TemplateRestoreResponseDTO = Record<string, never>; // Giả định
export type TemplateRestoreResponse = ResponseData<TemplateRestoreResponseDTO>; // Giả định

export type GetAllTemplateQuery = BaseFilterPagination & {
  Search?: string;
  IsDeleted?: boolean;
};

// UI State Filter
export type TemplateFilterState = GetAllTemplateQuery & {
  gradeLevel: string | "All";
  priceRange: string | "All";
  status: "All" | "Active" | "Banned";
};

//payment admin
export type PaymentStatus = "Pending" | "Success" | "Failed";

// [cite: 13493-13499] (DTO từ BE)
export type PaymentGetResponseDTO = {
  paymentId: number;
  amount: number;
  status: PaymentStatus; 
  createdAt: string;
  // [LƯU Ý]: API GetAllPayments  không trả về user/template.
  // Cần yêu cầu BE join thêm data nếu muốn hiển thị.
  userEmail?: string; 
  userName?: string; 
  templateTitle?: string;
};

// [cite: 13485-13487]
export type PaymentGetAllResponse = ResponseData<PaymentGetResponseDTO[]>; // BE trả về List, không có Pagination

// [cite: 13489-13491]
export type PaymentGetResponse = ResponseData<PaymentGetResponseDTO>;

// [cite: 12230-12235] (API Query)
// API này không hỗ trợ filter hay pagination
export type GetAllPaymentQuery = {
  // Trống
};

// Kiểu dữ liệu ĐỂ LƯU STATE FILTER CỦA UI Payment
export type PaymentFilterState = {
  PageNumber?: number; // Dùng cho client-side pagination
  PageSize?: number; // Dùng cho client-side pagination
  search: string;
  status: PaymentStatus | "All";
};