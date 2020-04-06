# Réponses pour les questions sur TP2

## Descripteurs, métriques et similarité

### Q0

Les commentaires sont dans les fichiers [features/pixels.js](features/pixels.js), [metrics/pixels.js](metrics/pixels.js), [similarity/generic.js](similarity/generic.js), [similarity_samples/similarity_image.html](similarity_samples/similarity_image.html), [similarity_samples/similarity_image_grid.html](similarity_samples/similarity_image_grid.html) et [similarity_samples/similarity_images_1.html](similarity_samples/similarity_images_1.html).

### Q1, Q2, Q3
Pour ces questions, les fonctionnalités demandées ont été implémentées dans [features/pixels.js](./features/pixels.js), [metrics/pixels.js](./metrics/pixels.js), [similarity/pixels.js](./similarity/pixels.js) et appliqués dans [similarity_samples/similarity_images_3.html](similarity_samples/similarity_images_3.html), [similarity_samples/similarity_images_4.html](similarity_samples/similarity_images_4.html), [similarity_samples/similarity_images_7.html](similarity_samples/similarity_images_7.html) et [similarity_samples/similarity_images_8.html](similarity_samples/similarity_images_8.html),

Pour les histogrammes, j'ai implémenté une nouvelle distance: [Chi square](https://en.wikipedia.org/wiki/Chi-squared_test).
Les histogrammes peuvent être paramétrés aussi, avec `nbins`: le nombre des classes.

En exécutant les fichiers `html`, la première chose que nous observons est que tous les tâches trouvent bien le plus similaire image avec la requete et beaucoup des resultats sont similair entre `MeanRGB`, `MeanGray` et `HistoGray`. Mais, si on regarde les resultats pour, par example, la dernière requete avec les histogrammes gris, on pouvons voir que le paramétré `nbins` avec le valeur `10` changer le resultat. 

`10` est un valeur plus faible qui "généralisera" les nuances de couleur. Par example, les couleurs bleu sera très probablement considéré similaire et donc mis dans la même classe sur la histogramme. Cela rendra les images plus bleues plus similaires de celles qui ont plus de vert (par example, `Task1` vs. `Task2` pour les histogrammes gris).

En faisant une comparaison entre les histogrammes gris et les RGB (avec les mêmes paramétrés), on constatons que les résultats ne diffèrent pas beaucoup. On peut dire que la tâche `HistoGraySimilarityTask` regarde les images dans leurs ensemble, en regardant la similitude par la luminosité de l'image et `HistoRGBSimilarityTask` regarde les différences entre chaque canaux de couleur.

### Q4.0
Les commentaires sont dans les fichiers [effects/photo_fill.js](effects/photo_fill.js) et [effects_samples/photo_fill.html](effects_samples/photo_fill.html).

### Q4.1
J'implémenté les autres effects en utilisant cette tâche : `photo_fill.GenericPhotoFillPixelsFromDatasetTask`.
Je l'ai appliqué ici : [effects_samples/photo_fill_2.html](effects_samples/photo_fill_2.html).