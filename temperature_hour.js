d3.csv("data-gitignore/temperatures_nyc.csv", function(error, dataset) {
    dataset.forEach(function(d) {
        d.tOutC = +d.tOutC;
        d.day = +d.day;
        d.hour = +d.hour;
    });


    //----------------------------------
    // VARIABLES
    //----------------------------------


    var days = d3.max(dataset, function(d) { return d.day; })
        - d3.min(dataset, function(d) { return d.day; })
    var hours = d3.max(dataset, function(d) { return d.hour; })
        - d3.min(dataset, function(d) { return d.hour; })

    var tMin = d3.min(dataset, function(d) { return d.tOutC; })
    var tMax = d3.max(dataset, function(d) { return d.tOutC; })

    var w = 1500;
    var h = 400;
    var paddingTop = 0;
    var paddingBottom = 0;
    var paddingLeft = 25;
    var paddingRight = 0;
    var dotRadius = 2
    var dotSpacing = 0 // in percent of radius


    //----------------------------------
    // FUNCTIONS
    //----------------------------------


    // Create SVG canvas
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);


    // Scales
    var xScale = d3.scale.linear()
        .domain([1, days])
        .range([dotRadius * (2 + dotSpacing), dotRadius * (2 + dotSpacing) * days]);

    var yScale = d3.scale.linear()
        .domain([1, hours])
        .range([dotRadius * (2 + dotSpacing) * hours, dotRadius * (2 + dotSpacing)]);

    var colorScale = d3.scale.linear()
        //.domain([tMin, tMax])
        .domain([0, 30])
        .range([0, 1]);


    // Define X axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(25);


    // Define Y axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(2);


    //----------------------------------
    // DRAW ELEMENTS ON SVG CANVAS
    //----------------------------------


    // Heatmap dots
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d.day) + paddingLeft;
        })
        .attr("cy", function(d) {
            return yScale(d.hour);
        })
        .attr("r", dotRadius)
        .attr("fill", function(d) {
            return "rgba(100, 200, 200, " + colorScale(d.tOutC) + ")";
        });


    //Create X axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + paddingLeft + "," + xScale(24+1) + ")")
        //.attr("transform", "translate(0," + xyScale(24+1) + ")")
        .call(xAxis);

    //Create Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + paddingLeft + ",0)")
        .call(yAxis);

});