var dataA = [
  {width: 470},
  {width: 600},
  {width: 290}
];

var dataB = [
  {width: 310},
  {width: 730},
];

// Chart parameters
var height = 15;

function createBars(selection) {
  selection.each(function(data) {

    var div = d3.select(this),
        bars = div.selectAll('.bar').data(data);

    // Append the bars on enter
    bars.enter().append('div').classed('bar', true);

    // Update the width and height of the bars
    bars
    .style('width', function(d) { return d.width + 'px'; })
    .style('height', height + 'px');

    // Remove the divs on exit
    bars.exit().remove();
  });
}

var div = d3.select('.charts-container'),
    barDivs = div.selectAll('.bars-container').data([dataA, dataB]);

barDivs.enter().append('div').classed('bars-container', true);
createBars(barDivs);
barDivs.exit().remove();
