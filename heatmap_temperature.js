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
    var dotWidth = 1 // zoom out = 1
    var dotHeight = 5 // default 3 or 4
    var dotSpacing = 1


    //----------------------------------
    // FUNCTIONS
    //----------------------------------




    // Scales
    var xScale = d3.scale.linear()
        .domain([1, days])
        .range([dotWidth * 2 + dotSpacing, (dotWidth * 2 + dotSpacing) * days]);

    var yScale = d3.scale.linear()
        .domain([1, hours])
        .range([(dotHeight * 2 + dotSpacing) * hours, dotHeight * 2 + dotSpacing]);

    var colorScale = d3.scale.linear()
        //.domain([tMin, tMax])
        .domain([5, 35])
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
        .scaleExtent([dotWidth, dotHeight])
        .x(xScale)
        .on("zoom", zoomHandler);
    
 

    // Create SVG canvas
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .call(zoom);

    function zoomHandler() {
        var t = zoom.translate(),
            tx = t[0],
            ty = t[1];

        tx = Math.min(tx, 0); // tx < 0
        tx = Math.max(tx,  -1000); //
        zoom.translate([tx, ty]);

        svg.select(".x.axis").call(xAxis);
        svg.selectAll("ellipse")
            .attr("cx", function(d) { return xScale(d.day) + paddingLeft; })
            .attr("cy", function(d) { return yScale(d.hour); })
            .attr("rx", function(d) { return (dotWidth * d3.event.scale); });
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

// .attr("cx", function(d, i) { return xAxisScale(d.cx); })
// .attr("cy", function(d, i) { return yAxisScale(d.cy); })
// .attr("r", function(d, i) { return (d.radius * scaleMultiplier); }); }

    // Heatmap ellipes
    svg.selectAll("ellipse")
        .data(dataset)
        .enter()
        .append("ellipse")
        //<ellipse cx="200" cy="80" rx="100" ry="50"
        .attr("cx", function(d) { return xScale(d.day) + paddingLeft; })
        .attr("cy", function(d) { return yScale(d.hour); })
        .attr("rx", dotWidth)
        //.attr("rx", dotWidth)
        .attr("ry", dotHeight)
        //.attr("r", dotHeight)
        .attr("fill", function(d) { return "rgba(100, 200, 200, " + colorScale(d.tOutC) + ")"; });


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