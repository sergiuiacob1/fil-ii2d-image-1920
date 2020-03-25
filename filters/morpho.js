var morpho_filters = {}


// ----- CROSS PATTERN -----
morpho_filters.max_from_cross_region = function (imgData, x0, y0, reg_width, reg_height) {
  // initialiser le max avec le pixel central
  var pixels = imgData.data;
  var w = ((y0 + Math.round(reg_height / 2)) * imgData.width
    + (x0 + Math.round(reg_width / 2))) << 2;
  var max_data = [pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3]];
  // nous sommes également intéressés par l'opacité, donc multipliez les valeurs de couleur par l'opacité
  var max = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];

  // vérifier chaque pixel de cette fenêtre pour trouver le maximum
  // aller dans un schéma croisé
  // d'abord descendre
  var x = Math.min(x0 + Math.round(reg_width / 2), imgData.width);
  var y;
  for (y = Math.max(0, y0); y < Math.min(y0 + reg_height, imgData.height); y++) {
    w = (y * imgData.width + x) << 2;
    var val = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];
    if (max < val) {
      if (pixels[w + 3] < 255) pixels[w + 3] = 255;
      max = val; max_data = [pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3]];
    }
  }

  // aller horizontalement
  y = Math.min(y0 + Math.round(reg_height / 2), imgData.height);
  for (x = Math.max(0, x0); x < Math.min(x0 + reg_width, imgData.width); x++) {
    w = (y * imgData.width + x) << 2;
    var val = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];
    if (max < val) {
      if (pixels[w + 3] < 255) pixels[w + 3] = 255;
      max = val; max_data = [pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3]];
    }
  }
  // renvoie le pixel maximum
  return max_data;
}

morpho_filters.min_from_cross_region = function (imgData, x0, y0, reg_width, reg_height) {
  // initialiser le min avec le pixel central
  var pixels = imgData.data;
  var w = ((y0 + Math.round(reg_height / 2)) * imgData.width
    + (x0 + Math.round(reg_width / 2))) << 2;
  var min_data = [pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3]];
  // nous sommes également intéressés par l'opacité, donc multipliez les valeurs de couleur par l'opacité
  var min = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];

  // vérifier chaque pixel de cette fenêtre pour trouver le minimum
  // aller dans un schéma croisé
  // d'abord descendre
  var x = Math.min(x0 + Math.round(reg_width / 2), imgData.width);
  var y;
  for (y = Math.max(0, y0); y < Math.min(y0 + reg_height, imgData.height); y++) {
    w = (y * imgData.width + x) << 2;
    var val = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];
    // si ce pixel est "inférieur", enregistrer celui-ci
    if (min > val) {
      min = val;
      min_data = [pixels[w], pixels[w + 1],
      pixels[w + 2], pixels[w + 3]];
    }
  }

  // aller horizontalement
  y = Math.min(y0 + Math.round(reg_height / 2), imgData.height);
  for (x = Math.max(0, x0); x < Math.min(x0 + reg_width, imgData.width); x++) {
    w = (y * imgData.width + x) << 2;
    var val = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];
    // si ce pixel est "inférieur", enregistrer celui-ci
    if (min > val) {
      min = val;
      min_data = [pixels[w], pixels[w + 1],
      pixels[w + 2], pixels[w + 3]];
    }
  }
  // renvoie le pixel minimum
  return min_data;
}
// ===== CROSS PATTERN =====

morpho_filters.max_from_region = function (imgData, x0, y0, reg_width, reg_height) {
  // cette fenêtre commence à (x0, y0) et se termine à (x0 + reg_width, y0 + reg_height) ou (imgData.width, imgData.height)
  // nous voulons trouver le pixel maximum dans cette fenêtre
  // initialiser le max avec le pixel central
  var pixels = imgData.data;
  var w = ((y0 + Math.round(reg_height / 2)) * imgData.width
    + (x0 + Math.round(reg_width / 2))) << 2;
  var max_data = [pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3]];
  // nous sommes également intéressés par l'opacité, donc multipliez les valeurs de couleur par l'opacité
  var max = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];

  // vérifier chaque pixel de cette fenêtre pour trouver le maximum
  for (var y = Math.max(0, y0); y < Math.min(y0 + reg_height, imgData.height); y++)
    for (var x = Math.max(0, x0); x < Math.min(x0 + reg_width, imgData.width); x++) {
      w = (y * imgData.width + x) << 2;
      var val = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];
      if (max < val) {
        // rendre le pixel maximum entièrement visible
        if (pixels[w + 3] < 255) pixels[w + 3] = 255;
        max = val; max_data = [pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3]];
      }
    }
  // renvoie le pixel maximum
  return max_data;
}

