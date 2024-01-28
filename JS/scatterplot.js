// Load the data
d3.csv("./data/life_expectancy_per_Expenditure.csv", function(d) {
    return {
        year: +d.Year,
        totalExpenditure: +d['Total Expenditure'],
        lifeExpectancy: +d['Life Expectancy']
    };
}).then(function(data) {

     // Define size scale (optional, you can define your own logic)
     var minYear = d3.min(data, function(d) { return d.year; });
     var maxYear = d3.max(data, function(d) { return d.year; });
     var sizeScale = d3.scaleLinear()
                       .domain([minYear, maxYear])
                       .range([3, 10]); // Min and max size of circles
    // Unique years for color mapping and legend
    var years = [...new Set(data.map(d => d.year))];

    // Color scale
    var color = d3.scaleOrdinal(d3.schemeSet2)
                  .domain(years);

    // Set dimensions and margins
    var margin = {top: 50, right: 120, bottom: 90, left: 60},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.totalExpenditure; })]).range([0, width]);
    var y = d3.scaleLinear().domain([0, d3.max(data, function(d) { return d.lifeExpectancy; })]).range([height, 0]);

    // Append SVG object to the body
    var svg = d3.select("#scatter-plot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
   
        // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", function(d) { return sizeScale(d.year); })
        .attr("cx", function(d) { return x(d.totalExpenditure); })
        .attr("cy", function(d) { return y(d.lifeExpectancy); })
        .style("fill", function(d) { return color(d.year); })

        .on("mouseover", function(event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("r", 10); // Increase radius
     
            // Display tooltip (implement the tooltip logic here)
        })
        .on("mouseout", function(d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("r", function(d) { return sizeScale(d.year); });
            });       

        // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y))
            

    svg.append("text")
        .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Total Expenditure");
     
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Life Expectancy");
    
    // Add the legend
    var legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("transform", "translate(" + (width + 20) + ",30)")
                    .selectAll("g")
                    .data(years)
                    .enter().append("g");

    legend.append("rect")
          .attr("y", function(d, i) { return i * 20; })
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

    legend.append("text")
          .attr("x", 24)
          .attr("y", function(d, i) { return i * 20 + 9; })
          .attr("dy", ".35em")
          .text(function(d) { return d; });
});
