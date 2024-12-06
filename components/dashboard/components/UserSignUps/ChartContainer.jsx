import { useEffect, useState } from "react";
import UserSignupsChart from ".";
import { LOAN_APPLICANTS_API } from "../../../../constants/apiConstants";

function convertTimestampsToDates(timestamps) {
  return timestamps.map((ts) => {
    const date = new Date(ts * 1000); // Convert to milliseconds
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day} 00:00:00.000Z`;
  });
}

function getDateFrequencies(timestamps) {
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

const ChartContainer = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(LOAN_APPLICANTS_API);
        const result = await response.json();
        let ts = result.data.map((item) => item.createdAt.seconds);
        ts = getDateFrequencies(ts);

        // Sorting the data by date (from past to future)
        const sortedData = Object.keys(ts)
          .sort((a, b) => new Date(a) - new Date(b)) // Sort by date
          .reduce((acc, key) => {
            acc[key] = ts[key];
            return acc;
          }, {});

        setData(sortedData); // Set the sorted data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (Object.keys(data).length === 0) return null;

  return (
    <>
      <UserSignupsChart timestampScores={data} />
    </>
  );
};

export default ChartContainer;
