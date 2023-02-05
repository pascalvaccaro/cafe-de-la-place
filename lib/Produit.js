class Produit {
  constructor(nom, quantite, prixAchatHT, prixVenteHT, type, degreAlcool) {
    if (!nom) throw new Error("Le nom du produit est obligatoire");
    if (!type) throw new Error ("Le type du produit est obligatoire");
    if (type === "Boisson alcoolisée" && (isNaN(degreAlcool) || degreAlcool <= 0)) {
      throw new Error("Une boisson alcoolisée doit indiquer son degré d'alcool");
    }

    this.identifiant = nom.toLowerCase();
    this.nom = nom;
    this.quantite = Number(quantite);
    this.prixAchatHT = Number(prixAchatHT);
    this.prixVenteHT = Number(prixVenteHT);
    this.type = type;
    this.degreAlcool = degreAlcool;
  }

  get margeHT() {
    return this.prixVenteHT - this.prixAchatHT;
  }
  get prixVenteTTC() {
    return this.prixVenteHT * 1.1;
  }

  getHtml() {
    const tr = document.createElement("tr");
    const nom = makeCell(this.nom);
    tr.appendChild(nom);

    let type = this.type;
    if (this.degreAlcool) {
      type += " ("+ this.degreAlcool +"°)";
    }
    tr.appendChild(makeCell(type));
    const quantite = makeCell(this.quantite);
    if (this.quantite === 0) {
      tr.style.textDecoration = "line-through";
    }
    if (this.quantite < 3) {
      quantite.style.backgroundColor = "red";
    } else if (this.quantite < 5) {
      quantite.style.backgroundColor = "lightsalmon";
    } else {
      quantite.style.backgroundColor = "lightgreen";
    }
    tr.appendChild(quantite);

    const prixAchat = makeCell(this.prixAchatHT);
    prixAchat.innerText += "€"
    tr.appendChild(prixAchat);

    const prixVenteHT = makeCell(this.prixVenteHT);
    prixVenteHT.innerText += "€";
    tr.appendChild(prixVenteHT);

    const margeHT = makeCell(this.margeHT);
    margeHT.innerText += "€";
    tr.appendChild(margeHT);

    const prixVenteTTC = makeCell(this.prixVenteTTC);
    prixVenteTTC.innerText += "€";
    tr.appendChild(prixVenteTTC);
    
    return tr;
  }

  incrementer() {
    this.quantite += 1;
  }

  decrementer() {
    if (this.quantite > 0) {
      this.quantite -= 1;
    }
  }
}