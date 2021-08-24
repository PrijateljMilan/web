import { Prodavnica } from "./prodavnica.js";

export class Komponenta
{
    constructor(id, naziv, cena, kolicina, slika)
    {
        this.id = id;
        this.naziv = naziv;   
        this.cena = cena;
        this.kolicina = kolicina;
        this.slika = slika;
        this.container = null;
        this.kategorija = null;
    }

    crtajProizvod(host)
    {
        this.container = document.createElement("div");
        this.container.className = "images";
        host.appendChild(this.container);

        let imageContainer = document.createElement("img");
        imageContainer.src = this.slika;
        imageContainer.className = "item-image-size";
        imageContainer.classList.add("imageContainer" + this.id);
        this.container.appendChild(imageContainer);

        let opis = document.createElement("div");
        opis.className = "opis";
        this.container.appendChild(opis);

        let nazivContainer = document.createElement("b");
        nazivContainer.innerHTML = this.naziv;
        nazivContainer.className = "nazivContainer" + this.id;
        opis.appendChild(nazivContainer);

        let cenaContainer = document.createElement("div");
        cenaContainer.className = "item-select";
        cenaContainer.classList.add("cenaContainer" + this.id);
        cenaContainer.innerHTML = "Cena: " + this.cena;
        opis.appendChild(cenaContainer);


        let naStanjuContainer = document.createElement("div");
        naStanjuContainer.className = "item-select";
        naStanjuContainer.classList.add("naStanjuContainer" + this.id);
        naStanjuContainer.innerHTML = "Na stanju: " +this.kolicina;
        opis.appendChild(naStanjuContainer);

        let dugme = document.createElement("button");
        dugme.innerHTML = "Obrisi";
        opis.appendChild(dugme);
        dugme.onclick = (ev)=>{
            this.obrisi(this.id);
        }   
    }

    obrisi(id)
    {
        fetch("https://localhost:5001/Prodavnica/ObrisiKomponentu/" + id,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        var parent = this.container.parentNode;
        parent.removeChild(this.container);
        this.kategorija.komponente = this.kategorija.komponente.filter(el => el.id !== this.id);
    }

}
