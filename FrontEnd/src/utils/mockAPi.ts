import { BookOpen, Clock, CheckCircle, Trophy } from "lucide-react";
import type { Exam, ExamResult, Features, LeaderboardEntry, Question, ExamData, GradeLevel, BookSeries, ExamType } from "./type";


export const mockUsers= [
  {
    id: '1',
    email: 'nguyenvan.a@gmail.com',
    name: 'Nguyễn Văn A',
    grade: 12,
    joinDate: '2024-01-15',
    totalExams: 25,
    averageScore: 8.5
  },
  {
    id: '2',
    email: 'tranthib@gmail.com',
    name: 'Trần Thị B',
    grade: 11,
    joinDate: '2024-02-10',
    totalExams: 18,
    averageScore: 9.2
  }
];

export const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Đề thi thử THPT Quốc gia môn Ngữ văn 2024',
    description: 'Đề thi thử toàn diện với các dạng bài nghị luận xã hội và văn học',
    subject: 'van',
    grade: 12,
    category: 'nghi-luan-xa-hoi',
    duration: 120,
    totalQuestions: 3,
    difficulty: 'hard',
    createdAt: '2024-01-10',
    attempts: 245,
    averageScore: 7.8
  },
  {
    id: '2',
    title: 'Luyện tập Đọc hiểu văn bản nghị luận',
    description: 'Bộ đề luyện tập kỹ năng đọc hiểu và phân tích văn bản',
    subject: 'van',
    grade: 11,
    category: 'doc-hieu',
    duration: 90,
    totalQuestions: 5,
    difficulty: 'medium',
    createdAt: '2024-01-12',
    attempts: 189,
    averageScore: 8.2
  },
  {
    id: '3',
    title: 'Nghị luận văn học - Tác phẩm Số đỏ',
    description: 'Đề thi chuyên sâu về tác phẩm Số đỏ của Vũ Trọng Phụng',
    subject: 'van',
    grade: 12,
    category: 'nghi-luan-van-hoc',
    duration: 150,
    totalQuestions: 2,
    difficulty: 'hard',
    createdAt: '2024-01-08',
    attempts: 156,
    averageScore: 7.5
  },
  {
    id: '4',
    title: 'Đề thi học kỳ I - Lớp 10',
    description: 'Đề thi học kỳ với các dạng bài cơ bản và nâng cao',
    subject: 'van',
    grade: 10,
    category: 'trac-nghiem',
    duration: 90,
    totalQuestions: 25,
    difficulty: 'easy',
    createdAt: '2024-01-15',
    attempts: 312,
    averageScore: 8.7
  }
];

export const mockQuestions: { [examId: string]: Question[] } = {
  '1': [
    {
      id: 'q1',
      examId: '1',
      type: 'essay',
      question: 'Anh/chị hãy viết một bài nghị luận (khoảng 600 từ) về chủ đề: "Vai trò của giáo dục trong việc xây dựng nhân cách con người"',
      points: 10,
      explanation: 'Bài viết cần có cấu trúc rõ ràng: mở bài, thân bài (2-3 luận điểm), kết bài. Sử dụng lập luận thuyết phục với ví dụ cụ thể.'
    },
    {
      id: 'q2',
      examId: '1',
      type: 'reading-comprehension',
      question: 'Đọc đoạn văn sau và trả lời câu hỏi: "Trong cuộc sống hiện đại..."',
      points: 5,
      explanation: 'Cần nắm được ý chính của đoạn văn và biết cách phân tích thông tin.'
    },
    {
      id: 'q3',
      examId: '1',
      type: 'essay',
      question: 'Phân tích nhân vật X trong tác phẩm Y (khoảng 400 từ)',
      points: 8,
      explanation: 'Cần phân tích được đặc điểm tính cách, hoàn cảnh và ý nghĩa của nhân vật.'
    }
  ]
};

