import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart2 extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.progressData = props.progressData
  }

  componentDidMount() {
    console.log(this.progressData)
    
    const totalProgress = [12, 40, 10, 25, 35, 15, 30, 24, 18, 12, 40, 10, 25, 35, 15, 30, 24, 18, 20, 21];

    // Setting up margins
    const margin = {
      top: 30,
      right: 10,
      bottom: 30,
      left: 50
    }

    const height = 450 - margin.top - margin.bottom;
    const width = 450 - margin.left - margin.right;

    const xScale = 
    d3.scaleLinear()
      .domain([0, d3.max(totalProgress)])
      .range([0, width])

    const yScale = 
    d3.scaleBand()
      .domain(d3.range(0, totalProgress.length))
      .range([0, height])
      .paddingInner(0.2)
      .paddingOuter(1)

    // Multicolor using scaleLinear
    const colors = 
    d3.scaleLinear()
      .domain([0, totalProgress.length*.33, totalProgress.length*.66, totalProgress.length])
      .range(['#d6e9c6', '#bce8f1', '#faebcc', '#ebccd1'])

    let dynamicColor;

    const awesome = d3.select(this.myRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', 'transparent')
      // .style('padding', 10)

      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
      .selectAll('rect')
      .data(totalProgress)
      .enter()
      .append('rect')

      .attr('width', 0)
      .attr('x', width)

      .style('fill', (data, i) => {
        return colors(i);
      },)

      .attr('height', yScale.bandwidth())
      .attr('y', (data, i) => {
        return yScale(i);
      })
      .attr('x', (totalProgress) => {
        return width + xScale(totalProgress);
      })

      // .style('fill', (d) => d > 25? 'red' : 'orange')

      .on('mouseover', function() {
        dynamicColor = this.style.fill;
        d3.select(this)
          .style('fill', '#00c4ff')
      })
 
      .on('mouseout', function() {
        d3.select(this)
          .style('fill', dynamicColor)
      });

      awesome.transition()
      .attr('width', (data) => {
        return xScale(data);
      })
      .attr('x', (data) => {
        return width < xScale(data);
      })
      .delay((data, i) => {
        return i * 20;
      })
      .duration(3000)
      .ease(d3.easeElasticIn)

      // Vertical guide

      // Horizontal guide

  }
  
  render() {
    return (
      <>
        <div ref={this.myRef}></div>
      </>
    )
  }
}

export default BarChart2;
