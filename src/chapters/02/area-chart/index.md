---
layout: section.html
title: Creating an Area Chart
---

# Creating an area chart

<style>
.chart-svg {
  border: dashed 1px blue;
}
</style>

<script src="https://d3js.org/d3.v4.0.0-alpha.18.min.js"></script>
<script src="./area.js"></script>

## SVG Chart

<div class="svg-chart-container"></div>

<script>
var width = 800,
    height = 600;

var margin = {
  top: 10,
  right: 10,
  bottom: 30,
  left: 30
};

var areaChart = areaChart()
  .width(width)
  .height(height);

d3.selectAll('.svg-chart-container')
  .data([0])
  .call(areaChart);
</script>
