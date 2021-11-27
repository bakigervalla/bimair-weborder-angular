using Microsoft.EntityFrameworkCore.Migrations;

namespace BIMair.Web.Migrations
{
    public partial class AddedOrderAndOrderDetailsModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_App_Orders_App_Projects_ProjectId",
                table: "App_Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_App_Orders_AspNetUsers_CashierId",
                table: "App_Orders");

            migrationBuilder.DropIndex(
                name: "IX_App_Orders_ProjectId",
                table: "App_Orders");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "App_Orders");

            migrationBuilder.RenameColumn(
                name: "Comments",
                table: "App_Orders",
                newName: "Comment");

            migrationBuilder.RenameColumn(
                name: "CashierId",
                table: "App_Orders",
                newName: "ApplicationUserId");

            migrationBuilder.RenameIndex(
                name: "IX_App_Orders_CashierId",
                table: "App_Orders",
                newName: "IX_App_Orders_ApplicationUserId");

            migrationBuilder.RenameColumn(
                name: "UnitPrice",
                table: "App_OrderDetails",
                newName: "Length");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "App_OrderDetails",
                newName: "Position");

            migrationBuilder.RenameColumn(
                name: "Discount",
                table: "App_OrderDetails",
                newName: "Diameter2");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "App_Orders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmailTo",
                table: "App_Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "A",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "B",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "C",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Connection1",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Connection2",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Connection3",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "D",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Diameter1",
                table: "App_OrderDetails",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "E",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "F",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "G1",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "G2",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "H1",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "H2",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "I1",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "I2",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "K1",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "K2",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "L1",
                table: "App_OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "L2",
                table: "App_OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "L3",
                table: "App_OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "L4",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "App_OrderDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Number",
                table: "App_OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_App_Orders_ProjectId",
                table: "App_Orders",
                column: "ProjectId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_App_Orders_App_Projects_ProjectId",
                table: "App_Orders",
                column: "ProjectId",
                principalTable: "App_Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_App_Orders_AspNetUsers_ApplicationUserId",
                table: "App_Orders",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_App_Orders_App_Projects_ProjectId",
                table: "App_Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_App_Orders_AspNetUsers_ApplicationUserId",
                table: "App_Orders");

            migrationBuilder.DropIndex(
                name: "IX_App_Orders_ProjectId",
                table: "App_Orders");

            migrationBuilder.DropColumn(
                name: "EmailTo",
                table: "App_Orders");

            migrationBuilder.DropColumn(
                name: "A",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "B",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "C",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "Connection1",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "Connection2",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "Connection3",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "D",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "Diameter1",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "E",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "F",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "G1",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "G2",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "H1",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "H2",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "I1",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "I2",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "K1",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "K2",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "L1",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "L2",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "L3",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "L4",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "App_OrderDetails");

            migrationBuilder.DropColumn(
                name: "Number",
                table: "App_OrderDetails");

            migrationBuilder.RenameColumn(
                name: "Reference",
                table: "App_Projects",
                newName: "Refrence");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "App_Orders",
                newName: "Comments");

            migrationBuilder.RenameColumn(
                name: "ApplicationUserId",
                table: "App_Orders",
                newName: "CashierId");

            migrationBuilder.RenameIndex(
                name: "IX_App_Orders_ApplicationUserId",
                table: "App_Orders",
                newName: "IX_App_Orders_CashierId");

            migrationBuilder.RenameColumn(
                name: "Position",
                table: "App_OrderDetails",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "Length",
                table: "App_OrderDetails",
                newName: "UnitPrice");

            migrationBuilder.RenameColumn(
                name: "Diameter2",
                table: "App_OrderDetails",
                newName: "Discount");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "App_Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                table: "App_Orders",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_App_Orders_ProjectId",
                table: "App_Orders",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_App_Orders_App_Projects_ProjectId",
                table: "App_Orders",
                column: "ProjectId",
                principalTable: "App_Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_App_Orders_AspNetUsers_CashierId",
                table: "App_Orders",
                column: "CashierId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
