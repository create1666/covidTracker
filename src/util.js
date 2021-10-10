// import { Circle } from "react-leaflet";

export const sort = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
};

export const caseTypeColors = {
  cases: {
    hex: "#e0115f",
    multiplier: 400,
  },
  recovered: {
    hex: "#41354d",
    multiplier: 400,
  },
  deaths: {
    hex: "#552607",
    multiplier: 400,
  },
};

// export const drawMapCircles = (data, caseType = "deaths") => {
//   return data.map((country) => {
//     <Circle
//       center={{ lat: country.countryInfo.lat, lng: country.countryInfo.long }}
//       fillOpacity={0.4}
//       color={caseTypeColors[caseType].hex}
//       radius={
//         Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
//       }
//     ></Circle>;
//   });
// };

export const getMonth = (month) => {
  let newMonth;

  if (month === "1") {
    newMonth = "Jan";
  } else if (month === "2") {
    newMonth = "Feb";
  } else if (month === "3") {
    newMonth = "Mar";
  } else if (month === "4") {
    newMonth = "Apr";
  } else if (month === "5") {
    newMonth = "May";
  } else if (month === "6") {
    newMonth = "Jun";
  } else if (month === "7") {
    newMonth = "Jul";
  } else if (month === "8") {
    newMonth = "Aug";
  } else if (month === "9") {
    newMonth = "Sep";
  } else if (month === "10") {
    newMonth = "Oct";
  } else if (month === "11") {
    newMonth = "Nov";
  } else if (month === "12") {
    newMonth = "Dec";
  }
  return newMonth;
};
