import {
  generateEmptyCells,
  getSumOfTwoNumbers,
  getDifferenceOfTwoNumbers,
  getMaxNumberLength,
} from './utils.js';

const generateNumber1Cells = ({
  number,
  totalCells,
  shouldAddBorder,
  sign,
}) => {
  const cells = number
    .toString()
    .split('')
    .map((digit) => `<td>${digit}</td>`);
  const emptyCellsCount = totalCells - cells.length;
  const emptyCells =
    emptyCellsCount > 0
      ? Array(emptyCellsCount).fill('<td></td>').join('')
      : '';

  return `<td ${
    shouldAddBorder ? 'class="td-border-bottom"' : ''
  } rowspan="2">${sign}</td>${emptyCells}${cells.join('')}`;
};

const generateNumber2Cells = (number, totalCells) => {
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

  return `${emptyCells}${cells.join('')}`;
};

const generateResultCells = (number, totalCells) => {
  const cells = number
    .toString()
    .split('')
    .map((digit) => `<td>${digit}</td>`);
  const emptyCellsCount = totalCells - cells.length + 1;
  const emptyCells =
    emptyCellsCount > 0
      ? Array(emptyCellsCount).fill('<td></td>').join('')
      : '';

  return `${emptyCells}${cells.join('')}`;
};

const getOperationInColumnResult = ({
  number1,
  number2,
  result,
  sign,
  extraColumn,
}) => {
  const maxLength = getMaxNumberLength(number1, number2);

  const shouldAddBorder = maxLength - result.toString().length < 0;
  const emptyCells = generateEmptyCells(maxLength + 1);
  const number1Cells = generateNumber1Cells({
    number: number1,
    totalCells: maxLength,
    shouldAddBorder,
    sign,
  });
  const number2Cells = generateNumber2Cells(number2, maxLength);
  const resultCells = generateResultCells(result, maxLength);
  const extraColumnCells = extraColumn ? '<td></td>' : '';

  return `<table class="tp-cells">
          <tbody>
              <tr><td></td>${extraColumnCells}${emptyCells}<td></td></tr>
              <tr><td></td>${extraColumnCells}${number1Cells}<td></td></tr>
              <tr><td></td>${extraColumnCells}${number2Cells}<td></td></tr>
              <tr><td></td>${extraColumnCells}${resultCells}<td></td></tr>
              <tr><td></td>${extraColumnCells}${emptyCells}<td></td></tr>
          </tbody>
          </table>`;
};

export const getSubtractionInColumnResult = (number1, number2, extraColumn) =>
  getOperationInColumnResult({
    number1,
    number2,
    result: getDifferenceOfTwoNumbers(number1, number2),
    sign: '–',
    extraColumn,
  });

export const getAdditionInColumnResult = (number1, number2, extraColumn) =>
  getOperationInColumnResult({
    number1,
    number2,
    result: getSumOfTwoNumbers(number1, number2),
    sign: '+',
    extraColumn,
  });
