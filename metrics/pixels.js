var pixel_metrics = {};

/*
    pixel_metrics.rgb_edist - computes euclidian distance between two rgb pixels
*/
pixel_metrics.rgb_edist = function (pixel_rgb1, pixel_rgb2) {
  var dist_fun = function (x, y) { return x - y };

  // BLOC1
  // cette function prendre comme paramètres 2 pixels
  // on va returner, avec l'aide de la fonction f (dans notre case: f(x, y) = x - y), le suivant:
  // sqrt(f(pixel1.r_value, pixel2.r_value)^2 + f(pixel1.g_value, pixel2.g_value)^2 + f(pixel1.b_value, pixel2.b_value)^2)
  // donc, c'est une distance euclidienne entre 2 pixels RGB

  return generic_metrics.euclidian_distance_btw_feature_vectors(pixel_rgb1, pixel_rgb2, dist_fun);
}

/*
    pixel_metrics.rgb_edist - computes euclidian distance between two grids
    containing in each cell an rgb pixel
*/
pixel_metrics.grid_rgb_edist = function (pixels_rgb_grid1, pixels_rgb_grid2) {
  var dist_fun = pixel_metrics.rgb_edist;

  // BLOC2
  // dans une grille, chaque cellule est représentée par le pixel moyenne de cette cellule
  // donc une grille est un vecteur des cellules et nous pouvons calculer la distance euclidienne entre ces grilles
  // parce-que c'est comme une distance entre les pixels RGB (les cellules), donc on peut utiliser pixel_metrics.rgb_edist

  return generic_metrics.euclidian_distance_btw_feature_vectors(pixels_rgb_grid1.cells, pixels_rgb_grid2.cells, dist_fun);
}
