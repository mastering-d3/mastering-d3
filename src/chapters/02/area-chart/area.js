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

function svgContainer() {

  var me = {
    width: 800,
    height: 600,
    viewBox: function() {
      return '0 0 ' + me.width + ' ' + me.height;
    }
  };

  function chart(selection) {
    selection.each(function(data) {

      var div = d3.select(this),
          svg = div.selectAll('svg.chart-svg').data([data]);

      svg.enter().append('svg').call(enter);
      svg.call(update);
      svg.exit().call(exit);

    });
  }

  function enter(selection) {
    selection.each(function(data) {

      var svg = d3.select(this);

      svg
        .classed('chart-svg', true);
    });
  }

  function update(selection) {
    selection.each(function(data) {

      var svg = d3.select(this);

      svg
        .attr('width', me.width)
        .attr('height', me.height)
        .attr('viewBox', typeof me.viewBox === 'string' ? me.viewBox : me.viewBox());

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

function groupChart() {

  var me = {
    classes: [''],
    x: 0,
    y: 0
  };

  function chart(selection) {
    selection.each(function(data) {

      var container = d3.select(this),
          group = container.selectAll('g.group-chart').data([data]);

      group.enter().append('g').call(enter);
      group.call(update);
    });
  }

  function enter(selection) {
    selection.each(function(data) {
      var group = d3.select(this);
      group.classed('group-chart', true);
    });
  }

  function update(selection) {
    selection.each(function(data) {
      var group = d3.select(this);

      me.classes.forEach(function(className) {
        group.classed(className, true);
      });

      if ((me.x !== 0) || (me.y !== 0)) {
        group.attr('transform', 'translate(' + [ me.x, me.y ] + ')');
      }
    });
  }

  function exit(selection) {
    selection.each(function(data) {
      d3.select(this).remove();
    });
  }

  chart.addClass = function(className) {
    me.classes.push(className);
    return chart;
  };

  createAccessorMethods(chart, me);
  return chart;
}
