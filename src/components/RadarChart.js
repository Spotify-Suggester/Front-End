import React from 'react';
import Chart from 'react-apexcharts';

const styles = {
  radar: {
    margin: '-50px 0 -50px -10px'
  }
};

const RadarChart = () => {
  const chartConfig = {
    options: {
      chart: {
        id: 'basic-bar',
        background: 'transparent',
        toolbar: {
          show: false
        }
      },
      colors: ['#6c63ff', '#ff6584'],
      fill: {
        opacity: 0.7,
        colors: ['#6c63ff', '#ff6584']
      },
      stroke: {
        colors: ['#6c63ff', '#ff6584']
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
        categories: [
          'danceability',
          'energy',
          'instrumentalness',
          'liveness',
          'loudness',
          'speechiness',
          'valence',
          'tempo'
        ]
      },
      yaxis: {
        show: false
      },
      legend: {
        labels: {
          colors: ['white'],
          useSeriesColors: true
        }
      }
    },
    series: [
      {
        name: 'Actual Song',
        data: [0.1, 0.4, 0.45, 0.5, 0.49, 0.6, 0.7, 0.3]
      },
      {
        name: 'Favorites Average',
        data: [0.1, 0.5, 0.22, 0.11, 0.7, -0.9, 0.3, 0.6]
      }
    ]
  };
  return (
    <Chart
      options={chartConfig.options}
      series={chartConfig.series}
      type='radar'
      width='100%'
      style={styles.radar}
    />
  );
};

export default RadarChart;
