const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const { getCellsData } = require('./utils/get_cells_data');
const { setCellsData } = require('./utils/set_cells_data');

const directoryPath = './blocks';

const extractDataIntoResultsFiles = async () => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
  
    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error getting stats for file:', err);
          return;
        }
  
        if (stats.isFile() && file.endsWith('.xlsx') && file.startsWith('p')) {
          console.log('Reading file:', file);
          const workbook = xlsx.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const AUData = getCellsData('AU', worksheet);
          const AZData = getCellsData('AZ', worksheet);
          const BBData = getCellsData('BB', worksheet);
          const BDData = getCellsData('BD', worksheet);
          const mergedData = [ ...AUData, ...AZData, ...BBData, ...BDData ];
          setCellsData(mergedData, file.replace('.xlsx', ''));
          console.log('Finished reading file:', file);
        }
      });
    });
  });
};

extractDataIntoResultsFiles();