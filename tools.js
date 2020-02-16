var tools=function(){
  this.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
}

tools.prototype.initUserMedia=function(element,opt_options) {
  window.navigator.mediaDevices.getUserMedia({
    video: true,
    audio: (opt_options && opt_options.audio) ? true : false,
  }).then(function(stream) {
    element.srcObject = stream;
  }).catch(function(err) {
    throw Error('Cannot capture user camera.');
  });
}
