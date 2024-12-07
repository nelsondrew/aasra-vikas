import {  useState } from "react";
import UserSignupsChart from ".";

function convertTimestampsToDates(timestamps) {
  return timestamps.map((ts) => {
    const date = new Date(ts * 1000); // Convert to milliseconds
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day} 00:00:00.000Z`;
  });
}

export function getDateFrequencies(timestamps) {
  const formattedDates = convertTimestampsToDates(timestamps); // Convert timestamps to formatted dates
  const frequencyMap = {};

  formattedDates.forEach((date) => {
    // If the date is already in the object, increment its count
    if (frequencyMap[date]) {
      frequencyMap[date]++;
    } else {
      // Otherwise, initialize the count to 1
      frequencyMap[date] = 1;
    }
  });

  return frequencyMap;
}

const ChartContainer = ({ chartData }) => {
  const [data, setData] = useState(chartData);

  if (Object.keys(data).length === 0) return null;

  return (
    <>
      <UserSignupsChart timestampScores={data} />
    </>
  );
};

export default ChartContainer;
