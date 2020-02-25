ToGrayTask = function (opt_options) { }

ToGrayTask.prototype.process = function (imageData) {
  var pixels = imageData.data;
  var w = 0;
  for (var i = 0; i < imageData.height; i++)
    for (var j = 0; j < imageData.width; j++) {
      var mean = (pixels[w + 1] + pixels[w + 2] + pixels[w + 3]) / 3;
      pixels[w] = mean; pixels[w + 1] = mean; pixels[w + 2] = mean;
      w += 4;
    }
}

PartialGrayTask = function (opt_options) {
  this.reg_x = opt_options.reg_x; this.reg_y = opt_options.reg_y;
  this.reg_w = opt_options.reg_w; this.reg_h = opt_options.reg_h;
}

PartialGrayTask.prototype.process = function (imageData) {
  var pixels = imageData.data;
  for (var i = this.reg_y; i < this.reg_y + this.reg_h; i++)
    for (var j = this.reg_x; j < this.reg_x + this.reg_w; j++) {
      var pos = (i * imageData.width + j) << 2;
      var mean = (pixels[pos + 1] + pixels[pos + 2] + pixels[pos + 3]) / 3;
      pixels[pos] = mean; pixels[pos + 1] = mean; pixels[pos + 2] = mean;
    }
}

RandomPartialGrayTask = function (opt_options) {
  this.reg_x = opt_options.reg_x; this.reg_y = opt_options.reg_y;
  this.reg_w = opt_options.reg_w; this.reg_h = opt_options.reg_h;
  this.cvs_w = opt_options.cvs_w; this.cvs_h = opt_options.csv_h;
}

RandomPartialGrayTask.prototype.process = function (imageData) {
  var pixels = imageData.data;
  for (var i = this.reg_y; i < this.reg_y + this.reg_h; i++)
    for (var j = this.reg_x; j < this.reg_x + this.reg_w; j++) {
      var pos = (i * imageData.width + j) << 2;
      var mean = (pixels[pos + 1] + pixels[pos + 2] + pixels[pos + 3]) / 3;
      pixels[pos] = mean; pixels[pos + 1] = mean; pixels[pos + 2] = mean;
    }
}

RandomPartialGrayTask.prototype.random_focus = function () {
  this.reg_y = Math.trunc(Math.random() * (this.cvs_h - this.reg_h));
  this.reg_x = Math.trunc(Math.random() * (this.cvs_w - this.reg_w));
}


BlackAndWhiteTask = function (opt_options) { }

BlackAndWhiteTask.prototype.process = function (imageData) {
  threshold = document.getElementById('threshold').value;
  document.getElementById('label-threshold').textContent = `Seuil: ${threshold}`;
  var pos = 0;
  var val;
  for (var y = 0; y < imageData.height; ++y)
    for (var x = 0; x < imageData.width; ++x) {
      // if the gray value is bigger than the threshold, make it white
      val = (imageData.data[pos] > threshold);
      for (var i = 0; i < 3; ++i)
        imageData.data[pos + i] = 255 * val;
      pos += 4;
    }
}

ToGrayCustomTask = function (opt_options) { }

ToGrayCustomTask.prototype.process = function (imageData) {
  var pos = 0;
  var mean;
  for (var y = 0; y < imageData.height; ++y)
    for (var x = 0; x < imageData.width; ++x) {
      // if the gray value is bigger than the threshold, make it white
      if (imageData.data[pos] < imageData.data[pos + 1] || imageData.data[pos] < imageData.data[pos + 2]) {
        mean = 0;
        for (var i = 0; i < 3; ++i)
          mean += imageData.data[pos + i];
        mean /= 3;
        for (var i = 0; i < 3; ++i)
          imageData.data[pos + i] = mean;
      }
      pos += 4;
    }
}


ToGrayWeightedTask = function (opt_options) { }

ToGrayWeightedTask.prototype.process = function (imageData) {
  var weights = [];
  var text = ['R', 'G', 'B'];
  // get the weights for each channel
  for (var i = 0; i < 3; ++i) {
    weights[i] = document.getElementById(`threshold${i + 1}`).value;
    document.getElementById(`label-threshold${i + 1}`).textContent = `Poid ${text[i]} : ${weights[i]}%`;
    weights[i] /= 100;
  }

  var pos = 0;
  var mean;
  for (var y = 0; y < imageData.height; ++y)
    for (var x = 0; x < imageData.width; ++x) {
      mean = 0;
      for (var i = 0; i < 3; ++i)
        // weighted sum
        mean += imageData.data[pos + i] * weights[i];
      mean /= 3;
      for (var i = 0; i < 3; ++i)
        imageData.data[pos + i] = mean;

      pos += 4;
    }
}


