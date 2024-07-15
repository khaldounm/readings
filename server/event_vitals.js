const XLSX = require('xlsx');
const fs = require('fs');
const { extractEventTimes } = require('./utils/get_events_time_pairings');
const { extractDataBetweenTimes } = require('./utils/get_data_between_times');



const rootPath = './participants';
const eventsFile = 'events.csv';
const vitalsFile = 'vitals.csv';
const participantPath = `p${process.env.PARTICIPANT_NUMBER}`;
const eventsPath = `${rootPath}/${participantPath}/${eventsFile}`;
const vitalsPath = `${rootPath}/${participantPath}/${vitalsFile}`;
const outputFilePath = `${rootPath}/${participantPath}/results.csv`;
// const tolerance = 1; // number of cells before or after

const readFilterEvents = () => {
  const events = XLSX.readFile(eventsPath);
  const eventsSheet = events.SheetNames[0];
  const worksheet = events.Sheets[eventsSheet];
  const eventsData = XLSX.utils.sheet_to_json(worksheet);
  const eventsRelevantData = eventsData.filter(e => e.Event_Number === 8);
  const eventsPairingTimes = extractEventTimes(eventsRelevantData);
  return eventsPairingTimes;
};

const extractEventTimestamps = (eventData) => {
  const timestamps = [];
  eventData.forEach(ed => {
    timestamps.push(ed[9]);
  });
  return timestamps;
}

const transposeData = (data) => {
  const transposedData = [];
  data.forEach(event => {
      const rowData = [event.event, ...event.timestamps];
      transposedData.push(rowData);
  });
  return transposedData;
}

const readFilterVitals = () => {
  const eventsStartEndTimes = readFilterEvents();
  const vitals = XLSX.readFile(vitalsPath);
  const vitalsSheet = vitals.SheetNames[0];
  const worksheet = vitals.Sheets[vitalsSheet];
  const vitalsData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const eventsData = extractDataBetweenTimes(vitalsData, eventsStartEndTimes);
  const eventsTimestamps = [];
  eventsData.forEach(eventData => {
    eventsTimestamps.push({
      event: eventData.event.name,
      timestamps: extractEventTimestamps(eventData.data),
    });
  });
  // console.log(eventsTimestamps);
  const transposedData = transposeData(eventsTimestamps);
  const ws = XLSX.utils.aoa_to_sheet(transposedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  XLSX.writeFile(wb, outputFilePath);
};


readFilterVitals();


