---
layout: section.html
title: Creating a Barcode Chart
---

# Creating a Barcode Chart

<style>
.barcode-chart {
  border: dashed 1px #666;
}
</style>

<div class="barcode-container"></div>

<script>

function barcodeChart() {

  var width = 400,
      height = 40,
      date = function(d) { return new Date(d); },
      dateInterval = d3.time.day;

  function chart(selection) {
    selection.each(function(data) {

      var div = d3.select(this),
          svg = div.selectAll('svg.barcode-chart').data([data]);

      svg.enter().append('svg').call(enter);
      svg.call(update);
      svg.exit().call(exit);
    });
  }

  function enter(selection) {
    selection.each(function(data) {
      var svg = d3.select(this);
      svg.classed('barcode-chart', true);
    });
  }

  function update(selection) {
    selection.each(function(data) {
      var svg = d3.select(this);

      svg
        .attr('width', width)
        .attr('height', height);

      var maxDate = d3.max(data, date),
          minDate = dateInterval.offset(-1, maxDate);

      var xScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);

      var bars = svg.selectAll('line.barcode-bar').data(data);

      bars.enter().append('line').classed('barcode-bar', true);

      bars
        .attr('x1', function(d) { return xScale(date(d)); })
        .attr('y1', 0)
        .attr('x2', function(d) { return xScale((d)); })
        .attr('y2', height);

      bars.exit().remove();
    });
  }

  function exit(selection) {
    selection.each(function(data) {
      var svg = d3.select(this);
      svg.exit().remove();
    });
  }

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

  chart.date = function(value) {
    if (!arguments.length) { return date; }
    date = value;
    return chart;
  };


  chart.dateInterval = function(value) {
    if (!arguments.length) { return dateInterval; }
    dateInterval = value;
    return chart;
  };

  return chart;
}

var data = [];

var barcode = barcodeChart();

d3.selectAll('.barcode-container')
  .data([data])
  .call(barcode);

</script>
