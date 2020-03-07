var generic_similarity = {}

/*
  Generic task that allows similarity measures between a source image and a collection of images contained in a Dataset object.

  The similarity is evaluated considering descriptors that are extracted with descriptor_func from the source imageData and all images in the dataset.

  The similarity is measured using the similarity_metric_func that should be adapted with regard to descriptor_func.

  opt_options contains :
    * optional opt_options.desc_opt_options parameters for the descriptor_func
    * optional opt_options.similarity_metric_opt_options parameters for similarity_metric_func


*/

generic_similarity.SimilarityTask = function (dataset, descriptor_func, similarity_metric_func, opt_options) {

  this.dataset = dataset;

  this.descriptor_func = descriptor_func;
  this.desc_opt_options = opt_options.desc_opt_options;

  console.log("constructing generic similarity task using the bellow descriptor and options (2 lines)");
  console.log(descriptor_func);
  console.log(opt_options.desc_opt_options);

  // BLOC1
  // pour chaque image de notre dataset, on va calculer un descripteur pour cette image
  // le descripteur à calculer est donne comme un parametre: descriptor_func
  // on va donner aussi, pour la fonction qui on va calculer le descripteur, des parametres additionels (this.desc_opt_options) pour savoir comment on va calculer le descripteur
  this.dataset_descriptors = [];
  for (var idx in this.dataset.imageDatas) {
    this.dataset_descriptors[idx] =
      this.descriptor_func(this.dataset.imageDatas[idx], this.desc_opt_options);
    console.log("descriptor for image " + idx + " in dataset : " + this.dataset_descriptors[idx]);
  }

  this.similarity_metric_func = similarity_metric_func;
  this.similarity_metric_opt_options = opt_options.similarity_metric_opt_options;
}


generic_similarity.SimilarityTask.prototype.process_descriptor = function (in_descriptor) {

  // BLOC2
  // pour chaque image, nous avons maintenant des descripteurs
  // pour chaque image, on va calculer la similarité avec un "input"
  var sim = [], order = [];
  for (var idx in this.dataset_descriptors) {
    sim[idx] = this.similarity_metric_func(
      in_descriptor, this.dataset_descriptors[idx], this.metric_opt_options);
    order[idx] = idx;
  }

  // BLOC3
  // trier les images par similitude
  // la dernière image a la plus grande similitude
  for (var idx1 in order)
    for (var idx2 in order)
      if (sim[order[idx1]] < sim[order[idx2]]) { aux = order[idx1]; order[idx1] = order[idx2]; order[idx2] = aux; }

  // BLOC4
  // on va returner un resultat qui dit, pour chaque image
  // la similitude de l'image et son rang
  var res = [];
  for (var idx in order) res[idx] = { idx: order[idx], sim: sim[order[idx]] }
  return res;
}

generic_similarity.SimilarityTask.prototype.process = function (in_imageData) {
  // BLOC5
  // cette fonction prendre comme paramètre une image et calculer un descripteur
  // le descripteur a été mentionné dans le "constructeur" de SimilarityTask
  // après, pour le reste des images de notre dataset, calculer la similarité avec ces images
  var in_descriptor = this.descriptor_func(in_imageData, this.desc_opt_options);
  return this.process_descriptor(in_descriptor);
}


generic_similarity.SimilarityTask.prototype.get_dataset_descriptor = function (idx) {
  // BLOC6
  // returner le descripteur pour une image
  return this.dataset_descriptors[idx];
}
