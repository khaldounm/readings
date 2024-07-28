
const extractTimeboxedLatencies = (latencies, events) => {
  const result = [];
  events.forEach(event => {
    const timeboxedLatencies = [];
    const start = event.start;
    const end = event.end;
    latencies.forEach(latency => {
      if (latency.latency >= start && latency.latency <= end) {
        timeboxedLatencies.push(latency.data);
      }
    });
    result.push({ event: event.name, latencies: timeboxedLatencies });
  });
  return result;
}

module.exports = { extractTimeboxedLatencies };