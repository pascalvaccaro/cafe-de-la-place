// Cette fonction est appelée une seule fois pour "fabriquer" le stock du Café de la Place
function initStock() {
  const LOCAL_STORAGE_KEY_NAME = "LaPlace_Stock";

  // Peut-être qu'il y a déjà des produits dans l'inventaire ?
  let inventory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_NAME));
  // Sinon...
  if (!inventory) {
    // On initialise l'inventaire à une liste/tableau vide
    inventory = [];
  }

  // Voilà le modèle "garanti" du stock du café de la Place
  return {
    // L'inventaire contient la liste des produits dans le stock
    inventory: inventory.map(function (values) {
      return new Produit(values.nom, values.quantite, values.prixAchatHT, values.prixVenteHT, values.type, values.degreAlcool);
    }),

    // Méthodes garanties par le stock
    // 1. Ajouter un produit dans le stock
    addToStock(product) {
      if (this.findInStock(product.identifiant)) {
        throw new Error("Le produit " + product.nom + " existe déjà. Vous pouvez au choix :\n\t- Modifier ses propriétés\n\t- Créer un produit avec un nom différent");
      }
      this.inventory = this.inventory.concat(product);
      this.displayStock();
    },
    // 2. Supprimer un produit du stock
    removeFromStock(product) {
      this.inventory = this.inventory.filter(function (element) {
        return element.identifiant !== product.identifiant;
      });
      this.displayStock();
    },
    // 3. Modifier un produit dans le stock
    modifyInStock(identifiant, product) {
      this.inventory = this.inventory.map(function (el) {
        if (el.identifiant === identifiant.toLowerCase()) {
          return product;
        }
        return el;
      });
      this.displayStock();
    },
    // Trouver un produit dans le stock 
    findInStock(identifiant) {
      return this.inventory.find(function (el) {
        return el.identifiant === identifiant.toLowerCase();
      });
    },
    // Afficher le stock dans la table HTML
    displayStock() {
      // Transformer chaque produit de l'inventaire en rangée ('tr')
      const elements = this.inventory.map(makeRow.bind(this));
      // Vider la table HTML
      table.innerHTML = "";
      // Injecter chaque rangée dans la table HTML
      elements.forEach(function (el) {
        table.appendChild(el);
      });
      // Enregistrer l'inventaire dans le localStorage pour le retrouver au prochain chargement de la page
      const json = JSON.stringify(this.inventory);
      localStorage.setItem(LOCAL_STORAGE_KEY_NAME, json);
    }
  }
}

// Initialiser le stock dès le démarrage de l'appli
const stock = initStock();
// Afficher tous les produits du stock (même si l'inventaire est vide !)
stock.displayStock();

// Moment d'ajout ou de modification d'un produit dans le stock
btnValider.addEventListener("click", function () {
  // Toutes les références aux input/select et au bouton "Ajouter/Modifier" sont déclarées dans le fichier 'factory.js'
  const identifiant = inputIdentifiant.value;
  const nom = inputNom.value;
  const achatHT = inputAchatHT.value;
  const venteHT = inputVenteHT.value;
  const type = inputType.value;
  const degre = inputDegre.value;
  
  try {
    if (identifiant) {
      // Remplacer un produit par un autre
      const oldProduct = stock.findInStock(identifiant);
      const product = new Produit(nom, oldProduct.quantite, achatHT, venteHT, type, degre);
      // Remettre le texte d'origine dans le bouton Valider
      btnValider.innerText = "Ajouter le nouveau produit au stock";
      stock.modifyInStock(identifiant, product);
    } else {
      // Créer un nouveau produit
      const product = new Produit(nom, 1, achatHT, venteHT, type, degre);
      stock.addToStock(product);
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    // Vider le formulaire de saisie
    inputIdentifiant.value = "";
    inputNom.value = "";
    inputAchatHT.value = "";
    inputVenteHT.value = "";
    inputType.value = "";
    inputDegre.value = "";
    // Réafficher tout l'inventaire
    stock.displayStock();
  }
});
