using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace projekat_finalWebAPI.Models
{
    [Table("Kategorija")]
    public class Kategorija
    {
        [Key]
        [Column("id")]
        public int id { get; set; }

        [Column("naziv")]
        [MaxLength(255)]
        public string naziv { get; set; }

        [Column("opis")]
        [MaxLength(255)]
        public string opis { get; set; }

        [Column("slika")]
        [MaxLength(255)]
        public string slika { get; set; }
        public virtual List<Komponenta> komponente { get; set; }

        [JsonIgnore]
        public Prodavnica prodavnica { get; set; }
    }
}