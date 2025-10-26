import { BookOpen, Clock, CheckCircle, Trophy } from "lucide-react";
import type { LeaderboardEntry, Features, GradeLevel, ExamType, ExamData, Template } from "./type";



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

export const mockAPiTemplate: Template[] = [
    {
        id: "4E84C61D0BA8445B!s7a9e82c85b81449289655eab0c8ee643",
        title: "2- first-component.docx",
        description: "Tài liệu hướng dẫn sử dụng component đầu tiên",
        price: 0,
        urlView: "https://1drv.ms/w/c/95a65105efd833f9/EfC_BT7oI1VIsz2sKzLLp0ABj4YiG5pVGX4a6mNWxd6AfA?e=Jg89wR",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=7a9e82c8-5b81-4492-8965-5eab0c8ee643&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.Kc0svwPcGNehs1b5qSZLs_ZF_WQYauHu20OyDUm-tXrRjDThdx7gvX6bPdFvqGBmkmc7GkrrFZZtnIdx-OkIwyiLiyHw6dUucMs-JnzhSD_PF18ADLQCdDrxOdDtPsXY6Pzk9E3siNtPgOigPykQFEVib-xbq42l1fmF15Z9V9hRq5c2oVCuRtCsH1xZ9_Ssah9DeSXL-J35DBZvuw3SQA5jNKp5aJvhOS2jIAM8WzkZL2Bl1JMvB4eY2wAxBpXegP7YaMjrvp1sjHkS9on8GTTJeyPGBkLOJycx-Beu5KwYLD3QH7CaM445b-CQX6SNuvMBHHc8y22kWII8GCn81RvLhsxmwuRG6TzBDoNA_aE1dkqOyNvu0wlDIG_i70PRTdOKtS10AXpCzyHyjxb0d2CPwRZDctBBNpwIWKljIZFMAssNfq1_6kStRXEd3FFV.J-m1yit4qXkMPscafY06N0DtC_IzDmHXBfbCOUXyW7k&ApiVersion=2.0",
        grade: { gradeLevelId: 1, name: "Lớp 1" },
        createdBy: { userId: "user123", username: "teacherA" }
    },
    {
        id: "4E84C61D0BA8445B!s685e4714cd6b4d8787d15c9b6f5e5256",
        title: "3-Explore the View and Text Components.docx",
        description: "Hướng dẫn khám phá các component View và Text trong React Native",
        price: 15000,
        urlView: "https://1drv.ms/w/c/4e84c61d0ba8445b/ERRHXmhrzYdNh9Fcm29eUlYBEM4YqRBrD-SZe63G-Kbfew?e=hLtyMy",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=685e4714-cd6b-4d87-87d1-5c9b6f5e5256&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.rTOMCtBTXHsfQzumeGmBUSXwGR7DoM6UBYbckvOwBAZxYv7ccEjlr_xqiN99Od6lgpq7_zqgJmVSPMhlhyvIRy14Flvh9KhxpoeXKT0g-53GiSz_2bWemQUoa4ABBRB-YwaHrzC2n9IUpnBxK9Fqe1beMSqGj0nGd1CruWPtn1sjyBcYIJIjNxINPCBZfum8Bh8m2sjkrj85AwZxcHJn019WGIWckbWzomYg4annK40qzwKsKa0e1H3VaymLrFODdGgZ1MIp59VKkz2rvDtDtjrTLB09MJLDGTa0Bc3NhMBT_ovfFb8_rg1HZoCUyNmG6ulzWf2sM8m_vg3ZkIScgK1K8HxYvvXa1ilsCjhMxBtEbk71GHaLi1j41MZUPAmqo-2Xsf3JEhpSxDiUgkh_Kxbs_7QSNm1t3Ar3Q9kWJNJ5sWHGx0F1Q4sKLzowCSw-.ng1SL3vGQVZd52eTT2hATbnoXYdCEZ4IFh_nhAOzDXY&ApiVersion=2.0",
        grade: { gradeLevelId: 2, name: "Lớp 2" },
        createdBy: { userId: "user124", username: "teacherB" }
    },
    {
        id: "4E84C61D0BA8445B!s6e48146565564587a4f1acd496cd867b",
        title: "4-Exercise- Build a React Native screen.docx",
        description: "Bài tập xây dựng một màn hình React Native hoàn chỉnh",
        price: 20000,
        urlView: "https://1drv.ms/w/c/4e84c61d0ba8445b/EWUUSG5WZYdFpPGs1JbNhnsB_nWUM88zQtEKbxVhLEHmWg?e=wfklOo",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=6e481465-6556-4587-a4f1-acd496cd867b&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.R038VAo8HxCFZTG9iNW8CX_Lek3hupEw7KOyUlkk0ZxW9rP5FTZ0O7nC0IY1eb-0im_850atJi4e10_nP-8spbLyEzIW9MkwAbkyXJB86w5n86-2SjRfBnPfynuCuN2KfSind2Z6eEZjMvuiYJr3JVl9Pfncci3vqTFQ2Ikt3SX8qIpJ5S7xM0oclGiQl-8m4ijnZMnvPbEIVm5A-d25lIbSXezALaXnHONC3lgcrDJRutSSMyghPCddvQO0QFKr0hIY_F-RjghEO5loLI7T7uUCgKk7tk9UoIF0CMC5lVkEoH3a7fjuOCLSL_u7NVVL7jYA6VINtGOLr_p2t87g4yXXvscM34y9KKHYKjUOGZ5kvXOmFIkzYMFAvt_-K04uFjSp8vdiK9VMvC8MR0vN-O2O5fiPKuTN_9ay-btvb3FGFRtNWePJ7TZEXx-1C3Rq.b3LQkKibGfU4VI52CRyyYYE7E2lo7XnxRPA7uOH1P5w&ApiVersion=2.0",
        grade: { gradeLevelId: 3, name: "Lớp 3" },
        createdBy: { userId: "user125", username: "teacherC" }
    },
    {
        id: "4E84C61D0BA8445B!s3c1a230423724d4bbbcdc116b2c9b31a",
        title: "8-Render a large list using FlatList.docx",
        price: 20000,
        description: "Hướng dẫn sử dụng FlatList để render danh sách lớn trong React Native",
        urlView: "https://1drv.ms/w/c/4e84c61d0ba8445b/EQQjGjxyI0tNu83BFrLJsxoB-qPC6GAqxH7_XBavQ5WfNg?e=HYNuxk",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=3c1a2304-2372-4d4b-bbcd-c116b2c9b31a&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.kmKpfTv3XrwlUQIXbw6ELfxNpiWFtkc70vDysWnZuE620yEEVNIh_h-QQGMLbrQuAdLvnNVEHFtGADjyyr_EsMxXiEai9qdIc2ix6L8kYDEMGQ4vxKNPywNHBmmEOpdV-yvRyHQ2SSR6WejIreqZA4mgmYsk_XUWXagEqE9CJU1izXbLfnke7a80ylKc56Dc8EiBmLz2vdR3pkXIRPrEbehvgS_1taHPkoRrq6UyKfSRPOb7kr492NWBiwT5E5OZ4YnBQRkFjcLRzB4psk4_msIkAs7s7IzBfb5SoRXBn39Q67JQp37PbUg33xIDartvk4hRUx7ypEJV7S3H2XRKw8v_shQYFjmeor_wPoDG4GiGmGw31uOZARmOxhuGCpO2LY947h0rJkfcy0R9eOUTSCJahzs3L0uWr_EphfvYkd-JMX701DJWK-r28gwgqBH5.s76OY-EuJfv3kC5aT9DmAjoZz1n-WWEWAQsE3kqEZqk&ApiVersion=2.0",
        grade: { gradeLevelId: 4, name: "Lớp 4" },
        createdBy: { userId: "user126", username: "teacherD" }
    },
    {
        id: "4E84C61D0BA8445B!s26dd09c02cd94f4ba70c99454feca168",
        title: "9--Render a large list using SectionList.docx",
        price: 25000,
        description: "Hướng dẫn sử dụng SectionList để render danh sách phân đoạn trong React Native",
        urlView: "https://1drv.ms/w/c/4e84c61d0ba8445b/EcAJ3SbZLEtPpwyZRU_soWgB_rBSY0SdTH8wXoaXB-z9Rg?e=Kf7CZA",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=26dd09c0-2cd9-4f4b-a70c-99454feca168&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.ZmJTmlNdF05kcOjeCV3qdsNupozMUeTatDYWE91wsi2H1CQru0fviionOr8sQZykej3OslLsQQ4p7zO4R9_swnzk598xSHRv5Jo-qtpoPN4jOT7iJ1VY-GdV-muawD8reA56LoSSWhdSngSzrOVGwZC1P0jRN5mok7WVx0N5W6yw_Ek6Sk_be8E0J5WfvobQu95P9nX_Zl_CS1Rv29M5CJOSOG7Mvti6_sbqVuVIXDJ4TeABSB8kDWEQMSHXPFQzXou9hnpSqc5-hcGJnYIcUlDaYhDaooc6vgRY-mj7v9NTYGal-jBbS4MrXzuowE2hEt5GQlS6Ug65U3gPLy8aA79IqXMmngpFeCQhdZH9tNhAiMkaENOJoouJFpi43j-Tes_-idycL76lWJtfXdMcVwnK4EIcgsCTKCyvJCh-ENZUBl9-D3Pi9AjWS0c_YbPD.k7NM9YVvIAzmBCiYZ-bv6g8oPYeVvwaFwREIvPK2v_E&ApiVersion=2.0",
        grade: { gradeLevelId: 5, name: "Lớp 5" },
        createdBy: { userId: "user127", username: "teacherE" }
    },
    {
        id: "4E84C61D0BA8445B!s6cfc344c01b445a1be1ff5d44ecd4c0a",
        title: "Exercise 17_React Form.docx",
        description: "Bài tập về biểu mẫu (form) trong React Native",
        price: 30000,
        urlView: "https://1drv.ms/w/c/4e84c61d0ba8445b/EUw0_Gy0AaFFvh_11E7NTAoBMJdRiowxBTEbY8gtjuLX4A?e=at6dsO",
        urlEdit: "https://1drv.ms/w/c/4e84c61d0ba8445b/Eamv8uQZ9eZJr_qxB8_aRBYBJx3Vzi5ACrIDqpsMALxZ2Q?e=Ef5vHd",
        urlDownload: "https://my.microsoftpersonalcontent.com/personal/4e84c61d0ba8445b/_layouts/15/download.aspx?UniqueId=6cfc344c-01b4-45a1-be1f-f5d44ecd4c0a&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiIwMzE1ZGRhYy05NzMxLTRhOGMtOTZhZS01ZjFlNTYxMjg1NDAiLCJhcHBfZGlzcGxheW5hbWUiOiJTV0QiLCJhcHBpZCI6IjVhN2U4ZDQ0LWRkMzMtNGI2Zi05MGNhLTZiM2JlZmU3MmFlMCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3NjE0NDMwNDUifQ.tOqXvU3UAVued3CwHTydznz_io6Btdc3L5t-n4w4tpGpj2vzwNBu3p3Tb5-DLRUbAZDZp83iwlxE9sQmwPb_grnReDm-ABF2AB8nP_Ywe6M7IHrf8pdOJNY1lhqB5XudC_cRyAVEa8J3tnEXZkoWLv4IH4TBaFnfuUC2PVdjqEEGeFQhBs5qXgKpadzo5gtMXA1g6nV822_Tm-pnPRm0OxHzqqXeBW1UQS-zt9mLeHEtDTnf4rQFususFg2ph4WlB1jgQr-75DaGHr9L0yBzIUGN1f3RAVkBOJh4utYJCS_SnajDjlB1OYLc73KI8B_rX9RcWMcR00XTcx0lp0DhvxgX6tdIWdbl_eVUv7xCYUB9SPxp5dKuLb5sf4irQYMrHEAMD1khIuzgn3BPnL7n7a9aCwlqz5cKkPa793c-shMWCENCPy3O6qCwhJMbZ8eu.7asWfHs8f-6dSt1V7anIQJN_1WAq6JEfKd_wDgYoEaM&ApiVersion=2.0",
        grade: { gradeLevelId: 6, name: "Lớp 6" },
        createdBy: { userId: "user128", username: "teacherF" }
    }
]


