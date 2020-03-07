var blobs={}

blobs.Pixel8ConnectivityBlobs=function(opt_options) {
  this.metric = opt_options.metric;
  this.threshold=opt_options && opt_options.threshold ? opt_options.threshold : 0;
}

blobs.Pixel8ConnectivityBlobs.prototype.process=function(in_imgData,out_imgData) {
  var blobs_arr=[]
  this.component=[];

  //BLOC1
  //.....
  var xy=0;
  for (var y=0; y < in_imgData.height; y++)
    for (var x=0; x < in_imgData.width; x++,xy++)
      this.component[xy]=xy;

  for (var y=0; y < in_imgData.height; y++) {
    for (var x=0; x < in_imgData.width; x++)
    {
      xy=(y*in_imgData.width)+x;

      //BLOC2
      //....
      var neighbours_connectivity=this.analyse_neighbours(in_imgData, x, y);

      //BLOC3
      //....
      for (var i=0;i<neighbours_connectivity.length;i++) {
        if (this.component[xy]!=neighbours_connectivity[i])
          this.component[xy]=this.rename_component(this.component[xy],neighbours_connectivity[i]);
      }
    }
  }


  var xy=0, w=0;
  var components_bbox=[];
  for (var y=0; y < in_imgData.height; y++)
    for (var x=0; x < in_imgData.width; x++,xy++,w+=4)
    {
      //BLOC4
      //....
      if (components_bbox[this.component[xy]])
        components_bbox[this.component[xy]]=
          this.update_bbox(
            this.component[xy],
            components_bbox[this.component[xy]],
            x,y,
            [in_imgData.data[w],in_imgData.data[w+1],in_imgData.data[w+2]]);
      else
        components_bbox[this.component[xy]]={
                      x0:x,y0:y,dx:0,dy:0,
                      count:1,mean:[in_imgData.data[w],in_imgData.data[w+1],
                      in_imgData.data[w+2]]};
    }

  if (out_imgData.data) {
    for (idx in components_bbox) {
    Tools.strokeBBox_on_imageData(out_imgData,components_bbox[idx],components_bbox[idx].mean);
    }
  }
  return components_bbox;
}

blobs.Pixel8ConnectivityBlobs.prototype.rename_component=function(c1,c2) {
  //BLOC5
  //....

  if (c1<c2) {new_c=c1;old_c=c2;} else {new_c=c2;old_c=c1;}
  for (var i=0;i<this.component.length;i++) {
    if (this.component[i]==old_c) this.component[i]=new_c;
  }
  return new_c;
}

blobs.Pixel8ConnectivityBlobs.prototype.analyse_neighbours=function(in_imgData, x0, y0) {
  w0=((y0*in_imgData.width)+x0)<<2;
  var pixel0=[in_imgData.data[w0],in_imgData.data[w0+1],in_imgData.data[w0+2]];

  var local_connectivity=[]

  //BLOC6
  //.....
  for (var dy=-1;dy<1;dy++) {
    if (0>(dy+y0) || (dy+y0)>=in_imgData.height) continue;
    for (var dx=-1;dx<(dy<0?2:1);dx++) {
      if (0>(dx+x0) || (dx+x0)>=in_imgData.width) continue;

      //BLOC7
      //...
      var xy=((y0+dy)*in_imgData.width+x0+dx);
      var w=xy<<2;
      var pixel=[in_imgData.data[w],in_imgData.data[w+1],in_imgData.data[w+2]]
      if (this.metric(pixel0,pixel) <= this.threshold) {
        //BLOC3
        //..
        var component=this.component[xy];
        if (local_connectivity.indexOf(component)==-1) {
          local_connectivity.push(component);
        }
      }
    }
  }
  local_connectivity.sort(function(a,b){return a<b?-1:((a==b)?0:1)});
  return local_connectivity;
}

blobs.Pixel8ConnectivityBlobs.prototype.update_bbox=function(id,bbox,x,y,mean) {

  //BLOC8
  //...
  if (bbox.x0>x) {bbox.dx+=bbox.x0-x; bbox.x0=x;}
  if (bbox.y0>y) {bbox.dy+=bbox.y0-y; bbox.y0=y;}
  if (bbox.x0+bbox.dx<x) bbox.dx=x-bbox.x0;
  if (bbox.y0+bbox.dy<y) bbox.dy=y-bbox.y0;
  bbox.count++;
  for (i=0;i<3;i++)
    bbox.mean[i]=((bbox.count-1)*bbox.mean[i]+mean[i])/bbox.count;
  return bbox;
}
