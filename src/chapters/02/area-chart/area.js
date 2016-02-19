'use strict';

function createAccessorMethods(target, attributes) {

  function createAccessor(attr) {
    return function(value) {
      if (!arguments.length) { return attributes[attr]; }
      attributes[attr] = value;
      return target;
    };
  }

  for (var attr in attributes) {
    if ((!target[attr]) && (attributes.hasOwnProperty(attr))) {
      target[attr] = createAccessor(attr);
    }
  }
}

// Area Chart
function areaChart() {

  var me = {
    width:  600,
    height: 400,
    margin: {top: 10, right: 10, bottom: 30, left: 30}
  };

  function chart(selection) {
    selection.each(function(data) {

      var div = d3.select(this),
          svg = div.selectAll('svg.area-chart').data([data]);

      // Create, update and remove the SVG element
      svg.enter().append('svg').call(enter);
      svg.call(update);
      svg.exit().remove(exit);

    });
  }

  function enter(selection) {
    selection.each(function(data) {

      var svg = d3.select(this);

      svg.classed('area-chart', true);

      svg.append('g').classed('axis xaxis', true);
      svg.append('g').classed('axis yaxis', true);
    });
  }

  function update(selection) {
    selection.each(function(data) {

      var svg = d3.select(this),
          gXAxis = svg.selectAll('g.xaxis').data([data]),
          gYAxis = svg.selectAll('g.yaxis').data([data]);

      svg
        .attr('width', me.width)
        .attr('height', me.height);

      gXAxis.attr('transform', function() {
        var dx = me.margin.left,
            dy = me.height - me.margin.top;
        return 'translate(' + [dx, dy] + ')';
      });

      gYAxis.attr('transform', function() {
        var dx = me.margin.left,
            dy = me.margin.top;
        return 'translate(' + [dx, dy] + ')';
      });

    });
  }

  function exit(selection) {
    selection.each(function(data) {
      d3.select(this).remove();
    });
  }

  createAccessorMethods(chart, me);
  return chart;
}
