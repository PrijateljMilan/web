import {Prodavnica} from "./prodavnica.js";
import {Kategorija} from "./kategorija.js";
import { Komponenta } from "./komponenta.js";

fetch("https://localhost:5001/Prodavnica/PreuzmiProdavnice").then( p => {
    p.json().then(data => {
         

        data.forEach(shop => {
            
            let pr = new Prodavnica();
            
            shop.kategorije.forEach(category => {
                let cat = new Kategorija(category.id, category.naziv, category.opis, category.slika);
                
                category.komponente.forEach(product => {
                    let pro = new Komponenta(product.id, product.naziv, product.cena,
                         product.kolicina, product.slika);
                    cat.dodajProizvod(pro);
                });


                pr.dodajKategoriju(cat);
            });
            pr.crtaj(document.body);
            });
        });
    });

        
/*let pr = new Prodavnica();   
let kat=new Kategorija();
let kat2=new Kategorija();
let kat3=new Kategorija();
let kat4=new Kategorija();
pr.dodajKategoriju(kat);
pr.dodajKategoriju(kat2);
pr.dodajKategoriju(kat3);
pr.dodajKategoriju(kat4);


let proizvod = new Proizvod(3, "Mung pasulj", 465, 50, "500g", "slike/zitarice/MungoPasulj.jpg");
kat2.dodajProizvod(proizvod);

proizvod = new Proizvod(4, "Azuki pasulj", 400, 40, "500g", "slike/zitarice/AzukiPasulj.jpg");
kat2.dodajProizvod(proizvod);

proizvod = new Proizvod(5, "Integralna makarona", 100, 30, "400g", "slike/testenine/Testenine makaroni integralni_300x300.jpg");
kat4.dodajProizvod(proizvod);





pr.crtaj(document.body);

/*<meta charset="UTF-8"/>
<meta name = "viewport" content = "width=device-width, inital-scale = 1.0">
<link rel="stylesheet" href="stylesheet.css"/>
<link rel="shortcut icon" href="#" />*/