ReverseRAndBTask = function (opt_options) { }

ReverseRAndBTask.prototype.process = function (imageData) {
  var aux;
  var pos = 0;
  for (var y = 0; y < imageData.height; ++y)
    for (var x = 0; x < imageData.width; ++x) {
      // reverse R and B
      aux = imageData.data[pos];
      imageData.data[pos] = imageData.data[pos + 2];
      imageData.data[pos + 2] = aux;
      pos += 4;
    }
}

ToGrayDistanceTask = function (opt_options) {
  this.x = opt_options.x;
  this.y = opt_options.y;
  this.dx = opt_options.dx;
  this.dy = opt_options.dy;
  this.id = opt_options.id;
}

ToGrayDistanceTask.prototype.process = function (imageData) {
  var ray = document.getElementById(`threshold${this.id}`).value;
  document.getElementById(`label-threshold${this.id}`).textContent = `Rayon  : ${ray}`;
  ray = parseFloat(ray);

  var pos = 0;
  var dist, mean;
  for (var y = 0; y < imageData.height; ++y)
    for (var x = 0; x < imageData.width; ++x) {
      // distance from the centre
      dist = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
      if (dist >= ray) {
        // if it's outside the ray, make it gray
        mean = 0;
        for (var i = 0; i < 3; ++i)
          mean += imageData.data[pos + i];
        mean /= 3;
        for (var i = 0; i < 3; ++i)
          imageData.data[pos + i] = mean;
      }
      pos += 4;
    }

  // move the circle
  // but make sure we don't go out of the image
  if ((this.x + this.dx + ray > imageData.width) || (this.x + this.dx - ray < 0))
    this.dx = -this.dx;
  else
    this.x += this.dx;
  if ((this.y + this.dy + ray > imageData.height) || (this.y + this.dy - ray < 0))
    this.dy = -this.dy;
  else
    this.y += this.dy;
}

ToGrayZoomTask = function (opt_options) {
  this.x = opt_options.x;
  this.y = opt_options.y;
  this.dx = opt_options.dx;
  this.dy = opt_options.dy;
  this.id = opt_options.id;
}

ToGrayZoomTask.prototype.process = function (imageData) {
  var ray = document.getElementById(`threshold${this.id}`).value;
  document.getElementById(`label-threshold${this.id}`).textContent = `Rayon  : ${ray}`;
  ray = parseFloat(ray);

  var pos = 0;
  var dist, mean;
  var toZoom = [];
  for (var y = 0; y < imageData.height; ++y)
    for (var x = 0; x < imageData.width; ++x) {
      // distance from the centre
      dist = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
      if (dist > ray) {
        // if it's outside the ray, make it gray
        mean = 0;
        for (var i = 0; i < 3; ++i)
          mean += imageData.data[pos + i];
        mean /= 3;
        for (var i = 0; i < 3; ++i)
          imageData.data[pos + i] = mean;
      }
      else {
        // these pixels are inside the circle, remember them
        for (var i = 0; i < 4; ++i)
          toZoom.push(imageData.data[pos + i]);
      }
      pos += 4;
    }

  // now for the zooming part
  // zoom only the "middle" pixels
  var middleIndex = toZoom.length / 2;
  toZoom = toZoom.slice(middleIndex - middleIndex / 2, middleIndex + middleIndex / 2);
  var zoomed = [];
  for (var i = 0; i < toZoom.length; i += 4) {
    // take this pixel, insert it twice
    for (var j = 0; j < 4; ++j)
      zoomed.push(toZoom[i + j]);
    for (var j = 0; j < 4; ++j)
      zoomed.push(toZoom[i + j]);
  }

  // put the zoomed part in the image data
  var i = 0;
  pos = 0;
  for (var y = 0; y < imageData.height; ++y)
    for (var x = 0; x < imageData.width; ++x) {
      // distance from the centre
      dist = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
      if (dist <= ray) {
        for (var j = 0; j < 4; ++j)
          imageData.data[pos + j] = zoomed[i++];
      }
      pos += 4;
    }

  // move the circle
  // but make sure we don't go out of the image
  if ((this.x + this.dx + ray > imageData.width) || (this.x + this.dx - ray < 0))
    this.dx = -this.dx;
  else
    this.x += this.dx;
  if ((this.y + this.dy + ray > imageData.height) || (this.y + this.dy - ray < 0))
    this.dy = -this.dy;
  else
    this.y += this.dy;
}