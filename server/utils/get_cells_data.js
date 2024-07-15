const cellsAddress = {
  AU: { rowStart: 35, rowEnd: 49 },
  AZ: { rowStart: 83, rowEnd: 97 },
  BB: { rowStart: 131, rowEnd: 145 },
  BD: { rowStart: 179, rowEnd: 193 },
};

const cellsAddressAttention = {
  W: { rowStart: 14, rowEnd: 141 },
  X: { rowStart: 14, rowEnd: 141 },
  Y: { rowStart: 14, rowEnd: 141 },
  BC: { rowStart: 14, rowEnd: 141 },
  BD: { rowStart: 14, rowEnd: 141 },
};

const getCellsData = (column, worksheet, attention = false) => {
  const data = [];
  const rawData = attention ? cellsAddressAttention : cellsAddress;
  const startRow = rawData[column].rowStart;
  const endRow = rawData[column].rowEnd;
  for (let i = startRow; i <= endRow; i++) {
    const cellAddress = `${column}${i}`;
    const cellValue = worksheet[cellAddress] ? worksheet[cellAddress].v : '';
    data.push({ [cellAddress]: cellValue });
  }
  return data;
};

module.exports = { getCellsData };