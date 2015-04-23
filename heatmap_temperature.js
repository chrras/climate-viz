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
        - d3.min(dataset, function(d) { return d.day; });
    var hours = d3.max(dataset, function(d) { return d.hour; })
        - d3.min(dataset, function(d) { return d.hour; });

    var tMin = d3.min(dataset, function(d) { return d.tOutC; }),
        tMax = d3.max(dataset, function(d) { return d.tOutC; });

    var margin = {top: 20, right: 0, bottom: 0, left: 50},
        width = 800 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
    
    var dotWidth = 1,       // zoom out = 1
        dotHeight = 4,      // default 3 or 4
        dotSpacing = 0.5;


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
        .ticks(10);

    // Define Y axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(2);

    // Zoom behaveuor
    var zoom = d3.behavior.zoom()
        .scaleExtent([dotWidth, dotHeight])
        .x(xScale)
        .on("zoom", zoomHandler);
    
    function zoomHandler() {
        var t = zoom.translate(),
            tx = t[0],
            ty = t[1];

        tx = Math.min(tx, 0); // tx < 0
        tx = Math.max(tx,  -1000); //
        zoom.translate([tx, ty]);

        svg.select(".x.axis").call(xAxis);
        svg.selectAll("ellipse")
            .attr("cx", function(d) { return xScale(d.day); })
            .attr("cy", function(d) { return yScale(d.hour); })
            .attr("rx", function(d) { return (dotWidth * d3.event.scale); });
    }

    
    // SVG canvas
    var svg = d3.select("#chart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .call(zoom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Clip path
    svg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("class", "mesh")
        .attr("width", width)
        .attr("height", height);


    //----------------------------------
    // DRAW ELEMENTS ON SVG CANVAS
    //----------------------------------


    // Heatmap dots
    svg.append("g")
        .attr("clip-path", "url(#clip)")
        .selectAll("ellipse")
        .data(dataset)
        .enter()
        .append("ellipse")
        .attr("cx", function(d) { return xScale(d.day); })
        .attr("cy", function(d) { return yScale(d.hour); })
        .attr("rx", dotWidth)
        .attr("ry", dotHeight)
        .attr("fill", function(d) { return "rgba(100, 200, 200, " + colorScale(d.tOutC) + ")"; });

    //Create X axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + yScale(0) + ")")
        .call(xAxis);

    //Create Y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + xScale(0) + ",0)")
        .call(yAxis);

});