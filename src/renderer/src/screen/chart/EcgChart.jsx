import { Box, Typography } from '@mui/material'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function EcgChart({ title, data = [] }) {
  const svgRef = useRef()
  const width = 843
  const height = 89
  const margin = { top: 5, right: 5, bottom: 5, left: 5 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // Set up scales
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, innerWidth])
    const yScale = d3.scaleLinear().domain([0, 200]).range([innerHeight, 0]) // Adjusted yScale domain to fit ECG-like data

    // Create a line generator
    const line = d3
      .line()
      .defined((d) => d !== null)
      .x((_, i) => xScale(i))
      .y((d) => yScale(d))

    // Append the line to the SVG
    svg.selectAll('*').remove() // Clear previous elements
    const graphGroup = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`) // Translate graph group for margins
    graphGroup
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#39FF14')
      .attr('stroke-width', 2)
      .attr('d', line)

    // // Add x-axis
    // const xAxis = d3.axisBottom(xScale);
    // graphGroup
    //   .append("g")
    //   .attr("transform", `translate(0, ${innerHeight})`)
    //   .call(xAxis);

    // // Add y-axis
    // const yAxis = d3.axisLeft(yScale);
    // graphGroup.append("g").call(yAxis);
    // graphGroup.selectAll(".axis").remove();
  }, [data, innerWidth, innerHeight, margin.left, margin.top])

  // Start data generation on component mount
  // useEffect(() => {
  //   const interval = setInterval(generateRandomData, 5000); // Update every 500 milliseconds

  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, []);
  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px solid #262626',
        // margin: 4,
        height,
        backgroundColor: '#0c0c0c'
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          position: 'absolute',
          fontWeight: 800,
          color: '#ff7070',
          left: 20,
          top: -5
        }}
      >
        {title}
      </Typography>

      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}></g>
      </svg>
    </Box>
  )
}
