# Réponses pour les questions sur TP2

## Suivi à base d'apparence

### Q1.a, Q1.b

Les commentaires sont dans les fichiers [tracking/appearance.js](./tracking/appearance.js) et [tracking_samples/meanshift_circle.html](./tracking_samples/meanshift_circle.html).

### Q1.c
Related to the tracking quality, the first example works well.
However, when the circle starts changing color and becomes green, the tracking doesn't work anymore.
That's because the "model", the initial red circle, in RGB is `(255, 0, 0)`, then it becomes `(0, 255, 0)` and the background is `(0, 0, 0)`.
So the window might even lose track of the circle because the distance between the green circle and the background is the same.
However, if the circle becomes close to the red colour again, tracking works as intended.

The same happens with the changing background. At some point, the background becomes red `(255, 0, 0)`, and the circle is a different shade of red.
So the tracking box will choose a portion of the background as the most similar part.

### Q1.d, Q1.e
functions created: `Tools.copy_partial_circular_imageData_into_imageData`
