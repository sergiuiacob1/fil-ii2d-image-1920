var diff = {}

diff.DifferenceImageRGB = function (opt_options) {
  this.difference = document.createElement("canvas");
  this.previous = document.createElement("canvas");

  this.width = opt_options.width;
  this.height = opt_options.height;

  this.difference.width = this.width; this.difference.height = this.height;
  this.previous.width = this.width; this.previous.height = this.height;

  this.difference_ctxt = this.difference.getContext("2d");
  this.previous_ctxt = this.previous.getContext("2d");
}

// définir les données initiales comme les données "précédentes"
// la donnée initiale est ici une image
diff.DifferenceImageRGB.prototype.set_first_frame_imgData = function (imgData) {
  this.previous_ctxt.putImageData(imgData, 0, 0);
}

// définir les données initiales comme les données "précédentes"
// la donnée initiale est ici un element HTML
diff.DifferenceImageRGB.prototype.set_first_frame_from_eltId = function (eltId) {
  var elt = document.getElementById(eltId);
  var cvs = document.createElement("canvas");
  cvs.width = elt.width; cvs.height = elt.height;
  var ctxt = cvs.getContext("2d");
  ctxt.drawImage(elt, 0, 0);
  this.set_first_frame_imgData(ctxt.getImageData(0, 0, cvs.width, cvs.height));
}

diff.DifferenceImageRGB.prototype.process = function (in_imgData, out_imgData) {
  // BLOC1
  // obtenir les données de l'image précédente
  var previous_imgData = this.previous_ctxt.
    getImageData(0, 0, this.width, this.height);

  // BLOC2
  // pour chaque pixel, calculer les différences entre l'image actuelle et l'image précédente
  var w = 0;
  for (var x = 0; x < this.width; x++)
    for (var y = 0; y < this.height; y++) {
      for (var i = 0; i < 3; i++) {
        out_imgData.data[w + i] =
          Math.abs(in_imgData.data[w + i] - previous_imgData.data[w + i]);
      }
      out_imgData.data[w + 3] = 255;
      w += 4;
    }
  // mettre à jour le cadre précédent
  this.previous_ctxt.putImageData(in_imgData, 0, 0);
}

diff.NormalizedDifferenceImageRGB = function (opt_options) {
  this.diffImageRGB = new diff.DifferenceImageRGB(opt_options);
}

diff.NormalizedDifferenceImageRGB.prototype.set_first_frame_imgData = function (imgData) {
  this.diffImageRGB.set_first_frame_from_imgData(imgData);
}

diff.NormalizedDifferenceImageRGB.prototype.set_first_frame_from_eltId = function (eltId) {
  this.diffImageRGB.set_first_frame_from_eltId(eltId);
}

diff.NormalizedDifferenceImageRGB.prototype.process = function (in_imgData, out_imgData) {
  // BLOC3
  // traiter la différence entre la trame actuelle et la trame précédente
  this.diffImageRGB.process(in_imgData, out_imgData);

  // BLOC4
  // trouver les différences minimales et maximales entre les pixels
  var w = 0;
  var min = [255, 255, 255], max = [0, 0, 0];
  for (var x = 0; x < this.diffImageRGB.width; x++)
    for (var y = 0; y < this.diffImageRGB.height; y++) {
      for (var i = 0; i < 3; i++) {
        if (min[i] > out_imgData.data[w + i]) min[i] = out_imgData.data[w + i];
        if (max[i] < out_imgData.data[w + i]) max[i] = out_imgData.data[w + i];
      }
      w += 4;
    }

  // BLOC5
  // normaliser les différences à l'aide d'un MinMaxScaler
  w = 0;
  for (var x = 0; x < this.diffImageRGB.width; x++)
    for (var y = 0; y < this.diffImageRGB.height; y++) {
      for (var i = 0; i < 3; i++) {
        out_imgData.data[w + i] = (out_imgData.data[w + i] - min[i]) * 255 / (max[i] - min[i]);
      }
      // maximiser l'opacité
      out_imgData.data[w + 3] = 255;
      w += 4;
    }
  this.diffImageRGB.previous_ctxt.putImageData(in_imgData, 0, 0);
}


// ----- GRAY DIFFERENCES -----
diff.DifferenceImageGray = function (opt_options) {
  this.difference = document.createElement("canvas");
  this.previous = document.createElement("canvas");

  this.width = opt_options.width;
  this.height = opt_options.height;

  this.difference.width = this.width; this.difference.height = this.height;
  this.previous.width = this.width; this.previous.height = this.height;

  this.difference_ctxt = this.difference.getContext("2d");
  this.previous_ctxt = this.previous.getContext("2d");
}

// définir les données initiales comme les données "précédentes"
// la donnée initiale est ici une image
diff.DifferenceImageGray.prototype.set_first_frame_imgData = function (imgData) {
  this.previous_ctxt.putImageData(imgData, 0, 0);
}

