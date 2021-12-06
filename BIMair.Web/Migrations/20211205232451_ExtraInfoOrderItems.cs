using Microsoft.EntityFrameworkCore.Migrations;

namespace BIMair.Web.Migrations
{
    public partial class ExtraInfoOrderItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_App_OrderItems_App_Projects_ProjectId1",
                table: "App_OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_App_OrderItems_ProjectId1",
                table: "App_OrderItems");

            migrationBuilder.DropColumn(
                name: "ProjectId1",
                table: "App_OrderItems");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "App_OrderItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Position",
                table: "App_OrderItems",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_App_OrderItems_ProjectId",
                table: "App_OrderItems",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_App_OrderItems_App_Projects_ProjectId",
                table: "App_OrderItems",
                column: "ProjectId",
                principalTable: "App_Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_App_OrderItems_App_Projects_ProjectId",
                table: "App_OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_App_OrderItems_ProjectId",
                table: "App_OrderItems");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProjectId",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Position",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProjectId1",
                table: "App_OrderItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_App_OrderItems_ProjectId1",
                table: "App_OrderItems",
                column: "ProjectId1");

            migrationBuilder.AddForeignKey(
                name: "FK_App_OrderItems_App_Projects_ProjectId1",
                table: "App_OrderItems",
                column: "ProjectId1",
                principalTable: "App_Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
