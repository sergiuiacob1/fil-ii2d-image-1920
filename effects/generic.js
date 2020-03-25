var generic_effect = {}

// this puts each pixel in the middle of the window and replaces it with the result from the filter
generic_effect.apply_region_filter = function (in_imgData, out_imgData, window_width, window_height,
  pixel_form_region_rgba_filter) {

  var w = 0;

  for (var y = 0; y < out_imgData.height; y++)
    for (var x = 0; x < out_imgData.width; x++) {
      w = ((y * out_imgData.width) + x) << 2;
      new_rgba_pixel_val = pixel_form_region_rgba_filter(
        in_imgData,
        x - Math.round(window_width / 2), y - Math.round(window_height / 2),
        window_width, window_height);
      for (var i = 0; i < 4; i++) {
        out_imgData.data[w + i] = new_rgba_pixel_val[i];
      }
    }
}
