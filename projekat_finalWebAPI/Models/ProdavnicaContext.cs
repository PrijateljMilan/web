using Microsoft.EntityFrameworkCore;

namespace projekat_finalWebAPI.Models
{
    public class ProdavnicaContext : DbContext
    {
        public DbSet<Prodavnica> prodavnice { get; set; }
        public DbSet<Kategorija> kategorije { get; set; }
        public DbSet<Komponenta> komponente { get; set; }

        public ProdavnicaContext(DbContextOptions options) : base(options)
        {

        }
    }
}