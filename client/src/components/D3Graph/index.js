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

    const height = 450,
    width = 450,
    barWidth = 45,
    barOffset = 20;

    const xScale = 
    d3.scaleLinear()
    .domain([0, d3.max(totalProgress)])
    .range([0, width])

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
      .attr('height', barWidth)

      .attr('width', 0)
      .attr('x', width)
      .attr('y', (totalProgress, i) => {
        return i * (barWidth + barOffset)
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
      .ease(d3.easeBack)

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
