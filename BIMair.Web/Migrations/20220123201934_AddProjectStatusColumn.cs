using Microsoft.EntityFrameworkCore.Migrations;

namespace BIMair.Web.Migrations
{
    public partial class AddProjectStatusColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_App_OrderItems_App_Projects_ProjectId",
                table: "App_OrderItems");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "App_Projects",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "App_OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_App_OrderItems_App_Projects_ProjectId",
                table: "App_OrderItems",
                column: "ProjectId",
                principalTable: "App_Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_App_OrderItems_App_Projects_ProjectId",
                table: "App_OrderItems");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "App_Projects");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "App_OrderItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_App_OrderItems_App_Projects_ProjectId",
                table: "App_OrderItems",
                column: "ProjectId",
                principalTable: "App_Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
