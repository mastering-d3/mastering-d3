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
