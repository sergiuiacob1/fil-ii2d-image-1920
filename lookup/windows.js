var lookup_windows={};


lookup_windows.MeanRGBSameSizeTemplate=function(
  template_imgElt_id,threshold
) {
  this.template_imageData=Tools.get_imageData_from_imgEltId(template_imgElt_id);
  this.threshold=threshold;
}

lookup_windows.MeanRGBSameSizeTemplate.prototype.process=function(in_imageData) {

  //BLOC1
  //....
  var lookup_dataset=new datasets.PartsOfImageDataset(
    in_imageData,
    sizes_and_steps=
      [{width:this.template_imageData.width,height:this.template_imageData.height,
        x:this.template_imageData.width/4,y:this.template_imageData.height/4}]
  );

  //BLOC2
  //....
  var similarity_task=new pixels_similarity.MeanRGBSimilarityTask(lookup_dataset,{});

  //BLOC3
  //....
  var sim_res=similarity_task.process(this.template_imageData);

  if (document.getElementById("res")) {
    document.getElementById("res").appendChild(document.createTextNode("Selected windows"));
    document.getElementById("res").appendChild(document.createElement("br"));
  }

  var windows=[];

  //BLOC4
  //....
  for (idx in sim_res) {

    if (sim_res[idx].sim>this.threshold)
      break;

    sim_imageData=lookup_dataset.imageDatas[sim_res[idx].idx];
    windows.push({sim:sim_res[idx].sim,idx:sim_res[idx].idx,
                  x:sim_imageData.orig_x,y:sim_imageData.orig_x,
                  dx:sim_imageData.width,dy:sim_imageData.height});
    document.getElementById("res")
      .appendChild(Tools.create_canvasElt_from_imageData(sim_imageData));
  }

  return windows;
}
