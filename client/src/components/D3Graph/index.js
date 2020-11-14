import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart2 extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
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

    const accessToRef = d3.select(this.myRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background-color', 'transparent')
      .style('padding', 10)
    
    accessToRef.selectAll('rect')
      .data(totalProgress)
      .enter()
      .append('rect')
      .attr('width', barWidth)
      .attr('height', (totalProgress) => {
        return yScale(totalProgress);
      })
      .attr('x', (totalProgress, i) => {
        return i * (barWidth + barOffset)
      })
      .attr('y', (totalProgress) => {
        return height - yScale(totalProgress);
      })
      .style('fill', (d) => d > 25? 'red' : 'orange')

      // .attr('x', (d, i) => i * 60)
      // .attr('y', (d) => height - 10 * d)
      // .attr('height', (d) => d * 10)

      .on('mouseover', function() {
        dynamicColor = this.style.fill;
        d3.select(this)
            .style('fill', '#00c4ff')
      })
 
      .on('mouseout', function() {
        d3.select(this)
            .style('fill', dynamicColor)
      });
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