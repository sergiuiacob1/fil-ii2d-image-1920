DetectionPlans = function (opt_options) {
    this.output = opt_options.output;
    this.id = opt_options.id;
    this.frameMeans = [];
    this.planChanges = 0;
    this.threshold = document.getElementById(`threshold${this.id}`).value;

    this.chart = new CanvasJS.Chart(`chart${this.id}`, {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Distance de la dernièr cadre"
        },
        axisY: {
            includeZero: true,
            stripLines: [
                {
                    value: 10
                }
            ],
        },
        data: [{
            type: "line",
            dataPoints: []
        }]
    });
    this.chart.render();
}

DetectionPlans.prototype.process = function (imageData) {
    var means = [0, 0, 0, 0];
    var pos = 0;
    for (var x = 0; x < imageData.width; ++x)
        for (var y = 0; y < imageData.height; ++y) {
            for (var i = 0; i < 4; ++i)
                means[i] += imageData.data[pos + i];
            pos += 4;
        }

    for (var i = 0; i < 4; ++i)
        means[i] /= (imageData.width * imageData.height);
    this.frameMeans.push(means);

    pos = 0;
    for (var x = 0; x < imageData.width; ++x)
        for (var y = 0; y < imageData.height; ++y) {
            for (var i = 0; i < 4; ++i)
                imageData.data[pos + i] = means[i];
            pos += 4;
        }

    this.output.innerHTML = "(r, g, b, a) moyennes :<br>";
    this.output.innerHTML += "<font color='red'>" + means[0] + "</font> | ";
    this.output.innerHTML += "<font color='green'>" + means[1] + "</font> | ";
    this.output.innerHTML += "<font color='blue'>" + means[2] + "</font> | ";
    this.output.innerHTML += "<font style='color: rgba(0, 0, 0, 0.5);'>" + means[3] + "</font> | ";

    if (this.frameMeans.length == 1)
        return;

    // see distance from last frame
    // ignore the alpha channel
    var lastFrame = this.frameMeans[this.frameMeans.length - 2];

    // thisFrame = means
    var dist = 0;
    for (var i = 0; i < 3; ++i)
        dist += (lastFrame[i] - means[i]) ** 2;
    dist = Math.sqrt(dist);
    if (dist > this.threshold)
        ++this.planChanges;

    this.output.innerHTML += "<br>distance de le dernier cadre: " + dist;
    this.output.innerHTML += "<br>changements de plans : " + this.planChanges;

    this.updateChart(dist);
}

DetectionPlans.prototype.updateChart = function (dist) {
    // add the new distance
    this.chart.options.data[0].dataPoints.push({ y: dist });
    // update the threshold
    this.threshold = document.getElementById(`threshold${this.id}`).value;
    // visualise the threshold on the chart

    document.getElementById(`label-threshold${this.id}`).textContent = `Seuil: ${this.threshold}`;
    this.chart.axisY[0].stripLines[0].set("value", this.threshold);
    // update
    this.chart.render();
}
