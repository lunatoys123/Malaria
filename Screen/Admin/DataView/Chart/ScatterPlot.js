import React from "react";
import { Svg, G, Circle, Line, Text as SVGText } from "react-native-svg";
import { Text } from "native-base";
import * as d3 from "d3";

const AdminScatterPlot = props => {
	var { AnalyticsData = {}, w = 400, h = 300 } = props;

	const margin = {
		top: 40,
		bottom: 40,
		left: 40,
		right: 40,
	};

	const width = w - margin.right - margin.left,
		height = h - margin.top - margin.bottom;

	const xScale = AnalyticsData.data
		? d3
				.scaleLinear()
				.domain(d3.extent(AnalyticsData.data, d => d["Age"]))
				.range([0, width])
		: null;
	const yScale = AnalyticsData.data
		? d3
				.scaleLinear()
				.domain(d3.extent(AnalyticsData.data, d => d["count"]))
				.range([height, 0])
		: null;
	return (
		<Svg width={w} height={h}>
			<G transform={`translate(${margin.left},${margin.top})`}>
				{yScale &&
					yScale.ticks(5).map((d, i) => (
						<G key={i}>
							<Line style={{ stroke: "#e4e5eb" }} y1={yScale(d)} y2={yScale(d)} x1={0} x2={width} />
							<Text fontSize="12" style={{ position: "absolute", left: 20, top: yScale(d) + 30 }}>
								{d}
							</Text>
						</G>
					))}
				{xScale &&
					xScale.ticks(10).map((d, i) => (
						<>
							<Line
								style={{ stroke: "#e4e5eb" }}
								y1={0}
								y2={height}
								x1={xScale(d)}
								x2={xScale(d)}
							/>
							<Text
								fontSize={12}
								style={{ position: "absolute", left: xScale(d) + 30, top: height + 30 }}
							>
								{d}
							</Text>
						</>
					))}
				{AnalyticsData.data &&
					AnalyticsData.data.map((data, i) => {
						return (
							<Circle
								key={i}
								r={5}
								x={xScale(data.Age)}
								y={yScale(data.count)}
								style={{ fill: "lightblue" }}
							/>
						);
					})}
			</G>
		</Svg>
	);
};

export default AdminScatterPlot;
