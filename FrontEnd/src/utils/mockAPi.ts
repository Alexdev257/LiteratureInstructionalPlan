import { BookOpen, Clock, CheckCircle, Trophy } from "lucide-react";
import type { LeaderboardEntry, Features, GradeLevel, ExamType,  Template } from "./type";



export const mockUsers = [
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

export const mockTemplates: Template[] = [
  {
    templateId: 1,
    title: "Đề kiểm tra Toán lớp 10 - Chương 1",
    filePath: "/uploads/templates/math10-chap1.docx",
    viewPath: "/templates/preview/math10-chap1",
    price: 15000,
    gradeLevel: {
      gradeLevelId: 10,
      name: "Lớp 10",
    },
    createdBy: {
      UserId: "1",
      FullName: "Nguyễn Văn A",
      Email: "nguyenvana@example.com",
    },
    totalDownload: 125,
    isDeleted: false,
    createdAt: new Date("2025-02-15T09:20:00Z"),
  },
  {
    templateId: 2,
    title: "Đề thi thử Đại học - Môn Văn",
    filePath: "/uploads/templates/literature-exam.docx",
    viewPath: "/templates/preview/literature-exam",
    price: 20000,
    gradeLevel: {
      gradeLevelId: 12,
      name: "Lớp 12",
    },
    createdBy: {
      UserId: "u002",
      FullName: "Trần Thị B",
      Email: "tranthib@example.com",
    },
    totalDownload: 89,
    isDeleted: true,
    createdAt: new Date("2025-01-22T13:45:00Z"),
  },
  {
    templateId: 3,
    title: "Mẫu đề Tiếng Anh lớp 11 - Học kỳ 1",
    filePath: "/uploads/templates/english11-hk1.pdf",
    viewPath: "/templates/preview/english11-hk1",
    price: 10000,
    gradeLevel: {
      gradeLevelId: 11,
      name: "Lớp 11",
    },
    createdBy: {
      UserId: "u003",
      FullName: "Phạm Minh C",
      Email: "phamminhc@example.com",
    },
    totalDownload: 56,
    isDeleted: false,
    createdAt: new Date("2025-03-05T10:00:00Z"),
  },
  {
    templateId: 4,
    title: "Đề ôn tập Hóa học lớp 10 - Phần Este",
    filePath: "/uploads/templates/chemistry10-este.pdf",
    viewPath: "/templates/preview/chemistry10-este",
    price: 12000,
    gradeLevel: {
      gradeLevelId: 10,
      name: "Lớp 10",
    },
    createdBy: {
      UserId: "u004",
      FullName: "Đỗ Thị D",
      Email: "dothid@example.com",
    },
    totalDownload: 74,
    isDeleted: false,
    createdAt: new Date("2025-05-10T08:30:00Z"),
  },
  {
    templateId: 5,
    title: "Đề kiểm tra Sinh học lớp 12 - ADN & Gen",
    filePath: "/uploads/templates/biology12-adn-gen.docx",
    viewPath: "/templates/preview/biology12-adn-gen",
    price: 18000,
    gradeLevel: {
      gradeLevelId: 12,
      name: "Lớp 12",
    },
    createdBy: {
      UserId: "u005",
      FullName: "Lê Văn E",
      Email: "levane@example.com",
    },
    totalDownload: 210,
    isDeleted: true,
    createdAt: new Date("2025-04-01T15:15:00Z"),
  },
];



export const mockLeaderboard: LeaderboardEntry[] = [
  { userId: '2', userName: 'Trần Thị B', totalScore: 186, totalExams: 18, averageScore: 9.2, rank: 1 },
  { userId: '1', userName: 'Nguyễn Văn A', totalScore: 213, totalExams: 25, averageScore: 8.5, rank: 2 },
  { userId: '3', userName: 'Lê Văn C', totalScore: 152, totalExams: 19, averageScore: 8.0, rank: 3 },
  { userId: '4', userName: 'Phạm Thị D', totalScore: 134, totalExams: 17, averageScore: 7.9, rank: 4 },
  { userId: '5', userName: 'Hoàng Văn E', totalScore: 98, totalExams: 13, averageScore: 7.5, rank: 5 }
];



// Mock data for new exam system
export const mockGradeLevels: GradeLevel[] = [
  { gradeLevelId: 1, name: 'Lớp 1' },
  { gradeLevelId: 2, name: 'Lớp 2' },
  { gradeLevelId: 3, name: 'Lớp ' },
  { gradeLevelId: 4, name: 'Lớp 4' },
  { gradeLevelId: 5, name: 'Lớp 5' },
  { gradeLevelId: 6, name: 'Lớp 6' },
  { gradeLevelId: 7, name: 'Lớp 7' },
  { gradeLevelId: 8, name: 'Lớp 8' },
  { gradeLevelId: 9, name: 'Lớp 9' },
  { gradeLevelId: 10, name: 'Lớp 10' },
  { gradeLevelId: 11, name: 'Lớp 11' },
  { gradeLevelId: 12, name: 'Lớp 12' },
];

export const mockExamTypes: ExamType[] = [
  { examTypeId: 1, name: 'Giữa kỳ', },
  { examTypeId: 2, name: 'Cuối kì', },
  { examTypeId: 3, name: 'Thi THPTQG', },
];

export const mockExamData: ExamData[] = [
  {
    examId: 1,
    title: "Bài kiểm tra đọc hiểu Ngữ văn 6 - Chủ đề Tình cảm gia đình",
    description:
      "Đề đọc hiểu với đoạn trích về tình mẹ con, giúp học sinh cảm nhận tình cảm gia đình trong văn học.",
    duration: 45,
    examType: { examTypeId: 1, name: "Giữa kỳ" },
    matrix: {
      matrixId: 601,
      title: "Ma trận Ngữ văn 6 - Đọc hiểu",
      description: "Bài đọc hiểu và các câu hỏi phân tích cảm xúc, ý nghĩa.",
      grade: { gradeLevelId: 6, name: "Lớp 6" },
      createdBy: { userId: "v1", username: "Cô Lan" },
      status: "active",
      lessonName: "Tình cảm gia đình",
      questionType: "reading-comprehension",
      difficulty: "easy",
      quantity: 5,
      scorePerQuestion: 2,
      notes: "Phần đọc hiểu 5 câu hỏi ngắn.",
    },
    attempts: 135,
    averageScore: 7.8,
    questions: [
      {
        questionId: 1,
        content: "Đoạn trích trên nói về tình cảm giữa những ai?",
        questionType: "essay",
        difficulty: "easy",
        answer: "Giữa người mẹ và người con.",
        grade: { gradeLevelId: 6, name: "Lớp 6" },
        createdBy: { userId: "v1", username: "Cô Lan" },
      },
      {
        questionId: 2,
        content: "Tác giả sử dụng biện pháp nghệ thuật nào nổi bật trong đoạn trích?",
        questionType: "essay",
        difficulty: "medium",
        answer: "So sánh và nhân hoá.",
        grade: { gradeLevelId: 6, name: "Lớp 6" },
        createdBy: { userId: "v1", username: "Cô Lan" },
      },
      {
        questionId: 3,
        content: "Qua đoạn trích, em hiểu gì về tình mẹ?",
        questionType: "essay",
        difficulty: "medium",
        answer: "Tình mẹ thiêng liêng, bao dung, yêu thương con vô điều kiện.",
        grade: { gradeLevelId: 6, name: "Lớp 6" },
        createdBy: { userId: "v1", username: "Cô Lan" },
      },
    ],
  },
  {
    examId: 2,
    title: "Đề thi Ngữ văn 7 - Cuối kỳ 1",
    description:
      "Đề tự luận gồm 3 câu về bài 'Sông núi nước Nam' và cảm nhận về lòng yêu nước.",
    duration: 90,
    examType: { examTypeId: 2, name: "Cuối kỳ" },
    matrix: {
      matrixId: 702,
      title: "Ma trận Ngữ văn 7 - Cuối kỳ",
      description: "Gồm phần đọc hiểu và nghị luận xã hội.",
      grade: { gradeLevelId: 7, name: "Lớp 7" },
      createdBy: { userId: "v2", username: "Thầy Nam" },
      status: "active",
      lessonName: "Sông núi nước Nam",
      questionType: "essay",
      difficulty: "medium",
      quantity: 3,
      scorePerQuestion: 3,
      notes: "Đề chuẩn cấu trúc BGD.",
    },
    attempts: 120,
    averageScore: 8.2,
    questions: [
      {
        questionId: 1,
        content: "Phân tích nội dung yêu nước trong bài thơ 'Sông núi nước Nam'.",
        questionType: "essay",
        difficulty: "medium",
        answer:
          "Bài thơ khẳng định chủ quyền dân tộc, thể hiện lòng tự hào và quyết tâm bảo vệ đất nước.",
        grade: { gradeLevelId: 7, name: "Lớp 7" },
        createdBy: { userId: "v2", username: "Thầy Nam" },
      },
      {
        questionId: 2,
        content: "Em hiểu thế nào về câu thơ 'Nam quốc sơn hà Nam đế cư'?",
        questionType: "essay",
        difficulty: "medium",
        answer:
          "Khẳng định nước Nam có chủ quyền, vua Nam cai trị đất nước của mình, không thể bị xâm phạm.",
        grade: { gradeLevelId: 7, name: "Lớp 7" },
        createdBy: { userId: "v2", username: "Thầy Nam" },
      },
      {
        questionId: 3,
        content: "Theo em, bài thơ có ý nghĩa như thế nào đối với thế hệ trẻ hôm nay?",
        questionType: "essay",
        difficulty: "easy",
        answer:
          "Giúp thế hệ trẻ thêm yêu nước, tự hào dân tộc và có ý thức bảo vệ Tổ quốc.",
        grade: { gradeLevelId: 7, name: "Lớp 7" },
        createdBy: { userId: "v2", username: "Thầy Nam" },
      },
    ],
  },
  {
    examId: 3,
    title: "Đề kiểm tra Ngữ văn 8 - 'Chiếc lược ngà' (Trắc nghiệm)",
    description:
      "Đề 15 câu trắc nghiệm về tác phẩm 'Chiếc lược ngà' của Nguyễn Quang Sáng.",
    duration: 45,
    examType: { examTypeId: 2, name: "Cuối kì" },
    matrix: {
      matrixId: 803,
      title: "Ma trận Ngữ văn 8 - Trắc nghiệm giữa kỳ",
      description: "15 câu hỏi trắc nghiệm bao quát nội dung chính truyện.",
      grade: { gradeLevelId: 8, name: "Lớp 8" },
      createdBy: { userId: "v3", username: "Cô Hương" },
      status: "active",
      lessonName: "Chiếc lược ngà",
      questionType: "multiple-choice",
      difficulty: "medium",
      quantity: 15,
      scorePerQuestion: 0.67,
      notes: "Kiểm tra nhanh kiến thức chính truyện.",
    },
    attempts: 160,
    averageScore: 7.1,
    questions: Array.from({ length: 15 }, (_, i) => ({
      questionId: i + 1,
      content: `Câu hỏi trắc nghiệm số ${i + 1} về truyện 'Chiếc lược ngà'.`,
      questionType: "multiple-choice",
      difficulty: i < 5 ? "easy" : i < 10 ? "medium" : "hard",
      answer: "Đáp án đúng là phương án B.",
      grade: { gradeLevelId: 8, name: "Lớp 8" },
      createdBy: { userId: "v3", username: "Cô Hương" },
    })),
  },
  {
    examId: 4,
    title: "Đề thi Ngữ văn 9 - Lặng lẽ Sa Pa (Tự luận)",
    description:
      "Đề tự luận về truyện 'Lặng lẽ Sa Pa' và nghị luận xã hội về lối sống cống hiến.",
    duration: 90,
    examType: { examTypeId: 2, name: "Cuối kỳ" },
    matrix: {
      matrixId: 904,
      title: "Ma trận Ngữ văn 9 - Cuối kỳ",
      description: "3 câu tự luận trọng tâm về nghị luận xã hội.",
      grade: { gradeLevelId: 9, name: "Lớp 9" },
      createdBy: { userId: "v4", username: "Thầy Dũng" },
      status: "active",
      lessonName: "Lặng lẽ Sa Pa",
      questionType: "essay",
      difficulty: "hard",
      quantity: 3,
      scorePerQuestion: 3.3,
      notes: "Có phần liên hệ thực tế.",
    },
    attempts: 142,
    averageScore: 8.6,
    questions: [
      {
        questionId: 1,
        content: "Phân tích nhân vật anh thanh niên trong truyện 'Lặng lẽ Sa Pa'.",
        questionType: "essay",
        difficulty: "hard",
        answer:
          "Anh thanh niên tiêu biểu cho lớp người lao động mới, âm thầm cống hiến cho đất nước.",
        grade: { gradeLevelId: 9, name: "Lớp 9" },
        createdBy: { userId: "v4", username: "Thầy Dũng" },
      },
      {
        questionId: 2,
        content: "Theo em, thế nào là người sống cống hiến?",
        questionType: "essay",
        difficulty: "medium",
        answer:
          "Là người biết làm việc vì lợi ích chung, giúp đỡ người khác và góp phần xây dựng đất nước.",
        grade: { gradeLevelId: 9, name: "Lớp 9" },
        createdBy: { userId: "v4", username: "Thầy Dũng" },
      },
      {
        questionId: 3,
        content: "Em sẽ làm gì để trở thành người sống cống hiến?",
        questionType: "essay",
        difficulty: "medium",
        answer:
          "Em sẽ học tập tốt, giúp đỡ bạn bè và tham gia hoạt động cộng đồng.",
        grade: { gradeLevelId: 9, name: "Lớp 9" },
        createdBy: { userId: "v4", username: "Thầy Dũng" },
      },
    ],
  },
  {
    examId: 5,
    title: "Đề thi Ngữ văn 12 - Ôn thi THPT Quốc gia",
    description:
      "Đề hỗn hợp gồm phần đọc hiểu và nghị luận văn học về bài 'Đất nước' của Nguyễn Khoa Điềm.",
    duration: 120,
    examType: { examTypeId: 3, name: "Thi THPTQG" },
    matrix: {
      matrixId: 1205,
      title: "Ma trận Ngữ văn 12 - Thi THPTQG",
      description: "Phần đọc hiểu + nghị luận, 10 câu trắc nghiệm + 2 tự luận.",
      grade: { gradeLevelId: 12, name: "Lớp 12" },
      createdBy: { userId: "v5", username: "Cô Thảo" },
      status: "active",
      lessonName: "Đất nước - Nguyễn Khoa Điềm",
      questionType: "mixed",
      difficulty: "hard",
      quantity: 12,
      scorePerQuestion: 0.83,
      notes: "Kết hợp hai dạng câu hỏi.",
    },
    attempts: 210,
    averageScore: 7.5,
    questions: [
      {
        questionId: 1,
        content:
          "Ý nghĩa của đoạn thơ 'Đất nước ta từ lâu/Chưa hề có tiếng nói/Đất nước ta là máu xương/Đất nước ta là con người' trong bài 'Đất nước'?",
        questionType: "essay",
        difficulty: "hard",
        answer:
          "Đoạn thơ khẳng định đất nước gắn liền với con người, thể hiện tình yêu sâu sắc của tác giả đối với quê hương.",
        grade: { gradeLevelId: 12, name: "Lớp 12" },
        createdBy: { userId: "v5", username: "Cô Thảo" },
      },
      {
        questionId: 2,
        content:
          "Phân tích hình ảnh 'Đất nước không chỉ là những ngọn núi, dòng sông' trong bài thơ.",
        questionType: "essay",
        difficulty: "medium",
        answer:
          "Hình ảnh này thể hiện quan niệm về đất nước không chỉ là cảnh vật mà còn là con người và văn hóa.",
        grade: { gradeLevelId: 12, name: "Lớp 12" },
        createdBy: { userId: "v5", username: "Cô Thảo" },
      },
      {
        questionId: 3,
        content:
          "Em hiểu thế nào về trách nhiệm của thế hệ trẻ đối với đất nước qua bài 'Đất nước'?",
        questionType: "essay",
        difficulty: "medium",
        answer:
          "Thế hệ trẻ cần có ý thức xây dựng và bảo vệ đất nước, phát huy truyền thống văn hóa và lịch sử.",
        grade: { gradeLevelId: 12, name: "Lớp 12" },
        createdBy: { userId: "v5", username: "Cô Thảo" },
      },
      {
        questionId: 4,
        content:
          "Câu hỏi trắc nghiệm số 1 về bài 'Đất nước' của Nguyễn Khoa Điềm.",
        questionType: "multiple-choice",
        difficulty: "easy",
        answer: "Đáp án đúng là phương án C.",
        grade: { gradeLevelId: 12, name: "Lớp 12" },
        createdBy: { userId: "v5", username: "Cô Thảo" },
      },
      {
        questionId: 5,
        content:
          "Câu hỏi trắc nghiệm số 2 về bài 'Đất nước' của Nguyễn Khoa Điềm.",
        questionType: "multiple-choice",
        difficulty: "easy",
        answer: "Đáp án đúng là phương án A.",
        grade: { gradeLevelId: 12, name: "Lớp 12" },
        createdBy: { userId: "v5", username: "Cô Thảo" },
      }
    ]
  }
];







