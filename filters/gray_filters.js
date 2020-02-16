ToGrayTask=function(opt_options) { }

ToGrayTask.prototype.process=function(imageData) {
  var pixels=imageData.data;
  var w=0;
  for (var i = 0; i < imageData.height; i++)
      for (var j = 0; j < imageData.width; j++) {
        var mean=(pixels[w+1]+pixels[w+2]+pixels[w+3])/3;
        pixels[w]=mean; pixels[w+1]=mean; pixels[w+2]=mean;
        w+=4;
      }
}

PartialGrayTask=function(opt_options) {
  this.reg_x=opt_options.reg_x; this.reg_y=opt_options.reg_y;
  this.reg_w=opt_options.reg_w; this.reg_h=opt_options.reg_h;
}

PartialGrayTask.prototype.process=function(imageData) {
  var pixels=imageData.data;
  for (var i = this.reg_y; i < this.reg_y+this.reg_h; i++)
      for (var j = this.reg_x; j < this.reg_x+this.reg_w; j++) {
        var pos=(i*imageData.width+j)<<2;
        var mean=(pixels[pos+1]+pixels[pos+2]+pixels[pos+3])/3;
        pixels[pos]=mean; pixels[pos+1]=mean; pixels[pos+2]=mean;
      }
}

RandomPartialGrayTask=function(opt_options) {
  this.reg_x=opt_options.reg_x; this.reg_y=opt_options.reg_y;
  this.reg_w=opt_options.reg_w; this.reg_h=opt_options.reg_h;
  this.cvs_w=opt_options.cvs_w; this.cvs_h=opt_options.csv_h;
}

RandomPartialGrayTask.prototype.process=function(imageData) {
  var pixels=imageData.data;
  for (var i = this.reg_y; i < this.reg_y+this.reg_h; i++)
      for (var j = this.reg_x; j < this.reg_x+this.reg_w; j++) {
        var pos=(i*imageData.width+j)<<2;
        var mean=(pixels[pos+1]+pixels[pos+2]+pixels[pos+3])/3;
        pixels[pos]=mean; pixels[pos+1]=mean; pixels[pos+2]=mean;
      }
}

RandomPartialGrayTask.prototype.random_focus=function() {
    this.reg_y=Math.trunc(Math.random()*(this.cvs_h-this.reg_h));
    this.reg_x=Math.trunc(Math.random()*(this.cvs_w-this.reg_w));
}
