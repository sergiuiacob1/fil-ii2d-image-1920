# Réponses pour les questions sur TP2

## Suivi à base d'apparence

### Q1.a, Q1.b

Les commentaires sont dans les fichiers [tracking/appearance.js](./tracking/appearance.js) et [tracking_samples/meanshift_circle.html](./tracking_samples/meanshift_circle.html).


### Q1.c
En ce qui concerne la qualité du suivi, le premier exemple fonctionne bien.
Cependant, lorsque le cercle commence à changer de couleur et devient vert, le suivi ne fonctionne plus.
C'est parce que le "modèle", le cercle rouge initial, en RGB est `(255, 0, 0)`, puis il devient `(0, 255, 0)` et le fond est `(0, 0, 0)`.
La fenêtre peut donc même perdre la trace du cercle, car la distance entre le cercle vert et le fond est la même.
Cependant, si le cercle redevient proche de la couleur rouge, le suivi fonctionne comme prévu.

La même chose se produit avec le changement de fond. À un moment donné, le fond devient rouge `(255, 0, 0)`, et le cercle est d'une nuance de rouge différente.
Ainsi, la boîte de suivi choisira une partie du fond comme étant la plus similaire.


### Q1.d, Q1.e
Pour cette fonctionnalité, j'ai créé  `pixels_features.mean_rgb_afactor_per_circular_region` et la tâche `appearance_tracking.MeanShiftCircular`. Elles ont été utilisées dans [tracking_samples/meanshift_circular_circle.html](tracking_samples/meanshift_circular_circle.html), [tracking_samples/meanshift_circular_changing_circle_color.html](tracking_samples/meanshift_circular_changing_circle_color.html) et [tracking_samples/meanshift_circular_changing_circle_and_bg_color.html](tracking_samples/meanshift_circular_changing_circle_and_bg_color.html).

Les résultats ne sont pas très différents, le suivi est toujours perdu lorsque les couleurs changent.


### Q2.a, Q2.b, Q2.c
Les commentaires sont dans les fichiers [movement/difference.js](./movement/difference.js), [difference_samples/difference_animation.html](./difference_samples/difference_animation.html) et [difference_samples/difference_effect.html](./difference_samples/difference_effect.html).


### Q2.d, Q2.e, Q2.f, Q2.g
Les nouvelles tâches ont été créées dans [movement/difference.js](./movement/difference.js) et utilisées ici : [difference_samples/difference_effect_2.html](./difference_samples/difference_effect_2.html).


### Q3.a, Q3.b, Q3.c
Les commentaires sont dans les fichiers [effects/morpho.js](./effects/morpho.js), [filters/morpho.js](./filters/morpho.js) et [morpho_samples/morpho_dilatation_erosion.html](./morpho_samples/morpho_dilatation_erosion.html).


### Q3.d
The functionality was implemented by using the functions `morpho_filters.max_from_cross_region`, `morpho_filters.min_from_cross_region` and the tasks `morpho_effects.DilatationCross` et `morpho_effects.ErosionCross`.

The effect works as intended and was used in [morpho_samples/morpho_dilatation_erosion_a.html](./morpho_samples/morpho_dilatation_erosion_a.html).