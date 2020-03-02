var pixels_similarity={}

/*
pixels_similarity.MeanRGBSimilarityTask

Task that allows similarity measures between a source image and a collection of
images contained in a Dataset object. The similartiy is measured considering the pixels_features.mean_rgb descriptor and the pixel_metrics.rgb_edist metric.

This task inherits from generic_similarity.SimilarityTask and, upon processing an imgData object using pixels_similarity.MeanRGBSimilarityTask.prototype.process(imgData), it provides the list of most similar images to imgData within the dataset.
*/

pixels_similarity.MeanRGBSimilarityTask=function(dataset,opt_options) {
  this.generic_sim=new generic_similarity.SimilarityTask(
    dataset,
    pixels_features.mean_rgb,
    pixel_metrics.rgb_edist,
    opt_options
  );
  this.dataset=dataset;
}

pixels_similarity.MeanRGBSimilarityTask.prototype.process=function(in_imageData) {
  return this.generic_sim.process(in_imageData);
}

pixels_similarity.MeanRGBSimilarityTask.prototype.process_descriptor=function(in_descriptor) {
  return this.generic_sim.process_descriptor(in_descriptor);
}

/*
pixels_similarity.GridMeanRGBSimilarityTask

Task that allows similarity measures between a source image and a collection of
images contained in a Dataset object. The similartiy is measured considering the pixels_features.grid_mean_rgb descriptor and the pixel_metrics.grid_rgb_edist metric in each cell of a rectangular Grid.

This task inherits from generic_similarity.SimilarityTask and, upon processing an imgData object using pixels_similarity.GridMeanRGBSimilarityTask.prototype.process(imgData), it provides the list of most similar images to imgData within the dataset.
*/

pixels_similarity.GridMeanRGBSimilarityTask=function(dataset,opt_options){
  this.generic_sim=new generic_similarity.SimilarityTask(
      dataset,
      pixels_features.grid_mean_rgb,
      pixel_metrics.grid_rgb_edist,
      opt_options
    );
  this.dataset=dataset;
}

pixels_similarity.GridMeanRGBSimilarityTask.prototype.process_descriptor=function(in_descriptor) {
  return this.generic_sim.process_descriptor(in_descriptor);
}

pixels_similarity.GridMeanRGBSimilarityTask.prototype.process=function(in_imageData) {
  return this.generic_sim.process(in_imageData);
}
