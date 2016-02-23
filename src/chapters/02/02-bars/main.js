

var data = [
  {width: 470},
  {width: 600},
  {width: 290}
];

// Chart parameters
var height = 15;

function createBars(selection) {
  var bars = div.selectAll('.bar').data(data);

  // Append the bars on enter
  bars.enter().append('div').classed('bar', true);

  // Update the width and height of the bars
  bars
  .style('width', function(d) { return d.width + 'px'; })
  .style('height', height + 'px');

  // Remove the divs on exit
  bars.exit().remove();
}

var div = d3.select('.bars-container');

createBars(div);
