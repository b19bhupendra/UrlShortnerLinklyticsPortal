import React from 'react'


import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    Legend,
    Tooltip,
    Filler,
    LinearScale,
} from "chart.js";

/**
 * Registering the required components for ChartJS so that they are available to use in the bar and line charts.
 * Without registering these components, the charts will not render correctly.
 * Without registering, you might encounter errors or blank charts.
 */
ChartJS.register(
    BarElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    Legend,
    Filler
);

/**
 * 
 * Renders a graph component that displays user URL click data.
 * Here graphData is passed as a prop to the component.
 * This is the prop contains array of objects each representing the click date and the count 
 * This is the data that we are getting froom backend API.
 * @param {*} param0 
 */
const Graph = ({ graphData }) => {
    // Extracting labels (short codes) and data (click counts) from the graphData prop
    const labels = graphData.map((item, index) => `${item.clickDate}`);
    const userPerDays = graphData.map(( item ) => item.count);

    // Data object for the chart
    const data = {
        // If graphData has data, use the extracted labels and userPerDays (generating labels and data from the prop)
        // This is about x-axis
        labels:
            graphData.length > 0 
                ? labels
                    : ["", "", "", "", "", "", "", "", "", ""],
        // This is about y-axis
        datasets: [
            {
                label : "Total clicks",
                data:
                    graphData.length > 0
                        ? userPerDays
                        : [1, 4, 6, 7, 8, 7, 6, 4, 2, 1],
                backgroundColor:
                    graphData.length > 0 ? "#3b82f6" : "rgba(54, 162, 235, 0.1)",
                borderColor: "#1D2327",
                PointBorderColor: "red",
                fill: true,
                tension: 0.4,
                barThickness: 20,
                CategoryPercentage: 1.5,
                barPercentage: 1.5,

            },
        ],
    };

    // Options object for the chart options like responsiveness, scales, plugins etc.
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // stepSize: 1,
                    callback: function (value) {
                        if (Number.isInteger(value)) {
                            return value.toString();
                        }
                        return " ";
                    },
                },
                title: {
                    display: true,
                    text: "Number of Clicks",
                    font: {
                        family: "Arial",
                        size: 14,
                        weight: "bold",
                        color: "#FF0000",
                    },
                },
            },
            x: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
                title: {
                    display: true,
                    text: "Date",
                    font:{
                        family: "Arial",
                        size: 14,
                        weight: "bold",
                        color: "#FF0000",
                    },
                },
            },
        },
    }
    return <Bar className=' w-full' data={data} options={options} ></Bar>;
};


export default Graph;