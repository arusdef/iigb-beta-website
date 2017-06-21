var d3 = require("d3");
module.exports = mapDraw

function mapDraw() {
  var filter;

  var build = document.iigbBuild ? document.iigbBuild + '/' : '';
  var mapDataUrl = '/assets/' + build + 'uk-map-json.json';

  d3.json(mapDataUrl, function(error, data) {
    var gridBaseValue = data.baseValue;
    var dotRadius = data.radius;
    var dotData = data.points;
    var pathData = data.paths;

    var width = (Math.max.apply(Math,dotData.map(function(o){return o.x_axis;})) + 1) * gridBaseValue;
    var height = (dotData[dotData.length - 1].y_axis + 1) * gridBaseValue;

    var mapCanvas = d3.select("#mapCanvas").append("svg")
                                       .attr("width", width)
                                       .attr("height", height);

    var paths = mapCanvas.selectAll('paths')
                          .data(pathData)
                          .enter()
                          .append('path');

    var pathAttributes = paths
                          .attr('d', function(d) { return d.drawPoints })
                          .attr('class', function(d) {return d.class })
                          .on("click", function(d, i) { 
                            window.location.href = window.location.href + d.region;
                          });

    var dots = mapCanvas.selectAll("circle")
                            .data(dotData)
                            .enter()
                            .append("circle");

    var dotAttributes = dots
                         .attr("cx", function (d) { return (d.x_axis * gridBaseValue); })
                         .attr("cy", function (d) { return (d.y_axis * gridBaseValue); })
                         .attr("r", function (d) { return dotRadius; })
                         .attr("class", function(d) { return d.class + " " + d.region; })
                         .attr('data-automotive', function(d) { return d.automotive })
                         .attr('data-aerospace', function(d) { return d.aerospace })
                         .attr('data-energy-generation', function(d) { return d.energy })
                         .attr('data-creative', function(d) { return d.creative })
                         .attr('data-health-and-life-science', function(d) { return d.health })
                         .attr('data-advanced-manufacturing', function(d) { return d.manufacturing })
                         .attr('data-retail', function(d) { return d.retail })
                         .attr('data-food', function(d) { return d.food })
                         .attr('data-financial-services', function(d) { return d.financial })
                         .attr('data-technology', function(d) { return d.technology })
                         .on('click', function(d, i) { 
                            window.location.href = window.location.href + d.region;
                          });
  });

  var filters = $('.sector-filter');
  for (var i = 0; i < filters.length; i++) {
    $(filters[i]).on('change', function(e) {
      filter = e.target.value.replace(/\s+/g, '-').toLowerCase();
      var mapPoints = $('.uk-dot');
      mapPoints.hide();
      for(var j = 0; j < mapPoints.length; j++) {
        if (mapPoints[j].dataset[filter] && mapPoints[j].dataset[filter] > 0) {
          $(mapPoints[j]).show();
        }
      };
    });
  };
}