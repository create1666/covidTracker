import React, { useEffect, useState } from "react";
import "./LineGraph.css";
import { Line } from "react-chartjs-2";

const LineGraph = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      const getChartData = async () => {
        let response = await fetch(
          "https://astro-cors-server.herokuapp.com/fetch/https://disease.sh/v3/covid-19/historical/all?lastdays=120"
        );
        let responses = await response.json().then((response) => {
          console.log(response);
        });
        setData(responses);
      };
      getChartData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="chart">
      <Line data={data} />
    </div>
  );
};

export default LineGraph;
