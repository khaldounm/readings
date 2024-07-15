const ss = require('simple-statistics');

const clc = data => {
  const numbers = [];
  data.forEach((d,i) => {
    numbers.push(Object.values(d)[0]);
  });
  
  return { 
    sd: ss.standardDeviation(numbers),
    avg: ss.mean(numbers)
  }
};

const getArray = (ref, data, condition) => {
  const refIndexes = [];
  ref.forEach((refData, i) => {
    if (Object.values(refData)[0].match(new RegExp(condition, 'gim'))) {
      refIndexes.push(i);
    }
  });
  
  return data.filter((_, index) => refIndexes.includes(index));
};

const processCellsData = (user, data) => {
  const { W, X, Y, BC, BD } = data;
  const WLength = W.length;
  const XLength = X.length;
  const YLength = Y.length;
  const BCLength = BC.length;
  const BDLength = BD.length;
  const lessThan150Indexes = [];
  const wrongAnswerIndexes = [];
  const neutralWrongIndexes = [];
  const negativeWrongIndexes = [];
  const distalWrongIndexes = [];
  const proximalWrongIndexes = [];
  
  let i = 0;

  if (WLength !== XLength || WLength !== YLength || WLength !== BCLength || WLength !== BDLength) {
    throw new Error('W, X, Y, BC, BD have different lengths');
  }

  for (i; i <= WLength - 1; i++) {
    if(Object.values(BD[i])[0] < 0.150) {
      lessThan150Indexes.push(i);
    };

    if(Object.values(BC[i])[0] === 0) {
      wrongAnswerIndexes.push(i);
    }
  }

  wrongAnswerIndexes.forEach(wrongAnswerIndex => {
    if (Object.values(W[wrongAnswerIndex])[0].match(/negative/gim)) {
      negativeWrongIndexes.push(wrongAnswerIndex);
    }

    if (Object.values(W[wrongAnswerIndex])[0].match(/neutral/gim)) {
      neutralWrongIndexes.push(wrongAnswerIndex);
    }

    if (Object.values(X[wrongAnswerIndex])[0].match(/distal/gim)) {
      distalWrongIndexes.push(wrongAnswerIndex);
    }

    if (Object.values(X[wrongAnswerIndex])[0].match(/proximal/gim)) {
      proximalWrongIndexes.push(wrongAnswerIndex);
    }
  });

  const wrongIndexes = [ ...lessThan150Indexes, ...wrongAnswerIndexes];
  const filteredW = W.filter((_, index) => !wrongIndexes.includes(index));
  const filteredX = X.filter((_, index) => !wrongIndexes.includes(index));
  const filteredY = Y.filter((_, index) => !wrongIndexes.includes(index));
  const filteredBD = BD.filter((_, index) => !wrongIndexes.includes(index));
  const neutralBD = getArray(filteredW, filteredBD, 'neutral');
  const negativeBD = getArray(filteredW, filteredBD, 'negative');
  const distalBD = getArray(filteredX, filteredBD, 'distal');
  const proximalBD = getArray(filteredX, filteredBD, 'proximal');
  const negDistBD = getArray(filteredY, filteredBD, 'negdist');
  const negProxBD = getArray(filteredY, filteredBD, 'negprox');
  const neutDistBD = getArray(filteredY, filteredBD, 'neutraldist');
  const neutProxBD = getArray(filteredY, filteredBD, 'neutralprox');

  const { avg: overallAverage, sd: overallStandardDeviation } = clc(filteredBD);
  const { avg: neutralAverage, sd: neutralStandardDeviation } = clc(neutralBD);
  const { avg: negativeAverage, sd: negativeStandardDeviation } = clc(negativeBD);
  const { avg: distalAverage, sd: distalStandardDeviation } = clc(distalBD);
  const { avg: proximalAverage, sd: proximalStandardDeviation } = clc(proximalBD);
  const { avg: negativeProximalAverage, sd: negativeProximalStandardDeviation } = clc(negProxBD);
  const { avg: negativeDistalAverage, sd: negativeDistalStandardDeviation } = clc(negDistBD);
  const { avg: neutralProximalAverage, sd: neutralProximalStandardDeviation } = clc(neutProxBD);
  const { avg: neutralDistalAverage, sd: neutralDistalStandardDeviation } = clc(neutDistBD);

  return { 
    user,
    removedTrials: lessThan150Indexes.length + wrongAnswerIndexes.length,
    calculatedTrials: WLength - (lessThan150Indexes.length + wrongAnswerIndexes.length),
    lessThan150: lessThan150Indexes.length,
    wrongAnswers: wrongAnswerIndexes.length,
    neutralWrong: neutralWrongIndexes.length,
    negativeWrong: negativeWrongIndexes.length,
    distalWrong: distalWrongIndexes.length,
    proximalWrong: proximalWrongIndexes.length,
    overallStandardDeviation,
    overallAverage,
    neutralStandardDeviation,
    neutralAverage,
    negativeStandardDeviation,
    negativeAverage,
    distalStandardDeviation,
    distalAverage,
    proximalStandardDeviation,
    proximalAverage,
    negativeProximalStandardDeviation,
    negativeProximalAverage,
    negativeDistalStandardDeviation,
    negativeDistalAverage,
    neutralProximalStandardDeviation,
    neutralProximalAverage,
    neutralDistalStandardDeviation,
    neutralDistalAverage
  };
}

module.exports = { processCellsData };