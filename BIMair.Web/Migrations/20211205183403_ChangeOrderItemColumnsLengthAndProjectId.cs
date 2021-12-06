using Microsoft.EntityFrameworkCore.Migrations;

namespace BIMair.Web.Migrations
{
    public partial class ChangeOrderItemColumnsLengthAndProjectId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_App_OrderItems_App_Projects_ProjectId",
                table: "App_OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_App_OrderItems_ProjectId",
                table: "App_OrderItems");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectId",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProductType",
                table: "App_OrderItems",
                type: "nvarchar(25)",
                maxLength: 25,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "L4",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "L3",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "L2",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "L1",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "K2",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "K1",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "I2",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "I1",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "H2",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "H1",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "G2",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "G1",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "F",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "E",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "D",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Connection3",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Connection2",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Connection1",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "C",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "B",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "A",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProjectId1",
                table: "App_OrderItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_App_OrderItems_Code",
                table: "App_OrderItems",
                column: "Code");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_App_OrderItems_App_Projects_ProjectId1",
                table: "App_OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_App_OrderItems_Code",
                table: "App_OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_App_OrderItems_ProjectId1",
                table: "App_OrderItems");

            migrationBuilder.DropColumn(
                name: "ProjectId1",
                table: "App_OrderItems");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "App_OrderItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ProductType",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(25)",
                oldMaxLength: 25,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "L4",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "L3",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "L2",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "L1",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "K2",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "K1",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "I2",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "I1",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "H2",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "H1",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "G2",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "G1",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "F",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "E",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "D",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Connection3",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Connection2",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Connection1",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85);

            migrationBuilder.AlterColumn<string>(
                name: "C",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "B",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "A",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
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
    }
}
