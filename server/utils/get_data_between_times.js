const extractDataBetweenTimes = (data, eventsArray) => {
  const extractedData = eventsArray.map(event => {
    const startTime = event.start;
    const endTime = event.end;

    // Filter data based on time range
    const filteredData = data.filter(row => {
      const rowTime = row[1]; // Assuming time is in the second column
      return rowTime >= startTime && rowTime <= endTime;
    });

    return { event, data: filteredData };
  });

  return extractedData;
}

module.exports = { extractDataBetweenTimes };