import React, { useEffect, useState } from "react";
import "./LineGraph.css";
import { Line } from "react-chartjs-2";
// import numeral from "numeral";
// import numbro from "numbro";
import numeral from "numeral";
const options = {
  legend: {
    display: true,
  },
  element: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // INCLUDES A DOLLER SIGN IN THE TICKS
          callback: function (value) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const chartDataTransformed = (data, caseType) => {
  const newChartData = [];
  let lastDatapoint;
  for (let date in data.cases) {
    if (lastDatapoint) {
      let newDataPoint = {
        x: date,
        y: data[caseType][date] - lastDatapoint,
      };
      newChartData.push(newDataPoint);
    }
    lastDatapoint = data[caseType][date];
  }
  return newChartData;
};
const LineGraph = ({ caseType = "cases" }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      const getChartData = async () => {
        await fetch(
          "https://astro-cors-server.herokuapp.com/fetch/https://disease.sh/v3/covid-19/historical/all?lastdays=120"
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data, "caseswehave");
            let newChartData = chartDataTransformed(data, caseType);
            setData(newChartData);
          });
      };
      getChartData();
    } catch (error) {
      console.log(error);
    }
  }, [caseType]);

  return (
    <div className="chart">
      {Object.keys(data)?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: ["rgba(204, 16, 52, 0.5)"],
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default LineGraph;
