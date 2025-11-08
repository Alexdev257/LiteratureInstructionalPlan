// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Edit2, Eye, Plus, Download, BookOpen, Zap, Target } from "lucide-react"

// // Mock data for exam matrix
// const examMatrix = {
//   matrixId: 1,
//   title: "Ma trận đề thi Văn học lớp 12 - Kỳ thi THPT Quốc Gia",
//   description: "Cấu trúc đề thi tiêu chuẩn cho kỳ thi THPT Quốc Gia năm 2025",
//   gradeLevelId: 12,
//   createdByUserId: 1,
//   createdAt: "2025-11-08T06:32:14.38",
//   status: "active",
//   notes: "Đã được phê duyệt bởi hội đồng giáo dục. Thời gian làm bài: 120 phút.",
//   details: [
//     {
//       examMatrixDetailId: 1,
//       lessonName: "Văn học trung đại Việt Nam",
//       questionType: "Trắc nghiệm",
//       difficulty: "Cơ bản",
//       quantity: 8,
//       scorePerQuestion: 0.25,
//     },
//     {
//       examMatrixDetailId: 2,
//       lessonName: "Văn học trung đại Việt Nam",
//       questionType: "Trắc nghiệm",
//       difficulty: "Nâng cao",
//       quantity: 7,
//       scorePerQuestion: 0.25,
//     },
//     {
//       examMatrixDetailId: 3,
//       lessonName: "Văn học hiện đại Việt Nam",
//       questionType: "Trắc nghiệm",
//       difficulty: "Cơ bản",
//       quantity: 6,
//       scorePerQuestion: 0.25,
//     },
//     {
//       examMatrixDetailId: 4,
//       lessonName: "Văn học hiện đại Việt Nam",
//       questionType: "Trắc nghiệm",
//       difficulty: "Nâng cao",
//       quantity: 9,
//       scorePerQuestion: 0.25,
//     },
//     {
//       examMatrixDetailId: 5,
//       lessonName: "Văn học nước ngoài",
//       questionType: "Trắc nghiệm",
//       difficulty: "Cơ bản",
//       quantity: 5,
//       scorePerQuestion: 0.25,
//     },
//     {
//       examMatrixDetailId: 6,
//       lessonName: "Phân tích tác phẩm",
//       questionType: "Tự luận",
//       difficulty: "Nâng cao",
//       quantity: 1,
//       scorePerQuestion: 3.0,
//     },
//     {
//       examMatrixDetailId: 7,
//       lessonName: "Viết bài luận",
//       questionType: "Tự luận",
//       difficulty: "Nâng cao",
//       quantity: 1,
//       scorePerQuestion: 4.0,
//     },
//   ],
// }

// // Difficulty badge colors
// const difficultyColors = {
//   "Cơ bản": "bg-green-500/10 text-green-500",
//   "Nâng cao": "bg-amber-500/10 text-amber-500",
//   "Rất nâng cao": "bg-red-500/10 text-red-500",
// }

// // Question type colors
// const questionTypeColors = {
//   "Trắc nghiệm": "bg-blue-500/10 text-blue-500",
//   "Tự luận": "bg-purple-500/10 text-purple-500",
// }

// export default function ExamMatrixPage() {
//   const [isEditing, setIsEditing] = useState(false)
//   const totalScore = examMatrix.details.reduce((sum, detail) => sum + detail.quantity * detail.scorePerQuestion, 0)
//   const multipleChoice = examMatrix.details.filter((d) => d.questionType === "Trắc nghiệm").length
//   const essay = examMatrix.details.filter((d) => d.questionType === "Tự luận").length

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-start justify-between">
//           <div>
//             <h1 className="text-4xl font-bold text-foreground mb-2">{examMatrix.title}</h1>
//             <p className="text-muted-foreground">{examMatrix.description}</p>
//           </div>
//           <div className="flex gap-2">
//             <Button variant="outline" size="sm">
//               <Download className="w-4 h-4 mr-2" />
//               Xuất PDF
//             </Button>
//             <Button onClick={() => setIsEditing(!isEditing)} size="sm">
//               <Edit2 className="w-4 h-4 mr-2" />
//               {isEditing ? "Hủy" : "Chỉnh sửa"}
//             </Button>
//           </div>
//         </div>

//         {/* Status and Info */}
//         <div className="grid grid-cols-4 gap-4">
//           <Card className="border-border/50">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Trạng thái</p>
//                   <p className="text-lg font-semibold text-foreground mt-1">
//                     <Badge className="bg-green-500/10 text-green-500">Hoạt động</Badge>
//                   </p>
//                 </div>
//                 <Eye className="w-8 h-8 text-primary/50" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-border/50">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Tổng điểm</p>
//                   <p className="text-lg font-semibold text-foreground mt-1">{totalScore}</p>
//                 </div>
//                 <Target className="w-8 h-8 text-primary/50" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-border/50">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Câu hỏi</p>
//                   <p className="text-lg font-semibold text-foreground mt-1">{examMatrix.details.length}</p>
//                 </div>
//                 <Zap className="w-8 h-8 text-primary/50" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-border/50">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Lớp học</p>
//                   <p className="text-lg font-semibold text-foreground mt-1">Lớp {examMatrix.gradeLevelId}</p>
//                 </div>
//                 <BookOpen className="w-8 h-8 text-primary/50" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Notes */}
//         <Card className="border-border/50 bg-muted/30">
//           <CardHeader>
//             <CardTitle className="text-base">Ghi chú</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-foreground">{examMatrix.notes}</p>
//           </CardContent>
//         </Card>

