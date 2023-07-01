using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loja.Domain.Infra.Migrations
{
    public partial class UpdateCarrinhoCompras : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AtualizadoEm",
                table: "CarrinhosCompras",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CriadoEm",
                table: "CarrinhosCompras",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "CarrinhosCompras",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Total",
                table: "CarrinhosCompras",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AtualizadoEm",
                table: "CarrinhosCompras");

            migrationBuilder.DropColumn(
                name: "CriadoEm",
                table: "CarrinhosCompras");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "CarrinhosCompras");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "CarrinhosCompras");
        }
    }
}
