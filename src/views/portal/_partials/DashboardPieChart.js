import * as React from 'react';
import {useState} from 'react';
import Chart from "react-apexcharts";

const DashboardPieChart = ({id, title, source = {}, width = '100%', height = '360', mode = 'pie'}) => {

	const [chartOptions] = useState({
		series: source.series || [],
		labels: source.labels || [],
		colors: ['#01579b', '#60ab8a', '#8151f8', '#25bcb6', '#3a6074']
	});

	return (
		<div className="mixed-chart">
			<h6 className='p-14 border mb-0'>{title}</h6>
			<Chart
				id={id}
				options={chartOptions}
				labels={chartOptions.labels}
				series={chartOptions.series}
				type={mode}
				width={width}
				height={height}
			/>
		</div>
	);

};

export default DashboardPieChart;