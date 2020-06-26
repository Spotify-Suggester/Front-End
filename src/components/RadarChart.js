import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const styles = {
  radar: {
    margin: '-50px 0 -50px -10px'
  }
};

const RadarChart = (props) => {
  const {songData, averages, features} = props;
  const [songSerie, setSongSerie] = useState([])
  const [aveSerie, setAveSerie] = useState([])


useEffect(() => {
  const tempSongSerie = []
  const tempAveSerie = []
  features.forEach( (el, index) => {
    if(el === "tempo") {
      tempSongSerie.push((songData[el]/20).toFixed(3))
      tempAveSerie.push((averages[index].value/20).toFixed(3))
    } else {
      tempSongSerie.push(songData[el].toFixed(3))
      tempAveSerie.push(averages[index].value.toFixed(3))
    }
    
  })
  setAveSerie(tempAveSerie)
  setSongSerie(tempSongSerie)
},[averages, features, songData])

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
        opacity: 0.2,
      },
      stroke: {
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
        categories: features
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
        data: songSerie
      },
      {
        name: 'Favorites Average',
        data: aveSerie
      }
    ]
  };
  console.log(">>>>>", songSerie, aveSerie);
  
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
