import {Kategorija} from "./kategorija.js"
import { Komponenta } from "./komponenta.js";

export class Prodavnica

{
    constructor(){
        this.kategorije = [];
        this.container = null;
    }

    dodajKategoriju(kat){
        this.kategorije.push(kat);
    }

    crtaj(host){
        if(!host)
        throw new Error("Host nije definisan");

        //dodajemo header
        const pozadina = document.createElement("div");
        pozadina.className = "pozadina";
        host.appendChild(pozadina);

        const naslov = document.createElement("div");
        naslov.className = "naslov";
        naslov.innerHTML = "PRODAVNICA PC KOMPONENTI";
        pozadina.appendChild(naslov);

        //dodajemo meni
        const meni = document.createElement("div");
        meni.className = "meni";
        host.appendChild(meni);

        //kreiramo listu
        const lista = document.createElement("ul");
        lista.className = "lista";
        meni.appendChild(lista);


        const linkPocetna = document.createElement("a");
        linkPocetna.href = "#";
        linkPocetna.className = "link";
        lista.appendChild(linkPocetna);

        const pocetna = document.createElement("li");
        pocetna.innerHTML = "Pocetna";
        linkPocetna.appendChild(pocetna);


        // pocetna stranica iscrtavanje
        const pocetnaStranica = document.createElement("div");
        pocetnaStranica.className = "pocetnaStranica";
        host.appendChild(pocetnaStranica);

        // dodavanje forme za izmenu i unos novih proizvoda
        this.crtajFormu(pocetnaStranica);
        
        let value = 0;
        // crtanje delova za kategorije
        this.kategorije.forEach(element => {
            element.prodavnica = this;
            element.crtajKategoriju(document.body, lista, pocetnaStranica, value++);
        });

    }

    crtajFormu(pocetnaStranica)
    {
        const forma = document.createElement("div");
        forma.className = "forma";
        pocetnaStranica.appendChild(forma);

        const destForma = document.createElement("a");
        destForma.name = "forma";
        forma.appendChild(destForma);

        this.crtajElementForme(forma, "ID: ", "number", "id");
        document.querySelector(".id").disabled = true;
        this.crtajElementForme(forma, "Naziv: ", "text", "naziv");
        this.crtajElementForme(forma, "Cena: ", "number", "cena");
        this.crtajElementForme(forma, "Na stanju: ", "number", "kolicina");
        this.crtajElementForme(forma, "Lokacija slike: ", "text", "slika");

        // izbor kategorije
        let elContainer = document.createElement("div");
        elContainer.className = "elContainer";
        forma.appendChild(elContainer);

        let labela = document.createElement("label");
        labela.innerHTML = "Kategorija: ";
        elContainer.appendChild(labela);

        let el = document.createElement("select");
        el.className = "DDList";
        elContainer.appendChild(el);

        let buttonBox = document.createElement("div");
        buttonBox.className = "buttonBox";
        forma.appendChild(buttonBox);

        let button = document.createElement("button");
        button.innerHTML = "Dodaj proizvod";
        buttonBox.appendChild(button);
        button.onclick = (ev)=>{
            if(document.querySelector("button").innerHTML == "Dodaj proizvod")
                this.kreirajElement();
            else this.izmeniElement();
        } 
        
        button = document.createElement("button");
        button.innerHTML = "X";
        button.style.display = "none";
        buttonBox.appendChild(button);
        button.onclick = (ev)=>{
            this.OcistiFormu();
            button.style.display = "none";
        } 
    }

    izmeniElement()
    {
        const id = document.querySelector(".id").value;
        for (const element of this.kategorije) {
            for (const el of element.komponente) {
                if(id == el.id)
                    {
                        el.izmeniProizvod();
                        return;
                    }
            }
        }
    }

    crtajElementForme(host, lblText, tip, className)
    {
        let elContainer = document.createElement("div");
        elContainer.className = "elContainer";
        host.appendChild(elContainer);

        let labela = document.createElement("label");
        labela.innerHTML = lblText;
        elContainer.appendChild(labela);

        let el = document.createElement("input");
        el.type = tip;
        el.className = className;
        elContainer.appendChild(el);
    }

    kreirajElement()
    {
        let naziv = document.querySelector(".naziv").value;
        let cena = document.querySelector(".cena").value;
        let kolicina = document.querySelector(".kolicina").value;
        let slika = document.querySelector(".slika").value;
        let kategorija = document.querySelector(".DDList");
        kategorija = kategorija[kategorija.selectedIndex].text;
        let id = 0;
        
        this.kategorije.forEach(element => {
            if(element.opis == kategorija)
            {
                fetch("https://localhost:5001/Prodavnica/UpisiKomponentu/" + element.id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        naziv: naziv,
                        cena: cena,
                        kolicina: kolicina,
                        slika: slika
                    })
                }).then(p => {
                    if(p.ok){
                        p.json().then(q => {

                        let proizvod = new Komponenta(q, naziv, cena, kolicina, slika);
                        proizvod.kategorija = element;
                        element.dodajProizvod(proizvod);
                        proizvod.crtajProizvod(element.proizvodiContainer);
                        this.OcistiFormu();
                        alert("Uspesno ste dodali novi proizvod!");
                        });
                    }
                    else if(p.status == 406){
                        alert("Input all informations.");
                    }
                }).catch (p => {
                    alert("Error");
                });
            }
        })
        document.querySelector(".id").disabled = true;
    }

    OcistiFormu()
    {
        document.querySelector(".id").value = "";
        document.querySelector(".id").disabled = true;
        document.querySelector(".naziv").value = "";
        document.querySelector(".cena").value = "";
        document.querySelector(".kolicina").value = "";
        document.querySelector(".slika").value = "";
        document.querySelector(".DDList").selectedIndex = 0;
        document.querySelector(".DDList").disabled = false;
        document.querySelector("button").innerHTML = "Dodaj proizvod";
    }
}