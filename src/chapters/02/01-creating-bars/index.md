---
layout: section.html
title: Creating a Reusable Bar Chart
---

<script src="/js/d3.js"></script>

# Creating a Bar Chart


## Creating a Simple Bar Chart

We will start by creating a bar chart defining variables in the global scope.

<style>
.bar {
  background-color: #204a87;
  margin: 5px;
}
</style>

<div class="barchart-container barchart-container-01"></div>

<script>

var data = [
  {width: 470},
  {width: 600},
  {width: 290}
];

// Chart Parameters
var height = 15;

// Container div element
var div = d3.select('.barchart-container-01');

// Create a selection for the bars and bind the data array to the selection
var bars = div.selectAll('.bar').data(data);

// Append the div elements on enter
bars.enter().append('div').classed('bar', true);

// Update their width and height
bars
  .style('width', function(d) { return d.width + 'px'; })
  .style('height', height + 'px');

// Remove the bars on exit
bars.exit().remove();
</script>

## Creating a Charting Function

We will create a charting function to encapsulate the creation logic.

<div class="barchart-container-02 barchart-container"></div>

<script>
function createBars(selection) {

  var bars = div.selectAll('.bar').data(data);

  bars.enter().append('div').classed('bar', true);

  bars
    .style('width', function(d) { return d.width + 'px'; })
    .style('height', height + 'px');

  bars.exit().remove();
}

var div = d3.select('.barchart-container-02');
createBars(div);
</script>
