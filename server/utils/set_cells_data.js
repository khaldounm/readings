const fs = require('fs');
const xlsx = require('xlsx');

const setCellsData = (data, user) => {
  const columns = data.map(obj => Object.keys(obj)[0]);

  // Extract corresponding values
  const values = data.map(obj => Object.values(obj)[0]);

  // Create header row
  const headerRow = ['Participant', ...columns];

  // Create data row
  const dataRow = [user, ...values];

  // Combine header and data rows
  const excelData = [headerRow, dataRow];

  // Create a new workbook
  const workbook = xlsx.utils.book_new();

  // Add a new worksheet
  const worksheet = xlsx.utils.aoa_to_sheet(excelData);

  // Add the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write the workbook to a file
  xlsx.writeFile(workbook, `./blocks/results-${user}.xlsx`);
};


module.exports = { setCellsData };