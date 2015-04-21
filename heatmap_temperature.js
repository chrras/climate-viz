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

    var w = 800; // default 1000
    var h = 400;
    var paddingTop = 0;
    var paddingBottom = 0;
    var paddingLeft = 25;
    var paddingRight = 0;
    var dotWidth = 3 // zoom out = 1
    var dotRadius = 3 // default 3 or 4
    var dotSpacing = 0.5


    //----------------------------------
    // FUNCTIONS
    //----------------------------------




    // Scales
    var xScale = d3.scale.linear()
        .domain([1, days])
        .range([dotWidth * 2 + dotSpacing, (dotWidth * 2 + dotSpacing) * days]);

    var yScale = d3.scale.linear()
        .domain([1, hours])
        .range([(dotRadius * 2 + dotSpacing) * hours, dotRadius * 2 + dotSpacing]);

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


    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 1])
        .x(xScale)
        .on("zoom", zoomed);
        

    // Create SVG canvas
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .call(zoom);

    function zoomed() {
        svg.select(".x.axis").call(xAxis);
        svg.selectAll("ellipse")
            .attr("cx", function(d) { return xScale(d.day) + paddingLeft; })
            .attr("cy", function(d) { return yScale(d.hour); });
    }

    //----------------------------------
    // DRAW ELEMENTS ON SVG CANVAS
    //----------------------------------


    // Heatmap dots
/*    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("ellipse")
        .attr("cx", function(d) {
            return xScale(d.day) + paddingLeft;
        })
        .attr("cy", function(d) {
            return yScale(d.hour);
        })
        .attr("fill", function(d) {
            return "rgba(100, 200, 200, " + colorScale(d.tOutC) + ")";
        });*/

    // Heatmap ellipes
    svg.selectAll("ellipse")
        .data(dataset)
        .enter()
        .append("ellipse")
        //<ellipse cx="200" cy="80" rx="100" ry="50"
        .attr("cx", function(d) { return xScale(d.day) + paddingLeft; })
        .attr("cy", function(d) { return yScale(d.hour); })
        .attr("rx", dotWidth)
        .attr("ry", dotRadius)
        //.attr("r", dotRadius)
        .attr("fill", function(d) {
            return "rgba(100, 200, 200, " + colorScale(d.tOutC) + ")";
        });


    //Create X axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + paddingLeft + "," + yScale(0) + ")")
        //.attr("transform", "translate(0," + xyScale(24+1) + ")")
        .call(xAxis);

    //Create Y axis
    svg.append("g")
        .attr("class", "y axis")
        //.attr("transform", "translate(" + paddingLeft + ",0)")
        .call(yAxis);

});