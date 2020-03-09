var mvt_detection={}

mvt_detection.SimpleMvtDetectorRegion=function(opt_options) {
  this.difference = document.createElement("canvas");
  this.previous = document.createElement("canvas");

  this.bbox=opt_options.bbox;

  this.difference.width=this.bbox.dx; this.difference.height=this.bbox.dy;
  this.previous.width=this.bbox.dx; this.previous.height=this.bbox.dy;

  this.difference_ctxt = this.difference.getContext("2d");
  this.previous_ctxt = this.previous.getContext("2d");

  this.diff_threshold=opt_options.diff_threshold;
  this.mvt_threshold=opt_options.mvt_threshold;
}

mvt_detection.SimpleMvtDetectorRegion.prototype.set_first_frame_from_eltId=function(eltId) {
  var elt=document.getElementById(eltId);
  var cvs=document.createElement("canvas");
  cvs.width=elt.width; cvs.height=elt.height;
  var ctxt=cvs.getContext("2d");
  ctxt.drawImage(elt,0,0);
  var first_imgData=ctxt.getImageData(this.bbox.x0,this.bbox.y0,this.bbox.dx,this.bbox.dy);
  this.previous_ctxt.putImageData(first_imgData,0,0);
}

mvt_detection.SimpleMvtDetectorRegion.prototype.process=function(in_imgData, out_imgData) {
  var previous_imgData = this.previous_ctxt.
                            getImageData(0, 0, this.bbox.dx, this.bbox.dy);
  in_reg_imgData=in_imgData.ctxt.getImageData(this.bbox.x0,this.bbox.y0,this.bbox.dx,this.bbox.dy);

  var w=0;
  var count=0;
  var min=[255,255,255], max=[0,0,0];
  for (var x=0; x<this.bbox.dx ; x++)
    for (var y=0; y<this.bbox.dy ; y++) {
      var diff=0;
        for (var i=0; i<3; i++) {
          out_imgData.data[w+i] = Math.abs(in_reg_imgData.data[w+i] - previous_imgData.data[w+i]);
          diff += out_imgData.data[w+i];
        }
        count+=(diff>this.diff_threshold);
        out_imgData.data[w+3] = 255;
        w+=4;
    }

  this.previous_ctxt.putImageData(in_reg_imgData,0,0);
  if (out_imgData) {
    Tools.copy_partial_imageData_into_imageData(in_imgData,0,0,in_imgData.width,in_imgData.height,out_imgData,0,0);
    Tools.strokeBBox_on_imageData(out_imgData,this.bbox,[255*(count>this.mvt_threshold),0,0,255]);
  }
  return (count>this.mvt_threshold);
}