// cela fonctionne de la même façon que le filtre ci-dessus, mais ici nous nous intéressons au pixel le plus rouge
morpho_filters.max_red_from_region = function (imgData, x0, y0, reg_width, reg_height) {
  var pixels = imgData.data;
  var w = ((y0 + Math.round(reg_height / 2)) * imgData.width + (x0 + Math.round(reg_width / 2))) << 2;
  var max_data = [pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3]];
  var max = (pixels[w] - pixels[w + 1] - pixels[w + 2]) * pixels[w + 3];
  for (var y = y0; y < y0 + reg_height; y++) {
    if (y < 0 || y > imgData.height) continue;
    for (var x = x0; x < x0 + reg_width; x++) {
      if (x < 0 || x > imgData.width) continue;
      w = (y * imgData.width + x) << 2;
      // la valeur est définie par le degré de "rouge" du pixel
      var val = (pixels[w] - pixels[w + 1] - pixels[w + 2]) * pixels[w + 3];
      if (max < val) {
        max = val;
        max_data = [pixels[w], pixels[w + 1],
        pixels[w + 2], pixels[w + 3]];
      }
    }
  }
  // renvoie le pixel le plus coloré en rouge
  return max_data;
}

// comme ci-dessus, mais cette fois nous nous intéressons à la moyenne des couleurs, c'est-à-dire à la valeur maximale des gris
// cela devrait en fait donner le même résultat que max_from_region
morpho_filters.max_gray_from_region = function (imgData, x0, y0, reg_width, reg_height) {
  var pixels = imgData.data;
  var w = ((y0 + Math.round(reg_height / 2)) * imgData.width + (x0 + Math.round(reg_width / 2))) << 2;
  // Je suis presque sûr qu'il y a un problème ici
  // max données doivent avoir été initialisées avec [pixels[w]/3, pixels[w + 1]/3, pixels[w + 2]/3, pixels[w + 3]].
  // car si le pixel initial est le pixel maximum, les valeurs ne seront pas modifiées
  // et nous retournerons les données initiales max_data
  var max_data = [pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3]];
  var max = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];

  for (var y = y0; y < y0 + reg_height; y++) {
    if (y < 0 || y > imgData.height) continue;
    for (var x = x0; x < x0 + reg_width; x++) {
      if (x < 0 || x > imgData.width) continue;
      w = (y * imgData.width + x) << 2;
      var val = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];
      if (max < val) {
        max = val;
        // enregistrer le pixel maximum comme un pixel gris
        max_data = [val / 3, val / 3,
        val / 3, pixels[w + 3]];
      }
    }
  }
  // renvoie le pixel gris maximum
  return max_data;
}

// comme max_from_region, mais ici nous cherchons le minimum
morpho_filters.min_from_region = function (imgData, x0, y0, reg_width, reg_height) {
  var pixels = imgData.data;
  var w = ((y0 + Math.round(reg_height / 2)) * imgData.width + (x0 + Math.round(reg_width / 2))) << 2;
  var min_data = [pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3]];
  var min = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];
  for (var y = y0; y < y0 + reg_height; y++) {
    if (y < 0 || y > imgData.height) continue;
    for (var x = x0; x < x0 + reg_width; x++) {
      if (x < 0 || x > imgData.width) continue;
      w = (y * imgData.width + x) << 2;
      var val = (pixels[w] + pixels[w + 1] + pixels[w + 2]) * pixels[w + 3];
      // si ce pixel est "inférieur", enregistrer celui-ci
      if (min > val) {
        min = val;
        min_data = [pixels[w], pixels[w + 1],
        pixels[w + 2], pixels[w + 3]];
      }
    }
  }
  return min_data;
}
