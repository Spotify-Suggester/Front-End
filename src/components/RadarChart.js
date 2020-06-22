import React from "react";
import Chart from "react-apexcharts";

const RadarChart = () => {

    const chartConfig = {
        options: {
          chart: {
            id: "basic-bar",
            background: "white"
          },
          fill: {
            opacity: 0.7
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
          grid: {
            borderColor: '#000000'
          }
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ]
      };
    return (
        <Chart
              options={chartConfig.options}
              series={chartConfig.series}
              type="radar"
              width="500"
            />
    )
}

export default RadarChart