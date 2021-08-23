using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projekat_finalWebAPI.Models
{
    [Table("Prodavnica")]
    public class Prodavnica
    {
        [Key]
        [Column("id")]
        public int id { get; set; }
        
        [Column("naziv")]
        [MaxLength(225)]
        public string naziv { get; set; }

        public virtual List<Kategorija> kategorije { get; set; }
    }
}