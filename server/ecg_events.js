const XLSX = require('xlsx');
const { extractEventLatencies } = require('./utils/extract_events_latencies');
const { extractTimeboxedLatencies } = require('./utils/exctract_timeboxed_latencies');

const rootPath = './ecg_blocks';
const eventsFile = 'events.xlsx';
const latenciesFile = 'latencies.xlsx';
const participantPath = `p${process.env.PARTICIPANT_NUMBER}`;
const eventsPath = `${rootPath}/${participantPath}/${eventsFile}`;
const latenciesPath = `${rootPath}/${participantPath}/${latenciesFile}`;
const outputFilePath = `${rootPath}/${participantPath}/results.xlsx`;

const readEvents = () => {
  const events = XLSX.readFile(eventsPath);
  const eventsSheet = events.SheetNames[0];
  const worksheet = events.Sheets[eventsSheet];
  const eventsData = XLSX.utils.sheet_to_json(worksheet);
  const eventsPairingTimes = extractEventLatencies(eventsData);
  return eventsPairingTimes;
};

const readLatencies = (events) => {
  const latencies = XLSX.readFile(latenciesPath);
  const latenciesSheet = latencies.SheetNames[0];
  const worksheet = latencies.Sheets[latenciesSheet];
  const latenciesData = XLSX.utils.sheet_to_json(worksheet);
  const timeboxedLatencies = extractTimeboxedLatencies(latenciesData, events);
  return timeboxedLatencies;
};

const transformData = (latencies) => {
  const maxLatenciesLength = Math.max(...latencies.map(event => event.latencies.length));

  const transformedData = [];
  const headerRow = latencies.map(event => event.event);
  transformedData.push(headerRow);

  for (let i = 0; i < maxLatenciesLength; i++) {
    const row = latencies.map(event => event.latencies[i] !== undefined ? event.latencies[i] : '');
    transformedData.push(row);
  }

  return transformedData;
};

const readFilterVitals = () => {
  const events = readEvents();
  const latencies = readLatencies(events);
  const transformedData = transformData(latencies);
  const ws = XLSX.utils.aoa_to_sheet(transformedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');
  XLSX.writeFile(wb, outputFilePath);
};

readFilterVitals();
