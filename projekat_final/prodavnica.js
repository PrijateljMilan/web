import {Kategorija} from "./kategorija.js"
import { Komponenta } from "./komponenta.js";

export class Prodavnica

{
    constructor(id,naziv){
        this.id=id;
        this.naziv=naziv;
        this.kategorije = [];
        this.container = null;
        this.div=null; 
    }

    dodajKategoriju(kat){
        this.kategorije.push(kat);
    }

    crtaj(host){
        if(!host)
        throw new Error("Host nije definisan");

        const pozadina = document.createElement("div");
        pozadina.className = "pozadina";
        host.appendChild(pozadina);

        let naslov = document.createElement("div");
        naslov.className = "naslov";
        naslov.innerHTML = this.naziv;
        pozadina.appendChild(naslov);

        naslov = document.createElement("div");
        naslov.className = "naslov";
        naslov.innerHTML = "PRODAVNICA PC KOMPONENTI";
        pozadina.appendChild(naslov);

        const meni = document.createElement("div");
        meni.className = "meni";
        host.appendChild(meni);

        const lista = document.createElement("ul");
        lista.className = "lista";
        meni.appendChild(lista);

        const linkPocetna = document.createElement("a");
        linkPocetna.className = "link";
        lista.appendChild(linkPocetna);

        const pocetna = document.createElement("li");
        linkPocetna.appendChild(pocetna);

        const pocetnaStranica = document.createElement("div");
        pocetnaStranica.className = "pocetnaStranica";
        host.appendChild(pocetnaStranica);

        this.crtajFormu(pocetnaStranica);

        this.kategorije.forEach(element => {
            element.crtajKategoriju(document.body, lista, pocetnaStranica, this.div);
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


        let elContainer = document.createElement("div");
        elContainer.className = "elContainer";
        forma.appendChild(elContainer);

        let labela = document.createElement("label");
        labela.innerHTML = "Naziv: ";
        elContainer.appendChild(labela);

        let el = document.createElement("input");
        el.type = "text";
        el.className = "naziv";
        elContainer.appendChild(el);

        labela = document.createElement("label");
        labela.innerHTML = "Cena: ";
        elContainer.appendChild(labela);

        el = document.createElement("input");
        el.type = "number";
        el.className = "cena";
        elContainer.appendChild(el);

        labela = document.createElement("label");
        labela.innerHTML = "Na stanju: ";
        elContainer.appendChild(labela);

        el = document.createElement("input");
        el.type = "number";
        el.className = "kolicina";
        elContainer.appendChild(el);

        labela = document.createElement("label");
        labela.innerHTML = "Lokacija slike: ";
        elContainer.appendChild(labela);

        el = document.createElement("input");
        el.type = "text";
        el.className = "slika";
        elContainer.appendChild(el);

        let labela1 = document.createElement("label");
        labela1.innerHTML = "Kategorija: ";
        elContainer.appendChild(labela1);

        let el1 = document.createElement("select");
        el1.className = "DDList";
        elContainer.appendChild(el1);

        let buttonBox = document.createElement("div");
        buttonBox.className = "buttonBox";
        forma.appendChild(buttonBox);

        let button = document.createElement("button");
        button.innerHTML = "Dodaj proizvod";
        button.classList.add("button");
        buttonBox.appendChild(button);
        button.onclick = (ev)=>{
            this.kreirajElement();
        } 

        button = document.createElement("button");
        button.innerHTML = "Izmeni proizvod";
        button.classList.add("button");
        buttonBox.appendChild(button);
        button.onclick = (ev)=>{
            this.izmeniElement();
        } 
        
        button = document.createElement("button");
        button.innerHTML = "X";
        buttonBox.appendChild(button);
        button.onclick = (ev)=>{
            this.OcistiFormu();
        } 
        this.div=elContainer;
    }

    izmeniElement(){

        const naziv = this.div.querySelector(".naziv").value;
        const cena = this.div.querySelector(".cena").value;
        const kolicina = this.div.querySelector(".kolicina").value;
        const kategorija = this.div.querySelector(".DDList").value;
        
        fetch(`https://localhost:5001/Prodavnica/AzurirajKomponentu/${this.id}/${kategorija}/${naziv}/${kolicina}/${cena}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                        cena: cena,
                        kolicina: kolicina,
                    })
                }).then(p => {
                    if(p.ok)
                    {

                        this.cena = cena;
                        this.kolicina = kolicina;

                        this.OcistiFormu();

                        alert("Uspesno ste izmenili proizvod!");
                    }
                    else if(p.status == 406){
                        alert("Input all informations.");
                    }
                }).catch (p => {
                    console.log(p);

                 });
    }

    kreirajElement()
    {
        let naziv = this.div.querySelector(".naziv").value;
        console.log(naziv);
        let cena = this.div.querySelector(".cena").value;
        console.log(cena);
        let kolicina = this.div.querySelector(".kolicina").value;
        console.log(kolicina);
        let slika = this.div.querySelector(".slika").value;
        console.log(slika);
        let kategorija = this.div.querySelector(".DDList").value;

        this.kategorije.forEach(element => {

            if(element.opis == kategorija)
            {
                fetch("https://localhost:5001/Prodavnica/UpisiKomponentu/" + element.id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                        naziv: naziv,
                        cena: cena,
                        kolicina: kolicina,
                        slika: slika
                    })
                }).then(p => {
                    if(p.ok){
                        p.json().then(q => {

                        let proizvod = new Komponenta(q.id, naziv, cena, kolicina, slika);
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
    }

    OcistiFormu()
    {
        this.div.querySelector(".naziv").value = "";
        this.div.querySelector(".cena").value = "";
        this.div.querySelector(".kolicina").value = "";
        this.div.querySelector(".slika").value = "";
    }
}