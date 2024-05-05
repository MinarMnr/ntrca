import * as React from 'react';
import {useState} from 'react';
import Chart from "react-apexcharts";

const DashboardBarChart = ({id, title, source = {}, width = '100%', height = '360', horizontal = true}) => {

	const [chartOptions] = useState({
		chart: {
			id: id
		},
		xaxis: {
			categories: source.labels || []
		},
		series: source.series || [],
		plotOptions: {
			bar: {
				horizontal: horizontal,
				borderRadius: 4,
				dataLabels: {
					position: 'top',
				},
			}
		},
		dataLabels: {
			enabled: true,
			offsetX: -6,
			style: {
				fontSize: '12px',
				colors: ['#fff']
			}
		},
		stroke: {
			show: true,
			width: -1,
			colors: ['#fff']
		},
		tooltip: {
			shared: true,
			intersect: false
		},
		colors: ['#01579b', '#60ab8a', '#8151f8', '#25bcb6', '#3a6074']
	});

	return (
		<div className="mixed-chart">
			<h6 className='p-14 border mb-0'>{title}</h6>
			<Chart
				options={chartOptions}
				series={chartOptions.series}
				type="bar"
				width={width}
				height={height}
			/>
		</div>
	);

};

export default DashboardBarChart;