export const mockResults: ExamResult[] = [
  {
    id: 'r1',
    examId: '1',
    userId: '1',
    answers: { 'q1': 'Bài luận về giáo dục...', 'q2': 'Câu trả lời đọc hiểu...', 'q3': 'Phân tích nhân vật...' },
    score: 19,
    totalScore: 23,
    timeSpent: 115,
    completedAt: '2024-01-20T10:30:00Z',
    feedback: 'Bài làm tốt, cần cải thiện cấu trúc luận điểm'
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { userId: '2', userName: 'Trần Thị B', totalScore: 186, totalExams: 18, averageScore: 9.2, rank: 1 },
  { userId: '1', userName: 'Nguyễn Văn A', totalScore: 213, totalExams: 25, averageScore: 8.5, rank: 2 },
  { userId: '3', userName: 'Lê Văn C', totalScore: 152, totalExams: 19, averageScore: 8.0, rank: 3 },
  { userId: '4', userName: 'Phạm Thị D', totalScore: 134, totalExams: 17, averageScore: 7.9, rank: 4 },
  { userId: '5', userName: 'Hoàng Văn E', totalScore: 98, totalExams: 13, averageScore: 7.5, rank: 5 }
];

export const mockfeatures: Features[] = [
    {
      icon: BookOpen,
      title: 'Ngân hàng đề thi phong phú',
      description: 'Hơn 500 đề thi được phân loại theo lớp và chủ đề, cập nhật liên tục'
    },
    {
      icon: Clock,
      title: 'Luyện thi trực tuyến',
      description: 'Môi trường thi thử với đồng hồ đếm ngược và tự động lưu bài'
    },
    {
      icon: CheckCircle,
      title: 'Chấm điểm tự động',
      description: 'Nhận kết quả ngay lập tức với lời giải chi tiết'
    },
    {
      icon: Trophy,
      title: 'Xếp hạng cạnh tranh',
      description: 'Theo dõi tiến độ và cạnh tranh với bạn bè trên bảng xếp hạng'
    }
  ];

// Mock data for new exam system
export const mockGradeLevels: GradeLevel[] = [
  { gradeLevelId: 1, gradeName: 'Lớp 10', description: 'Chương trình lớp 10' },
  { gradeLevelId: 2, gradeName: 'Lớp 11', description: 'Chương trình lớp 11' },
  { gradeLevelId: 3, gradeName: 'Lớp 12', description: 'Chương trình lớp 12' }
];

export const mockBookSeries: BookSeries[] = [
  { seriesId: 1, seriesName: 'Sách giáo khoa', description: 'Chương trình sách giáo khoa chuẩn' },
  { seriesId: 2, seriesName: 'Sách bài tập', description: 'Bộ sách bài tập nâng cao' },
  { seriesId: 3, seriesName: 'Sách tham khảo', description: 'Sách tham khảo và ôn thi' }
];

export const mockExamTypes: ExamType[] = [
  { examTypeId: 1, typeName: 'Trắc nghiệm', description: 'Đề thi trắc nghiệm' },
  { examTypeId: 2, typeName: 'Tự luận', description: 'Đề thi tự luận' },
  { examTypeId: 3, typeName: 'Đọc hiểu', description: 'Đề thi đọc hiểu văn bản' },
  { examTypeId: 4, typeName: 'Nghị luận xã hội', description: 'Đề thi nghị luận xã hội' },
  { examTypeId: 5, typeName: 'Nghị luận văn học', description: 'Đề thi nghị luận về tác phẩm văn học' }
];

export const mockExamData: ExamData[] = [
  {
    examId: 1,
    title: 'Đề thi thử THPT Quốc gia môn Ngữ văn 2024',
    description: 'Đề thi thử toàn diện với các dạng bài nghị luận xã hội và văn học, bao gồm đọc hiểu và làm văn.',
    durationMinutes: 120,
    gradeLevelId: 3,
    seriesId: 3,
    examTypeId: 2,
    createdBy: 1,
    createdAt: '2024-01-10T08:00:00Z',
    attempts: 245,
    averageScore: 7.8,
    difficulty: 'hard',
    totalQuestions: 3
  },
  {
    examId: 2,
    title: 'Luyện tập Đọc hiểu văn bản nghị luận',
    description: 'Bộ đề luyện tập kỹ năng đọc hiểu và phân tích văn bản nghị luận, giúp học sinh nắm vững cấu trúc và nội dung.',
    durationMinutes: 90,
    gradeLevelId: 2,
    seriesId: 2,
    examTypeId: 3,
    createdBy: 1,
    createdAt: '2024-01-15T09:00:00Z',
    attempts: 189,
    averageScore: 8.2,
    difficulty: 'medium',
    totalQuestions: 5
  },
  {
    examId: 3,
    title: 'Nghị luận văn học - Tác phẩm Số đỏ',
    description: 'Đề thi chuyên sâu về tác phẩm Số đỏ của Vũ Trọng Phụng, phân tích nhân vật và nghệ thuật viết.',
    durationMinutes: 150,
    gradeLevelId: 3,
    seriesId: 1,
    examTypeId: 5,
    createdBy: 2,
    createdAt: '2024-01-20T10:00:00Z',
    attempts: 156,
    averageScore: 7.5,
    difficulty: 'hard',
    totalQuestions: 2
  },
  {
    examId: 4,
    title: 'Trắc nghiệm Ngữ pháp tiếng Việt',
    description: 'Bộ câu hỏi trắc nghiệm về ngữ pháp, từ vựng và cách dùng từ trong tiếng Việt.',
    durationMinutes: 60,
    gradeLevelId: 1,
    seriesId: 1,
    examTypeId: 1,
    createdBy: 3,
    createdAt: '2024-01-25T14:00:00Z',
    attempts: 312,
    averageScore: 8.5,
    difficulty: 'easy',
    totalQuestions: 40
  },
  {
    examId: 5,
    title: 'Nghị luận xã hội - Vấn đề giáo dục',
    description: 'Đề thi nghị luận về các vấn đề giáo dục trong xã hội hiện đại, yêu cầu tư duy phản biện.',
    durationMinutes: 120,
    gradeLevelId: 3,
    seriesId: 2,
    examTypeId: 4,
    createdBy: 1,
    createdAt: '2024-02-01T08:30:00Z',
    attempts: 198,
    averageScore: 7.9,
    difficulty: 'medium',
    totalQuestions: 1
  },
  {
    examId: 6,
    title: 'Đọc hiểu văn bản thuyết minh',
    description: 'Luyện tập đọc hiểu các văn bản thuyết minh khoa học, xã hội với nhiều dạng câu hỏi đa dạng.',
    durationMinutes: 75,
    gradeLevelId: 2,
    seriesId: 2,
    examTypeId: 3,
    createdBy: 2,
    createdAt: '2024-02-05T11:00:00Z',
    attempts: 167,
    averageScore: 8.1,
    difficulty: 'medium',
    totalQuestions: 6
  },
  {
    examId: 7,
    title: 'Tổng hợp kiến thức lớp 10',
    description: 'Đề thi tổng hợp toàn bộ kiến thức văn học và ngữ văn lớp 10, chuẩn bị cho kỳ thi cuối năm.',
    durationMinutes: 90,
    gradeLevelId: 1,
    seriesId: 1,
    examTypeId: 2,
    createdBy: 3,
    createdAt: '2024-02-10T09:30:00Z',
    attempts: 289,
    averageScore: 7.6,
    difficulty: 'medium',
    totalQuestions: 4
  },
  {
    examId: 8,
    title: 'Phân tích tác phẩm Chí Phèo',
    description: 'Đề thi chuyên sâu về tác phẩm Chí Phèo, phân tích tâm lý nhân vật và ý nghĩa xã hội.',
    durationMinutes: 135,
    gradeLevelId: 3,
    seriesId: 3,
    examTypeId: 5,
    createdBy: 1,
    createdAt: '2024-02-15T08:00:00Z',
    attempts: 134,
    averageScore: 7.3,
    difficulty: 'hard',
    totalQuestions: 2
  }
];

