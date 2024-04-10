using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mng.Data.Migrations
{
    public partial class updateDatePosition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartWorking",
                table: "EmployeesInPosition",
                newName: "StartPosition");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartPosition",
                table: "EmployeesInPosition",
                newName: "StartWorking");
        }
    }
}
