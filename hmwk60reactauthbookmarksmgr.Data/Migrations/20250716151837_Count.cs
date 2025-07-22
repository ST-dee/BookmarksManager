using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hmwk60reactauthbookmarksmgr.Data.Migrations
{
    /// <inheritdoc />
    public partial class Count : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Bookmarks",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "Bookmarks");
        }
    }
}
