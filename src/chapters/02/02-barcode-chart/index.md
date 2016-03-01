---
layout: section.html
title: Creating a Barcode Chart
---

# Creating a Barcode Chart

<style>
.barcode-chart {
  border: solid 1px #333;
}

.barcode-bar {
  stroke: #333;
  stroke-width: 1px;
}
</style>

<button class="add-more">Add more</button>
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
      var svg = d3.select(this),
          bars = svg.selectAll('line.barcode-bar');

      svg
        .attr('width', width)
        .attr('height', height);

      var maxDate = d3.max(data, date),
          minDate;

      maxDate = bars.empty() ? maxDate : d3.max(bars.data(), date);
      minDate = dateInterval.offset(maxDate, -1);

      var xScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);

      console.log([minDate, maxDate, bars.data()]);

      bars = svg.selectAll('line.barcode-bar').data(data, date);

      bars.enter().append('line').classed('barcode-bar', true)
        .attr('y1', 0)
        .attr('y2', height)
        .attr('x1', function(d) { return xScale(date(d)); })
        .attr('x2', function(d) { return xScale(date(d)); });

      maxDate = d3.max(data, date);
      minDate = dateInterval.offset(maxDate, -1);
      xScale.domain([minDate, maxDate]);

      console.log([minDate, maxDate]);

      bars.transition().duration(2000)
        .attr('x1', function(d) { return xScale(date(d)); })
        .attr('x2', function(d) { return xScale(date(d)); });

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

var barcode = barcodeChart()
  .date(function(d) { return new Date(d.date + ' ' + d.time); });

d3.json('/chapters/02/02-barcode-chart/data.json', function(err, data) {

  var dataA = data.slice(0, 100);

  d3.selectAll('.barcode-container')
    .data([dataA])
    .call(barcode);  

  d3.select('.add-more').on('click', function() {
    d3.selectAll('.barcode-container')
      .data([data])
      .call(barcode);  
  });
});
</script>
