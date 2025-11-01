using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBCorrectAnswer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CorrectAnswer",
                table: "PracticeQuestions",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CorrectAnswer",
                table: "PracticeQuestions");
        }
    }
}
