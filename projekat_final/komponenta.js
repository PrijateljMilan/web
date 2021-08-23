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
            this.obrisi();
        }

        let destForma = document.createElement("a");
        destForma.href = "#forma";
        opis.appendChild(destForma);
        
        dugme = document.createElement("button");
        dugme.innerHTML = "Izmeni";
        destForma.appendChild(dugme);
        dugme.onclick = (ev) =>{
            this.izmeni(nazivContainer, cenaContainer, naStanjuContainer, imageContainer);
        }

        
    }

    obrisi()
    {
        fetch("https://localhost:5001/Prodavnica/ObrisiKomponentu/" + this.id,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        var parent = this.container.parentNode;
        parent.removeChild(this.container);
        this.kategorija.komponente = this.kategorija.komponente.filter(el => el.id !== this.id);
    }

    izmeni(nazivContainer, cenaContainer, naStanjuContainer, imageContainer)
    {
        //#region Dodavanje objekta u kontrole
        document.querySelector(".id").value = this.id;
        document.querySelector(".id").disabled = true;
        document.querySelector(".naziv").value = this.naziv;
        document.querySelector(".cena").value = this.cena;
        document.querySelector(".kolicina").value = this.kolicina;
        document.querySelector(".slika").value = this.slika;
        document.querySelector(".DDList").disabled = true;

        let isSameName = (element) => element.naziv == this.kategorija.naziv;
        document.querySelector(".DDList").selectedIndex = 
        this.kategorija.prodavnica.kategorije.findIndex(isSameName);
        
        document.querySelector("button").innerHTML = "Izmeni proizvod";
        document.querySelectorAll("button")[1].style.display = "initial";
        //#endregion      
    }

    izmeniProizvod()
    {
        // Ako se klikne na Izmeni proizvod
        // uzimanje iz forme koja je vec adekvatno popunjena
        const id = this.id;
        const naziv = document.querySelector(".naziv").value;
        const cena = document.querySelector(".cena").value;
        const kolicina = document.querySelector(".kolicina").value;
        const slika = document.querySelector(".slika").value;
     
        fetch("https://localhost:5001/Prodavnica/AzurirajKomponentu", {
                    method: "PUT",
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
                    if(p.ok)
                    {
                        this.naziv = naziv;
                        this.cena = cena;
                        this.kolicina = kolicina;
                        this.slika = slika;
                        
                        document.querySelector(".nazivContainer" + this.id).innerHTML = this.naziv;
                        document.querySelector(".cenaContainer" + this.id).innerHTML = "Cena: " + this.cena;
                        document.querySelector(".naStanjuContainer" + this.id).innerHTML = "Na stanju: " + this.kolicina;
                        document.querySelector(".imageContainer" + this.id).src = this.slika;

                        this.kategorija.prodavnica.OcistiFormu();
                        document.querySelectorAll("button")[1].style.display = "none";
                        alert("Uspesno ste izmenili proizvod!");
                    }
                    else if(p.status == 406){
                        alert("Input all informations.");
                    }
                }).catch (p => {
                    alert("Error");
                 });
    }
}