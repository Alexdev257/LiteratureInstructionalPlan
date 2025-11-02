using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBExamMatrixMatrixID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExamMatricId",
                table: "ExamMatrixDetails");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExamMatricId",
                table: "ExamMatrixDetails",
                type: "int",
                nullable: true);
        }
    }
}
