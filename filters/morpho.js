var morpho_filters={}

morpho_filters.max_from_region=function(imgData,x0,y0,reg_width,reg_height) {
  var pixels=imgData.data;
  var w=((y0+Math.round(reg_height/2))*imgData.width
                                        +(x0+Math.round(reg_width/2)))<<2;
  var max_data=[pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
  var max=(pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];

  for (var y=Math.max(0,y0);y<Math.min(y0+reg_height,imgData.height);y++)
    for (var x=Math.max(0,x0);x<Math.min(x0+reg_width,imgData.width);x++) {
      w = (y*imgData.width+x)<<2;
      var val = (pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
      if (max < val) {
        if (pixels[w+3]<255) pixels[w+3]=255;
        max = val; max_data = [pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
      }
    }
  return max_data;
}

morpho_filters.max_red_from_region=function(imgData,x0,y0,reg_width,reg_height) {
  var pixels=imgData.data;
  var w=((y0+Math.round(reg_height/2))*imgData.width+(x0+Math.round(reg_width/2)))<<2;
  var max_data=[pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
  var max=(pixels[w]-pixels[w+1]-pixels[w+2])*pixels[w+3];
  for (var y=y0;y<y0+reg_height;y++) {
    if (y<0 || y>imgData.height) continue;
    for (var x=x0;x<x0+reg_width;x++) {
      if (x<0 || x>imgData.width) continue;
      w = (y*imgData.width+x)<<2;
      var val = (pixels[w]-pixels[w+1]-pixels[w+2])*pixels[w+3];
      if (max < val) {
        max = val;
        max_data=[pixels[w], pixels[w+1],
                  pixels[w+2], pixels[w+3]];
      }
    }
  }
  return max_data;
}

morpho_filters.max_gray_from_region=function(imgData,x0,y0,reg_width,reg_height) {
  var pixels=imgData.data;
  var w=((y0+Math.round(reg_height/2))*imgData.width+(x0+Math.round(reg_width/2)))<<2;
  var max_data=[pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
  var max=(pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];

  for (var y=y0;y<y0+reg_height;y++) {
    if (y<0 || y>imgData.height) continue;
    for (var x=x0;x<x0+reg_width;x++) {
      if (x<0 || x>imgData.width) continue;
      w = (y*imgData.width+x)<<2;
      var val = (pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
      if (max < val) {
        max = val;
        max_data=[val/3, val/3,
                  val/3, pixels[w+3]];
      }
    }
  }
  return max_data;
}

morpho_filters.min_from_region=function(imgData,x0,y0,reg_width,reg_height) {
  var pixels=imgData.data;
  var w=((y0+Math.round(reg_height/2))*imgData.width+(x0+Math.round(reg_width/2)))<<2;
  var min_data=[pixels[w],pixels[w+1],pixels[w+2],pixels[w+3]];
  var min=(pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
  for (var y=y0;y<y0+reg_height;y++) {
    if (y<0 || y>imgData.height) continue;
    for (var x=x0;x<x0+reg_width;x++) {
      if (x<0 || x>imgData.width) continue;
      w = (y*imgData.width+x)<<2;
      var val = (pixels[w]+pixels[w+1]+pixels[w+2])*pixels[w+3];
      if (min > val) {
        min = val;
        min_data=[pixels[w], pixels[w+1],
                  pixels[w+2], pixels[w+3]];
      }
    }
  }
  return min_data;
}
