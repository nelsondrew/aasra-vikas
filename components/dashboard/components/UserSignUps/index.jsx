import dynamic from 'next/dynamic';
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


const UserSignupsChart = ({ timestampScores }) => {
    // Convert timestamp scores to formatted dates and counts
    const categories = Object.keys(timestampScores);
    const data = Object.values(timestampScores);

    const series = [
        {
            name: 'User Sign-ups',
            data: data
        }
    ];

    const options = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: categories // Use formatted dates as x-axis categories
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            }
        }
    };

    console.log({
        series , options
    })
    

    return <Chart options={options} series={series} type="area"  height={"500"} width={"100%"}  />;
};

export default UserSignupsChart;
