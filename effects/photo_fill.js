var photo_fill = {};

// create a new task
// takes as parameter the whole dataset (we need all of the images)
// for this one, use the MeanRGB similarity task
photo_fill.PhotoFillPixelsFromDatasetTask = function (dataset, opt_options) {
  this.dataset = dataset;
  this.similarity_task = new pixels_similarity.MeanRGBSimilarityTask(_dataset, {});
}

// the process() function takes as input an image fill
photo_fill.PhotoFillPixelsFromDatasetTask.prototype.process = function (in_imageData, out_imageData) {
  var w = 0;
  // w is our position in the pixel array
  // we take a look at each pixel that is NOT transparent from the input image
  for (var y = 0; y < in_imageData.height; y++) {
    for (var x = 0; x < in_imageData.width; x++ , w += 4) {
      if (in_imageData.data[w + 3] == 0)
        continue;

      // take the current pixel
      var rgb_pixel = [in_imageData.data[w], in_imageData.data[w + 1], in_imageData.data[w + 2]];

      // get the descriptor using the similarity task (in this case, MeanRGB)
      var sim_res = this.similarity_task.process_descriptor(rgb_pixel);

      // take the image that is most similar to this pixel regarding the MeanRGB pixel
      var min_idx = sim_res[1].idx;

      var pixel_image = this.similarity_task.dataset.imageDatas[min_idx];
      // set the placement for this image, aka where it has to go
      // this assumes that all images have the same width and height!
      x_dest = x * pixel_image.width;
      y_dest = y * pixel_image.height;

      // copy this image to the destination image
      Tools.copy_imageData_into_imageData(pixel_image, out_imageData, x_dest, y_dest);
    }
  }
}

// create a generic task that receives the similarity task to be used
photo_fill.GenericPhotoFillPixelsFromDatasetTask = function (dataset, opt_options) {
  this.dataset = dataset;
  // use the MeanRGB by default
  this.similarity_task = opt_options && opt_options.similarity_task ? opt_options.similarity_task : new pixels_similarity.MeanRGBSimilarityTask(_dataset, {});
}

// the process function is exactly the same
photo_fill.GenericPhotoFillPixelsFromDatasetTask.prototype.process = function (in_imageData, out_imageData) {
  var w = 0;
  // w is our position in the pixel array
  // we take a look at each pixel that is NOT transparent from the input image
  for (var y = 0; y < in_imageData.height; y++) {
    for (var x = 0; x < in_imageData.width; x++ , w += 4) {
      if (in_imageData.data[w + 3] == 0)
        continue;

      // take the current pixel
      var rgb_pixel = [in_imageData.data[w], in_imageData.data[w + 1], in_imageData.data[w + 2]];

      // get the descriptor using the similarity task (in this case, MeanRGB)
      var sim_res = this.similarity_task.process_descriptor(rgb_pixel);

      // take the image that is most similar to this pixel regarding the MeanRGB pixel
      var min_idx = sim_res[1].idx;

      var pixel_image = this.similarity_task.dataset.imageDatas[min_idx];
      // set the placement for this image, aka where it has to go
      // this assumes that all images have the same width and height!
      x_dest = x * pixel_image.width;
      y_dest = y * pixel_image.height;

      // copy this image to the destination image
      Tools.copy_imageData_into_imageData(pixel_image, out_imageData, x_dest, y_dest);
    }
  }
}