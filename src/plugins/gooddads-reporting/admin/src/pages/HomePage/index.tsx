import * as d3 from "d3";
import React, {
  useState
} from 'react';
import {
  Element
} from 'react-faux-dom';
import {Box} from '@strapi/design-system';

const App = () => {
  const [pieChartData, setPieChartData] = useState([
    {color: "red", name: "Mark", value: 20},
    {color: "red", name: "Matthew", value: 20},
    {color: "red", name: "Simon", value: 30},
    {color: "red", name: "Peter", value: 20},
    {color: "red", name: "John", value: 10},
  ]);

  const [barChartData, setBarChartData] = useState([
    {city: "Springfield", value: 50},
    {city: "KC", value: 225},
    {city: "Hannibal", value: 75},
    {city: "Joplin", value: 150},
    {city: "Stockton", value: 25},
  ]);

  const plotBarChart = (chart, width, height) => {
    // create scales!
    const xScale = d3.scaleBand()
      .domain(barChartData.map(d => d.city))
      .range([0, width]);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(barChartData, d => d.value)])
      .range([height, 0]);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    chart.selectAll('.bar')
      .data(barChartData)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', d => xScale(d.city))
      .attr('y', d => yScale(d.value))
      .attr('height', d => (height - yScale(d.value)))
      .attr('width', d => xScale.bandwidth())
      .style('fill', (d, i) => colorScale(i));

    const xAxis = d3.axisBottom()
      .scale(xScale);

    chart.append('g')
      .classed('x axis', true)
      .attr('transform', `translate(0,${height})`)
      .attr("color", "#fff")
      .call(xAxis);

    const yAxis = d3.axisLeft()
      .ticks(5)
      .scale(yScale);

    chart.append('g')
      .classed('y axis', true)
      .attr('transform', 'translate(0,0)')
      .attr("color", "#fff")
      .call(yAxis);

    chart.select('.x.axis')
      .append('text')
      .attr('x', width / 2)
      .attr('y', 60)
      .attr('fill', '#fff')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text('Name');

    chart.select('.y.axis')
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('transform', `translate(-50, ${height / 2}) rotate(-90)`)
      .attr('fill', '#fff')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text('Quiz Completion Rates');

    const yGridlines = d3.axisLeft()
      .scale(yScale)
      .ticks(5)
      .tickSize(-width, 0, 0)
      .tickFormat('')

    chart.append('g')
      .call(yGridlines)
      .classed('gridline', true);
  };

  const plotPieChart = (chart, width, height) => {
    const radius = Math.min(width, height) / 2;

    const g = chart
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(function (d) {
      return d.value;
    });

    const path = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - 80);

    const arc = g
      .selectAll(".arc")
      .data(pie(pieChartData))
      .enter()
      .append("g")
      .attr("class", "arc");

    arc
      .append("path")
      .attr("d", path)
      .attr("fill", function (d) {
        return colorScale(d);
      });

    arc
      .append("text")
      .attr("fill", "#fff")
      .attr("font-size", "20px")
      .attr("transform", function (d) {
        return `translate(${label.centroid(d)})`;
      })
      .text(function (d) {
        return d.data.name;
      });

    chart
      .append("g")
      .attr("transform", `translate(${width / 2 - 120},10)`)
      .append("text")
      .text("Percentage of Quiz Completions")
      .attr("fill", "#fff")
      .attr("font-size", "20px")
      .attr("class", "title");
  };

  const drawChart = () => {
    const width = 400;
    const height = 450;
    const el = new Element('div');

    const margin = {
      top: 60,
      bottom: 100,
      left: 80,
      right: 40
    };

    const svg = d3.select(el)
      .append('svg')
      .attr('id', 'barchart')
      .attr('width', width)
      .attr('height', height);


    const barchart = svg.append('g')
      .classed('display', true)
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const margin2 = {
      top: 60,
      bottom: 100,
      left: 80,
      right: 40
    };

    const svg2 = d3.select(el)
      .append('svg')
      .attr('id', 'piechart')
      .attr('width', width)
      .attr('height', height);


    const piechart = svg2.append('g')
      .classed('display', true)
      .attr('transform', `translate(${margin2.left},${margin2.top})`);


    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom

    const chartWidth2 = width - margin2.left - margin2.right;
    const chartHeight2 = height - margin2.top - margin2.bottom

    plotBarChart(barchart, chartWidth, chartHeight);
    plotPieChart(piechart, chartWidth2, chartHeight2);
    return el.toReact();
  }

  return (
    <div>

      <Box padding={8} background="primary100">
        {drawChart()}
      </Box>
    </div>
  )
};

export default App;
