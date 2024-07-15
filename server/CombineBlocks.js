const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Directory containing the Excel files to merge
const directoryPath = './blocks';

// Function to read the contents of each Excel file
const readExcelFiles = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const workbooks = [];
      files.forEach(file => {
        if (file.startsWith('results-') && file.endsWith('.xlsx')) {
          const filePath = path.join(directoryPath, file);
          const workbook = xlsx.readFile(filePath);
          workbooks.push(workbook);
        }
      });

      resolve(workbooks);
    });
  });
};

const mergeWorkbooks = (workbooks) => {
  const mergedWorkbook = xlsx.utils.book_new();
  const mergedSheetName = 'MergedData';
  const mergedData = [];

  workbooks.forEach((workbook, index) => {
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
      if (index === 0) {
        // For the first workbook, include the header row
        mergedData.push(data[0]);
      }
      // Include data rows excluding the header
      mergedData.push(...data.slice(1));
    });
  });

  // Convert mergedData into array of arrays (aoa)
  const mergedDataAoA = mergedData.map(row => Object.values(row));

  // Append merged data to the merged worksheet
  xlsx.utils.book_append_sheet(mergedWorkbook, xlsx.utils.aoa_to_sheet(mergedDataAoA), mergedSheetName);

  return mergedWorkbook;
};


// Function to write the merged workbook into a new Excel file
const writeMergedWorkbook = (mergedWorkbook) => {
  const outputFilePath = './blocks/results.xlsx';
  xlsx.writeFile(mergedWorkbook, outputFilePath);
  console.log(`Merged workbook has been saved to ${outputFilePath}`);
};

// Main function to orchestrate the merge process
const mergeExcelFiles = async () => {
  try {
    const workbooks = await readExcelFiles();
    if (workbooks.length === 0) {
      console.log('No Excel files found in the directory.');
      return;
    }
    
    const mergedWorkbook = mergeWorkbooks(workbooks);
    writeMergedWorkbook(mergedWorkbook);
  } catch (error) {
    console.error('Error merging Excel files:', error);
  }
};

// Invoke the mergeExcelFiles function
mergeExcelFiles();
