

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
    jti: string;
    UserId: string;
    Username: string;
    RoleId: string;
    Role: string;
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;

}

export type BodyRefreshToken = {
    id: number;
    accessToken: string;
    refreshToken: string;
}


export interface Exam {
    id: string;
    title: string;
    description: string;
    subject: 'van' | 'toan' | 'anh' | 'ly' | 'hoa' | 'sinh';
    grade: 10 | 11 | 12;
    category: 'nghi-luan-xa-hoi' | 'nghi-luan-van-hoc' | 'doc-hieu' | 'trac-nghiem' | 'tu-luan';
    duration: number; // minutes
    totalQuestions: number;
    difficulty: 'easy' | 'medium' | 'hard';
    createdAt: string;
    attempts: number;
    averageScore: number;
}

export interface Question {
    id: string;
    examId: string;
    type: 'essay' | 'multiple-choice' | 'reading-comprehension';
    question: string;
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
    points: number;
}

export interface ExamResult {
    id: string;
    examId: string;
    userId: string;
    answers: { [questionId: string]: string };
    score: number;
    totalScore: number;
    timeSpent: number;
    completedAt: string;
    feedback?: string;
}

export interface LeaderboardEntry {
    userId: string;
    userName: string;
    totalScore: number;
    totalExams: number;
    averageScore: number;
    rank: number;
}