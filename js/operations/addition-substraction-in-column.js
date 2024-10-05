import { generateEmptyRow } from './utils.js';

const getMaxNumberLength = (number1, number2) =>
  Math.max(number1.toString().length, number2.toString().length);

const generateNumber1Row = ({ number, totalCells, shouldAddBorder, sign }) => {
  const cells = number
    .toString()
    .split('')
    .map((digit) => `<td>${digit}</td>`);
  const emptyCellsCount = totalCells - cells.length;
  const emptyCells =
    emptyCellsCount > 0
      ? Array(emptyCellsCount).fill('<td></td>').join('')
      : '';

  return `<tr><td></td><td ${
    shouldAddBorder ? 'class="td-border-bottom"' : ''
  } rowspan="2">${sign}</td>${emptyCells}${cells.join('')}<td></td></tr>`;
};

const generateNumber2Row = (number, totalCells) => {
  const cells = number
    .toString()
    .split('')
    .map((digit) => `<td class="td-border-bottom">${digit}</td>`);
  const emptyCellsCount = totalCells - cells.length;
  const emptyCells =
    emptyCellsCount > 0
      ? Array(emptyCellsCount)
          .fill('<td class="td-border-bottom"></td>')
          .join('')
      : '';

  return `<tr><td></td>${emptyCells}${cells.join('')}<td></td></tr>`;
};

const generateResultsRow = (number, totalCells) => {
  const cells = number
    .toString()
    .split('')
    .map((digit) => `<td>${digit}</td>`);
  const emptyCellsCount = totalCells - cells.length + 1;
  const emptyCells =
    emptyCellsCount > 0
      ? Array(emptyCellsCount).fill('<td></td>').join('')
      : '';

  return `<tr><td></td>${emptyCells}${cells.join('')}<td></td></tr>`;
};

const getOperationInColumnResult = ({ number1, number2, result, sign }) => {
  const maxLength = getMaxNumberLength(number1, number2);

  const shouldAddBorder = maxLength - result.toString().length < 0;

  const emptyRow = generateEmptyRow(maxLength + 3);
  const number1Row = generateNumber1Row({
    number: number1,
    totalCells: maxLength,
    shouldAddBorder,
    sign,
  });
  const number2Row = generateNumber2Row(number2, maxLength);
  const resultRow = generateResultsRow(result, maxLength);

  return `<table class="tp-cells">
          <tbody>
              ${emptyRow}
              ${number1Row}
              ${number2Row}
              ${resultRow}
              ${emptyRow}
          </tbody>
          </table>`;
};

export const getSubtractionInColumnResult = (number1, number2) =>
  getOperationInColumnResult({
    number1,
    number2,
    result: number1 - number2,
    sign: '–',
  });

export const getAdditionInColumnResult = (number1, number2) =>
  getOperationInColumnResult({
    number1,
    number2,
    result: number1 + number2,
    sign: '+',
  });
