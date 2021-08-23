using Microsoft.EntityFrameworkCore.Migrations;

namespace projekat_finalWebAPI.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Prodavnica",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(225)", maxLength: 225, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prodavnica", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Kategorija",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    opis = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    slika = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    prodavnicaid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategorija", x => x.id);
                    table.ForeignKey(
                        name: "FK_Kategorija_Prodavnica_prodavnicaid",
                        column: x => x.prodavnicaid,
                        principalTable: "Prodavnica",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Komponenta",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    cena = table.Column<int>(type: "int", nullable: false),
                    kolicina = table.Column<int>(type: "int", nullable: false),
                    slika = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    kategorijaid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Komponenta", x => x.id);
                    table.ForeignKey(
                        name: "FK_Komponenta_Kategorija_kategorijaid",
                        column: x => x.kategorijaid,
                        principalTable: "Kategorija",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kategorija_prodavnicaid",
                table: "Kategorija",
                column: "prodavnicaid");

            migrationBuilder.CreateIndex(
                name: "IX_Komponenta_kategorijaid",
                table: "Komponenta",
                column: "kategorijaid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Komponenta");

            migrationBuilder.DropTable(
                name: "Kategorija");

            migrationBuilder.DropTable(
                name: "Prodavnica");
        }
    }
}
