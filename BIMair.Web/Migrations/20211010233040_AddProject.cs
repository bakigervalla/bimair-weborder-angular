using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BIMair.Migrations
{
    public partial class AddProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppOrderDetails_AppOrders_OrderId",
                table: "App_OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_AppOrderDetails_AppProducts_ProductId",
                table: "App_OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_AppOrders_AppCustomers_CustomerId",
                table: "App_Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_AppOrders_AspNetUsers_CashierId",
                table: "App_Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_AppProducts_AppProductCategories_ProductCategoryId",
                table: "App_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_AppProducts_AppProducts_ParentId",
                table: "App_Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppProducts",
                table: "App_Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppProductCategories",
                table: "App_ProductCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppOrders",
                table: "App_Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppOrderDetails",
                table: "App_OrderDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppCustomers",
                table: "App_Customers");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "App_Customers");

            migrationBuilder.RenameTable(
                name: "App_Products",
                newName: "App_Products");

            migrationBuilder.RenameTable(
                name: "App_ProductCategories",
                newName: "App_ProductCategories");

            migrationBuilder.RenameTable(
                name: "App_Orders",
                newName: "App_Orders");

            migrationBuilder.RenameTable(
                name: "App_OrderDetails",
                newName: "App_OrderDetails");

            migrationBuilder.RenameTable(
                name: "App_Customers",
                newName: "App_Customers");

            migrationBuilder.RenameIndex(
                name: "IX_AppProducts_ProductCategoryId",
                table: "App_Products",
                newName: "IX_App_Products_ProductCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_AppProducts_ParentId",
                table: "App_Products",
                newName: "IX_App_Products_ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_AppProducts_Name",
                table: "App_Products",
                newName: "IX_App_Products_Name");

            migrationBuilder.RenameIndex(
                name: "IX_AppOrders_CustomerId",
                table: "App_Orders",
                newName: "IX_App_Orders_CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_AppOrders_CashierId",
                table: "App_Orders",
                newName: "IX_App_Orders_CashierId");

            migrationBuilder.RenameIndex(
                name: "IX_AppOrderDetails_ProductId",
                table: "App_OrderDetails",
                newName: "IX_App_OrderDetails_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_AppOrderDetails_OrderId",
                table: "App_OrderDetails",
                newName: "IX_App_OrderDetails_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_AppCustomers_Name",
                table: "App_Customers",
                newName: "IX_App_Customers_Name");

            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "App_Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Country",
                table: "App_Customers",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_App_Products",
                table: "App_Products",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_App_ProductCategories",
                table: "App_ProductCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_App_Orders",
                table: "App_Orders",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_App_OrderDetails",
                table: "App_OrderDetails",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_App_Customers",
                table: "App_Customers",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "App_Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Refrence = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeliveryAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeliveryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RectangularDuctwork = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoundDuctwork = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalList = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_App_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_App_Projects_App_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "App_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_App_Orders_ProjectId",
                table: "App_Orders",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_App_Projects_CustomerId",
                table: "App_Projects",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_App_Projects_Name",
                table: "App_Projects",
                column: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_App_OrderDetails_App_Orders_OrderId",
                table: "App_OrderDetails",
                column: "OrderId",
                principalTable: "App_Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_App_OrderDetails_App_Products_ProductId",
                table: "App_OrderDetails",
                column: "ProductId",
                principalTable: "App_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_App_Orders_App_Customers_CustomerId",
                table: "App_Orders",
                column: "CustomerId",
                principalTable: "App_Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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

            migrationBuilder.AddForeignKey(
                name: "FK_App_Products_App_ProductCategories_ProductCategoryId",
                table: "App_Products",
                column: "ProductCategoryId",
                principalTable: "App_ProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_App_Products_App_Products_ParentId",
                table: "App_Products",
                column: "ParentId",
                principalTable: "App_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_App_OrderDetails_App_Orders_OrderId",
                table: "App_OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_App_OrderDetails_App_Products_ProductId",
                table: "App_OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_App_Orders_App_Customers_CustomerId",
                table: "App_Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_App_Orders_App_Projects_ProjectId",
                table: "App_Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_App_Orders_AspNetUsers_CashierId",
                table: "App_Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_App_Products_App_ProductCategories_ProductCategoryId",
                table: "App_Products");

            migrationBuilder.DropForeignKey(
                name: "FK_App_Products_App_Products_ParentId",
                table: "App_Products");

            migrationBuilder.DropTable(
                name: "App_Projects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_App_Products",
                table: "App_Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_App_ProductCategories",
                table: "App_ProductCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_App_Orders",
                table: "App_Orders");

            migrationBuilder.DropIndex(
                name: "IX_App_Orders_ProjectId",
                table: "App_Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_App_OrderDetails",
                table: "App_OrderDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_App_Customers",
                table: "App_Customers");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "App_Orders");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "App_Customers");

            migrationBuilder.RenameTable(
                name: "App_Products",
                newName: "App_Products");

            migrationBuilder.RenameTable(
                name: "App_ProductCategories",
                newName: "App_ProductCategories");

            migrationBuilder.RenameTable(
                name: "App_Orders",
                newName: "App_Orders");

            migrationBuilder.RenameTable(
                name: "App_OrderDetails",
                newName: "App_OrderDetails");

            migrationBuilder.RenameTable(
                name: "App_Customers",
                newName: "App_Customers");

            migrationBuilder.RenameIndex(
                name: "IX_App_Products_ProductCategoryId",
                table: "App_Products",
                newName: "IX_AppProducts_ProductCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_App_Products_ParentId",
                table: "App_Products",
                newName: "IX_AppProducts_ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_App_Products_Name",
                table: "App_Products",
                newName: "IX_AppProducts_Name");

            migrationBuilder.RenameIndex(
                name: "IX_App_Orders_CustomerId",
                table: "App_Orders",
                newName: "IX_AppOrders_CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_App_Orders_CashierId",
                table: "App_Orders",
                newName: "IX_AppOrders_CashierId");

            migrationBuilder.RenameIndex(
                name: "IX_App_OrderDetails_ProductId",
                table: "App_OrderDetails",
                newName: "IX_AppOrderDetails_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_App_OrderDetails_OrderId",
                table: "App_OrderDetails",
                newName: "IX_AppOrderDetails_OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_App_Customers_Name",
                table: "App_Customers",
                newName: "IX_AppCustomers_Name");

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "App_Customers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppProducts",
                table: "App_Products",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppProductCategories",
                table: "App_ProductCategories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppOrders",
                table: "App_Orders",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppOrderDetails",
                table: "App_OrderDetails",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppCustomers",
                table: "App_Customers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrderDetails_AppOrders_OrderId",
                table: "App_OrderDetails",
                column: "OrderId",
                principalTable: "App_Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrderDetails_AppProducts_ProductId",
                table: "App_OrderDetails",
                column: "ProductId",
                principalTable: "App_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrders_AppCustomers_CustomerId",
                table: "App_Orders",
                column: "CustomerId",
                principalTable: "App_Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppOrders_AspNetUsers_CashierId",
                table: "App_Orders",
                column: "CashierId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppProducts_AppProductCategories_ProductCategoryId",
                table: "App_Products",
                column: "ProductCategoryId",
                principalTable: "App_ProductCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppProducts_AppProducts_ParentId",
                table: "App_Products",
                column: "ParentId",
                principalTable: "App_Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
