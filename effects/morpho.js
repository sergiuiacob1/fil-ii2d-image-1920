var morpho_effects = {}

// créer la fenêtre de dilatation
// chaque pixel sera "mis" dans le centre de cette fenêtre et il sera remplacé par un pixel de cette fenêtre
morpho_effects.DilatationWindow = function (opt_options) {
  this.window_width = opt_options.window_width;
  this.window_height = opt_options.window_height;
}

morpho_effects.DilatationWindow.prototype.process = function (in_imgData, out_imgData) {
  // en utilisant ceci, chaque pixel de l'image sera remplacé par le pixel MAXIMUM qui l'entoure
  // la zone dans laquelle nous recherchons le pixel maximum est définie par (this.window_width, this.window_height)
  return generic_effect.apply_region_filter(
    in_imgData, out_imgData, this.window_width, this.window_height,
    morpho_filters.max_from_region
  );
}

// créer la fenêtre de érosion
// chaque pixel sera "mis" dans le centre cette fenêtre et il sera remplacé par un pixel de cette fenêtre
morpho_effects.ErosionWindow = function (opt_options) {
  this.window_width = opt_options.window_width;
  this.window_height = opt_options.window_height;
}

// appliquer l'effet d'érosion : chaque pixel sera placé à l'intérieur de la fenêtre d'érosion, puis il sera remplacé par le pixel minimum de cette zone
morpho_effects.ErosionWindow.prototype.process = function (in_imgData, out_imgData) {
  generic_effect.apply_region_filter(
    in_imgData, out_imgData, this.window_width, this.window_height,
    morpho_filters.min_from_region);
}

// cet effet combine à la fois l'effet de dilatation et l'effet d'érosion
// il fonctionne de la même manière que ci-dessus, mais il fait les effets l'un après l'autre
morpho_effects.DilatationErosionWindow = function (opt_options) {
  this.dilatation_width = opt_options.dilatation_width;
  this.dilatation_height = opt_options.dilatation_height;
  this.erosion_width = opt_options.erosion_width;
  this.erosion_height = opt_options.erosion_height;
  this.aux_cvs = document.createElement("canvas");
}

morpho_effects.DilatationErosionWindow.prototype.process = function (in_imgData, out_imgData) {
  aux_imgData = { data: [], width: out_imgData.width, height: out_imgData.height };
  generic_effect.apply_region_filter(
    in_imgData, aux_imgData, this.dilatation_width, this.dilatation_height,
    morpho_filters.max_from_region);
  generic_effect.apply_region_filter(
    aux_imgData, out_imgData, this.erosion_width, this.erosion_height,
    morpho_filters.min_from_region);
}


// appliquer la dilatation et l'érosion, mais avec un patron "+".
morpho_effects.DilatationCross = function (opt_options) {
  this.window_width = opt_options.window_width;
  this.window_height = opt_options.window_height;
}

morpho_effects.DilatationCross.prototype.process = function (in_imgData, out_imgData) {
  return generic_effect.apply_region_filter(
    in_imgData, out_imgData, this.window_width, this.window_height,
    morpho_filters.max_from_cross_region
  );
}

morpho_effects.ErosionCross = function (opt_options) {
  this.window_width = opt_options.window_width;
  this.window_height = opt_options.window_height;
}

morpho_effects.ErosionCross.prototype.process = function (in_imgData, out_imgData) {
  generic_effect.apply_region_filter(
    in_imgData, out_imgData, this.window_width, this.window_height,
    morpho_filters.min_from_cross_region);
}
