# Réponses pour les questions sur TP1 

## Premières manipulations

---

### Q1, Q2, Q3

Les commentaires sont dans les fichiers [canvas_ex1.html](./first_samples/canvas_ex1.html), [canvas_ex2.html](./first_samples/canvas_ex2.html) et [canvas_ex3.html](./first_samples/canvas_ex3.html).

### Q4

Le fichier [image_ex1.html](./first_samples/image_ex1.html) affiche les valeurs `(rouge, vert, bleu, alpha)` pour le pixel `(50, 50)` . Quand nous chargeons le fichier, les valeurs affichées sont `(0, 0, 0, 0)` . C'est parce-que l'image n'est pas encore prête et le script est execute **avant** le charger de l'image.

### Q5

Dans [image_ex1_v2.html](./first_samples/image_ex1_v2.html), on va corriger l'erreur précédente en exécutant l'affichage de les valeurs pour le pixel `(50, 50)` après la chargee de l'image.

### Q6

Si nous exécutons [image_ex2.html](./first_samples/image_ex2.html), il ne se passe rien (sauf l'affichage de l'image).
Le fichier essaye de changer le coin supérieur gauche de l'image et transformer cela en gris, mais il y a 2 problemes:

* la transformation se passe avant de le chargement de l'image, donc quand on prendre cette image, toutes les pixels ont l'opacité `0` , donc ils sont invisible et il y a rien affichée sur l'écran (leurs valeurs r, g, b sont aussi pas prêtes)
* le resultat n'est pas visible, parce-que nous faisons les modifications sur un canvas temporaire et local

### Q7

On va corriger les problemes précédentes dans le fichier [image_ex2_v2.html](./first_samples/image_ex2_v2.html). Executer le code **après** que l'image est prête et rendre visible notre canvas ( `document.body.append(canvas);` ).

### Q8

Dans [video_ex1.html](./first_samples/video_ex1.html), nous prenons un cadre de le vidéo et transformer une partie de ce cadre en gris. Il y a plusieurs problèmes:

* la transformation se passe avant de le chargement de le vidéo, donc quand on prendre ce cadre, toutes les pixels ont l'opacité `0` , donc ils sont invisible et il y a rien affichée sur l'écran (leurs valeurs r, g, b sont aussi pas prêtes)
* la transformation étais faire pour un frame seulement de le vidéo

### Q9

Le premier problème a été résolu dans [video_ex1_v2.html](./first_samples/video_ex1_v2.html). Maintenant, on va executer le script quand la vidéo commencera.

### Q10

Pour corriger la derniere problème de la question 8, nous utilisons la fonction `requestAnimationFrame` en [video_ex1_v3.html](./first_samples/video_ex1_v3.html). `requestAnimationFrame(f)` appellera la fonction `f` avant chaque repeindre, donc pour chaque nouveau cadre de la vidéo nous ferons nos transformations.

---

## Pixels RGBA

---

### Q11

La fonction demandée a été implémentée dans [pixels.js](./features/pixels.js) et utilisée dans [image_get_pixel.html](./processing_samples/image_get_pixel.html).
La tâche `GetRandomRGBAPixel` change la position du pixel sondé avec la position d'un pixel aléatoire.

### Q12

La fonction demandée a été implémentée dans [pixels.js](./features/pixels.js) et utilisée ici: [gray_values.html](./processing_samples/gray_values.html).
Pour chaque element, les valeurs moyennes sont affichées avec leur representation (une image ou tous les pixels ont les valeurs RGB moyennes).

