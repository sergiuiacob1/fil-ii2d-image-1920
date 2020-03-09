GetPixelRGBATask = function (opt_options) {
  this.x = opt_options.x;
  this.y = opt_options.y;
  this.output = opt_options.output;
}

GetPixelRGBATask.prototype.process = function (imageData) {
  var pos = (this.y * imageData.width + this.x) << 2;
  var r = imageData.data[pos];
  var g = imageData.data[pos + 1];
  var b = imageData.data[pos + 2];
  var a = imageData.data[pos + 3];

  this.output.innerHTML = this.x + "x" + this.y + " : ";
  this.output.innerHTML += "<font color='red'>" + r + "</font> | ";
  this.output.innerHTML += "<font color='green'>" + g + "</font> | ";
  this.output.innerHTML += "<font color='blue'>" + b + "</font> | ";
  this.output.innerHTML += "<font color='gray'>" + a + "</font>";
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var pixels_features = {};

/*
  pixels_features.mean_rgb
  - computes RGB mean of all pixels having A>0 within imageData
*/
pixels_features.mean_rgb = function (imageData, opt_options) {
  return pixels_features.mean_rgb_per_region(imageData, { x0: 0, y0: 0, dx: imageData.width, dy: imageData.height });
}

/*
  pixels_features.mean_rgb_per_region
  - computes RGB mean of all pixels having A>0 within opt_options.x0 .y0 .dx .dy
  - if opt_options missing partially,
      replace partially with defaults 0, 0, imageData.width, imageData.height
  - returns undefined if none available
*/
pixels_features.mean_rgb_per_region = function (imageData, opt_options) {
  x0 = opt_options && opt_options.x0 ? opt_options.x0 : 0;
  y0 = opt_options && opt_options.y0 ? opt_options.y0 : 0;
  dx = opt_options && opt_options.dx ? opt_options.dx : imageData.width;
  dy = opt_options && opt_options.dy ? opt_options.dy : imageData.height;


  // BLOC1
  // ici, on va travailler avec une région définie par (x0, y0), (x0 + dx, y0 + dy)
  // après, on va selectioner seulement les pixels qui sont PAS transparent de cette région
  // sur la base de ceux *count* pixels, on va calculer le pixel moyenne
  // si il y a pas des pixels qui sont pas transparent dans notre région, on va returner "undefined"
  var mean = [];
  mean[0] = 0; mean[1] = 0; mean[2] = 0;
  var pos = 0; var count = 0;
  for (var y = y0; y < y0 + dy; y++)
    for (var x = x0; x < x0 + dx; x++) {
      pos = (y * imageData.width + x) << 2;
      if (imageData.data[pos + 3] > 0) {
        for (var i = 0; i < 3; i++) {
          mean[i] += imageData.data[pos + i];
        }
        count++;
      }
    }
  if (count > 0) {
    for (var i = 0; i < 3; i++) {
      mean[i] = Math.round(mean[i] / count);
    }
    return mean;
  }
  return undefined;
}

/*
  pixels_features.grid_mean_rgb
  - computes RGB mean of all pixels having A>0 in all grid cells
  - grid params are defined as opt_options.nb_lines x opt_options.nb_columns
  - returns a generic_features.grid_descriptor (grid.cells - array)
*/
pixels_features.grid_mean_rgb = function (imageData, opt_options) {

  console.log("construct grid mean rgb");
  console.log(opt_options);

  return generic_features.grid_descriptor(imageData,
    pixels_features.mean_rgb_per_region,
    opt_options);
}

pixels_features.mean_gray = function (imageData, opt_options) {
  return pixels_features.mean_gray_per_region(imageData, { x0: 0, y0: 0, dx: imageData.width, dy: imageData.height });
}

pixels_features.mean_gray_per_region = function (imageData, opt_options) {
  x0 = opt_options && opt_options.x0 ? opt_options.x0 : 0;
  y0 = opt_options && opt_options.y0 ? opt_options.y0 : 0;
  dx = opt_options && opt_options.dx ? opt_options.dx : imageData.width;
  dy = opt_options && opt_options.dy ? opt_options.dy : imageData.height;

  var mean = 0;
  var pos, count = 0;
  for (var y = y0; y < y0 + dy; y++)
    for (var x = x0; x < x0 + dx; x++) {
      pos = (y * imageData.width + x) << 2;
      if (imageData.data[pos + 3] > 0) {
        for (var i = 0; i < 3; i++) {
          mean += imageData.data[pos + i];
        }
        count++;
      }
    }

  if (count > 0) {
    // divide by 3 (because of R, G and B) multiplied by the total number of pixels
    mean /= count * 3;
    return mean;
  }
  return undefined;
}
/*
  pixels_features.mean_rgb_afactor_per_region
  - computes RGB mean of all pixels considering A as a weight of RGB channels
  within opt_options.x0 .y0 .dx .dy
  - if opt_options missing partially,
      replace partially with defaults 0, 0, imageData.width, imageData.height
  - returns undefined if none available
*/
pixels_features.mean_rgb_afactor_per_region = function (imageData, opt_options) {
  x0 = opt_options && opt_options.x0 ? opt_options.x0 : 0;
  y0 = opt_options && opt_options.y0 ? opt_options.y0 : 0;
  dx = opt_options && opt_options.dx ? opt_options.dx : imageData.width;
  dy = opt_options && opt_options.dy ? opt_options.dy : imageData.height;


  var mean = [];
  mean[0] = 0; mean[1] = 0; mean[2] = 0;
  var pos = 0; var count = 0;
  for (var y = y0; y < y0 + dy; y++)
    for (var x = x0; x < x0 + dx; x++) {
      pos = (y * imageData.width + x) << 2;
      for (var i = 0; i < 3; i++) {
        mean[i] += (imageData.data[pos + i] * imageData.data[pos + 3]);
      }
      count++;
    }
  if (count > 0) {
    for (var i = 0; i < 3; i++) {
      mean[i] = Math.round(mean[i] / count);
    }
    return mean;
  }
  return undefined;
}

pixels_features.grid_mean_gray = function (imageData, opt_options) {
  console.log("construct grid mean gray");
  console.log(opt_options);

  return generic_features.grid_descriptor(imageData,
    pixels_features.mean_gray_per_region,
    opt_options
  );
}

// histograms
pixels_features.histo_gray = function (imageData, opt_options) {
  return pixels_features.histo_gray_per_region(imageData, {
    x0: 0,
    y0: 0,
    dx: imageData.width,
    dy: imageData.height,
    nbins: opt_options && opt_options.nbins ? opt_options.nbins : 256,
  });
}

pixels_features.histo_gray_per_region = function (imageData, opt_options) {
  x0 = opt_options && opt_options.x0 ? opt_options.x0 : 0;
  y0 = opt_options && opt_options.y0 ? opt_options.y0 : 0;
  dx = opt_options && opt_options.dx ? opt_options.dx : imageData.width;
  dy = opt_options && opt_options.dy ? opt_options.dy : imageData.height;
  var nbins = opt_options && opt_options.nbins ? opt_options.nbins : 256;

  // set number of bins
  var hist = new Array(nbins).fill(0);
  var pos;

  for (var y = y0; y < y0 + dy; y++)
    for (var x = x0; x < x0 + dx; x++) {
      pos = (y * imageData.width + x) << 2;
      if (imageData.data[pos + 3] > 0) {
        mean = 0;
        for (var i = 0; i < 3; i++) {
          mean += imageData.data[pos + i];
        }
        mean /= 3;
        // put it in the right bin
        // mean / 255 * (nbins - 1)
        // -1 because arrays are from index 0
        ++hist[Math.floor(mean / 255 * (nbins - 1))];
      }
    }

  return hist;
}

pixels_features.grid_histo_gray = function (imageData, opt_options) {
  console.log("construct grid histo gray");
  console.log(opt_options);

  return generic_features.grid_descriptor(imageData,
    pixels_features.histo_gray_per_region,
    opt_options
  );
}

// rgb histograms
pixels_features.histo_rgb = function (imageData, opt_options) {
  return pixels_features.histo_rgb_per_region(imageData, {
    x0: 0,
    y0: 0,
    dx: imageData.width,
    dy: imageData.height,
    nbins: opt_options && opt_options.nbins ? opt_options.nbins : 256,
  });
}

pixels_features.histo_rgb_per_region = function (imageData, opt_options) {
  x0 = opt_options && opt_options.x0 ? opt_options.x0 : 0;
  y0 = opt_options && opt_options.y0 ? opt_options.y0 : 0;
  dx = opt_options && opt_options.dx ? opt_options.dx : imageData.width;
  dy = opt_options && opt_options.dy ? opt_options.dy : imageData.height;
  var nbins = opt_options && opt_options.nbins ? opt_options.nbins : 256;

  var hist = new Array(3).fill([]);
  for (var i = 0; i < 3; ++i)
    hist[i] = new Array(nbins).fill(0);

  var pos, bin;
  for (var y = y0; y < y0 + dy; y++)
    for (var x = x0; x < x0 + dx; x++) {
      pos = (y * imageData.width + x) << 2;
      if (imageData.data[pos + 3] > 0) {
        for (var i = 0; i < 3; i++) {
          // nbins - 1 because arrays are from 0
          bin = Math.floor(imageData.data[pos + i] / 255 * (nbins - 1));
          // hist[i] is the histogram for the color
          // bin is the bin in which the value should go
          ++hist[i][bin];
        }
      }
    }
  return hist;
}

pixels_features.grid_histo_rgb = function (imageData, opt_options) {
  console.log("construct grid histo rgb");
  console.log(opt_options);

  return generic_features.grid_descriptor(imageData,
    pixels_features.histo_rgb_per_region,
    opt_options
  );
}

GetRandomRGBAPixel = function (opt_options) {
  this.x = opt_options.x;
  this.y = opt_options.y;
  this.output = opt_options.output;
}

GetRandomRGBAPixel.prototype.process = function (imageData) {
  // choose a random pixel to switch places with
  var randomX = getRandomInt(this.width);
  var randomY = getRandomInt(this.height);
  var randomPos = (randomY * imageData.width + randomX) << 2;
  // pixel to switch
  var pos = (this.y * imageData.width + this.x) << 2;
  // switch values between (pos, randomPos)
  for (var i = 0; i < 4; ++i) {
    let aux = imageData.data[pos + i];
    imageData.data[pos + i] = imageData.data[randomPos + i];
    imageData.data[randomPos + i] = aux;
  }

  var r = imageData.data[pos];
  var g = imageData.data[pos + 1];
  var b = imageData.data[pos + 2];
  var a = imageData.data[pos + 3];
  this.output.innerHTML = "après changer :<br>";
  this.output.innerHTML += this.x + "x" + this.y + " : ";
  this.output.innerHTML += "<font color='red'>" + r + "</font> | ";
  this.output.innerHTML += "<font color='green'>" + g + "</font> | ";
  this.output.innerHTML += "<font color='blue'>" + b + "</font> | ";
  this.output.innerHTML += "<font color='gray'>" + a + "</font>";
}

GetMeanPixel = function (opt_options) {
  this.output = opt_options.output;
}

GetMeanPixel.prototype.process = function (imageData) {
  var means = [0, 0, 0, 0];
  var pos = 0;
  for (var x = 0; x < imageData.width; ++x)
    for (var y = 0; y < imageData.height; ++y) {
      for (var i = 0; i < 4; ++i)
        means[i] += imageData.data[pos + i];
      pos += 4;
    }

  for (var i = 0; i < 4; ++i) {
    means[i] /= (imageData.width * imageData.height);
    means[i] = Math.round(means[i]);
  }

  pos = 0;
  for (var x = 0; x < imageData.width; ++x)
    for (var y = 0; y < imageData.height; ++y) {
      for (var i = 0; i < 4; ++i)
        imageData.data[pos + i] = means[i];
      pos += 4;
    }

  this.output.innerHTML = "les valeurs moyennes (r, g, b, a) arrondies :<br>";
  this.output.innerHTML += "<font color='red'>" + means[0] + "</font> | ";
  this.output.innerHTML += "<font color='green'>" + means[1] + "</font> | ";
  this.output.innerHTML += "<font color='blue'>" + means[2] + "</font> | ";
  this.output.innerHTML += "<font style='color: rgba(0, 0, 0, 0.5);'>" + means[3] + "</font> | ";
}
