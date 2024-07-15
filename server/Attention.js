const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const { getCellsData } = require('./utils/get_cells_data');
const { processCellsData } = require('./utils/process_cells_data');
const { setCellsData } = require('./utils/set_cells_data');

const directoryPath = './attention';

// const extractDataIntoResultsFiles = async () => {
//   const resArr = [];
//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       console.error('Error reading directory:', err);
//       return;
//     }
  
//     files.forEach(file => {
//       const filePath = path.join(directoryPath, file);
//       fs.stat(filePath, (err, stats) => {
//         if (err) {
//           console.error('Error getting stats for file:', err);
//           return;
//         }
  
//         if (stats.isFile() && file.endsWith('.xlsx') && file.startsWith('p')) {
//           console.log('Reading file:', file);
//           const workbook = xlsx.readFile(filePath);
//           const sheetName = workbook.SheetNames[0];
//           const worksheet = workbook.Sheets[sheetName];
//           const WData = getCellsData('W', worksheet, true);
//           const XData = getCellsData('X', worksheet, true);
//           const YData = getCellsData('Y', worksheet, true);
//           const BCData = getCellsData('BC', worksheet, true);
//           const BDData = getCellsData('BD', worksheet, true);
//           const mergedData = { W: WData, X: XData, Y: YData, BC: BCData, BD: BDData };
//           const res = processCellsData(file.replace('.xlsx', ''), mergedData);
//           resArr.push(res);
//           console.log('Finished reading file:', file);
//         }
//       });
//     });
//   });
//   console.log(resArr);
// };

const extractDataIntoResultsFiles = async () => {
  const resArr = [];
  try {
    const files = await fs.promises.readdir(directoryPath);
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.promises.stat(filePath);
      if (stats.isFile() && file.endsWith('.xlsx') && file.startsWith('p')) {
        console.log('Reading file:', file);
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const WData = getCellsData('W', worksheet, true);
        const XData = getCellsData('X', worksheet, true);
        const YData = getCellsData('Y', worksheet, true);
        const BCData = getCellsData('BC', worksheet, true);
        const BDData = getCellsData('BD', worksheet, true);
        const mergedData = { W: WData, X: XData, Y: YData, BC: BCData, BD: BDData };
        const res = processCellsData(file.replace('.xlsx', ''), mergedData);
        resArr.push(res);
        console.log('Finished reading file:', file);
      }
    }
    
    let csv = 'User,Removed Trials,Calculated Trials,Less Than 150,Wrong Answers,Neutral Wrong,Negative Wrong,Distal Wrong,Proximal Wrong,Overall Standard Deviation,Overall Average,Neutral Standard Deviation,Neutral Average,Negative Standard Deviation,Negative Average,Distal Standard Deviation,Distal Average,Proximal Standard Deviation,Proximal Average,Negative Proximal Standard Deviation,Negative Proximal Average,Negative Distal Standard Deviation,Negative Distal Average,Neutral Proximal Standard Deviation,Neutral Proximal Average,Neutral Distal Standard Deviation,Neutral Distal Average\n';
    resArr.forEach(row => {
      csv += `${row.user},${row.removedTrials},${row.calculatedTrials},${row.lessThan150},${row.wrongAnswers},${row.neutralWrong},${row.negativeWrong},${row.distalWrong},${row.proximalWrong},${row.overallStandardDeviation},${row.overallAverage},${row.neutralStandardDeviation},${row.neutralAverage},${row.negativeStandardDeviation},${row.negativeAverage},${row.distalStandardDeviation},${row.distalAverage},${row.proximalStandardDeviation},${row.proximalAverage},${row.negativeProximalStandardDeviation},${row.negativeProximalAverage},${row.negativeDistalStandardDeviation},${row.negativeDistalAverage},${row.neutralProximalStandardDeviation},${row.neutralProximalAverage},${row.neutralDistalStandardDeviation},${row.neutralDistalAverage}\n`;
    });

    // Write CSV string to file
    fs.writeFileSync('./attention/results.csv', csv, 'utf8');
  } catch (err) {
    console.error('Error:', err);
  }
};


extractDataIntoResultsFiles();