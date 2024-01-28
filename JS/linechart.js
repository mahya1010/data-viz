// Load the dataset
d3.csv("./data/average_life_expectancy_per_year.csv").then(data => {
    // Parse the data: convert strings to numbers
    // data.forEach(d => {
    //     d.Year = +d.Year;
    //     d['Life expectancy '] = +d['Life expectancy '];
    // });

    // Set the dimensions and margins of the graph
    const margin = { top: 20, right: 30, bottom: 80, left: 50 },
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

   
    // Add X axis
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Year))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
    // X Axis Label
    svg.append("text")             
        .attr("transform", `translate(${width/2}, ${height + margin.top + 20})`)
        .style("text-anchor", "middle")
        .text("Year");

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d['Life expectancy '])])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Life Expectancy");

    const line = d3.line()
      .x(d => x(d.Year))
      .y(d => y(d['Life expectancy ']))
      .curve(d3.curveMonotoneX); // Adds a smooth curve

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("stroke", "steelblue") // Change line color
      .attr("stroke-width", "2")
      .attr("d", d3.line()
        .x(d => x(d.Year))
        .y(d => y(d['Life expectancy ']))
      
      );
    


    // Create a tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    // Add circles at each data point
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.Year))
        .attr("cy", d => y(d['Life expectancy ']))
        .attr("r", 10) // radius of the circle
        .attr("fill", "#007bff") // Change circle color
        .attr("stroke", "#fff") // Add a stroke for better visibility
        .attr("stroke-width", "2")
        .attr("fill", "red") // color of the circle
        .on("mouseover", function(event, d) {
            tooltip.transition()
               .duration(200)
               .style("opacity", .9);
            tooltip.html("Year: " + d.Year + "<br/>Life Expectancy: " + d['Life expectancy '])
               .style("left", (event.pageX) + "px")
               .style("top", (event.pageY - 28) + "px");
   })
       .on("mouseout", function(d) {
            tooltip.transition()
               .duration(200)
               .style("opacity", 0);
       })
});
