parseDate = d3.time.format("%d-%m-%y").parse
//parseTime = d3.time.format("%H/%M").parse
//parseDate('2003/01/01')

d3.csv("data-gitignore/temperatures_nyc_new.csv", function(error, dataset) {
    dataset.forEach(function(d) {
        d.tOutC = +d.tOutC;
        d.day = +d.day;
        d.hour = +d.hour;
        d.date = parseDate(d.date);
        //d.clock = parseTime(d.time);
        
    });

console.log(d3.min(dataset, function(d) { return d.date }));

/*var dates = [
    {"val":1,"key":"Jan"},
    {"val":32,"key":"Feb"},
    {"val":60,"key":"Mar"},
    {"val":91,"key":"Apr"},
    {"val":121,"key":"May"},
    {"val":152,"key":"Jun"},
    {"val":182,"key":"Jul"},
    {"val":213,"key":"Aug"},
    {"val":244,"key":"Sep"},
    {"val":274,"key":"Oct"},
    {"val":305,"key":"Nov"},
    {"val":335,"key":"Dec"}
    ];*/

    //----------------------------------
    // VARIABLES
    //----------------------------------

    var days = 365;
    var hours = 24;

/*    var days = d3.max(dataset, function(d) { return d.date; })
        - d3.min(dataset, function(d) { return d.date; });
    var hours = d3.max(dataset, function(d) { return d.hour; })
        - d3.min(dataset, function(d) { return d.hour; });*/

    var tMin = d3.min(dataset, function(d) { return d.tOutC; }),
        tMax = d3.max(dataset, function(d) { return d.tOutC; });

    var dotWidth = 1,       // zoom out = 1
        dotHeight = 4,      // default 3 or 4
        dotSpacing = 0.5;

    var margin = {top: 0, right: 35, bottom: 40, left: 35},
        width = (dotWidth * 2 + dotSpacing) * days,
        height = (dotHeight * 2 + dotSpacing) * hours;//200 - margin.top - margin.bottom;
    



    //----------------------------------
    // FUNCTIONS
    //----------------------------------

    // Scales
    // var xScale = d3.scale.linear()
    //     .domain([1, days])
    //     .range([dotWidth * 2 + dotSpacing, (dotWidth * 2 + dotSpacing) * days]);

    // var xScale = d3.scale.ordinal()
    //     .domain(dates.map(function (d) {return d.key; }))
    //     .rangePoints([0,width]);

    var xScale = d3.time.scale()
        .domain([new Date(2015, 0, 1), new Date(2015, 11, 31)])
        .range([0, width]);

    console.log(xScale.domain())
    console.log(xScale.range())
    //console.log(d.hour);

    var yScale = d3.scale.linear()
        .domain([1, hours])
        .range([(dotHeight * 2 + dotSpacing) * hours, dotHeight * 2 + dotSpacing]);

    var colorScale = d3.scale.linear()
        .domain([tMin-5, (tMax-tMin)/2, tMax-5])
        .range(["#4575b4","#ffffdf", "#d73027"]);

        

    // Define X axis
    // var xAxis = d3.svg.axis()
    //     .scale(xScale)
    //     .orient("bottom");

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(d3.time.months)
        .tickFormat(d3.time.format("%b"));
        //.tickFormat(d3.time.format("%b%e" + "st"));


    

    // Define Y axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(2);

    // Zoom behavior
    var zoom = d3.behavior.zoom()
        .scaleExtent([dotWidth, dotHeight])
        .x(xScale)
        .on("zoom", zoomHandler);

    function zoomHandler() {
        var t = zoom.translate(),
            tx = t[0],
            ty = t[1];

        tx = Math.min(tx, 0);
        tx = Math.max(tx,  width - (dotWidth * 2 + dotSpacing) * days * d3.event.scale);
        zoom.translate([tx, ty]);


        svg.select(".x.axis").call(xAxis);
        svg.selectAll("ellipse")
            .attr("cx", function(d) { return xScale(d.date); })
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
        .attr("width", width + 2 * dotHeight)
        .attr("height", height + dotHeight)
        .attr("transform", "translate(" + -dotHeight + ",0)");


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
        .attr("cx", function(d) { return xScale(d.date); })
        .attr("cy", function(d) { return yScale(d.hour); })
        .attr("rx", dotWidth)
        .attr("ry", dotHeight)
        .attr("fill", function(d) { return colorScale(d.tOutC); });

    //Create X axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + yScale(0) + ")")
        .call(xAxis)

    //Create Y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + -(2 * dotHeight + dotSpacing) + ",0)")
        .call(yAxis);

    //console.log(d.date);

});