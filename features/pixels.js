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