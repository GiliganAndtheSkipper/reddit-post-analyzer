import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import useD3 from '../hooks/useD3';
import './styles/D3Chart.css';

function D3Chart({ data }) {
    const ref = useD3(svgElement => {
        const height = 400;
        const width = 800;
        const margin = { top: 20, right: 30, bottom: 40, left: 90 };

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .rangeRound([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top]);

        const xAxis = g => g
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));

        const yAxis = g => g
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select('.domain').remove());

        const zoom = d3.zoom()
            .scaleExtent([1, 3])
            .translateExtent([[margin.left, 0], [width - margin.right, height]])
            .extent([[margin.left, 0], [width - margin.right, height]])
            .on('zoom', (event) => {
                svgElement.selectAll('.bar').attr('transform', event.transform);
                svgElement.select('.x-axis').call(xAxis.scale(event.transform.rescaleX(x)));
            });

        let svg = d3.select(svgElement.current)
            .attr('viewBox', [0, 0, width, height])
            .call(zoom);

        svg.append('g')
            .attr('fill', 'steelblue')
            .selectAll('rect')
            .data(data)
            .join('rect')
                .attr('x', d => x(d.name))
                .attr('y', d => y(d.value))
                .attr('height', d => y(0) - y(d.value))
                .attr('width', x.bandwidth());

        svg.append('g')
            .attr('class', 'x-axis')
            .call(xAxis);

        svg.append('g')
            .call(yAxis);
    }, [data]);

    return (
        <svg ref={ref} />
    );
}

export default D3Chart;