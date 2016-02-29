---
layout: section.html
title: Creating a Configurable function
---

# Creating a Configurable Function

<script>
function createChart() {

  // Chart attributes
  var width = 100,
      height = 50;

  // Charting function
  function chart() {
    console.log('width = ' + width + ', height = ' + height);
  }

  // Accessor methods

  chart.width = function(value) {
    if (!arguments.length) { return width; }
    width = value;
    return chart;
  };

  chart.height = function(value) {
    if (!arguments.length) { return height; }
    height = value;
    return chart;
  };

  return chart;
}
</script>

<script>
var height = 1000;

var simpleChart = createChart()
  .width(800)
  .height(600);

simpleChart();
</script>
