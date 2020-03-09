var focus={}

focus.MovingFocus = function(opt_options) {
  this.focus_x=opt_options.focus_x;
  this.focus_y=opt_options.focus_y;
  this.focus_radius=opt_options.focus_radius;
  this.focus_dx=opt_options&&opt_options.focus_dx?opt_options.focus_dx:this.focus_radius/10;
  this.focus_dy=opt_options&&opt_options.focus_dy?opt_options.focus_dy:this.focus_radius/10;
  this.width=opt_options.width;
  this.height=opt_options.height;
  this.random=opt_options&&opt_options.random?opt_options.random:false;
}

focus.MovingFocus.prototype.updateFocus=function() {
  var increment_x=Math.round(this.focus_dx*(this.random?Math.random():1))
  this.focus_x+=increment_x;

  if ((this.focus_x+this.focus_radius>this.width)
          || (this.focus_x-this.focus_radius<0)) {
      this.focus_dx=-this.focus_dx;
      this.focus_x+=2*this.focus_dx;

  }

  var increment_y=Math.round(this.focus_dy*(this.random?Math.random():1))
  this.focus_y+=increment_y;
  if ((this.focus_y+this.focus_radius>this.height)
  ||(this.focus_y-this.focus_radius<0))
  {
      this.focus_dy=-this.focus_dy;
      this.focus_y+=2*this.focus_dy;

  }
}

focus.MovingFocus.prototype.isInsideFocus=function(i,j) {
    if (Math.sqrt((i-this.focus_x)*(i-this.focus_x)+
            (j-this.focus_y)*(j-this.focus_y))
            <=this.focus_radius)
        return true;
    else
        return false;
}

focus.MovingFocus.prototype.process = function(in_imgData,out_imgData) {
  var self=this;
  var w=0;
  var count=0;
  var pixels=in_imgData.data;

  //console.log("track "+this.focus_x+"x"+this.focus_y);
  for (var i = 0; i < in_imgData.height; i++) {
    for (var j = 0; j < in_imgData.width; j++) {
      var mean=(pixels[w+1]+pixels[w+2]+pixels[w])/3;

      if (this.isInsideFocus(j,i)) {
          var focus_i=i-this.focus_y;
          var focus_j=j-this.focus_x;
          var angleF=Math.atan2(focus_i,focus_j);

          var radius=Math.round(Math.sqrt(focus_i*focus_i+focus_j*focus_j));
          var angleR=Math.atan2(radius,this.focus_radius);

          var cible_i=Math.round(this.focus_y+focus_i);
          var cible_j=Math.round(this.focus_x+focus_j);

          //var cible_i=Math.round(this.focus_y+
          //                            radius*Math.sin(-angle));
          //var cible_j=Math.round(this.focus_x+
          //                             radius*Math.cos(-angle));

          //var cible_i=Math.round(this.focus_y+
          //                            radius*Math.sin(angle)*Math.sin(angle));
          //var cible_j=Math.round(this.focus_x+
          //                             radius*Math.cos(angle)*Math.cos(angle));

          /*var cible_i=Math.round(this.focus_y+
                                      radius*(Math.sin(angle*angle)));
          var cible_j=Math.round(this.focus_x+
                                       radius*(Math.cos(angle*angle)));
          */

          /*
          var cible_i=Math.round(this.focus_y+
                                      radius*(Math.sin(angleF)*Math.sin(angleR)));
          var cible_j=Math.round(this.focus_x+
                                       radius*(Math.cos(angleF)*Math.cos(angleR)));
          */

          /*var cible_i=Math.round(this.focus_y+
                                      radius*(Math.sin(angleF)/Math.sin(angleR)));
          var cible_j=Math.round(this.focus_x+
                                       radius*(Math.cos(angleF)/Math.cos(angleR)));
*/

          /*var cible_i=Math.round(this.focus_y+
                                      radius*radius/this.focus_radius
                                      *Math.sin(angleF));
          var cible_j=Math.round(this.focus_x+
                                       radius*radius/this.focus_radius
                                       *Math.cos(angleF));*/

          var cible_w=(cible_i*in_imgData.width+cible_j)<<2;
          //console.log(i+"x"+j+" "+w+" "+focus_i+"x"+focus_j+" - "+cible_i+"x"+cible_j+ " "+cible_w);
          out_imgData.data[w+1]=pixels[cible_w+1];
          out_imgData.data[w+2]=pixels[cible_w+2];
          out_imgData.data[w]=pixels[cible_w];
      } else {
          out_imgData.data[w + 1]=mean * 1;
          out_imgData.data[w + 2]=mean * 1;
          out_imgData.data[ w ]=mean * 1;
      }
      out_imgData.data[w+3]=pixels[w+3];
      w+=4;
    }
  }
};
