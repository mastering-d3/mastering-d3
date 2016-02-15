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

<div class="svg-chart-container"></div>

<script>
var svgChart = svgContainer()
  .width(400)
  .height(300);

d3.selectAll('.svg-chart-container')
  .data([0])
  .call(svgChart);
</script>
