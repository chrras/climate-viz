//random dataset


// [temp, day, hour]
var dataset = [[10.2, 1, 1], [14.2, 1, 2], [10.2, 1, 3], [14.2, 1, 4], [21.0, 2, 1], [3.2, 2, 2], [21.0, 2, 3], [3.2, 2, 4], [33.9, 3, 1], [24.0, 3, 2], [33.9, 3, 3], [24.0, 3, 4],
[10.2, 4, 1], [14.2, 4, 2], [10.2, 4, 3], [14.2, 4, 4], [21.0, 5, 1], [3.2, 5, 2], [21.0, 5, 3], [3.2, 5, 4], [33.9, 6, 1], [24.0, 6, 2], [33.9, 6, 3], [24.0, 6, 4]]

/*var dataset = [];
var day = 1;
var hour = 0;

for (var i = 0; i < 8760; i++) {
    var temp = Math.random() * 35;
    dataset.concat([temp, day, hour]);
    
    if (hour == 23) {
        hour = 0;
        day = day + 1;
    } else {
        hour = hour + 1;
    }
}*/

var w = 700;
var h = 300;
var padding = 30;

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);


/*
var xScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d[0]; })])
    .range([padding, w - padding * 2]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([h - padding, padding]);

var rScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([2, 5]);
*/

//var formatAsPercentage = d3.format(".1%");

/*
//Define X axis
var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(12);

//Define Y axis
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(4);
    //.tickFormat(formatAsPercentage);
*/


svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return d[1] * 8;
    })
    .attr("cy", function(d) {
        return d[2] * 8;
    })
    .attr("r", 3)
    .attr("fill", function(d) {
        return "rgba(255, 0, 0, " + d[0] / 35 + ")";
    });


/*svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return xScale(d[0]);
    })
    .attr("cy", function(d) {
        return yScale(d[1]);
    });
*/



/*
//Create X axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

//Create Y axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
*/