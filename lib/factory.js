// Éléments du formulaire d'ajout de produit
const inputIdentifiant = document.getElementById("identifiant-produit");
const inputNom = document.getElementById("nom-produit");
const inputAchatHT = document.getElementById("achat-HT");
const inputVenteHT = document.getElementById("vente-HT");
const inputType = document.getElementById("type-produit");
const inputDegre = document.getElementById("degre-alcool");
const btnValider = document.getElementById("valider-produit");
// Élément du tableau HTML
const table = document.getElementById("stock-table");

// Fonctions utilisées plusieurs fois dans le code pour fabriquer des éléments HTML

/**
 * Cette fonction échange un texte (ou de l'HTML sous forme de texte) + une fonction contre un bouton HTML
 * ====> La fonction 'handler' est un paramètre de la fonction 'makeButton'
 * ====> la fonction 'handler' est transmise "as-is" à l'écouteur d'événement du bouton renvoyé par 'makeButton'
 * @param {String} label Le texte à afficher à l'intérieur du bouton
 * @param {Function} handler La fonction à invoquer quand on clique sur le bouton
 * @returns {HTMLButtonElement} Un nouveau bouton HTML
 */
function makeButton(label, handler) {
  const btn = document.createElement("button");
  btn.innerHTML = label;
  btn.addEventListener("click", handler);
  return btn;
}

/**
 * Cette fonction échange un texte ou un nombre contre une cellule HTML ('td')
 * @param {String|Number} value Le texte à placer à l'intérieur de la cellule
 * @returns {HTMLTableCellElement} La cellule à injecter dans la rangée de la table
 */
function makeCell(value) {
  const td = document.createElement("td");
  if (!isNaN(value)) {
    const valueAsNumber = +value;
    td.innerText = valueAsNumber.toFixed(2);
  } else {
    td.innerText = value;
  }
  return td;
}

/**
 * Correctement attachée à une instance de 'stock' (bind), 
 * cette fonction échange un produit contre une rangée de table HTML
 * Elle connecte les actions des boutons dans la table HTML avec les méthodes de 'this' (une instance de 'Stock')
 * @param {Product} product Le produit à transformer en rangée de tableau
 * @returns {HTMLTableRowElement} La rangée du tableau
 */
function makeRow(product) {
  // Nécessaire pour accéder à ce contexte-ci dans des champs au-dessus
  const that = this;
  const tr = product.getHtml();
  
  // Fabrication des fonctionnalités qui lient chaque produit avec le stock
  // 1. Incrémenter/décrémenter la quantité d'un produit
  const td1 = document.createElement("td");
  const btnPlus = makeButton("+", function () {
    product.incrementer();
    // Comme on est à l'intérieur d'une fonction, 'this' a changé...
    // C'est pourquoi on a besoin de "ça" (that's why we need 'that')
    that.modifyInStock(product.identifiant, product);
  });
  btnPlus.className = "btn-quantity";
  const btnMinus = makeButton("-", function () {
    product.decrementer();
    that.modifyInStock(product.identifiant, product);
  });
  btnMinus.className = "btn-quantity";
  td1.append(btnPlus, btnMinus);
  
  // 2. Modifier/supprimer un produit de l'inventaire
  const td2 = document.createElement("td");
  const btnSuppr = makeButton("x", function () {
    that.removeFromStock(product);
  });
  btnSuppr.className = "btn-remove";
  const btnModify = makeButton("&#x270E;", function () {
    inputIdentifiant.value = product.identifiant;
    inputNom.value = product.nom;
    inputAchatHT.value = product.prixAchatHT;
    inputVenteHT.value = product.prixVenteHT;
    inputType.value = product.type;
    if (product.degreAlcool) {
      inputDegre.value = product.degreAlcool;
    }
    btnValider.innerText = "Modifier le produit " + product.nom;
  });
  btnModify.className = "btn-modify";
  td2.append(btnModify, btnSuppr);
  
  tr.append(td1, td2);
  return tr;
}
