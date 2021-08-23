using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using projekat_finalWebAPI.Models;

namespace projekat_finalWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdavnicaController : ControllerBase
    {
        public ProdavnicaContext context { get; set; }
        public ProdavnicaController(ProdavnicaContext c)
        {
            context=c;
        }

        [Route("PreuzmiProdavnice")]
        [HttpGet]
        public async Task<List<Prodavnica>> PreuzmiProdavnice()
        {
            return await context.prodavnice.Include(p => p.kategorije).ThenInclude(p => p.komponente).ToListAsync();
        }

        [Route("UpisiProdavnicu")]
        [HttpPost]
        public async Task UpisiProdavnicu([FromBody] Prodavnica p)
        {
            context.prodavnice.Add(p);
            await context.SaveChangesAsync();
        }

        [Route("AzurirajProdavnicu")]
        [HttpPut]
        public async Task AzurirajProdavnicu([FromBody] Prodavnica p)
        {
            context.Update<Prodavnica>(p);
            await context.SaveChangesAsync();
        }

        [Route("ObrisiProdavnicu/{id}")]
        [HttpDelete]
        public async Task ObrisiProdavnicu(int id)
        {
            var p =await context.FindAsync<Prodavnica>(id);
            context.Remove(p);
            await context.SaveChangesAsync();
        }

        [Route("UpisiKategoriju/{idProdavnice}")]
        [HttpPost]
        public async Task UpisiKategoriju(int idProdavnice,[FromBody] Kategorija k)
        {
            var p =await context.prodavnice.FindAsync(idProdavnice);
            k.prodavnica=p;
            context.kategorije.Add(k);
            await context.SaveChangesAsync();
        }

        [Route("ObrisiKategoriju/{id}")]
        [HttpDelete]
        public async Task ObrisiKategoriju(int id)
        {
            var k = await context.FindAsync<Kategorija>(id);
            context.Remove(k);
            await context.SaveChangesAsync();
        }
        


        [Route("UpisiKomponentu/{idKategorije}")]
        [HttpPost]
        public async Task<IActionResult> UpisiKomponentu(int idKategorije, [FromBody] Komponenta k)
        {
            var kat =  await context.kategorije.FindAsync(idKategorije);
            k.kategorija=kat;

            if (k.naziv=="" || k.cena<1 || k.kolicina<0 || k.slika=="")
            {
                return StatusCode(406);
            }
            else
            {
                context.komponente.Add(k);
                await context.SaveChangesAsync();
                int a=k.id;
                return Ok(a);
            }
        }

        [Route("AzurirajKomponentu/{idProdavnice}/{naziv}/{kategorija}/{kolicina}/{cena}")]
        [HttpPut]
        public async Task AzurirajKomponentu(int idProdavnice,string kategorija, string naziv, int kolicina, int cena)
        {
                var p= context.prodavnice.Include(p => p.kategorije).ThenInclude(p =>p.komponente).Where(p => p.id==idProdavnice).FirstOrDefault();
                var nizKategorija=p.kategorije;
                var nizKomponenti=new List<Komponenta>();
                nizKategorija.ForEach(kat => {
                    if(kat.naziv==kategorija){
                        nizKomponenti=kat.komponente;
                    }
                 }); 
                nizKomponenti.ForEach(komp => {
                    if(komp.naziv==naziv){
                        komp.cena=cena;
                        komp.kolicina=kolicina;
                        context.Update<Prodavnica>(p);
                    }
                });
                await context.SaveChangesAsync();
        }

        [Route("ObrisiKomponentu/{id}")]
        [HttpDelete]
        public async Task ObrisiKomponentu(int id)
        {
            var k = await context.FindAsync<Komponenta>(id);
            context.Remove(k);
            await context.SaveChangesAsync();
        }

    }
}
