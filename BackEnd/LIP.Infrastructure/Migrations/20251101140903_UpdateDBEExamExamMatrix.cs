using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBEExamExamMatrix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Exams");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ExamMatrices");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "Exams",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CreatedBy",
                table: "ExamMatrices",
                type: "int",
                nullable: true);
        }
    }
}
