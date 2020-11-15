import React, { Component } from 'react';
import * as d3 from 'd3';

class D3Graph extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.progressData = props.progressData
  }

  componentDidMount() {
    console.log(this.progressData)
    
    const totalProgress = [
      12, 38, 10, 25, 35, 15, 30, 24, 18, 12, 
      40, 10, 25, 35, 15, 30, 24, 18, 20, 21
    ];

    // Setting up margins
    const margin = {
      top: 50,
      right: 25,
      bottom: 25,
      left: 50
    };

    // Graph area dimensions
    const height = 500 - margin.top - margin.bottom;
    const width = 450 - margin.left - margin.right;

    // Proportional width
    const xScale = 
    d3.scaleLinear()
      .domain([0, d3.max(totalProgress)])
      .range([0, width]);

    // Proportional height / stack
    const yScale = 
    d3.scaleBand()
      .domain(d3.range(0, totalProgress.length))
      .range([0, height])
      .paddingInner(0.2)
      .paddingOuter(1);

    // Multicolor using scaleLinear
    const colors = 
    d3.scaleLinear()
      .domain([
        0, 
        totalProgress.length*.33, 
        totalProgress.length*.66, 
        totalProgress.length
      ])
      .range([
        '#d6e9c6', 
        '#bce8f1', 
        '#faebcc', 
        '#ebccd1'
      ]);

    // Mouse over dynamic color
    let dynamicColor;

    // Main graph using d3 api references
    const awesome = d3.select(this.myRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', 'transparent')
      .append('g')
      .attr(
        'transform', 
        'translate(' + margin.left + ', ' + margin.top + ')'
      )
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

      // Mouse over dynamic color
      .on('mouseover', function() {
        dynamicColor = this.style.fill;
        d3.select(this)
          .style('fill', '#00c4ff')
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('fill', dynamicColor)
      });

      // Graph animated transition
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
      .duration(2000)
      .ease(d3.easeElasticIn)

      // Vertical guide / weeks
      const vAxis = 
      d3.axisLeft(yScale)
        .ticks(totalProgress.size)

      const verticalGuide = d3.select('svg').append('g')
      vAxis(verticalGuide)
      verticalGuide.attr(
        'transform', 
        'translate(' + margin.left + ', ' + margin.top + ')'
      )
      verticalGuide.selectAll('path').style('stroke', '#00c4ff')
      verticalGuide.selectAll('line').style('stroke', '#00c4ff')

      // Horizontal guide / challenges
      const horizontalGuideScale = 
      d3.scaleLinear()
        .domain([0, d3.max(totalProgress)])
        .range([0, width])
      
      const hAxis = 
      d3.axisBottom(horizontalGuideScale)
        .ticks(10)

      const horizontalGuide = d3.select('svg').append('g')
      hAxis(horizontalGuide)
      horizontalGuide.attr(
        'transform', 
        'translate(' + margin.left + ', ' + (height + margin.top) + ')'
      );
      horizontalGuide.selectAll('path');
      horizontalGuide.selectAll('path').style('stroke', '#00c4ff');
      horizontalGuide.selectAll('line').style('stroke', '#00c4ff');
  }
  
  render() {
    return (
      <>
        <div ref={this.myRef}></div>
      </>
    )
  }
}

export default D3Graph;
