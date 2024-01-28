const margin = { top: 80, right: 25, bottom: 30, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

const svg = d3.select("#heat-map")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);

// Define the div for the tooltip
const tooltip = d3.select("#heat-map").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Read the data
d3.csv("./data/correlation_matrix.csv").then(function(data) {
    // Extract column names
    const variables = data.columns.slice(1);

    // Convert data to a usable form
    const heatmapData = [];
    data.forEach(function(row) {
        variables.forEach(function(col) {
            heatmapData.push({
                row: row[""],
                column: col,
                value: +row[col]
            });
        });
    });    

    // Define the scales
    const x = d3.scaleBand().range([0, width]).domain(variables).padding(0.01);
    const y = d3.scaleBand().range([height, 0]).domain(variables).padding(0.01);
    const colorScale = d3.scaleSequential(d3.interpolateRdBu).domain([-1, 1]);

    // Create the axes
    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisTop(x))
        .selectAll("text")
        .attr("class", "labels")
        .style("text-anchor", "start")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .attr("class", "labels");

    // Draw the heatmap
    svg.selectAll()
        .data(heatmapData, function(d) { return d.row + ':' + d.column; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.column); })
        .attr("y", function(d) { return y(d.row); })
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return colorScale(d.value); })
        .attr("class", "cell-border")
        .on("mouseover", function(event, d) {
            tooltip.transition()        
                .duration(200)      
                .style("opacity", .9);      
            tooltip.html("Correlation: " + d.value)  
                .style("left", (event.pageX + 10) + "px")     
                .style("top", (event.pageY + 10) + "px");
        })                  
        .on("mouseout", function(d) {       
            tooltip.transition()        
                .duration(500)      
                .style("opacity", 0);   
        });
    });
