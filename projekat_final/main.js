import {Prodavnica} from "./prodavnica.js";
import {Kategorija} from "./kategorija.js";
import { Komponenta } from "./komponenta.js";

fetch("https://localhost:5001/Prodavnica/PreuzmiProdavnice").then( p => {
    p.json().then(data => {
         

        data.forEach(shop => {
            
            let pr = new Prodavnica(shop.id, shop.naziv);

            
            shop.kategorije.forEach(category => {
                let cat = new Kategorija(category.id, category.naziv, category.opis, category.slika);
                
                
                category.komponente.forEach(product => {
                    let pro = new Komponenta(product.id, product.naziv, product.cena,
                         product.kolicina, product.slika);
                    cat.dodajProizvod(pro);
                });


                pr.dodajKategoriju(cat);
            });
            //console.log(pr);
            pr.crtaj(document.body);
            });

        });
    });

