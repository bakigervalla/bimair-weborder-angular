using Microsoft.EntityFrameworkCore.Migrations;

namespace BIMair.Web.Migrations
{
    public partial class OrderItemsDiamtersToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Length",
                table: "App_OrderItems",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<string>(
                name: "Diameter2",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldMaxLength: 85);

            migrationBuilder.AlterColumn<string>(
                name: "Diameter1",
                table: "App_OrderItems",
                type: "nvarchar(85)",
                maxLength: 85,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldMaxLength: 85);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Length",
                table: "App_OrderItems",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Diameter2",
                table: "App_OrderItems",
                type: "decimal(18,2)",
                maxLength: 85,
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Diameter1",
                table: "App_OrderItems",
                type: "decimal(18,2)",
                maxLength: 85,
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(string),
                oldType: "nvarchar(85)",
                oldMaxLength: 85,
                oldNullable: true);
        }
    }
}
