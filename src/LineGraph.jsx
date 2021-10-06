/* eslint-disable no-constant-condition */
import { useEffect, useState } from "react";
import "./LineGraph.css";
import { Line } from "react-chartjs-2";
import { getMonth } from "./util";
// import numeral from "numeral";
// import numbro from "numbro";
// import numeral from "numeral";
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
      label: function () {
        // return numeral(tooltipItem.value).format("+0,0");
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
          // INCLUDES A DOLLER SIGN IN THE TICK S
          callback: function () {
            // return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const chartDataTransformed = (data, caseType) => {
  const newChartData = [];
  let lastDatapoint;

  const formatDate = (date) => {
    let scopedDate = date;

    const splitdate = scopedDate.split("/"); //12/8/2021
    const month = splitdate.map((el, index, array) => {
      return array[0];
    });
    const day = splitdate[1];
    const year = splitdate[2];
    const getMatchedMonth = getMonth(month);
    const formattedDate = `${getMatchedMonth} ${day}, ${year}`;
    return formattedDate;
  };

  for (let date in data.cases) {
    if (lastDatapoint) {
      let newDataPoint = {
        x: formatDate(date),
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
    getChartData();
    return () => {};
  }, []);
  async function getChartData() {
    let f = await fetch(
      "https://astro-cors-server.herokuapp.com/fetch/https://disease.sh/v3/covid-19/historical/all?lastdays=120"
    );
    let newTransformeddata = await f.json();
    let newChartData = chartDataTransformed(newTransformeddata, caseType);
    setData(newChartData);
    console.log(newTransformeddata, "caseswehave");
  }
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
