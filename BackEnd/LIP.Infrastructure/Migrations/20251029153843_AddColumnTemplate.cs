using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LIP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddColumnTemplate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ViewPath",
                table: "Templates",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ViewPath",
                table: "Templates");
        }
    }
}
