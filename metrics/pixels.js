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

// distance between gray values
pixel_metrics.gray_edist = function (grayValue1, grayValue2) {
  var dist_fun = function (x, y) { return x - y };
  // generic_metrics takes arrays, so pass them as arrays
  return generic_metrics.euclidian_distance_btw_feature_vectors([grayValue1], [grayValue2], dist_fun);
}

pixel_metrics.grid_gray_edist = function (pixels_gray_grid1, pixels_gray_grid2) {
  var dist_fun = pixel_metrics.gray_edist;
  return generic_metrics.euclidian_distance_btw_feature_vectors(pixels_gray_grid1.cells, pixels_gray_grid2.cells, dist_fun);
}

// distance based on histograms
// histograms are actually arrays
// hist[i] = the number of pixels that have a gray value of i
// will use Chi Square distance since that's tracking significant statistical difference between expectations and observation
// https://en.wikipedia.org/wiki/Chi-squared_test
pixel_metrics.histo_gray_chi_square_dist = function (hist1, hist2) {
  var dist_fun = function (x, y) { return x > 0 ? (x - y) ** 2 / x : 0 };
  // first normalize the histograms
  const arrSum = arr => arr.reduce((a, b) => a + b, 0)
  var sum1 = arrSum(hist1), sum2 = arrSum(hist2);
  hist1 = hist1.map(e => e / sum1);
  hist2 = hist2.map(e => e / sum2);
  return generic_metrics.distance_btw_feature_vectors(hist1, hist2, dist_fun) / 2;
}

pixel_metrics.grid_histo_gray_chi_square_dist = function (pixels_hist_gray_grid1, pixels_hist_gray_grid2) {
  var dist_fun = pixel_metrics.histo_gray_chi_square_dist;
  return generic_metrics.distance_btw_feature_vectors(pixels_hist_gray_grid1.cells, pixels_hist_gray_grid2.cells, dist_fun) / 2;
}

// will use chi square distance for the rgb as well
pixel_metrics.histo_rgb_chi_square_dist = function (histRGB1, histRGB2) {
  var dist_fun = function (x, y) { return x > 0 ? (x - y) ** 2 / x : 0 };
  const arrSum = arr => arr.reduce((a, b) => a + b, 0)
  var res = 0;
  // hist[0] = hist for R, hist[1] = hist for G, hist[2] = hist for B
  // normalize each histogram (for R, G, B)
  var sum1, sum2;
  for (var i = 0; i < 3; ++i) {
    sum1 = arrSum(histRGB1[i]); sum2 = arrSum(histRGB2[i]);
    if (isNaN(sum1))
      debugger;
    histRGB1[i] = histRGB1[i].map(e => e / sum1);
    histRGB2[i] = histRGB2[i].map(e => e / sum2);
    res += generic_metrics.distance_btw_feature_vectors(histRGB1[i], histRGB2[i], dist_fun) / 2;
  }
  return res;
}

pixel_metrics.grid_histo_rgb_chi_square_dist = function (pixels_hist_rgb_grid1, pixels_hist_rgb_grid2) {
  var dist_fun = pixel_metrics.histo_rgb_chi_square_dist;
  return generic_metrics.distance_btw_feature_vectors(pixels_hist_rgb_grid1.cells, pixels_hist_rgb_grid2.cells, dist_fun) / 2;
}
/*
    pixel_metrics.gray_rgb_edist - computes euclidian distance between two rgb pixels considering them as gray pixels.
*/
pixel_metrics.gray_rgb_edist = function (pixel_rgb1, pixel_rgb2) {

  return Math.abs(pixel_rgb1[0] - pixel_rgb2[0] +
    pixel_rgb1[1] - pixel_rgb2[1] +
    pixel_rgb1[2] - pixel_rgb2[2]) / 3;
}

/*
    pixel_metrics.gray_rgb_edist - computes euclidian distance between two rgb pixels considering them as gray pixels.
*/
pixel_metrics.gray_rgb_edist = function (pixel_rgb1, pixel_rgb2) {

  return Math.abs(pixel_rgb1[0] - pixel_rgb2[0] +
    pixel_rgb1[1] - pixel_rgb2[1] +
    pixel_rgb1[2] - pixel_rgb2[2]) / 3;
}

/*
    pixel_metrics.visible_edist - computes similarity between two rgb pixels considering them as B&W pixels. if both B or both W than distance=0 otherwise 255
*/
pixel_metrics.visible_edist = function (pixel_rgb1, pixel_rgb2) {
  var mean1 = (pixel_rgb1[0] + pixel_rgb1[1] + pixel_rgb1[2]);
  var mean2 = (pixel_rgb2[0] + pixel_rgb2[1] + pixel_rgb2[2]);

  return ((mean1 == 0 && mean2 == 0) || (mean1 > 0 && mean2 > 0)) ? 0 : 255;
}
