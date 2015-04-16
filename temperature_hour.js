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

var w = 400;
var h = 400;
var paddingTop = 0;
var paddingBottom = 0;
var paddingLeft = 20;
var paddingRight = 10;
var dotRadius = 5

// Import data from CSV
/*d3.csv('data-gitignore/temperatures_nyc.csv', function(error, dataset) {  // NEW
  dataset.forEach(function(d) {                    // NEW
    d.count = +d.count;                            // NEW
  });*/


//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

var xScale = d3.scale.linear()
    .domain([1, 6])
    .range([dotRadius * 2.5, dotRadius * 2.5 * 6]);

var yScale = d3.scale.linear()
    .domain([1, 4])
    .range([dotRadius * 2.5 * 4, dotRadius * 2.5]);

/*
var xScale = d3.scale.linear()
    .domain([
        d3.min(dataset, function(d) { return d[1]; }),
        d3.max(dataset, function(d) { return d[1]; })
    ])
    .range([0, w]);


var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([h - padding, padding]);

var rScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([2, 5]);
*/

//var formatAsPercentage = d3.format(".1%");



//Define X axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(2);

//Define Y axis
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(2);
    //.tickFormat(formatAsPercentage);




svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        //return xScale((d[1]-0.5) * dotRadius * 2.4);
        return xScale(d[1]) + paddingLeft;
    })
    .attr("cy", function(d) {
        //return (d[2]-0.5) * dotRadius * 2.4;
        return yScale(d[2]);
    })
    //.attr("r", dotRadius)
    .attr("r", function(d) {
        return dotRadius;
    })
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




//Create X axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + paddingLeft + "," + xScale(4+1) + ")")
    //.attr("transform", "translate(0," + xyScale(24+1) + ")")
    .call(xAxis);

//Create Y axis
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + paddingLeft + ",0)")
    .call(yAxis);