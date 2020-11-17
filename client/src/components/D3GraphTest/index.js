import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


export const D3GraphTest = (props) => {

  const d3Container = useRef(null);

  useEffect(() => {
      
    // const totalProgress = [
    //   15, 38, 40, 25,
    // ];

    const totalProgress = props.progressData.map(each => each.completed)
        
    // Setting up margins
    const margin = {
      top: 50,
      right: 25,
      bottom: 25,
      left: 50
    }
          
    // Graph area dimensions
    const height = 500 - margin.top - margin.bottom;
    const width = 450 - margin.left - margin.right;
      
    // Mouse over dynamic color
    let dynamicColor;
      
    // Proportional height
    const yScale = 
    d3.scaleLinear() 
      .domain([0, d3.max(totalProgress)])
      .range([0, height]);
      
    // Proportional width
    const xScale = 
    d3.scaleBand()
      .domain(d3.range(0, totalProgress.length))
      .range([0, width])
      .paddingInner(0.2)
      .paddingOuter(1);
      
    // Multicolor using scaleLinear
    const colors =
    d3.scaleLinear()
      .domain([
        0, 
        totalProgress.length * .33, 
        totalProgress.length * .66, 
        totalProgress.length
      ])
      .range([
        '#d6e9c6', 
        '#bce8f1', 
        '#faebcc', 
        '#ebccd1'
      ]);
          
    // Main graph using d3 api references
    const awesome = 
    d3.select(d3Container.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background', 'transparent')
      .append('g')
      .attr(
        'transform', 
        'translate(' + margin.left + ', ' + margin.top + ')'
      )
      .selectAll('rect')
      .data(totalProgress)
      .enter()
      .append('rect')
      .style('fill', (data, i) => {
        return colors(i);
      },)
      .attr('width', xScale.bandwidth())
      .attr('x', function(data, i) {
        return xScale(i);
      })
      .attr('height', 0)
      .attr('y', height)
      
    // Mouse over dynamic color
      .on('mouseover', function() {
        dynamicColor = this.style.fill;
        d3.select(this)
          .style('fill', '#3c763d')
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('fill', dynamicColor)
      })
      
      // Graph animated transition
      awesome.transition()
      .attr('height', (data) => {
        return yScale(data);
      })
      .attr('y', (data) => {
        return height - yScale(data);
      })
      .delay((data, i) => {
        return i * 20;
      })
      .duration(3000)
      .ease(d3.easeElastic)
      
      // Vertical guide / challenges
      const verticalGuideScale = 
      d3.scaleLinear()
        .domain([0, d3.max(totalProgress)])
        .range([height, 0])
      
      const vAxis = 
      d3.axisLeft(verticalGuideScale)
        .ticks(10)
      
      const verticalGuide = d3.select('svg').append('g')
      vAxis(verticalGuide)
      verticalGuide.attr(
        'transform', 
        'translate(' + margin.left + ', ' + margin.top + ')'
      )
      verticalGuide.selectAll('path').style('stroke', '#00c4ff');
      verticalGuide.selectAll('line').style('stroke', '#00c4ff');
            
      // Horizontal guide / weeks
      const hAxis = 
      d3.axisBottom(xScale)
        .ticks(totalProgress.size)
      
      const horizontalGuide = d3.select('svg').append('g')
      hAxis(horizontalGuide)
      horizontalGuide.attr(
        'transform', 
        'translate(' + margin.left + ', ' + (height + margin.top) + ')'
      );
      horizontalGuide.selectAll('path').style('stroke', '#00c4ff');
      horizontalGuide.selectAll('line').style('stroke', '#00c4ff');

      awesome.selectAll('*').remove()
  });


  return (
    <>
      <div ref = {d3Container} width = '450' height = '500'></div>
    </>
  )

}

export default D3GraphTest;
