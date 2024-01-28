// Load data
d3.csv("./data/average_life_expectancy_per_country.csv").then(data2 => {
    const data = data2.slice(0, 20);
    
    data.forEach(d => {
        d['Life expectancy '] = +d['Life expectancy ']; // Convert to numeric
    });

    

    // Set dimensions and margins
    const margin = {top: 20, right: 20, bottom: 80, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Append SVG object to the body
    const svg = d3.select("#bar-chart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set the ranges
    const x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
    const y = d3.scaleLinear()
          .range([height, 0]);
          
    // Scale the range of the data in the domains
    x.domain(data.map(d => d.Country));
    y.domain([0, d3.max(data, d => d['Life expectancy '])]);


     // Create a tooltip
     const tooltip = d3.select("#tooltip");

      // Append rectangles for the bar chart
    svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Country))
      .attr("width", x.bandwidth())
      .attr("y", d => y(d['Life expectancy ']))
      .attr("height", d => height - y(d['Life expectancy ']))
      .on("mouseover", function(event, d) {
               d3.select(this)
          tooltip.transition()
                 .duration(300)
                 .attr("fill", "#007bff")
                 .style("opacity", .9);
          tooltip.html("<span class='tooltip-title'>" + d.Country + "</span><br/><span class='tooltip-content'></span>Life Expectancy: " + d['Life expectancy '].toFixed(2) + "<br/>" + d.Country)
                 .style("left", (event.pageX) + "px")
                 .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
               d3.select(this)
          tooltip.transition()
                 .duration(300)
                 .attr("fill", d => colorScale(d['Life expectancy ']))
                 .style("opacity", 0);
      });

    // Define a color scale
    const colorScale = d3.scaleSequential()
        .interpolator(d3.interpolateCool)
        .domain([0, d3.max(data, d => d['Life expectancy '])]);
    // Append rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.Country))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d['Life expectancy ']))
        .attr("height", d => height - y(d['Life expectancy ']))
        .attr("y", height)
        .transition()
        .duration(800)
        .attr("y", d => y(d['Life expectancy ']))
        .attr("height", d => height - y(d['Life expectancy ']))
    // Use this color scale when creating bars
        .attr("fill", d => colorScale(d['Life expectancy ']))

    // Rounded corners
        .attr("rx", 3) 
        .attr("ry", 3);
        
    // Add the x Axis
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // Add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
});