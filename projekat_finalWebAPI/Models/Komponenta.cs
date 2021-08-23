using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace projekat_finalWebAPI.Models
{
    [Table("Komponenta")]
    public class Komponenta
    {
        [Key]
        [Column("id")]
        public int id { get; set; }

        [Column("naziv")]
        [MaxLength(255)]
        public string naziv { get; set; }

        [Column("cena")]
        public int cena { get; set; }

        [Column("kolicina")]
        public int kolicina { get; set; }

        [Column("slika")]
        [MaxLength(255)]
        public string slika { get; set; }

        [JsonIgnore]
        public Kategorija kategorija { get; set; }
    }
}