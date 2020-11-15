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
    
    const totalProgress = [12, 40, 10, 25, 35, 15, 30,];

    const height = 400,
    width = 500,
    barWidth = 45,
    barOffset = 20;

    const yScale = 
    d3.scaleLinear()
    .domain([0, d3.max(totalProgress)])
    .range([0, height])

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
      .attr('width', barWidth)

      .attr('height', 0)
      .attr('y', height)
      .attr('x', (totalProgress, i) => {
        return i * (barWidth + barOffset)
      })
      .attr('y', (totalProgress) => {
        return height + yScale(totalProgress);
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
      .attr('height', function(data) {
        return yScale(data);
      })
      .attr('y', function(data) {
        return height - yScale(data);
      })
      .delay(function(data, i) {
        return i * 20;
      })
      .duration(2000)
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
