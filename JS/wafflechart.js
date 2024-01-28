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
  
    

});
