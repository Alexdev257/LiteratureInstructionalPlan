

export type ResponseLogin = {
    accessToken: string;
    refreshToken: string;
}
export type ResponseNull = {
    data: null;
    isSuccess: boolean;
    message: string;
    listErrors: [];
}

export type ResponseData<T> = {
    data: T;
    isSuccess: boolean;
    message: string;

}
type ApiError = {
    field: string;
    detail: string;
};

export type ErrorEntity = {
    data: null;
    listErrors: ApiError[];
    isSuccess: boolean;
    message: string;
}

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
}

export type GetUserById = {
    userId: number;
    userName: string;
    fullName: string;
    email: string;
    roleId: number;
    createdAt: string;
    isDeleted: boolean;
    deletedAt: string;

}

export type BodyRefreshToken = {
    id: number;
    accessToken: string;
    refreshToken: string;
}

export type GradeLevel = {
    gradeLevelId: number;
    name: string;
}

export type ExamType = {
    examTypeId: number;
    name: string;
}

export type ExamData = {
    examId: number;
    title: string;
    description: string;
    durationMinutes: number;
    matrixId: number;
    gradeLevel: GradeLevel;
    examType: ExamType;
    createdBy: CreateByUser;
    questions: Question[];
    createdAt: Date
}

export type ExamAttemptQuery = BaseFilterPagination & {
    ExamId?: number;
    UserId?: string;
    Status: string;
    IsAdmin?: boolean;
}




export type ExamAttempt = {
    examAttemptId: number;
    examId: number;
    userId: string;
    status: string;
    score: number;
    feedback: string;
    startedAt: Date;
    endTime: Date
    completedAt: Date;
}


export type Matrix = {
    matrixId: number;
    title: string;
    description: string;
    gradeLevel: GradeLevel;
    createdBy: CreateByUser;
    createdAt: string;
    status: string;
    notes?: string;
    totalQuestions: number;
    totalPoint: number;
    details: MatrixDetail[];
}
export type MatrixDetail = {
    examMatrixDetailId: number;
    lessonName: string;
    questionType: "1" | "2" | "3";
    difficulty: "1" | "2" | "3" | "4";
    quantity: number;
    scorePerQuestion: number;
}

export type Answer = {
    label: string;
    text: string;
}

export type Question = {
    questionId: number;
    content: string;
    questionType: "1" | "2" | "3";
    difficulty: "1" | "2" | "3" | "4";
    answer: Answer[];
    correctAnswer?: Answer[];
    gradeLevel: GradeLevel;
    createdBy: CreateByUser;
    createdAt: Date;

}

export type Template = {
    templateId: number;
    title: string;
    filePath: string;
    viewPath: string;
    price: number;
    gradeLevel: GradeLevel;
    createdBy: CreateByUser;
    totalDownload: number;
    isDeleted: boolean;
    createdAt: Date;
}

export type ExamFilters = {
    gradeLevel?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
    examType?: number;
    search?: string;
}

export type TemplateFilters = {
    gradeLevel?: number;
    priceRange?: string;
}


export type LeaderboardEntry = {
    userId: string;
    userName: string;
    totalScore: number;
    totalExams: number;
    averageScore: number;
    rank: number;
}

export type Features = {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type AdminUser = {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
    status: "Active" | "Suspended" | "Banned";
    postCount: number;
    averageScore: number;
    lastActivity: string;
};

export type UserFilters = {
    page?: number;
    limit?: number;
    search?: string;
    status?: "Active" | "Suspended" | "Banned" | "All";
};

export type CreateAdminInput = {
    fullName: string;
    email: string;
};

export type QuestionStatus = "Pending" | "Active" | "Rejected";

export type AdminQuestion = {
    id: string;
    questionText: string;
    grade: string;
    lesson: string;
    difficulty: "Easy" | "Medium" | "Hard";
    status: QuestionStatus;
    creatorName: string;
    createdAt: string;
    updatedAt: string;
};

export type QuestionFilters = {
    page?: number;
    limit?: number;
    search?: string;
    grade?: string;
    lesson?: string;
    difficulty?: "Easy" | "Medium" | "Hard" | "All";
    status?: QuestionStatus | "All";
    creator?: string;
};


export type CreateQuestionInput = {
    questionText: string;
    grade: string;
    lesson: string;
    difficulty: "Easy" | "Medium" | "Hard";
};



export type PaginationResponse<T> = {
    items: T[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export type BaseFilterPagination = {
    PageNumber?: number;
    PageSize?: number;
    Search?: string
}
export type ExamTypeQuery = BaseFilterPagination & {
    Name?: string;
}
export type GradeLevelQuery = BaseFilterPagination & {
    Name?: string;
}
export type ExamQuery = BaseFilterPagination & {
    GradeLevelId?: number;
    ExamTypeId?: number;
    IsShowCorrectAnswer?: boolean;
    IsAdmin?: boolean;
}

export type MatrixQuery = BaseFilterPagination & {
    GradeLevelId?: number;
    IsAdmin?: boolean;
}

export type TemplateQuery = BaseFilterPagination & {
    GradeLevelId?: number;
    isDeleted?: boolean
}

export type CreateByUser = {
    userId: number;
    fullName: string;
    email: string;
}

export type QuestionQuery = BaseFilterPagination & {
    QuestionType?: string  // "1" | "2" | "3"
    Difficulty?: string  // "1" | "2" | "3" | "4"   
    GradeLevelId?: number;
    IsShowAnswer?: boolean;
    IsShowCorrectAnswer?: boolean;
    IsAdmin?: boolean;
}
