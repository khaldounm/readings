const extractEventTimes = (events) => {
  const newArray = [];

  let count = 0;
  for (let i = 0; i < events.length - 1; i += 2) {
    count++;
    const startEvent = events[i];
    const endEvent = events[i + 1];
    const eventName = `Event_${count}`

    const startTime = startEvent.Time;
    const endTime = endEvent.Time;

    newArray.push({ start: startTime, end: endTime, name: eventName });
  }

  return newArray;
}

module.exports = { extractEventTimes };