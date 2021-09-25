import React, { useEffect, useState } from "react";
import "./LineGraph.css";
import { Line } from "react-chartjs-2";

const options = {
  legend: {
    display: false,
  },
  element: {
    point: {
      radius: 0,
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callback: function (tooltipItem, data) {
        return numbro(tooltipItem.value).format("+0,0");
      },
    },
  },
};
const LineGraph = () => {
  const chartDataTransformed = (data, caseType = "cases") => {
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
      lastDatapoint = data[caseType][date];
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
            let newChartData = chartDataTransformed(data, "cases");
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
      <Line
        options={options}
        data={{
          datasets: [
            {
              data: data,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
            },
          ],
        }}
      />
    </div>
  );
};

export default LineGraph;
