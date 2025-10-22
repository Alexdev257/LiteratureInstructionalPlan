using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTableName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answerguides_Exams_ExamId",
                table: "Answerguides");

            migrationBuilder.DropForeignKey(
                name: "FK_Examanswers_Examattempts_AttemptId",
                table: "Examanswers");

            migrationBuilder.DropForeignKey(
                name: "FK_Examanswers_Practicequestions_QuestionId",
                table: "Examanswers");

            migrationBuilder.DropForeignKey(
                name: "FK_Examattempts_Exams_ExamId",
                table: "Examattempts");

            migrationBuilder.DropForeignKey(
                name: "FK_Examattempts_Users_UserId",
                table: "Examattempts");

            migrationBuilder.DropForeignKey(
                name: "FK_Exammatrices_Gradelevels_GradeLevelId",
                table: "Exammatrices");

            migrationBuilder.DropForeignKey(
                name: "FK_Exammatrices_Users_CreatedByNavigationUserId",
                table: "Exammatrices");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamMatrixDetails_Exammatrices_ExamMatrixMatrixId",
                table: "ExamMatrixDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamPracticeQuestion_Practicequestions_QuestionsQuestionId",
                table: "ExamPracticeQuestion");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Exammatrices_MatrixId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Examtypes_ExamTypeId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_Gradelevels_GradeLevelId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Practicequestions_Gradelevels_GradeLevelId",
                table: "Practicequestions");

            migrationBuilder.DropForeignKey(
                name: "FK_Practicequestions_Users_CreatedByNavigationUserId",
                table: "Practicequestions");

            migrationBuilder.DropForeignKey(
                name: "FK_Templatebookings_Payments_PaymentId",
                table: "Templatebookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Templatebookings_Templates_TemplateId",
                table: "Templatebookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Templatebookings_Users_UserId",
                table: "Templatebookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Templates_Gradelevels_GradeLevelId",
                table: "Templates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Practicequestions",
                table: "Practicequestions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Gradelevels",
                table: "Gradelevels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Examtypes",
                table: "Examtypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Exammatrices",
                table: "Exammatrices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Examattempts",
                table: "Examattempts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Examanswers",
                table: "Examanswers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Answerguides",
                table: "Answerguides");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Templatebookings",
                table: "Templatebookings");

            migrationBuilder.RenameTable(
                name: "Practicequestions",
                newName: "PracticeQuestions");

            migrationBuilder.RenameTable(
                name: "Gradelevels",
                newName: "GradeLevels");

            migrationBuilder.RenameTable(
                name: "Examtypes",
                newName: "ExamTypes");

            migrationBuilder.RenameTable(
                name: "Exammatrices",
                newName: "ExamMatrices");

            migrationBuilder.RenameTable(
                name: "Examattempts",
                newName: "ExamAttempts");

            migrationBuilder.RenameTable(
                name: "Examanswers",
                newName: "ExamAnswers");

            migrationBuilder.RenameTable(
                name: "Answerguides",
                newName: "AnswerGuides");

            migrationBuilder.RenameTable(
                name: "Templatebookings",
                newName: "TemplateOrders");

            migrationBuilder.RenameIndex(
                name: "IX_Practicequestions_GradeLevelId",
                table: "PracticeQuestions",
                newName: "IX_PracticeQuestions_GradeLevelId");

            migrationBuilder.RenameIndex(
                name: "IX_Practicequestions_CreatedByNavigationUserId",
                table: "PracticeQuestions",
                newName: "IX_PracticeQuestions_CreatedByNavigationUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Exammatrices_GradeLevelId",
                table: "ExamMatrices",
                newName: "IX_ExamMatrices_GradeLevelId");

            migrationBuilder.RenameIndex(
                name: "IX_Exammatrices_CreatedByNavigationUserId",
                table: "ExamMatrices",
                newName: "IX_ExamMatrices_CreatedByNavigationUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Examattempts_UserId",
                table: "ExamAttempts",
                newName: "IX_ExamAttempts_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Examattempts_ExamId",
                table: "ExamAttempts",
                newName: "IX_ExamAttempts_ExamId");

            migrationBuilder.RenameIndex(
                name: "IX_Examanswers_QuestionId",
                table: "ExamAnswers",
                newName: "IX_ExamAnswers_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_Examanswers_AttemptId",
                table: "ExamAnswers",
                newName: "IX_ExamAnswers_AttemptId");

            migrationBuilder.RenameIndex(
                name: "IX_Answerguides_ExamId",
                table: "AnswerGuides",
                newName: "IX_AnswerGuides_ExamId");

            migrationBuilder.RenameIndex(
                name: "IX_Templatebookings_UserId",
                table: "TemplateOrders",
                newName: "IX_TemplateOrders_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Templatebookings_TemplateId",
                table: "TemplateOrders",
                newName: "IX_TemplateOrders_TemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_Templatebookings_PaymentId",
                table: "TemplateOrders",
                newName: "IX_TemplateOrders_PaymentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PracticeQuestions",
                table: "PracticeQuestions",
                column: "QuestionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GradeLevels",
                table: "GradeLevels",
                column: "GradeLevelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamTypes",
                table: "ExamTypes",
                column: "ExamTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamMatrices",
                table: "ExamMatrices",
                column: "MatrixId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamAttempts",
                table: "ExamAttempts",
                column: "AttemptId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ExamAnswers",
                table: "ExamAnswers",
                column: "AnswerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnswerGuides",
                table: "AnswerGuides",
                column: "AnswerGuideId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TemplateOrders",
                table: "TemplateOrders",
                column: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_AnswerGuides_Exams_ExamId",
                table: "AnswerGuides",
                column: "ExamId",
                principalTable: "Exams",
                principalColumn: "ExamId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamAnswers_ExamAttempts_AttemptId",
                table: "ExamAnswers",
                column: "AttemptId",
                principalTable: "ExamAttempts",
                principalColumn: "AttemptId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamAnswers_PracticeQuestions_QuestionId",
                table: "ExamAnswers",
                column: "QuestionId",
                principalTable: "PracticeQuestions",
                principalColumn: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamAttempts_Exams_ExamId",
                table: "ExamAttempts",
                column: "ExamId",
                principalTable: "Exams",
                principalColumn: "ExamId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamAttempts_Users_UserId",
                table: "ExamAttempts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamMatrices_GradeLevels_GradeLevelId",
                table: "ExamMatrices",
                column: "GradeLevelId",
                principalTable: "GradeLevels",
                principalColumn: "GradeLevelId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamMatrices_Users_CreatedByNavigationUserId",
                table: "ExamMatrices",
                column: "CreatedByNavigationUserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamMatrixDetails_ExamMatrices_ExamMatrixMatrixId",
                table: "ExamMatrixDetails",
                column: "ExamMatrixMatrixId",
                principalTable: "ExamMatrices",
                principalColumn: "MatrixId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamPracticeQuestion_PracticeQuestions_QuestionsQuestionId",
                table: "ExamPracticeQuestion",
                column: "QuestionsQuestionId",
                principalTable: "PracticeQuestions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_ExamMatrices_MatrixId",
                table: "Exams",
                column: "MatrixId",
                principalTable: "ExamMatrices",
                principalColumn: "MatrixId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_ExamTypes_ExamTypeId",
                table: "Exams",
                column: "ExamTypeId",
                principalTable: "ExamTypes",
                principalColumn: "ExamTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_GradeLevels_GradeLevelId",
                table: "Exams",
                column: "GradeLevelId",
                principalTable: "GradeLevels",
                principalColumn: "GradeLevelId");

            migrationBuilder.AddForeignKey(
                name: "FK_PracticeQuestions_GradeLevels_GradeLevelId",
                table: "PracticeQuestions",
                column: "GradeLevelId",
                principalTable: "GradeLevels",
                principalColumn: "GradeLevelId");

            migrationBuilder.AddForeignKey(
                name: "FK_PracticeQuestions_Users_CreatedByNavigationUserId",
                table: "PracticeQuestions",
                column: "CreatedByNavigationUserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TemplateOrders_Payments_PaymentId",
                table: "TemplateOrders",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "PaymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_TemplateOrders_Templates_TemplateId",
                table: "TemplateOrders",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "TemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_TemplateOrders_Users_UserId",
                table: "TemplateOrders",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Templates_GradeLevels_GradeLevelId",
                table: "Templates",
                column: "GradeLevelId",
                principalTable: "GradeLevels",
                principalColumn: "GradeLevelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnswerGuides_Exams_ExamId",
                table: "AnswerGuides");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamAnswers_ExamAttempts_AttemptId",
                table: "ExamAnswers");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamAnswers_PracticeQuestions_QuestionId",
                table: "ExamAnswers");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamAttempts_Exams_ExamId",
                table: "ExamAttempts");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamAttempts_Users_UserId",
                table: "ExamAttempts");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamMatrices_GradeLevels_GradeLevelId",
                table: "ExamMatrices");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamMatrices_Users_CreatedByNavigationUserId",
                table: "ExamMatrices");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamMatrixDetails_ExamMatrices_ExamMatrixMatrixId",
                table: "ExamMatrixDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamPracticeQuestion_PracticeQuestions_QuestionsQuestionId",
                table: "ExamPracticeQuestion");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_ExamMatrices_MatrixId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_ExamTypes_ExamTypeId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams_GradeLevels_GradeLevelId",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_PracticeQuestions_GradeLevels_GradeLevelId",
                table: "PracticeQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_PracticeQuestions_Users_CreatedByNavigationUserId",
                table: "PracticeQuestions");

            migrationBuilder.DropForeignKey(
                name: "FK_TemplateOrders_Payments_PaymentId",
                table: "TemplateOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_TemplateOrders_Templates_TemplateId",
                table: "TemplateOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_TemplateOrders_Users_UserId",
                table: "TemplateOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_Templates_GradeLevels_GradeLevelId",
                table: "Templates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PracticeQuestions",
                table: "PracticeQuestions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GradeLevels",
                table: "GradeLevels");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExamTypes",
                table: "ExamTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExamMatrices",
                table: "ExamMatrices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExamAttempts",
                table: "ExamAttempts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ExamAnswers",
                table: "ExamAnswers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AnswerGuides",
                table: "AnswerGuides");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TemplateOrders",
                table: "TemplateOrders");

            migrationBuilder.RenameTable(
                name: "PracticeQuestions",
                newName: "Practicequestions");

            migrationBuilder.RenameTable(
                name: "GradeLevels",
                newName: "Gradelevels");

            migrationBuilder.RenameTable(
                name: "ExamTypes",
                newName: "Examtypes");

            migrationBuilder.RenameTable(
                name: "ExamMatrices",
                newName: "Exammatrices");

            migrationBuilder.RenameTable(
                name: "ExamAttempts",
                newName: "Examattempts");

            migrationBuilder.RenameTable(
                name: "ExamAnswers",
                newName: "Examanswers");

            migrationBuilder.RenameTable(
                name: "AnswerGuides",
                newName: "Answerguides");

            migrationBuilder.RenameTable(
                name: "TemplateOrders",
                newName: "Templatebookings");

            migrationBuilder.RenameIndex(
                name: "IX_PracticeQuestions_GradeLevelId",
                table: "Practicequestions",
                newName: "IX_Practicequestions_GradeLevelId");

            migrationBuilder.RenameIndex(
                name: "IX_PracticeQuestions_CreatedByNavigationUserId",
                table: "Practicequestions",
                newName: "IX_Practicequestions_CreatedByNavigationUserId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamMatrices_GradeLevelId",
                table: "Exammatrices",
                newName: "IX_Exammatrices_GradeLevelId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamMatrices_CreatedByNavigationUserId",
                table: "Exammatrices",
                newName: "IX_Exammatrices_CreatedByNavigationUserId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamAttempts_UserId",
                table: "Examattempts",
                newName: "IX_Examattempts_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamAttempts_ExamId",
                table: "Examattempts",
                newName: "IX_Examattempts_ExamId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamAnswers_QuestionId",
                table: "Examanswers",
                newName: "IX_Examanswers_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_ExamAnswers_AttemptId",
                table: "Examanswers",
                newName: "IX_Examanswers_AttemptId");

            migrationBuilder.RenameIndex(
                name: "IX_AnswerGuides_ExamId",
                table: "Answerguides",
                newName: "IX_Answerguides_ExamId");

            migrationBuilder.RenameIndex(
                name: "IX_TemplateOrders_UserId",
                table: "Templatebookings",
                newName: "IX_Templatebookings_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_TemplateOrders_TemplateId",
                table: "Templatebookings",
                newName: "IX_Templatebookings_TemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_TemplateOrders_PaymentId",
                table: "Templatebookings",
                newName: "IX_Templatebookings_PaymentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Practicequestions",
                table: "Practicequestions",
                column: "QuestionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Gradelevels",
                table: "Gradelevels",
                column: "GradeLevelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Examtypes",
                table: "Examtypes",
                column: "ExamTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Exammatrices",
                table: "Exammatrices",
                column: "MatrixId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Examattempts",
                table: "Examattempts",
                column: "AttemptId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Examanswers",
                table: "Examanswers",
                column: "AnswerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Answerguides",
                table: "Answerguides",
                column: "AnswerGuideId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Templatebookings",
                table: "Templatebookings",
                column: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answerguides_Exams_ExamId",
                table: "Answerguides",
                column: "ExamId",
                principalTable: "Exams",
                principalColumn: "ExamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Examanswers_Examattempts_AttemptId",
                table: "Examanswers",
                column: "AttemptId",
                principalTable: "Examattempts",
                principalColumn: "AttemptId");

            migrationBuilder.AddForeignKey(
                name: "FK_Examanswers_Practicequestions_QuestionId",
                table: "Examanswers",
                column: "QuestionId",
                principalTable: "Practicequestions",
                principalColumn: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Examattempts_Exams_ExamId",
                table: "Examattempts",
                column: "ExamId",
                principalTable: "Exams",
                principalColumn: "ExamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Examattempts_Users_UserId",
                table: "Examattempts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exammatrices_Gradelevels_GradeLevelId",
                table: "Exammatrices",
                column: "GradeLevelId",
                principalTable: "Gradelevels",
                principalColumn: "GradeLevelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exammatrices_Users_CreatedByNavigationUserId",
                table: "Exammatrices",
                column: "CreatedByNavigationUserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamMatrixDetails_Exammatrices_ExamMatrixMatrixId",
                table: "ExamMatrixDetails",
                column: "ExamMatrixMatrixId",
                principalTable: "Exammatrices",
                principalColumn: "MatrixId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamPracticeQuestion_Practicequestions_QuestionsQuestionId",
                table: "ExamPracticeQuestion",
                column: "QuestionsQuestionId",
                principalTable: "Practicequestions",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Exammatrices_MatrixId",
                table: "Exams",
                column: "MatrixId",
                principalTable: "Exammatrices",
                principalColumn: "MatrixId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Examtypes_ExamTypeId",
                table: "Exams",
                column: "ExamTypeId",
                principalTable: "Examtypes",
                principalColumn: "ExamTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exams_Gradelevels_GradeLevelId",
                table: "Exams",
                column: "GradeLevelId",
                principalTable: "Gradelevels",
                principalColumn: "GradeLevelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Practicequestions_Gradelevels_GradeLevelId",
                table: "Practicequestions",
                column: "GradeLevelId",
                principalTable: "Gradelevels",
                principalColumn: "GradeLevelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Practicequestions_Users_CreatedByNavigationUserId",
                table: "Practicequestions",
                column: "CreatedByNavigationUserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Templatebookings_Payments_PaymentId",
                table: "Templatebookings",
                column: "PaymentId",
                principalTable: "Payments",
                principalColumn: "PaymentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Templatebookings_Templates_TemplateId",
                table: "Templatebookings",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "TemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Templatebookings_Users_UserId",
                table: "Templatebookings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Templates_Gradelevels_GradeLevelId",
                table: "Templates",
                column: "GradeLevelId",
                principalTable: "Gradelevels",
                principalColumn: "GradeLevelId");
        }
    }
}