//         {/* Matrix Details Table */}
//         <Card className="border-border/50">
//           <CardHeader className="flex flex-row items-center justify-between pb-4">
//             <CardTitle>Chi tiết cấu trúc đề thi</CardTitle>
//             {isEditing && (
//               <Button size="sm" variant="outline">
//                 <Plus className="w-4 h-4 mr-2" />
//                 Thêm hàng
//               </Button>
//             )}
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-border/50 bg-muted/50">
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Bài học</th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Loại câu hỏi</th>
//                     <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Mức độ</th>
//                     <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Số câu</th>
//                     <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Điểm/Câu</th>
//                     <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Tổng điểm</th>
//                     {isEditing && (
//                       <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Hành động</th>
//                     )}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {examMatrix.details.map((detail, index) => (
//                     <tr
//                       key={detail.examMatrixDetailId}
//                       className="border-b border-border/30 hover:bg-muted/50 transition-colors"
//                     >
//                       <td className="px-6 py-4 text-sm text-foreground">{detail.lessonName}</td>
//                       <td className="px-6 py-4 text-sm">
//                         <Badge className={questionTypeColors[detail.questionType]}>{detail.questionType}</Badge>
//                       </td>
//                       <td className="px-6 py-4 text-sm">
//                         <Badge className={difficultyColors[detail.difficulty]}>{detail.difficulty}</Badge>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-center font-semibold text-foreground">{detail.quantity}</td>
//                       <td className="px-6 py-4 text-sm text-center text-foreground">{detail.scorePerQuestion}</td>
//                       <td className="px-6 py-4 text-sm text-center font-semibold text-primary">
//                         {detail.quantity * detail.scorePerQuestion}
//                       </td>
//                       {isEditing && (
//                         <td className="px-6 py-4 text-sm text-center">
//                           <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
//                             ✕
//                           </Button>
//                         </td>
//                       )}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Summary Section */}
//         <div className="grid grid-cols-3 gap-4">
//           <Card className="border-border/50 bg-gradient-to-br from-blue-500/5 to-blue-500/0">
//             <CardHeader>
//               <CardTitle className="text-base flex items-center gap-2">
//                 <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
//                 Trắc nghiệm
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Số dòng</span>
//                   <span className="font-semibold text-foreground">
//                     {examMatrix.details.filter((d) => d.questionType === "Trắc nghiệm").length}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Tổng câu</span>
//                   <span className="font-semibold text-foreground">
//                     {examMatrix.details
//                       .filter((d) => d.questionType === "Trắc nghiệm")
//                       .reduce((sum, d) => sum + d.quantity, 0)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm border-t border-border/30 pt-2 mt-2">
//                   <span className="text-muted-foreground">Điểm</span>
//                   <span className="font-semibold text-primary text-lg">
//                     {examMatrix.details
//                       .filter((d) => d.questionType === "Trắc nghiệm")
//                       .reduce((sum, d) => sum + d.quantity * d.scorePerQuestion, 0)}
//                   </span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-border/50 bg-gradient-to-br from-purple-500/5 to-purple-500/0">
//             <CardHeader>
//               <CardTitle className="text-base flex items-center gap-2">
//                 <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
//                 Tự luận
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Số dòng</span>
//                   <span className="font-semibold text-foreground">
//                     {examMatrix.details.filter((d) => d.questionType === "Tự luận").length}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Tổng câu</span>
//                   <span className="font-semibold text-foreground">
//                     {examMatrix.details
//                       .filter((d) => d.questionType === "Tự luận")
//                       .reduce((sum, d) => sum + d.quantity, 0)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm border-t border-border/30 pt-2 mt-2">
//                   <span className="text-muted-foreground">Điểm</span>
//                   <span className="font-semibold text-primary text-lg">
//                     {examMatrix.details
//                       .filter((d) => d.questionType === "Tự luận")
//                       .reduce((sum, d) => sum + d.quantity * d.scorePerQuestion, 0)}
//                   </span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-border/50 bg-gradient-to-br from-amber-500/5 to-amber-500/0">
//             <CardHeader>
//               <CardTitle className="text-base flex items-center gap-2">
//                 <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
//                 Tổng cộng
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Số dòng</span>
//                   <span className="font-semibold text-foreground">{examMatrix.details.length}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Tổng câu</span>
//                   <span className="font-semibold text-foreground">
//                     {examMatrix.details.reduce((sum, d) => sum + d.quantity, 0)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm border-t border-border/30 pt-2 mt-2">
//                   <span className="text-muted-foreground">Tổng điểm</span>
//                   <span className="font-bold text-primary text-lg">{totalScore}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Meta Information */}
       
//       </div>
//     </div>
//   )
// }
