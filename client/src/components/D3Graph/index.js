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
    
    const totalProgress = [12, 40, 10, 25, 35, 15, 30, 24, 18, 12, 40, 10, 25, 35, 15, 30, 24, 18];

    const height = 450;
    const width = 450;

    const xScale = 
    d3.scaleLinear()
    .domain([0, d3.max(totalProgress)])
    .range([0, width])

    const yScale = d3.scaleBand()
    .domain(d3.range(0, totalProgress.length))
    .range([0, height])
    .paddingInner(0.2)
    .paddingOuter(1)

    let dynamicColor;

    const awesome = d3.select(this.myRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background-color', 'transparent')
      .style('padding', 10)
      .selectAll('rect')
      .data(totalProgress)
      .enter()
      .append('rect')

      .attr('width', 0)
      .attr('x', width)

      .attr('height', yScale.bandwidth())
      .attr('y', (data, i) => {
        return yScale(i);
      })
      .attr('x', (totalProgress) => {
        return width + xScale(totalProgress);
      })

      .style('fill', (d) => d > 25? 'red' : 'orange')

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
      .attr('width', function(data) {
        return xScale(data);
      })
      .attr('x', function(data) {
        return width < xScale(data);
      })
      .delay(function(data, i) {
        return i * 20;
      })
      .duration(3000)
      .ease(d3.easeElasticIn)

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
