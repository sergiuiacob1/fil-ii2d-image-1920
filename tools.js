var Tools={}

Tools.init_user_media=function(element,opt_options) {
  window.navigator.mediaDevices.getUserMedia({
    video: true,
    audio: (opt_options && opt_options.audio) ? true : false,
  }).then(function(stream) {
    element.inObject = stream;
  }).catch(function(err) {
    throw Error('Cannot capture user camera.');
  });
}

Tools.get_imageData_from_imgEltId=function(img_elt_id) {
  return Tools.get_partial_imageData_from_imgEltId(img_elt_id);
}

Tools.get_partial_imageData_from_imgEltId=function(img_elt_id,x=0,y=0,dx=undefined,dy=undefined) {
  var img=document.getElementById(img_elt_id);
  if (!dx) dx=img.width-x;
  if (!dy) dy=img.height-y;
  var cvs=document.createElement("canvas");
  cvs.width=dx;cvs.height=dy;
  var ctxt=cvs.getContext("2d");
  ctxt.drawImage(img,x,y,dx,dy);
  var imageData=ctxt.getImageData(0,0,dx,dy);
  imageData.ctxt=ctxt;
  imageData.orig_id=img_elt_id
  imageData.orig_x=x;
  imageData.orig_y=y;
  return imageData;
}

Tools.create_canvasElt_from_imageData=function(imageData) {
  var cvs_elt=document.createElement("canvas");
  cvs_elt.width=imageData.width;
  cvs_elt.height=imageData.height;
  cvs_elt.style="border:1px solid #000000";
  cvs_elt.alt=imageData.orig_id;
  Tools.update_canvasElt_from_imageData(cvs_elt,imageData)
  return cvs_elt;
}

Tools.update_canvasElt_from_imageData=function(cvs_elt,imageData,x=0,y=0) {
  var ctxt=cvs_elt.getContext("2d");
  ctxt.putImageData(imageData,x,y);
}

Tools.copy_imageData_into_imageData=function(src_imageData,dest_imageData,x0,y0) {
  var w_src=0;
  for (var src_y=0; src_y<src_imageData.height; src_y++)
    for (var src_x=0; src_x < src_imageData.width; src_x++) {
      w_out=(y0+src_y)*dest_imageData.width+(x0+src_x)<<2;
      dest_imageData.data[w_out]=src_imageData.data[w_src];
      dest_imageData.data[w_out+1]=src_imageData.data[w_src+1];
      dest_imageData.data[w_out+2]=src_imageData.data[w_src+2];
      dest_imageData.data[w_out+3]=src_imageData.data[w_src+3];
      w_src+=4
    }
}

Tools.get_region_from_imageData=function(src_imageData,x0,y0,dx,dy) {
  var reg_imageData=src_imageData.ctxt.getImageData(
      src_imageData.orig_x+x0,src_imageData.orig_y+y0,
      dx,dy);
  reg_imageData.orig_x=src_imageData.orig_x+x0;
  reg_imageData.orig_y=src_imageData.orig_y+x0;
  reg_imageData.ctxt = src_imageData.ctxt;
  reg_imageData.orig_id = src_imageData.orig_id;

  return reg_imageData;
}
