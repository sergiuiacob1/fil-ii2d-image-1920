var pixel_metrics={};

/*
    pixel_metrics.rgb_edist - computes euclidian distance between two rgb pixels
*/
pixel_metrics.rgb_edist=function(pixel_rgb1, pixel_rgb2) {
  var dist_fun=function(x,y){return x-y};

  //BLOC1
  //...

  return generic_metrics.euclidian_distance_btw_feature_vectors(pixel_rgb1,pixel_rgb2,dist_fun);
}

/*
    pixel_metrics.rgb_edist - computes euclidian distance between two grids
    containing in each cell an rgb pixel
*/
pixel_metrics.grid_rgb_edist=function(pixels_rgb_grid1, pixels_rgb_grid2) {
  var dist_fun=pixel_metrics.rgb_edist;

  //BLOC2
  //...

  return generic_metrics.euclidian_distance_btw_feature_vectors(pixels_rgb_grid1.cells,pixels_rgb_grid2.cells,dist_fun);
}

/*
    pixel_metrics.gray_rgb_edist - computes euclidian distance between two rgb pixels considering them as gray pixels.
*/
pixel_metrics.gray_rgb_edist=function(pixel_rgb1, pixel_rgb2) {

  return Math.abs(pixel_rgb1[0] - pixel_rgb2[0]+
                  pixel_rgb1[1] - pixel_rgb2[1]+
                  pixel_rgb1[2] - pixel_rgb2[2])/3;
}

/*
    pixel_metrics.gray_rgb_edist - computes euclidian distance between two rgb pixels considering them as gray pixels.
*/
pixel_metrics.gray_rgb_edist=function(pixel_rgb1, pixel_rgb2) {

  return Math.abs(pixel_rgb1[0] - pixel_rgb2[0]+
                  pixel_rgb1[1] - pixel_rgb2[1]+
                  pixel_rgb1[2] - pixel_rgb2[2])/3;
}

/*
    pixel_metrics.visible_edist - computes similarity between two rgb pixels considering them as B&W pixels. if both B or both W than distance=0 otherwise 255
*/
pixel_metrics.visible_edist=function(pixel_rgb1, pixel_rgb2) {
  var mean1=(pixel_rgb1[0]+pixel_rgb1[1]+pixel_rgb1[2]);
  var mean2=(pixel_rgb2[0]+pixel_rgb2[1]+pixel_rgb2[2]);

  return ((mean1==0 && mean2==0) || (mean1>0 && mean2>0))?0:255;
}
