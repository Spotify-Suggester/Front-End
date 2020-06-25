import React from "react";
import Chart from "react-apexcharts";

const RadarChart = () => {

    const chartConfig = {
        options: {
          chart: {
            id: "basic-bar",
            background: "transparent",
            toolbar: {
              show: false
            }
          },
          colors: ["#6c63ff", "#ff6584"],
          fill: {
            opacity: 0.7,
            colors: ["#6c63ff", "#ff6584"]
          },
          stroke: {
            colors: ["#6c63ff", "#ff6584"]
          },
          markers: {
            size: 0
          },
          plotOptions: {
            radar: {
              polygons: {
                strokeColor: '#333333',
                fill: {
                    colors: ['transparent', 'transparent']
                }
              }
            }
          },
          xaxis: {
            categories: ["danceability", "energy", "mode", "speechiness", "instrumentalness", "liveness", "valence"],
          },
          yaxis: {
            show: false
          },
          legend: {
            labels: {
              colors: ["white"],
              useSeriesColors: true
            }
          }
        },
        series: [
          {
            name: "Actual Song",
            data: [.1, .4, .45, .50, .49, .60, .70]
          },
          {
            name: "Suggestion Average",
            data: [.10, .50, .22, .11, .70, .90, .30]
          }
        ]
      };
    return (
        <Chart
              options={chartConfig.options}
              series={chartConfig.series}
              type="radar"
              width="600"
            />
    )
}

export default RadarChart