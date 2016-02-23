---
layout: section.html
title: Basic Bar Chart
---

<script src="/js/d3.js"></script>

# Creating Bars

## Three Bars

<div class="bars-container"></div>

<style>
.bar {
  background-color: #204a87;
  margin: 5px;
}
</style>


<script>

var data = [
  {width: 470},
  {width: 600},
  {width: 290}
];

var div = d3.select('.bars-container');

// Chart parameters
var height = 15;

// Select the container div and create a selection for the bars
var div = d3.select('.bars-container');
var bars = div.selectAll('.bar').data(data);

// Append the bars on enter
bars.enter().append('div').classed('bar', true);

// Update the width and height of the bars
bars
  .style('width', function(d) { return d.width + 'px'; })
  .style('height', height + 'px');

// Remove the divs on exit
bars.exit().remove();
</script>
