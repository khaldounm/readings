
const extractEventLatencies = (events) => {
  const newArray = [];

  let count = 0;
  for (let i = 0; i < events.length - 1; i += 2) {
    count++;
    const startEvent = events[i].latency;
    const endEvent = events[i + 1].latency;
    const eventName = events[i].type;

    newArray.push({ start: startEvent, end: endEvent, name: eventName });
  }

  return newArray;
}

module.exports = { extractEventLatencies };