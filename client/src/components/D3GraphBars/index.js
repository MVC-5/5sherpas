import React, { useEffect, useRef, useState, useContext } from "react";
import * as d3 from "d3";
import UserContext from "../../utils/UserContext";
import { Segment } from "semantic-ui-react";

const D3GraphBars = () => {
  const { progressData } = useContext(UserContext);

  const d3Container = useRef(null);
  const [totalProgress, setTotalProgress] = useState([]);
  const [progressSum, setProgressSum] = useState(0);
  const [windowWidth, setWindowWidth] = useState(950);

  function makeGraph(totalProgress) {
    setWindowWidth(window.screen.width);

    // Setting up margins
    const margin = {
      top: 25,
      right: 40,
      bottom: 40,
      left: 60,
    };

    // Graph area dimensions
    let height;
    let width;
    let userWindow;

    // to check if window resizes every two seconds
    setInterval(checkWindowWidth, 2000);

    // called by setInterval
    function checkWindowWidth() {
      userWindow = window.screen.width;
      if (userWindow !== windowWidth) {
        setWindowWidth(userWindow);
      }
    }

    if (windowWidth < 940 && windowWidth > 755) {
      // medium graph
      width = 350 - margin.left - margin.right;
      height = 400 - margin.top - margin.bottom;
    } else if (windowWidth >= 490) {
      // big graph
      width = 450 - margin.left - margin.right;
      height = 500 - margin.top - margin.bottom;
    } else {
      // small graph
      width = 300 - margin.left - margin.right;
      height = 350 - margin.top - margin.bottom;
    }

    // Mouse over dynamic color
    let dynamicColor;

    // Proportional height
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(totalProgress)])
      .range([0, height]);

    // Proportional width
    const xScale = d3
      .scaleBand()
      .domain(d3.range(0, totalProgress.length))
      .range([0, width])
      .paddingInner(0.2)
      .paddingOuter(1);

    // Multicolor using scaleLinear
    const colors = d3
      .scaleLinear()
      .domain([
        0,
        totalProgress.length * 0.33,
        totalProgress.length * 0.66,
        totalProgress.length,
      ])
      .range(["#54AF18", "#06D5D9", "#7831CD", "#9D2241"]);

    // Main graph using d3 api references
    const awesome = d3
      .select(d3Container.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background", "transparent")
      .append("g")
      .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
      .selectAll("rect")
      .data(totalProgress)
      .enter()
      .append("rect")
      .style("fill", (data, i) => {
        return colors(i);
      })
      .attr("width", xScale.bandwidth())
      .attr("x", function (data, i) {
        return xScale(i);
      })
      .attr("height", 0)
      .attr("y", height)

      // Mouse over dynamic color
      .on("mouseover", function () {
        dynamicColor = this.style.fill;
        d3.select(this).style("fill", "#00c4ff");
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", dynamicColor);
      });

    // Graph animated transition
    awesome
      .transition()
      .attr("height", (data) => {
        return yScale(data);
      })
      .attr("y", (data) => {
        return height - yScale(data);
      })
      .delay((data, i) => {
        return i * 20;
      })
      .duration(700)
      .ease(d3.easeElastic);

    // Vertical guide / challenges
    const verticalGuideScale = d3
      .scaleLinear()
      .domain([0, d3.max(totalProgress)])
      .range([height, 0]);

    const vAxis = d3.axisLeft(verticalGuideScale).ticks(10);

    const verticalGuide = d3.select("svg").append("g");
    vAxis(verticalGuide);
    verticalGuide.attr(
      "transform",
      "translate(" + margin.left + ", " + margin.top + ")"
    );
    verticalGuide.selectAll("path").style("stroke", "#00c4ff");
    verticalGuide.selectAll("line").style("stroke", "#00c4ff");

    // Horizontal guide / weeks
    const hAxis = d3
      .axisBottom(xScale)
      .ticks(totalProgress.size)
      .tickFormat(function (d) {
        return d + 1;
      });

    const horizontalGuide = d3.select("svg").append("g");
    hAxis(horizontalGuide);
    horizontalGuide.attr(
      "transform",
      "translate(" + margin.left + ", " + (height + margin.top) + ")"
    );
    horizontalGuide.selectAll("path").style("stroke", "#00c4ff");
    horizontalGuide.selectAll("line").style("stroke", "#00c4ff");
  }

  // if window width changes re render graph
  useEffect(() => {
    document.querySelector("#d3Graph").innerHTML = "";
    makeGraph(totalProgress);
  }, [windowWidth]);

  useEffect(() => {
    document.querySelector("#d3Graph").innerHTML = "";
    const newData = progressData.map((each) => each.completed);
    setTotalProgress(newData);
    let newSum = 0;
    newData.forEach((num) => {
      newSum += num;
    });
    setProgressSum(newSum);
  }, [progressData]);

  useEffect(() => {
    document.querySelector("#d3Graph").innerHTML = "";
    if (totalProgress.length) {
      makeGraph(totalProgress);
    }
  }, [totalProgress]);

  return (
    <>
      <div className="progress-container">
        <div id="d3Graph" ref={d3Container}></div>
        <div className="weeks">weeks</div>
        <div className="total-container">
          <Segment id="total">
            <div>Total Progress: {progressSum}</div>
          </Segment>
        </div>
      </div>
    </>
  );
};

export default D3GraphBars;
