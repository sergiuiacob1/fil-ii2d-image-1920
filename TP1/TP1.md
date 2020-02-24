# Réponses pour les questions sur TP1 

## Q1, Q2, Q3

Les commentaires sont dans les fichiers [canvas_ex1.html](./first_samples/canvas_ex1.html), [canvas_ex2.html](./first_samples/canvas_ex2.html) et [canvas_ex3.html](./first_samples/canvas_ex3.html).

## Q4

Le fichier [image_ex1.html](./first_samples/image_ex1.html) affiche les valeurs `(rouge, vert, bleu, alpha)` pour le pixel `(50, 50)` . Quand nous chargeons le fichier, les valeurs affichées sont `(0, 0, 0, 0)` . C'est parce-que l'image n'est pas encore prête et le script est execute **avant** le charger de l'image.

## Q5

Dans [image_ex1_v2.html](./first_samples/image_ex1_v2.html), on va corriger l'erreur précédente en exécutant l'affichage de les valeurs pour le pixel `(50, 50)` après la chargee de l'image.

## Q6

Si nous exécutons [image_ex2.html](./first_samples/image_ex2.html), il ne se passe rien (sauf l'affichage de l'image).
Le fichier essaye de changer le coin supérieur gauche de l'image et transformer cela en gris, mais il y a 2 problemes:

* la transformation se passe avant de le chargement de l'image
* le resultat n'est pas visible, parce-que nous faisons les modifications sur un canvas temporaire, local

## Q7

On va corriger les problemes précédentes dans le fichier [image_ex2_v2.html](./first_samples/image_ex2_v2.html). Executer le code **après** que l'image est prête et rendre visible notre canvas (`document.body.append(canvas);`).

## Q8