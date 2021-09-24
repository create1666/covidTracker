import React, { useEffect, useState } from "react";
import "./LineGraph.css";
import { Line } from "react-chartjs-2";

const LineGraph = () => {
  const chartDataTransformed = (data) => {
    const newChartData = [];
    let lastDatapoint;
    for (let date in data.cases) {
      if (lastDatapoint) {
        let newDataPoint = {
          x: date,
          y: data["cases"][date] - lastDatapoint,
        };
        newChartData.push(newDataPoint);
      }
      lastDatapoint = data["cases"][date];
    }
    return newChartData;
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      const getChartData = async () => {
        await fetch(
          "https://astro-cors-server.herokuapp.com/fetch/https://disease.sh/v3/covid-19/historical/all?lastdays=120"
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            let newChartData = chartDataTransformed(data);
            setData(newChartData);
          });
      };
      getChartData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="chart">
      <Line data={{ data }} />
    </div>
  );
};

export default LineGraph;
