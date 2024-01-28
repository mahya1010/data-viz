// Load the data
d3.csv("./data/life_expectancy_per_year_waffle.csv").then(function(data) {
    // Define dimensions and colors for your waffle chart
   
    const colors = {
        "0-50": "#F4D03F",
        "51-70": "#F39C12 ",
        "71-100": "#A04000 "
    };

    
    
    // Process data and create squares for each entry
    data.forEach(function(row) {
        for (let i = 0; i < row.Count; i++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.style.backgroundColor = colors[row['Life Expectancy Range']];
            document.getElementById('waffle-chart').appendChild(square);
        }
    });
    
    const legend = d3.select('#legend');
    let legendItem = legend.append('div').attr('class', 'legend-item');
    legendItem.append('div')
                .attr('class', 'legend-box')
                .style('background-color', colors["0-50"]);
    legendItem.append('text')
                .text("0-50");

    let legendItem1 = legend.append('div').attr('class', 'legend-item');
    legendItem1.append('div')
                .attr('class', 'legend-box')
                .style('background-color', colors["51-70"]);
    legendItem1.append('text')
                .text("51-70");
                
    let legendItem2 = legend.append('div').attr('class', 'legend-item');
    legendItem2.append('div')
                .attr('class', 'legend-box')
                .style('background-color', colors["71-100"]);
    legendItem2.append('text')
                .text("71-100");

});
