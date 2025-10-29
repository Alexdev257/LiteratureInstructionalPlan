

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
    duration: number;
    examType: ExamType;
    matrix: Matrix;
    questions: Question[];
    attempts: number;
    averageScore: number;

}


export type Matrix = {
    matrixId: number;
    title: string;
    description: string;
    grade: GradeLevel;
    createdBy: {
        userId: string;
        username: string;
    };
    status: 'active' | 'inactive';
    lessonName: string;
    questionType: 'multiple-choice' | 'essay' | 'reading-comprehension' | 'mixed';
    difficulty: 'easy' | 'medium' | 'hard';
    quantity: number;
    scorePerQuestion: number;
    notes: string;

}

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

}

export type Template = {
    id: string,
    title: string,
    price: number,
    description: string,
    urlView: string,
    urlEdit: string,
    urlDownload: string,
    createdBy: {
        userId: string;
        username: string;
    },
    grade: GradeLevel
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

// Dùng cho modal "Thêm Admin" sau này
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

// Dùng cho modal "Tạo câu hỏi" sau này
export type CreateQuestionInput = {
  questionText: string;
  grade: string;
  lesson: string;
  difficulty: "Easy" | "Medium" | "Hard";
};
