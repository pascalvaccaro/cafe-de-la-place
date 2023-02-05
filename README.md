# Le Café de la Place

> Ceci est un exemple d'application pour le mini-projet de fin d'apprentissage de Javascript et du DOM pour Le Bocal Academy

## L'application doit proposer les fonctionnalité suivantes

1. L'utilisateur doit pouvoir ajouter un nouveau produit dans le stock. Chaque produit doit comporter les caractéristiques suivantes, qui seront saisies ou calculées automatiquement :
    - Nom
    - Quantité de produits
    - Prix d'achat HT
    - Prix de vente HT
    - Marge HT (calculée automatiquement en retirant le prix d’achat HT du prix de vente HT)
    - Prix de vente TTC (calculé automatiquement avec une TVA de 10%)
    - Type ("Boisson alcoolisée", "Boisson non alcoolisée", "Autre")
    - Degré d'alcool (uniquement pour les alcools)

2. L'utilisateur doit pouvoir consulter la liste des produits avec toutes leurs informations. 
3. L’utilisateur doit pouvoir décrémenter ou incrémenter le niveau de stock de chaque produit (ATTENTION: un stock ne peut pas être négatif)
4. L'utilisateur doit pouvoir modifier les caractéristiques d'un produit 
5. L’utilisateur doit pouvoir supprimer un produit du stock
6. Le niveau du stock d’un produit doit être représenté par un code couleur sur la page, notamment dans le cas où le stock est dangereusement bas !

## BONUS

- Le stock doit être sauvegardé en localstorage et récupéré lors du chargement de la page pour conserver les informations.
- Générer un QRCode pour chaque produit contenant sa référence.