// définir les données initiales comme les données "précédentes"
// la donnée initiale est ici un element HTML
diff.DifferenceImageGray.prototype.set_first_frame_from_eltId = function (eltId) {
  var elt = document.getElementById(eltId);
  var cvs = document.createElement("canvas");
  cvs.width = elt.width; cvs.height = elt.height;
  var ctxt = cvs.getContext("2d");
  ctxt.drawImage(elt, 0, 0);
  this.set_first_frame_imgData(ctxt.getImageData(0, 0, cvs.width, cvs.height));
}

diff.DifferenceImageGray.prototype.process = function (in_imgData, out_imgData) {
  // BLOC1
  // obtenir les données de l'image précédente
  var previous_imgData = this.previous_ctxt.
    getImageData(0, 0, this.width, this.height);

  // BLOC2
  // pour chaque pixel, calculer les différences entre l'image actuelle et l'image précédente
  var w = 0;
  var currentGrayValue, previousGrayValue, difference;
  for (var x = 0; x < this.width; x++)
    for (var y = 0; y < this.height; y++) {
      // the difference now has to be between the gray levels
      currentGrayValue = 0;
      previousGrayValue = 0;
      for (var i = 0; i < 3; i++) {
        currentGrayValue += in_imgData.data[w + i];
        previousGrayValue += previous_imgData.data[w + i];
      }
      currentGrayValue /= 3;
      previousGrayValue /= 3;
      difference = Math.floor(Math.abs(currentGrayValue - previousGrayValue));

      // place the difference in the output
      for (var i = 0; i < 3; i++) {
        out_imgData.data[w + i] = difference;
      }
      out_imgData.data[w + 3] = 255;
      w += 4;
    }
  // mettre à jour le cadre précédent
  this.previous_ctxt.putImageData(in_imgData, 0, 0);
}

// NORMALIZED GRAY
diff.NormalizedDifferenceImageGray = function (opt_options) {
  this.diffImageGray = new diff.DifferenceImageGray(opt_options);
}

diff.NormalizedDifferenceImageGray.prototype.set_first_frame_imgData = function (imgData) {
  this.diffImageGray.set_first_frame_from_imgData(imgData);
}

diff.NormalizedDifferenceImageGray.prototype.set_first_frame_from_eltId = function (eltId) {
  this.diffImageGray.set_first_frame_from_eltId(eltId);
}

diff.NormalizedDifferenceImageGray.prototype.process = function (in_imgData, out_imgData) {
  // BLOC3
  // traiter la différence entre la trame actuelle et la trame précédente
  this.diffImageGray.process(in_imgData, out_imgData);

  // BLOC4
  // trouver les différences minimales et maximales entre les pixels
  var w = 0;
  var min = 255, max = 0;
  for (var x = 0; x < this.diffImageGray.width; x++)
    for (var y = 0; y < this.diffImageGray.height; y++) {
      if (min > out_imgData.data[w]) min = out_imgData.data[w];
      if (max < out_imgData.data[w]) max = out_imgData.data[w];
      w += 4;
    }

  // BLOC5
  // normaliser les différences à l'aide d'un MinMaxScaler
  w = 0;
  for (var x = 0; x < this.diffImageGray.width; x++)
    for (var y = 0; y < this.diffImageGray.height; y++) {
      for (var i = 0; i < 3; i++) {
        out_imgData.data[w + i] = (out_imgData.data[w + i] - min) * 255 / (max - min);
      }
      // maximiser l'opacité
      out_imgData.data[w + 3] = 255;
      w += 4;
    }
  this.diffImageGray.previous_ctxt.putImageData(in_imgData, 0, 0);
}

// THRESHOLDED GRAY
diff.ThresholdedDifferenceImage = function (opt_options) {
  this.diffImageGray = new diff.DifferenceImageGray(opt_options);
  // set the threshold
  this.threshold = opt_options.threshold;
}

diff.ThresholdedDifferenceImage.prototype.set_first_frame_imgData = function (imgData) {
  this.diffImageGray.set_first_frame_from_imgData(imgData);
}

diff.ThresholdedDifferenceImage.prototype.set_first_frame_from_eltId = function (eltId) {
  this.diffImageGray.set_first_frame_from_eltId(eltId);
}

diff.ThresholdedDifferenceImage.prototype.process = function (in_imgData, out_imgData) {
  // BLOC3
  // traiter la différence entre la trame actuelle et la trame précédente
  this.diffImageGray.process(in_imgData, out_imgData);

  // make white everyhing that is above the threshold
  w = 0;
  var val;
  for (var x = 0; x < this.diffImageGray.width; x++)
    for (var y = 0; y < this.diffImageGray.height; y++) {
      if (out_imgData.data[w] < this.threshold)
        val = 0;
      else
        val = 255;
      for (var i = 0; i < 3; i++) {
        out_imgData.data[w + i] = val;
      }
      // maximiser l'opacité
      out_imgData.data[w + 3] = 255;
      w += 4;
    }
  this.diffImageGray.previous_ctxt.putImageData(in_imgData, 0, 0);
}

// ===== GRAY DIFFERENCES =====