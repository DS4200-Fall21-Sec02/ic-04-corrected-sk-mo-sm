
// write your javascript code here.
// feel free to change the pre-set attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

//SVG that will hold the visualization 
var svg1 = d3.select('#d3-container')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '60%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', 'white') 
  .style('border', 'solid')
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

// Set SVG width, height, and padding
const w = 500;
const h = 500;
const padding = 60;


// Parse the data
d3.csv("data/data.csv").then(function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.X; }))
  .padding(0.2);
svg1.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 100])
  .range([ height, 0]);
svg1.append("g")
  .call(d3.axisLeft(y));

// Bars
svg1.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.X); })
    .attr("y", function(d) { return y(d.Y); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.Y); })
    .attr("fill", "#69b3a2")

})