var animations=[]

animations.MovingCircle=function(output_canvas_id,opt_options) {
  this.radius=opt_options&&opt_options.radius?opt_options.radius:5;

  this.x0=opt_options&&opt_options.x0?opt_options.x0:5;
  this.y0=opt_options&&opt_options.y0?opt_options.y0:5;

  this.step_x=opt_options&&opt_options.step_x?opt_options.step_x:1;
  this.step_y=opt_options&&opt_options.step_x?opt_options.step_y:0;

  this.random=opt_options&&opt_options.random?true:false;

  this.output_cvs=document.getElementById(output_canvas_id);
  this.output_ctxt=this.output_cvs.getContext("2d");
  this.fillColor=opt_options&&opt_options.fillColor?opt_options.fillColor:[255,0,0,255];

}

animations.MovingCircle.prototype.move=function() {
  var local_dx=Math.round(this.step_x*(!this.random?1:Math.random()));
  var local_dy=Math.round(this.step_y*(!this.random?1:Math.random()));

  this.x0+=local_dx; this.y0+=local_dy;

  if ((this.x0+this.radius)>this.output_cvs.width) {
    this.x0=this.output_cvs.width-this.radius; this.step_x=-this.step_x;
  } else if (this.x0 < this.radius ) {
      this.x0=this.radius; this.step_x=-this.step_x;
  }

  if ((this.y0+this.radius) > this.output_cvs.height) {
    this.y0=this.output_cvs.height-this.radius; this.step_y=-this.step_y;
  } else if (this.y0 < this.radius ) {
    this.y0=this.radius; this.step_y=-this.step_y;
  }
}

animations.MovingCircle.prototype.draw=function() {
  this.output_ctxt.fillStyle="rgba("+this.fillColor.join(",")+")";
  this.output_ctxt.beginPath();
  this.output_ctxt.arc(this.x0,this.y0,this.radius,0,2*Math.PI);
  this.output_ctxt.fill();
}
animations.MovingCircle.prototype.clean=function() {
  this.output_ctxt.beginPath();
  this.output_ctxt.clearRect(this.x0-this.radius,this.y0-this.radius,this.radius*2,this.radius*2);
}

animations.MovingCircle.prototype.animate=function() {
  this.clean();
  this.move();
  this.draw();
}


animations.MovingCircleHChangingColor=function(output_canvas_id,opt_options) {
  this.moving_circle=new animations.MovingCircle(output_canvas_id,opt_options);

  this.fillColor0=opt_options&&opt_options.fillColor0?opt_options.fillColor0:[255,0,0,0];
  this.fillColor1=opt_options&&opt_options.fillColor1?opt_options.fillColor1:[0,255,0,0];
  this.fillColorNbSteps=opt_options&&opt_options.fillColorNbSteps?opt_options.fillColorNbSteps:5;
  this.fillColorIncrement=[];
  for (i=0;i<4;i++) {
    this.fillColorIncrement[i]=(this.fillColor1[i]-this.fillColor0[i])/this.fillColorNbSteps;
  };
  this.moving_circle.fillColor=this.fillColor0;
  this.fillColorStepCount=0;
  this.fillColorIncrementSign=1;

}

animations.MovingCircleHChangingColor.prototype.move=function() {


  if (this.fillColorStepCount==this.fillColorNbSteps) {
    this.fillColorIncrementSign=-this.fillColorIncrementSign;
    this.fillColorStepCount=0;
  };

  for (i=0;i<4;i++) {
    this.moving_circle.fillColor[i]+=this.fillColorIncrementSign*this.fillColorIncrement[i];
  };
  this.fillColorStepCount++;

  this.moving_circle.move();
}

animations.MovingCircleHChangingColor.prototype.draw=function() {
  this.moving_circle.draw();
}

animations.MovingCircleHChangingColor.prototype.clean=function() {
  this.moving_circle.clean();
}

animations.MovingCircleHChangingColor.prototype.animate=function() {
  this.clean();
  this.move();
  this.draw();
}


animations.MovingCircleHChangingColorChangingBackground=function(output_canvas_id,opt_options) {
  this.moving_circle=new animations.MovingCircleHChangingColor(output_canvas_id,opt_options);

  this.output_cvs=document.getElementById(output_canvas_id);
  this.output_ctxt=this.output_cvs.getContext("2d");

  this.bgColor0=opt_options&&opt_options.bgColor0?opt_options.bgColor0:[255,0,0,255];
  this.bgColor1=opt_options&&opt_options.bgColor1?opt_options.bgColor1:[0,255,0,255];
  this.bgColorNbSteps=opt_options&&opt_options.bgColorNbSteps?opt_options.bgColorNbSteps:5;
  this.bgColorIncrement=[];
  for (i=0;i<4;i++) {
    this.bgColorIncrement[i]=(this.bgColor1[i]-this.bgColor0[i])/this.bgColorNbSteps;
  };
  this.bgColor=this.bgColor0;
  this.bgColorStepCount=0;
  this.bgColorIncrementSign=1;

}

animations.MovingCircleHChangingColorChangingBackground.prototype.draw=function() {
  this.output_ctxt.fillStyle="rgba("+this.bgColor.join(",")+")";
  this.output_ctxt.beginPath();
  this.output_ctxt.fillRect(0,0,this.output_cvs.width,this.output_cvs.height);

  this.moving_circle.draw();
}

animations.MovingCircleHChangingColorChangingBackground.prototype.move=function() {

  if (this.bgColorStepCount==this.bgColorNbSteps) {
    this.bgColorIncrementSign=-this.bgColorIncrementSign;
    this.bgColorStepCount=0;
  };

  for (i=0;i<4;i++) {
    this.bgColor[i]+=this.bgColorIncrementSign*this.bgColorIncrement[i];
  };
  this.bgColorStepCount++;

  this.moving_circle.move();
}

animations.MovingCircleHChangingColorChangingBackground.prototype.clean=function(){
  this.moving_circle.clean();
}

animations.MovingCircleHChangingColorChangingBackground.prototype.animate=function(){
  this.clean();
  this.move();
  this.draw();
}
