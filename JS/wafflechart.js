// Load the data
d3.csv("./data/life_expectancy_per_year_waffle.csv").then(function(data) {
    // Define dimensions and colors for your waffle chart
   
    const colors = {
        "0-20": "#28B463",
        "21-30": "#2ECC71 ",
        "31-40": "#58D68D ",
        "41-50": "#82E0AA ",
        "51-70": "#ABEBC6 ",
        "71-100": "#D5F5E3 "
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

    console.log(colors["0-20"])
    let legendItem = legend.append('div').attr('class', 'legend-item');
    legendItem.append('div')
                .attr('class', 'legend-box')
                .style('background-color', colors["0-20"]);
    legendItem.append('text')
                .text("0-20");

    let legendItem1 = legend.append('div').attr('class', 'legend-item');
    legendItem1.append('div')
                .attr('class', 'legend-box')
                .style('background-color', colors["21-30"]);
    legendItem1.append('text')
                .text("21-30");
                
    let legendItem2 = legend.append('div').attr('class', 'legend-item');
    legendItem2.append('div')
                .attr('class', 'legend-box')
                .style('background-color', colors["31-40"]);
    legendItem2.append('text')
                .text("31-40");

    let legendItem3 = legend.append('div').attr('class', 'legend-item');
    legendItem3.append('div')
                .attr('class', 'legend-box')
                .style('background-color', colors["41-50"]);
    legendItem3.append('text')
                .text("41-50");

    let legendItem4 = legend.append('div').attr('class', 'legend-item');
    legendItem4.append('div')
                .attr('class', 'legend-box')
                .style('background-color', colors["51-70"]);
    legendItem4.append('text')
                .text("51-70");

    let legendItem5 = legend.append('div').attr('class', 'legend-item');
    legendItem5.append('div')
                .attr('class', 'legend-box')
                .style('background-color', colors["71-100"]);
    legendItem5.append('text')
                .text("71-100");
});
