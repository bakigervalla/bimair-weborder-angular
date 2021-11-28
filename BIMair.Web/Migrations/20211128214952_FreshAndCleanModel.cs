using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BIMair.Web.Migrations
{
    public partial class FreshAndCleanModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "App_OrderDetails");

            migrationBuilder.DropTable(
                name: "App_Orders");

            migrationBuilder.DropTable(
                name: "App_Products");

            migrationBuilder.DropTable(
                name: "App_ProductCategories");

            migrationBuilder.CreateTable(
                name: "App_OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Position = table.Column<int>(type: "int", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Number = table.Column<int>(type: "int", nullable: false),
                    A = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    B = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    C = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    D = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    E = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    F = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    G1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    G2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    H1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    H2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    I1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    I2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    K1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    K2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    L1 = table.Column<int>(type: "int", nullable: false),
                    L2 = table.Column<int>(type: "int", nullable: false),
                    L3 = table.Column<int>(type: "int", nullable: false),
                    L4 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Connection1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Connection2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Connection3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Diameter1 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Diameter2 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Length = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ProductType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: true),
                    ApplicationUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_App_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_App_OrderItems_App_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "App_Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_App_OrderItems_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_App_OrderItems_ApplicationUserId",
                table: "App_OrderItems",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_App_OrderItems_ProjectId",
                table: "App_OrderItems",
                column: "ProjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "App_OrderItems");

            migrationBuilder.RenameColumn(
                name: "Reference",
                table: "App_Projects",
                newName: "Refrence");

            migrationBuilder.CreateTable(
                name: "App_Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CashierId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Comments = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_App_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_App_Orders_App_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "App_Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_App_Orders_App_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "App_Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_App_Orders_AspNetUsers_CashierId",
                        column: x => x.CashierId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "App_ProductCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_App_ProductCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "App_Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BuyingPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Icon = table.Column<string>(type: "varchar(256)", unicode: false, maxLength: 256, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsDiscontinued = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    ProductCategoryId = table.Column<int>(type: "int", nullable: false),
                    SellingPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UnitsInStock = table.Column<int>(type: "int", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_App_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_App_Products_App_ProductCategories_ProductCategoryId",
                        column: x => x.ProductCategoryId,
                        principalTable: "App_ProductCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_App_Products_App_Products_ParentId",
                        column: x => x.ParentId,
                        principalTable: "App_Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "App_OrderDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_App_OrderDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_App_OrderDetails_App_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "App_Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_App_OrderDetails_App_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "App_Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_App_OrderDetails_OrderId",
                table: "App_OrderDetails",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_App_OrderDetails_ProductId",
                table: "App_OrderDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_App_Orders_CashierId",
                table: "App_Orders",
                column: "CashierId");

            migrationBuilder.CreateIndex(
                name: "IX_App_Orders_CustomerId",
                table: "App_Orders",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_App_Orders_ProjectId",
                table: "App_Orders",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_App_Products_Name",
                table: "App_Products",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_App_Products_ParentId",
                table: "App_Products",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_App_Products_ProductCategoryId",
                table: "App_Products",
                column: "ProductCategoryId");
        }
    }
}
